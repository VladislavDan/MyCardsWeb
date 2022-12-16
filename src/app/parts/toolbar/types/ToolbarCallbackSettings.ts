import {ICallbackSettings} from '../../../../MyTools/react-types/ICallbackSettings';
import {INavigationState} from '../../../common/types/INavigationState';
import {IAppContext} from '../../../common/types/IAppContext';
import {IToolbarContainer} from './IToolbarContainer';
import {ToolbarContainerState} from './ToolbarContainerState';

export type ToolbarCallbackSettings = ICallbackSettings<ToolbarContainerState,
    IToolbarContainer,
    INavigationState,
    IAppContext>