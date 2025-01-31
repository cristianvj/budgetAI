/* eslint-disable no-prototype-builtins */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (type: string) => z.object({
  // sign up
  firstName: type === 'sign-in' 
    ? z.string().optional() 
    : z.string({
        required_error: 'El nombre es requerido'
      })
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(200, 'El nombre debe tener máximo 200 caracteres'),
  lastName: type === 'sign-in' 
    ? z.string().optional()
    : z.string({
        required_error: 'El apellido es requerido'
      })
      .min(3, 'El apellido debe tener al menos 3 caracteres')
      .max(200, 'El apellido debe tener máximo 200 caracteres'),
  address: type === 'sign-in' 
    ? z.string().optional() 
    : z.string({
        required_error: 'La dirección es requerida'
      }).max(300, 'La dirección debe tener máximo 300 caracteres'),
  city: type === 'sign-in' 
    ? z.string().optional() 
    : z.string({
      required_error: 'La ciudad es requerida'
    }).max(50, 'La ciudad debe tener máximo 50 caracteres'),
  state: type === 'sign-in' 
    ? z.string().optional() 
    : z.string({
      required_error: 'El estado es requerido'
    })
    .min(2, 'El estado debe tener al menos 2 caracteres')
    .max(50, 'El estado debe tener máximo 50 caracteres'),
  postalCode: type === 'sign-in' 
    ? z.string().optional() 
    : z.string({
      required_error: 'El código postal es requerido'
    })
    .min(3)
    .max(6, 'El código postal debe tener al menos 3 caracteres y máximo 6'),
  dateOfBirth: type === 'sign-in' 
    ? z.string().optional() 
    : z.string({
      required_error: 'La fecha de nacimiento es requerida'
    })
    .min(3, 'La fecha de nacimiento debe tener al menos 3 caracteres')
    .max(100, 'La fecha de nacimiento debe tener máximo 50 caracteres'),
  ssn: type === 'sign-in' 
    ? z.string().optional() 
    : z.string({
      required_error: 'El número de documento es requerida'
    })
    .min(3, 'El número de documento debe tener al menos 3 caracteres')
    .max(50, 'El número de documento debe tener máximo 50 caracteres'),
  // both
  email: z.string().email({
    message: 'El email es inválido'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida',
  }).min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export const parseStringify = (value: unknown) => JSON.parse(JSON.stringify(value));