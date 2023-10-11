import { ComponentType, ReactNode, Suspense } from 'react';

export function withSuspense<P extends object> (
    WrappedComponent: ComponentType<P>,
    FallbackComponent: ReactNode = '',
) {
    return (props: P) => (
        <Suspense fallback={ (
            typeof FallbackComponent === 'function'
                ? <FallbackComponent {...props} />
                : FallbackComponent
        ) }>
            <WrappedComponent { ...props }/>
        </Suspense>
    );
}
