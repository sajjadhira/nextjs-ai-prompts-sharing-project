'use client';

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick, searchText}) => {
  return (
    <div className="mt-16 prompt_layout">
     {
      data.map((prompt, index) => {
        return (
          <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
          searchText={searchText}
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
        let endpoint = '/api/prompt';
        if(searchText && searchText.length > 0) {
          endpoint = `/api/prompt?q=${searchText}`;
        }
        let response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
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
  }, [searchText])


  const onClickTag = (e) => {
    setSearchText(e);
  }

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
      handleTagClick={onClickTag}
      searchText={searchText}
       />
    </section>
  )
}

export default Feed