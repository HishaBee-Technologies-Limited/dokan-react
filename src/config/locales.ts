import { ILanguageType } from '@/types/LocalesType';

export const LOCALES_TYPE = {
  EN: 'en',
  BN: 'bn',
} as const;

export const locales = [LOCALES_TYPE.EN, LOCALES_TYPE.BN] as const;

export const languages: ILanguageType[] = [
  { id: 1, label: 'English', value: LOCALES_TYPE.EN },
  { id: 2, label: 'Bangla', value: LOCALES_TYPE.BN },
];
