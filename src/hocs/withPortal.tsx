import ReactDOM from 'react-dom';
import { ReactNode, Suspense } from 'react';
import { isFunction } from "../type-guards/isFunction";

export function withPortal<P extends object> (
    WrappedComponent: JSX.Element,
    FallbackComponent: (ReactNode | (() => JSX.Element)) = null
) {
    return function withPortal (props: P) {
        if (FallbackComponent === null) {
            console.warn('missed fallback component');
            FallbackComponent = '';
        }

        if (FallbackComponent && isFunction(FallbackComponent) && props) return ReactDOM.createPortal(
            <Suspense fallback={ <FallbackComponent { ...props }/> }>
                { WrappedComponent }
            </Suspense>,
            document.body
        );

        if (!isFunction(FallbackComponent)) return ReactDOM.createPortal(
            <Suspense fallback={ FallbackComponent }>
                { WrappedComponent }
            </Suspense>,
            document.body
        );

        return null;
    };
}
