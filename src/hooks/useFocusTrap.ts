import { RefObject, useEffect, useRef } from 'react';

const getBoundaryFocusableElements = (container: Element) => {
    const focusableElements     = (container && container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) || []) as NodeListOf<HTMLElement>;
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement  = focusableElements[focusableElements.length - 1];

    return (
        firstFocusableElement
            ? [ firstFocusableElement, lastFocusableElement ]
            : []
    );
};

export const useFocusTrap = (containerRef: RefObject<HTMLElement>, isOpen: boolean) => {
    const prevActiveElementRef = useRef<HTMLElement>();

    useEffect(() => {
        if (!prevActiveElementRef.current) prevActiveElementRef.current = document.activeElement as HTMLElement;

        const containerNode = containerRef.current;
        if (!containerNode) return;

        const handleTabKeyPress = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;

            const [ firstFocusableElement, lastFocusableElement ] = getBoundaryFocusableElements(containerNode);

            if (event.shiftKey && document.activeElement === firstFocusableElement) {
                event.preventDefault();
                lastFocusableElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
                event.preventDefault();
                firstFocusableElement.focus();
            }
        };

        if (isOpen) {
            const [ firstFocusableElement ] = getBoundaryFocusableElements(containerNode);

            firstFocusableElement?.focus();
            document.addEventListener('keydown', handleTabKeyPress);
        }

        return () => {
            prevActiveElementRef.current?.focus();
            document.removeEventListener('keydown', handleTabKeyPress);
        };
    }, [ isOpen ]);
};
