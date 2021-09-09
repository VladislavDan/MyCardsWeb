import React, {FC} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

interface ICircularProgressComponent {
    percent: number
}
