'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function AuthForm({type}: Readonly<{type: string}>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = authFormSchema(type);

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  console.log(type);

  return (
    <div className='flex flex-col w-full items-center'>
      <h1 className="mb-2 text-3xl font-extrabold text-center lg:hidden">💰Budget AI</h1>
      <Card className="w-full max-w-md mt-3">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{type === 'sign-in' ? 'Iniciar Sesión' : 'Registro'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="space-y-4">
              {type === 'sign-up' && (
                  <>
                    <div className="flex gap-4">
                      <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                      <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' />
                    </div>
                    <CustomInput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                    <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' />
                    <div className="flex gap-4">
                      <CustomInput control={form.control} name='state' label="State" placeholder='Example: NY' />
                      <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                    </div>
                    <div className="flex gap-4">
                      <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                      <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                    </div>
                  </>
                )}
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
                  {type === 'sign-in' ? 'Inicia Sesión' : 'Registrarse'}
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
                  {type === 'sign-in' ? 'Inicia sesión con Google' : 'Regístrate con Google'  }
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center pt-4">
          <p className="text-sm text-gray-600">
            {type === 'sign-in' ? '¿Aún no tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
            <Link className="font-medium text-primary hover:underline" href={type === 'sign-in' ? '/sign-up' : 'sign-in'}  >
            {type === 'sign-in' ? 'Regístrate' : 'Iniciar Sesión'}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}