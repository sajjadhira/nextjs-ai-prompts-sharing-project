'use client';

import { useState} from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({prompt, handleTagClick, handleEdit, handleDelete}) => {

  const [Copied, setCopied] = useState("");  
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(prompt.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  }
  return (
    <div className='prompt_card'>
      <div className="flex justify-between item-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">

{prompt?.creator ? (
  <div className="flex items-center">
    <Image
      src={prompt.creator.image}
      alt={prompt.creator.username}
      width={40}
      height={40}
      className="rounded-full object-contain"
    />
    <div className="flex flex-col ml-2">
      <h3 className="font-satoshi font-semibold text-gray-900">{prompt.creator.name}</h3>
      <p className="font-inter text-sm text-gray-500">@{prompt.creator.username}</p>
    </div>
  </div>
) : (
  <div className="flex items-center">
    <Image
      src="/assets/images/logo.svg"
      alt="Promptopia"
      width={40}
      height={40}
      className="rounded-full object-contain"
    />
    <div className="flex flex-col ml-2">
      <h3 className="font-satoshi font-semibold text-gray-900">Promptopia</h3>
      <p className="font-inter text-sm text-gray-500">@promptopia</p>
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
      <p className='my-4 font-satoshi text-sm text-gray-700'>{prompt.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer'
      onClick={() => handleTagClick ? handleTagClick(prompt.tag) : null}
      >{prompt.tag}</p>
    </div>
  )
}

export default PromptCard