'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { ID, OAuthProvider, Query } from 'node-appwrite';
import { createAdminClient, createSessionClient } from '../appwrite';

import { parseStringify } from '../utils';

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    );

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

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

  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`,
    );

    if(!newUserAccount) throw new Error('Error creating user');

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
      }
    );

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.log('error: ', error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();
    let user;
    if (result) {
      user = await getUserInfo({ userId: result.$id });
    }

    if (!user) {
      user = {
        $id: result.$id,
        email: result.email,
        name: result.name,
      };
    }
    return parseStringify(user);
  } catch (error) {
    console.log('error: ', error);
    return null;
  }
}

export async function signOut() {
  const { account } = await createSessionClient();

  (await cookies()).delete('appwrite-session');
  await account.deleteSession('current');

  redirect('/sign-in');
}

export async function signUpWithGoogle() {
  const { account } = await createAdminClient();

  const origin = (await headers()).get('origin');
  
	const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/api/oauth`,
    `${origin}/sign-in`
  );

	redirect(redirectUrl);
}