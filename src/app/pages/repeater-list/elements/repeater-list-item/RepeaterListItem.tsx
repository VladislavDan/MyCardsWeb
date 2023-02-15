import React, {FC} from 'react';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import ListItem from '@mui/material/ListItem';

import {IRepeaterListItem} from './types/IRepeaterListItem';
import './RepeaterListItem.css';
import {ListItemMenuComponent} from '../../../../common/elements/list-item-menu/ListItemMenuComponent';
import {
    CircularProgressComponent
} from '../../../cards-groups-list/elements/circular-progress/CircularProgressComponent';
import {IMenuSetupItem} from '../../../../common/elements/list-item-menu/types/IMenuSetupItem';
import {Chip, Stack} from '@mui/material';
import {getRandomColor} from '../../../../common/logic/getRandomColor';

export const RepeaterListItem: FC<IRepeaterListItem> = (
    {
        repeater,
        onStartRepeating,
        onDeleteRepeater,
        onResetProgress,
        onEditItem
    }
) => {

    const menuSetup: IMenuSetupItem[] = [
        {
            fieldName: 'Edit',
            handler: () => {
                onEditItem(repeater.id);
            }
        },
        {
            fieldName: 'Delete',
            handler: () => {
                onDeleteRepeater(repeater.id);
            }
        },
        {
            fieldName: 'Reset progress',
            handler: () => {
                onResetProgress(repeater.id);
            }
        }
    ];

    return <ListItem key={repeater.id} button component="div">
        <ListItemIcon onClick={() => onStartRepeating(repeater.id)}>
            <CircularProgressComponent percent={repeater.percentRepeatedCards || 0}/>
        </ListItemIcon>
        <ListItemText
            className="repeater-list-item_content"
            primary={repeater.name}
            secondary={<Stack className="repeater-list-item_tag-container" direction="row">
                {repeater.groupsNames?.map((groupName) => {
                    const color = getRandomColor();
                    return <Chip
                        className="repeater-list-item_tag"
                        label={groupName}
                        size="small"
                        variant="outlined"
                        style={{color, borderColor: color}}
                    />
                })}
            </Stack>}
            onClick={() => onStartRepeating(repeater.id)}
        />
        <ListItemIcon>
            <ListItemMenuComponent menuSetup={menuSetup}/>
        </ListItemIcon>
    </ListItem>
}