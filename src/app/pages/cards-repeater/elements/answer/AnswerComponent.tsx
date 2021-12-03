import Typography from '@mui/material/Typography';
import React, {FC} from 'react';
import {List} from '@mui/material';

export const AnswerComponent: FC<IExpandableTextComponent> = ({text, height, onClickText}) => {

    const getText = () => {
        return text;
    };

    return <>
        <Typography color="textSecondary" gutterBottom onClick={onClickText}
                    style={{paddingTop: 0, height: height, overflow: 'auto', whiteSpace: 'pre-wrap'}}>
            <List style={{paddingTop: 0}}>
                {getText()}
            </List>
        </Typography>
    </>
};

interface IExpandableTextComponent {
    text: string
    onClickText: () => void
    height: number
}
