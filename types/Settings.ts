import { SettingsProps } from './Navigation';

export type RadioButtonsProps = {
  selectedId: string,
  setSelectedId: (value: string) => void,
};

export type SettingsScreenProps = SettingsProps & RadioButtonsProps;
