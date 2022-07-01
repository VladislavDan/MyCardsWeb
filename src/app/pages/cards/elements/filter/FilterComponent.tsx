import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ChangeEvent, default as React, FC} from "react";

import {ISortVariants} from "../../../../common/types/ISortVariants";
import {IFilterComponent} from "./types/IFilterComponent";

export const FilterComponent: FC<IFilterComponent> = (
    {
        onChangeSearchableText,
        filter,
        onChangeSorting
    }
) => {

    const handleChangingSearchableText = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChangeSearchableText(event.target.value);
    };

    const handleChangingSortingVariant = (event: SelectChangeEvent<ISortVariants>) => {
        onChangeSorting(event.target.value as ISortVariants)
    }

    return <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <TextField
                className="text-editor"
                required
                id="outlined-required"
                placeholder="Search card"
                onChange={handleChangingSearchableText}
                style={{
                    marginRight: '20px',
                }}
                onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                }}
            />
        </AccordionSummary>
        <AccordionDetails>
            <Select
                value={filter.sort}
                label="Sorting"
                onChange={handleChangingSortingVariant}
            >
                <MenuItem value={ISortVariants.NONE}>{ISortVariants.NONE}</MenuItem>
                <MenuItem value={ISortVariants.QUESTION_ASK}>{ISortVariants.QUESTION_ASK}</MenuItem>
                <MenuItem value={ISortVariants.QUESTION_DESK}>{ISortVariants.QUESTION_DESK}</MenuItem>
                <MenuItem value={ISortVariants.STATUS_ASK}>{ISortVariants.STATUS_ASK}</MenuItem>
                <MenuItem value={ISortVariants.STATUS_DESK}>{ISortVariants.STATUS_DESK}</MenuItem>
            </Select>
        </AccordionDetails>
    </Accordion>
}