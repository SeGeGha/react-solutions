import { useEffect, useRef } from 'react';

export const useDidUpdate = (callback: () => void, depsArray: unknown[] = []) => {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) callback();
        didMountRef.current = true;
    }, depsArray);
};
