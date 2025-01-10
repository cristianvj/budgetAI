'use client';

import { signOut } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Page;