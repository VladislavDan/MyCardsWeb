import React, {FC} from "react";

import {ICardPrimaryTextComponent} from "./types/ICardPrimaryTextComponent";
import './CardPrimaryTextComponent.css'

export const CardPrimaryTextComponent: FC<ICardPrimaryTextComponent> = ({card}) => {
    return <div className="card-primary-text">
        <p className="card-primary-text_title">
            {card.question}
        </p>
        <p className="card-primary-text_content">
            {card.answer}
        </p>
    </div>
}