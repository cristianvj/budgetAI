import MainContainer from '@/components/dashboard/MainContainer';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const Page = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return redirect('/sign-in');

  return (
    <div>
      <MainContainer />
    </div>
  );
};

export default Page;