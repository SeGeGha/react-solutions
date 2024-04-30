import {ComponentType, ReactNode, ReactElement, lazy} from 'react';

import { withSuspense } from "./withSuspense";

type ComponentPromise<T = any> = Promise<{ default: ComponentType<T> }>;

const retry = (
    factory: () => ComponentPromise,
    retriesLeft = 5,
    interval = 1000
): ComponentPromise => {
    return new Promise((resolve, reject) => {
        factory()
            .then(resolve)
            .catch(error => {
                setTimeout(() => {
                    if (retriesLeft === 1) {
                        reject(error);
                        return;
                    }
                    retry(factory, retriesLeft - 1, interval).then(resolve, reject);
                }, interval);
            });
    });
};


export function withLazy<P> (
    importFn: () => Promise<{ default: ComponentType<P> }>,
    componentName: string,
    fallback: ReactNode = ''
) {
    const Component          = lazy(() => retry(importFn));
    const SuspendedComponent = withSuspense(Component, fallback);
    const LazyComponent      = (props: P): ReactElement => <SuspendedComponent { ...props }/>;

    LazyComponent.displayName = componentName + 'Lazy';

    return LazyComponent;
}
