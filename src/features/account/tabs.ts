export type TabKey = 'info' | 'services' | 'portfolio' | 'settings';

export interface TabConfig {
  label: string;
  icon: string;
  key: TabKey;
}

export const tabs: TabConfig[] = [
  { label: 'Персональні дані', icon: 'icon-acc-data', key: 'info' },
  { label: 'Категорія послуг', icon: 'icon-acc-services', key: 'services' },
  { label: 'Портфоліо', icon: 'icon-acc-portfolio', key: 'portfolio' },
  { label: 'Налаштування', icon: 'icon-acc-settings', key: 'settings' },
];
