import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Box from '../Box';
import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

function Communities(props) {
  const [communities, setCommunities] = useState([]);
  const [title, setTitle] = useState([]);
  const [image, setImage] = useState([]);
  const [link, setLink] = useState([]);

  useEffect(() => {
    // GraphQL: Buscando dados cadastrados no datoCMS
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '35ceaa0fb1d1bf0fe2c7cf65bdc38b',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query" : `query {
          allCommunities {
            id
            title
            imageUrl
            link
            creatorSlug
            createdAt
          }
      }` })
    })
    .then((response) => response.json())
    .then((fullResponse) => {
      const communities = fullResponse.data.allCommunities;
      setCommunities(communities)
    })
  }, []);
  
  function handleCreateCommunity(e) {
    e.preventDefault();
    
    var formData = new FormData(e.target);
  
    const community = {
      // id: new Date().toISOString(),
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      link: formData.get('link'),
      creatorSlug: githubUser,
    }
  
    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(community)
    })
    .then(async (response) => {
      const data = await response.json();
  
      const community = data.registerCreated;
      const updateCommunities = [...communities, community];
      setCommunities(updateCommunities);
      setTitle('');
      setImage('');
      setLink('');
    })
  }

  return (
    <>
    <Box>
      <h2 className='subTitle'>Quais são suas comunidades?</h2>
      <form onSubmit={handleCreateCommunity}>
        <div>
          <input 
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Nome da sua comunidade' 
            name='title' 
            aria-label='Nome da sua comunidade' 
          />
        </div>

        <div>
          <input 
            value={image}
            onChange={e => setImage(e.target.value)}
            placeholder='URL de uma imagem para usarmos de capa' 
            name='image' 
            aria-label='URL de uma imagem para usarmos de capa' 
          />
        </div>

        <div>
          <input 
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder='URL de acesso da comunidade' 
            name='link' 
            aria-label='URL de acesso da comunidade' 
          />
        </div>

        <button>
          Criar comunidade
        </button>
      </form>
    </Box>

    <Box>
      <ProfileRelationsBoxWrapper >
        <h2 className='smallTitle'>
          Comunidades ({communities.length})
        </h2>

        <ul>
          {communities.map((item) => {
            return (
              <li key={item.id}>
                <a href={item.link} target='_blank'>
                  <img src={item.imageUrl} />
                  <span>{item.title}</span>
                </a>
              </li>
            )
          }).splice(0, 6)}
        </ul>
        
        <span>
          <Link href='/communities'>Ver todos</Link>
        </span>
      </ProfileRelationsBoxWrapper>
    </Box>
    </>
  )
}

export default Communities;