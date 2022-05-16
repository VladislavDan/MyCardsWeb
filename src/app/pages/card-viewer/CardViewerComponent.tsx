import React, {FC} from "react";

import {CardsContentComponent} from "../../common/elements/cards-content/CardsContentComponent";
import {ICardsContentComponent} from "../../common/elements/cards-content/types/ICardsContentComponent";

export const CardViewerComponent: FC<ICardsContentComponent> = (props) => {

    return <div className="cards-viewer">
        <CardsContentComponent {...props}/>
    </div>
};