import * as React from 'react';
import {FC, ReactElement, useContext, useEffect} from 'react';
import {GoogleAuthManager} from './GoogleAuthManager';

export const GoogleAuthComponent= ({manager}: GoogleAuthComponentProps): ReactElement => {

    useEffect(() => {

        return () => {

        }
    });

    return <h1>Привет</h1>;
};

interface GoogleAuthComponentProps {
    manager: GoogleAuthManager
}
