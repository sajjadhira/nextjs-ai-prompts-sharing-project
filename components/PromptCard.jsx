'use client';

import { useState} from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({prompt, handleTagClick, handleEdit, handleDelete}) => {

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [Copied, setCopied] = useState("");  
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(prompt.prompt);
    setTimeout(() => {
      setCopied("");
    }, 2000);
  }
  return (
    <div className='prompt_card'>
      <div className="flex justify-between gap-5 item-start">
        <div className="flex items-center justify-start flex-1 gap-3 cursor-pointer">

{prompt?.creator ? (
  <div className="flex items-center">
    <Image
      src={prompt.creator.image}
      alt={prompt.creator.username}
      width={40}
      height={40}
      className="object-contain rounded-full"
    />
    <div className="flex flex-col ml-2">
      <h3 className="font-semibold text-gray-900 font-satoshi">{prompt.creator.name}</h3>
      <p className="text-sm text-gray-500 font-inter">@{prompt.creator.username}</p>
    </div>
  </div>
) : (
  <div className="flex items-center">
    <Image
      src="/assets/images/logo.svg"
      alt="Promption"
      width={40}
      height={40}
      className="object-contain rounded-full"
    />
    <div className="flex flex-col ml-2">
      <h3 className="font-semibold text-gray-900 font-satoshi">Promption</h3>
      <p className="text-sm text-gray-500 font-inter">@promption</p>
    </div>
  </div>
)}



        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={Copied === prompt.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt="Copy"
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className='my-4 text-sm text-gray-700 font-satoshi'>{prompt.prompt}</p>
      <p className='text-sm cursor-pointer font-inter blue_gradient'
     
      >{
        prompt.tag.split(',').length > 0 ? prompt.tag.split(',').map((tag, index) => (
          <span key={index} className='tag'  onClick={() => handleTagClick ? handleTagClick(tag) : null}>#{tag.replace(/\s/g, '')} </span>
        )) : <span className='tag' onClick={() => handleTagClick ? handleTagClick(prompt.tag) : null}>#{prompt.tag.replace(/\s/g, '')}</span>
        }</p>


      {session?.user.id === prompt?.creator?._id && pathName === "/profile" && (
        <div className='gap-4 pt-3 mt-5 border-t border-gray-100 flex-center'>
          <p
            className='text-sm cursor-pointer font-inter green_gradient'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='text-sm cursor-pointer font-inter orange_gradient'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard