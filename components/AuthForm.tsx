'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

export default function AuthForm({type}: {type: string}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  console.log(type);

  return (
    <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle className="text-2xl text-center">Inicia Sesión</CardTitle>
    </CardHeader>
    <CardContent>
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" required type="password" />
          </div>
          <Button className="w-full" type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Inicia Sesión
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O continúa con: 
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" className="w-full">
            <FcGoogle className="mr-2 h-4 w-4" />
            Inicia sesión con Google
          </Button>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-center pt-4">
      <p className="text-sm text-gray-600">
        ¿Aún no tienes una cuenta?{' '}
        <Link className="font-medium text-primary hover:underline" href={'/sign-out'}  >
          Regístrate
        </Link>
      </p>
    </CardFooter>
  </Card>
  );
}