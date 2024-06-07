'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';


const ProfilePage = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const [prompts, setPrompts] = useState([]);
    useEffect(() => {
        if(!session){
            router.push('/');
        }
    }, [session]);

    const handleEdit = () => {
        console.log('Edit');
    }

    const handleDelete = () => {
        console.log('Delete');
    }

    
  useEffect(() => {
    // Fetch data from API
    const fetechPrompt = async () => {
      try {
        let response = await fetch(`api/users/${session?.user.id}/prompts`);
        if(response.ok) {
          let data = await response.json();

          setPrompts(data);
        }
      }
      catch(error) {
        console.error(error);
      }
    }

    if (session?.user.id) fetechPrompt();
  }, [])

  return (
    <div>
        <Profile
        name={session?.user.name}
        desc="I am a full stack developer"
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
         />
    </div>
  )
}

export default ProfilePage