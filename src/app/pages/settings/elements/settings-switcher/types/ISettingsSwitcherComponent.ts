export interface ISettingsSwitcherComponent {
    checked: boolean;
    label: string;
    onChange: (value: boolean) => void;
}