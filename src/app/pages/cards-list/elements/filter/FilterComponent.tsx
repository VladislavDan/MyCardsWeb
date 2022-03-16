import {
    Accordion,
    AccordionDetails,
    AccordionSummary, TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ChangeEvent, default as React, FC} from "react";

export const FilterComponent: FC<IFilterComponent> = ({onChangeSearchableText}) => {

    const onChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChangeSearchableText(event.target.value);
    };

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
                onChange={onChange}
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
            <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
        </AccordionDetails>
    </Accordion>
}

interface IFilterComponent {
    onChangeSearchableText: (answer: string) => void;
}