'use client';
import React from 'react';
import { useRouter, usePathname } from '@/navigation';

import { Button } from '@/components/ui/button';
import { PageSubTitle, Text } from '@/components/common/text';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { languages, LOCALES_TYPE } from '@/config/locales';
import { ILanguageType } from '@/types/LocalesType';

const LanguagePage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (value: ILanguageType['value']) => {
    router.push(pathname, { locale: value });
  };

  return (
    <div className="space-y-space16">
      <PageSubTitle title="Language" />

      <div className="max-w-[50rem]">
        <div className="flex justify-between gap-space12 pb-space16 border-b border-color">
          <article>
            <Text
              title="Language"
              variant="secondary"
              className="font-semibold mb-space8"
            />
            <Text
              title="Printer Language show"
              variant="secondary"
              className="font-medium text-sm"
            />
          </article>

          <Select
            onValueChange={handleLanguageChange}
            defaultValue={LOCALES_TYPE.EN}
          >
            <SelectTrigger className="min-w-[14rem] max-w-max h-[4.8rem] dark:border- border-color dark:bg-primary-90 gap-space8 dark:text-text400">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-space12 mt-space16">
          <Button variant={'secondary'} className="!px-space40">
            Cancel
          </Button>
          <Button className="!px-space40">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default LanguagePage;
