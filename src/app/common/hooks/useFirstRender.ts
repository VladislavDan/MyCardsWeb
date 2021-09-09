import {useEffect, useState} from 'react';

export const useFirstRender = (callback: () => void) => {
    const [state, setState] = useState<boolean>(false);

    useEffect(() => {

        if(!state) {
            callback();
            setState(true);
        }
    });
};
