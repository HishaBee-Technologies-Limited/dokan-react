import GivePin from '@/components/auth/GivePin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Pin() {
  const cookie = cookies().get('mobile_number');
  console.log(cookie);
  if (!cookie?.value) {
    redirect('/auth');
  }
  return (
    <main>
      <GivePin mobile_number={cookie?.value} />
    </main>
  );
}
