import React, {FC} from "react";
import {FixedSizeList as List} from "react-window";

import './RepeaterListComponent.css'
import {AddButtonComponent} from "../../common/elements/add-button/AddButtonComponent";
import {IRepeaterListComponent} from "./types/IRepeaterListComponent";
import {RepeaterListItem} from "./elements/repeater-list-item/RepeaterListItem";

export const RepeaterListComponent: FC<IRepeaterListComponent> = (
    {
        repeaters,
        height,
        onOpenEditor,
        onStartRepeating,
        onDeleteRepeater,
        onEditRepeater,
        onResetProgress
    }
) => {
    return <>
        <List
            className="repeater-list"
            itemData={repeaters}
            itemSize={55}
            itemCount={repeaters.length}
            overscanCount={5}
            height={height}
            width="100%"
        >
            {({index, style}: any) => {
                return <div style={style}>
                    <RepeaterListItem
                        repeater={repeaters[index]}
                        onStartRepeating={onStartRepeating}
                        onDeleteRepeater={onDeleteRepeater}
                        onEditItem={onEditRepeater}
                        onResetProgress={onResetProgress}
                    />
                </div>
            }}
        </List>
        <AddButtonComponent onClick={onOpenEditor}/>
    </>
}