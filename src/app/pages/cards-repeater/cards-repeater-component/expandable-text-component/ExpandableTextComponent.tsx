import Typography from '@material-ui/core/Typography';
import React, {FC, useEffect, useState} from 'react';
import {Button} from '@material-ui/core';

export const ExpandableTextComponent: FC<IExpandableTextComponent> = ({text, onClickText}) => {

    const [state, setState] = useState<ExpandableTextComponentState>({
        isExpanded: false
    });

    const getText = () => {
        if(state.isExpanded || text.length < 400) {
            return text;
        } else {
            return text.substring(0, 400);
        }
    };

    const onShowMore = () => {
        setState({isExpanded: !state.isExpanded});
    };

    return <>
        <Typography color="textSecondary" gutterBottom onClick={onClickText}>
            {getText()}
        </Typography>
        {text.length > 400 ? state.isExpanded ? <Button variant="contained" color="primary" onClick={onShowMore} style={{marginBottom:'30px', width: '100%'}}>
            Show less
        </Button> : <Button variant="contained" color="primary" onClick={onShowMore} style={{marginBottom:'30px', width: '100%'}}>
            Show more
        </Button> : null}
    </>
};

interface IExpandableTextComponent {
    text: string
    onClickText: ()=>void
}

interface ExpandableTextComponentState {
    isExpanded: boolean
}
