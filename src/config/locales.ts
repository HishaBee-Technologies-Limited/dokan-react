import { locales } from "@/navigation";

export type ILanguageType = { id: number, label: string, value: typeof locales[0] | typeof locales[1] }
export const languages: ILanguageType[] = [
    { id: 1, label: 'English', value: locales[0] },
    { id: 2, label: 'Bangla', value: locales[1] }
]