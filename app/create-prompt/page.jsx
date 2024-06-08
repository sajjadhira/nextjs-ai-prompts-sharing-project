'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const CreatePrompt = () => {
const router = useRouter();
const  {data: session} = useSession();
const [submitting, setSubmitting] = useState(false)
const [post, setPost] = useState({
    prompt: '',
    tag : '',
})

const submitPrompt = async(e) => {
    e.preventDefault();
    setSubmitting(true);

    try{

        let response = await fetch('/api/prompt/new', {
            method: 'POST',
            body: JSON.stringify({
                userId: session?.user.id,
                prompt: post.prompt,
                tag: post.tag,
            })
        });

        if(response.ok){
            router.push('/profile');
        }

    }
    catch(error) {
        console.error(error);
    }
    finally {
        setSubmitting(false);
    }
}

  return (
    <div>
        <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={submitPrompt}
         />
    </div>
  )
}

export default CreatePrompt