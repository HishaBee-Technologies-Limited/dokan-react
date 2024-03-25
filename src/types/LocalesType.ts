import { LOCALES_TYPE } from '@/config/locales';

export type LocalesType = (typeof LOCALES_TYPE)[keyof typeof LOCALES_TYPE];

export type ILanguageType = { id: number; label: string; value: LocalesType };
