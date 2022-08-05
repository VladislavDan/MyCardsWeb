import React, {FC} from "react";
import {List} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ILongTextViewerComponent} from "./types/ILongTextViewerComponent";
import './LongTextViewerComponent.css'

export const LongTextViewerComponent: FC<ILongTextViewerComponent> = (
    {
        viewHeight,
        text,
        onClickText = () => {}
    }
) => {
    return <Typography
        component="div"
        color="textSecondary"
        gutterBottom
        onClick={onClickText}
        className="long-text-viewer"
        style={{height: viewHeight}}
    >
        <List style={{paddingTop: 0}}>
            {text}
        </List>
    </Typography>
}