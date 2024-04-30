import { useCallback, useState } from 'react';


export const useOpenClose = (initialState = false) => {
    const [ state, setState ] = useState(initialState);
    const open  = useCallback(() => setState(true), []);
    const close = useCallback(() => setState(false), []);

    return [ state, open, close ] as const;
};
