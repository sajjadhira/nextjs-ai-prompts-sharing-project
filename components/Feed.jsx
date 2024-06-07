'use client';

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
     {
      data.map((prompt, index) => {
        return (
          <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
          />
        )
      })
     }
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [Prompts, setPrompts] = useState([])
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  }

  useEffect(() => {
    // Fetch data from API
    const fetechPrompt = async () => {
      try {
        let response = await fetch('/api/prompt');
        if(response.ok) {
          let data = await response.json();
          setPrompts(data);
        }
      }
      catch(error) {
        console.error(error);
      }
    }

    fetechPrompt();
  }, [])

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input type="text"
        placeholder='Search for prompts'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>

      <PromptCardList
      data={Prompts}
      handleTagClick={() => {}}
       />
    </section>
  )
}

export default Feed