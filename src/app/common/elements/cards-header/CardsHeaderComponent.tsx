import React, {FC} from 'react';
import {IconButton} from '@mui/material';
import Typography from '@mui/material/Typography';
import {Campaign, Check, Edit} from '@mui/icons-material';
import {ICardsRepeaterHeaderComponent} from "./types/ICardsRepeaterHeaderComponent";

export const CardsHeaderComponent: FC<ICardsRepeaterHeaderComponent> = (
    {
        isQuestionSide,
        onSwitchEditing,
        onReadByVoiceEngine,
        isEditable
    }
) => {
    return <div className="cards-repeater_title">
        <IconButton color="inherit" onClick={onReadByVoiceEngine}>
            <Campaign/>
        </IconButton>
        <Typography gutterBottom variant="h5" component="h2">
            {isQuestionSide ? 'Question' : 'Answer'}
        </Typography>
        <IconButton color="inherit" onClick={onSwitchEditing}>
            {isEditable ? <Check/> : <Edit/>}
        </IconButton>
    </div>
};
