import { redirect } from 'next/navigation';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import Image from 'next/image';
import { Toaster } from '@/components/ui/toaster';

const RootLayout = async ({children}: Readonly<{children: React.ReactNode}>) => {
  const loggedIn = await getLoggedInUser();
  if(loggedIn) return redirect('/dashboard');

  return (
    <main className='flex h-screen flex-col lg:flex-row'>
      {/* Image Section */}
        <div className="relative flex-1 w-500 hidden lg:block">
          <Image
            src="/img/auth-image.svg"
            alt="Login background"
            width={400}
            height={300}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-green-800/20" />
          <div className="absolute bottom-2 lg:bottom-12 left-6 max-w-2xl mr-3 text-white">
            <h1 className="mb-2 text-3xl font-extrabold ">💰BudgetAI</h1>
            <p className="text-lg">Esta es una aplicación financiera de vanguardia impulsada por IA para ayudarlo a administrar su presupuesto, realizar un seguimiento de los gastos y alcanzar sus objetivos financieros sin esfuerzo.</p>
          </div>
        </div>

      {/* Login Form Section */}
      <div className="flex flex-1 items-center justify-center">
        {children}
      </div>

      {/* Toaster Section */}
      <Toaster />
    </main>
  );
};

export default RootLayout;