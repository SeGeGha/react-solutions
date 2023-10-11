import { useState, useCallback } from 'react';

export type Toggle = (forcedState?: boolean) => void;

export const useToggle = (initialState = false): [ boolean, Toggle ] => {
    const [ state, setState ] = useState(initialState);

    const toggle: Toggle = useCallback(forcedState => {
        if (typeof forcedState === 'boolean') return setState(forcedState);

        setState(state => !state);
    }, []);

    return [ state, toggle ];
};
