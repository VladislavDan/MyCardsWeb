import * as React from "react";
import {FC} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

import './StatisticComponent.css'
import {IStatisticComponent} from "./types/IStatisticComponent";
import {RemoveButtonComponent} from "./elements/RemoveButtonComponent";

export const StatisticComponent: FC<IStatisticComponent> = ({rows, onRemoveStatistic}) => {
    return <>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Done</TableCell>
                        <TableCell>In Progress</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.date}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.done}</TableCell>
                            <TableCell>{row.inProgress}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <RemoveButtonComponent onClick={onRemoveStatistic}/>
    </>
}