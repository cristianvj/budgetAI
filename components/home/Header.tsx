'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const handleLogin = () => {
    router.push('sign-in');
  };
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold">💰BudgetAI</span>
        </div>
        <nav>
          <Button variant="default" size="lg" onClick={handleLogin}>Comienza Ahora</Button>
        </nav>
      </div>
    </header>
  );
}

