import {useEffect, useRef} from 'react';

export const useConstructor = (callback: () => void) => {

    const value = useRef({isFirstRun: false});

    useEffect(() => {
        if (!value.current.isFirstRun) {
            callback();
            value.current.isFirstRun = true;
        }

        return () => {
            value.current.isFirstRun = false;
        }
    }, []);
};
