'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';


const ProfilePage = () => {
    const {data: session} = useSession();
    const router = useRouter();
    useEffect(() => {
        if(!session){
            router.push('/');
        }
    }, [session]);
  return (
    <div>
        <Profile
        name={session?.user.name}
         />
    </div>
  )
}

export default ProfilePage