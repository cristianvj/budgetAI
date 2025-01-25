'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ID } from 'node-appwrite';
import { createAdminClient, createSessionClient } from '../appwrite';

import { parseStringify } from '../utils';

/* const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env; */


export const signIn = async ({email, password}: SignInProps) => {
 try {
    const { account } = await createAdminClient();
    const user = await account.createEmailPasswordSession(email, password);

    const cookieStore = await cookies();
    cookieStore.set('appwrite-session', user.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return parseStringify(user);
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};

export const signUp = async ({password, ...userData}: SignUpParams) => {
  const { email, firstName, lastName } = userData;
  try {
    const { account } = await createAdminClient();
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`,
    );

    const session = await account.createEmailPasswordSession(email, password);

    const cookieStore = await cookies();
    cookieStore.set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    console.log('error: ', error);
    return null;
  }
}

export async function signOut() {
  const { account } = await createSessionClient();

  (await cookies()).delete('my-custom-session');
  await account.deleteSession('current');

  redirect('/sign-in');
}