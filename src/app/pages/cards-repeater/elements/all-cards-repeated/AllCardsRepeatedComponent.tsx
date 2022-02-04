import React, {FC} from 'react';

import {Button} from '@mui/material';

export const AllCardsRepeatedComponent: FC<IAllCardsRepeatedComponent> = ({onBackClick}) => {
    return <>
        <span>All cards repeated</span>
        <Button size="small" color="primary" onClick={onBackClick}>
            Go back
        </Button>
    </>
};

interface IAllCardsRepeatedComponent {
    onBackClick: () => void;
}