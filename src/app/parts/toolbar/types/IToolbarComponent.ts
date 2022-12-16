import {MouseEventHandler} from 'react';

export interface IToolbarComponent {
    pageLabel: string;
    onClick: MouseEventHandler;
    cardsCount: number;
}