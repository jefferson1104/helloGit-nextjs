import React, { useState, useEffect } from 'react';

import MainGrid from '../components/MainGrid';
import Box from '../components/Box';

import Menu from '../components/Menu';
import ProfileSidebar from '../components/ProfileSidebar';
import Followers from '../components/Followers';
import Following from '../components/Following';

import { OrkutNostalgicIconSet } from '../lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations';

export default function Home() {
  const githubUser = 'jefferson1104';
  const [communities, setCommunities] = useState([]);

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
    
    const formData = new FormData(e.target);

    const community = {
      // id: new Date().toISOString(),
      title: formData.get('title'),
      imageUrl: formData.get('image'),
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
      // console.log(data);

      const community = data.registerCreated;
      const updateCommunities = [...communities, community];
      setCommunities(updateCommunities);
    })
  }

  return (
    <>
      <Menu githubUser={githubUser} />
      <MainGrid>
        <div className='profileArea' style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
      
        <div className='welcomeArea' style={{gridArea: 'welcomeArea'}}>
          <Box >
            <h1 className='title'>
              Bem vindo, {githubUser}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
            
              <div>
                <input 
                  placeholder='Qual vai ser o nome da sua comunidade?' 
                  name='title' 
                  aria-label='Qual vai ser o nome da sua comunidade?' 
                />
              </div>

              <div>
                <input 
                  placeholder='Coloque uma URL para usarmos de capa' 
                  name='image' 
                  aria-label='Coloque uma URL para usarmos de capa' 
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className='profileRelationsArea' style={{gridArea: 'profileRelationsArea'}}>
          <Following />
          <Followers />
          <ProfileRelationsBoxWrapper >
            <h2 className='smallTitle'>
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/communities/${item.id}`}>
                      <img src={item.imageUrl} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              }).splice(0, 6)}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
