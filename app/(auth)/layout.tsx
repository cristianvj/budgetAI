// import Image from 'next/image';

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <main className='flex min-h-screen flex-col lg:flex-row'>
      {/* Image Section */}
      <div className="relative flex-1 w-500">
        {/* <Image
          src="/img/auth-image.svg"
          alt="Login background"
          width={500}
          height={500}
          priority
        /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-700/60 to-green-800/20" />
        <div className="absolute bottom-2 lg:bottom-12 left-6 max-w-md text-white">
          <h1 className="mb-2 text-3xl font-extrabold ">💰Budget AI</h1>
          <p className="text-base">Esta es una aplicación financiera de vanguardia impulsada por IA para ayudarlo a administrar su presupuesto, realizar un seguimiento de los gastos y alcanzar sus objetivos financieros sin esfuerzo.</p>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        {children}
      </div>
    </main>
  );
}