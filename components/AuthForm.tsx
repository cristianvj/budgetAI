'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { signIn, signUp } from '@/lib/actions/user.actions';

import CustomInput from './CustomInput';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { authFormSchema } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';

export default function AuthForm({type}: Readonly<{type: string}>) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = authFormSchema(type);

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {   
      if(type === 'sign-up') {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password
        };
        const newUser = await signUp(userData);
        if (newUser) router.push('/dashboard');
      };

      if(type === 'sign-in') {
        /* const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if(response) router.push('/'); */
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full items-center h-full overflow-hidden'>
      <div className="overflow-y-auto h-full w-full p-6 lg:p-12 flex justify-center flex-col items-center">
      <h1 className="mt-6 text-3xl font-extrabold text-center lg:hidden">💰BudgetAI</h1>
        <Card className={`w-full max-w-md mt-3 ${type === 'sign-up' ? 'lg:mt-40' : ''} max-h-max`}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">{type === 'sign-in' ? 'Iniciar Sesión' : 'Registro'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                {type === 'sign-up' && (
                    <>
                      <div className="flex gap-4">
                        <CustomInput control={form.control} name='firstName' label="Nombres" placeholder='Ingresa tu nombre' />
                        <CustomInput control={form.control} name='lastName' label="Apellidos" placeholder='Ingresa tu apellido' />
                      </div>
                      <CustomInput control={form.control} name='address1' label="Dirección" placeholder='Ingresa una dirección específica' />
                      <CustomInput control={form.control} name='city' label="Ciudad" placeholder='Ingresa tu ciodad' />
                      <div className="flex gap-4">
                        <CustomInput control={form.control} name='state' label="Estado o Departamento" placeholder='Ejemplo: NY' />
                        <CustomInput control={form.control} name='postalCode' label="Código postal" placeholder='Ejemplo: 11101' />
                      </div>
                      <div className="flex gap-4">
                        <CustomInput control={form.control} name='dateOfBirth' label="Fecha de nacimiento" placeholder='YYYY-MM-DD' />
                        <CustomInput control={form.control} name='ssn' label="Documento o ID" placeholder='Ejemplo: 1234' />
                      </div>
                    </>
                  )}
                  <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />
                  <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />

                  <Button className="w-full" type="submit" disabled={isLoading}>
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
    </div>
  );
}