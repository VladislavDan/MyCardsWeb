import * as React from "react";
import {FC} from "react";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import './CardsListActions.css'

export const CardsListActions: FC<ICardsListActions> = (
    {
        onOpenEditor,
        onOpenRepeater,
        onStartSelecting
    }
) => {
    return <div className="cards-list-actions">
        <Fab size="medium" color="secondary" onClick={onStartSelecting}>
            <SelectAllIcon/>
        </Fab>
        <Fab size="medium" color="primary" onClick={onOpenRepeater}>
            <PlayArrowIcon/>
        </Fab>
        <Fab size="medium" color="secondary" onClick={onOpenEditor}>
            <AddIcon/>
        </Fab>
    </div>
}

interface ICardsListActions {
    onOpenEditor: () => void;
    onOpenRepeater: () => void;
    onStartSelecting: () => void;
}