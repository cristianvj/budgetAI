'use client';

import React from 'react';
import { signOut } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const MainContainer = () => {
	const handleSignOut = async () => {
		await signOut();
		redirect('/sign-in');
	};

	return (
		<>
			<h1>Dashboard</h1>
			<button onClick={handleSignOut}>Sign out</button>
		</>
	);
};

export default MainContainer;