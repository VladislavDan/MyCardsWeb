import React, {FC} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import {ICircularProgressComponent} from "./types/ICircularProgressComponent";

export const CircularProgressComponent: FC<ICircularProgressComponent> = ({percent}) => {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" value={percent}/>
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    percent,
                )}%`}</Typography>
            </Box>
        </Box>
    );
};
