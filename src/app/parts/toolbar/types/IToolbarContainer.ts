import {ToolbarService} from "../ToolbarService";
import {NavigationPanelService} from "../../navigation-panel/NavigationPanelService";

export interface IToolbarContainer {
    toolbarService: ToolbarService;
    navigationPanelService: NavigationPanelService;
}