import {useEffect, useState} from 'react';

export const useConstructor = (callback: () => void) => {

    const [state, setState] = useState(false);

    useEffect(() => {
        if (!state) {
            callback();
            setState(true);
        }

        return () => {
            setState(false);
        }
    }, []);
};
