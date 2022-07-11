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

import {ISortVariant} from "../../types/ISortVariant";
import {IFilterComponent} from "./types/IFilterComponent";

export const FilterComponent: FC<IFilterComponent> = (
    {
        onChangeSearchableText,
        filter,
        onChangeSorting,
        sortVariants
    }
) => {

    const handleChangingSearchableText = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChangeSearchableText(event.target.value);
    };

    const handleChangingSortingVariant = (event: SelectChangeEvent<ISortVariant>) => {
        onChangeSorting(event.target.value as ISortVariant)
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
                placeholder="Search text"
                onChange={handleChangingSearchableText}
                value={filter.searchableText}
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
                {
                    sortVariants.map((variant: ISortVariant) => {
                        return <MenuItem key={variant} value={variant}>{variant}</MenuItem>
                    })
                }
            </Select>
        </AccordionDetails>
    </Accordion>
}