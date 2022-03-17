import React, {FC} from 'react';
import {IconButton} from '@mui/material';
import Typography from '@mui/material/Typography';
import {Check, Edit} from '@mui/icons-material';

export const CardsHeaderComponent: FC<ICardsRepeaterHeaderComponent> = (
    {
        isQuestionSide,
        onSwitchEditing,
        isEditable
    }
) => {
    return <div className="cards-repeater_title">
        <Typography gutterBottom variant="h5" component="h2">
            {isQuestionSide ? 'Question' : 'Answer'}
        </Typography>
        <IconButton color="inherit" onClick={onSwitchEditing}>
            {isEditable ? <Check/> : <Edit/>}
        </IconButton>
    </div>
};

interface ICardsRepeaterHeaderComponent {
    isQuestionSide: boolean
    onSwitchEditing: () => void;
    isEditable: boolean
}
