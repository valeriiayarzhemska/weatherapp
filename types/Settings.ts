import { SettingsProps } from './Navigation';

type RadioButtonsProps = {
  selectedId: string,
  setSelectedId: () => void,
};

export type SettingsScreenProps = SettingsProps & RadioButtonsProps;
