import React from 'react';
import Link from 'next/link';

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>
          {type} Prompt
        </span>
        </h1>

        <p className="desc text-center max-w-md mt-3 mb-3">
          {type} a prompt to get started
        </p>

        <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-7 w-full max-w-2xl glassmorphism"
        >
          <label htmlFor="prompt">
            <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
            </span>

            <textarea 
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt: e.target.value})}
            placeholder='Write your prompt here'
            className='form_textarea'
            required
            />
          </label>
          <label htmlFor="tag">
            <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag {' '}
             <span className='font-normal'>#product, #webdevelopment, #idea</span>
            </span>

            <input 
            value={post.tag}
            onChange={(e) => setPost({...post, tag: e.target.value})}
            placeholder='#tag'
            className='form_input'
            required
            />
          </label>


          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className='outline_btn'>
              Cancel
            </Link>

            <button 
            type='submit'
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
            disabled={submitting}
            >
              {submitting ? `${type}ing...` : type}
            </button>
          </div>

        </form>
    </section>
  )
}

export default Form