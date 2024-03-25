import GiveNumber from '@/components/auth/GiveNumber';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('Index');
  return (
    <main>
      <GiveNumber />
    </main>
  );
}
