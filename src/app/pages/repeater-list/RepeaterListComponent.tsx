import React, {FC} from "react";
import {FixedSizeList as List} from "react-window";

import './RepeaterListComponent.css'
import {AddButtonComponent} from "../../common/elements/add-button/AddButtonComponent";
import {IRepeaterListComponent} from "./types/IRepeaterListComponent";

export const RepeaterListComponent: FC<IRepeaterListComponent> = (
    {repeaters, height, onOpenEditor}
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
                return <div style={style}>{repeaters[index].name}</div>
            }}
        </List>
        <AddButtonComponent onClick={onOpenEditor}/>
    </>
}