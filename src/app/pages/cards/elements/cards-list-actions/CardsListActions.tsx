import * as React from "react";
import {FC} from "react";
import AddIcon from "@mui/icons-material/Add";
import CopyIcon from "@mui/icons-material/CopyAll";
import Fab from "@mui/material/Fab";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import DeleteIcon from "@mui/icons-material/Delete";

import {ICardsListActions} from "./types/ICardsListActions";
import './CardsListActions.css'

export const CardsListActions: FC<ICardsListActions> = (
    {
        onOpenEditor,
        onOpenRepeater,
        onStartSelecting,
        onMovingSelectedCards,
        onDeleteSelectedCards,
        onCopySelectedCards,
        hideOpenRepeaterButton = false,
        hideOpenEditorButton = false,
        hideMovingSelectedCardsButton = false,
        hideDeleteSelectedCardsButton = false,
        hideCopySelectedCardButton = false
    }
) => {
    return <div className="cards-list-actions">
        <Fab size="medium" color="secondary" onClick={onStartSelecting}>
            <SelectAllIcon/>
        </Fab>
        <Fab size="medium" color="primary" onClick={onOpenRepeater}>
            <PlayArrowIcon/>
        </Fab>
        {
            !hideOpenEditorButton && <Fab size="medium" color="secondary" onClick={onOpenEditor}>
                <AddIcon/>
            </Fab>
        }
        {
            !hideMovingSelectedCardsButton && <Fab size="medium" color="primary" onClick={onMovingSelectedCards}>
                <DriveFileMoveIcon/>
            </Fab>
        }
        {
            !hideCopySelectedCardButton && <Fab size="medium" color="secondary" onClick={onCopySelectedCards}>
                <CopyIcon/>
            </Fab>
        }
        {
            !hideDeleteSelectedCardsButton && <Fab size="medium" color="secondary" onClick={onDeleteSelectedCards}>
                <DeleteIcon/>
            </Fab>
        }
    </div>
}