import OTPVerify from '@/components/auth/OTPVerify';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  const cookie = cookies().get('mobile_number');
  if (!cookie?.value) {
    redirect('/auth');
  }
  return (
    <main>
      <OTPVerify mobile_number={cookie?.value} />
    </main>
  );
}
