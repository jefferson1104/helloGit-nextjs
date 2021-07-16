import React, { useState, useEffect } from 'react';
import MainGrid from '../components/MainGrid';
import Box from '../components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations';
import { checkPropTypes } from 'prop-types';

function ProfileSidebar(props) {
  return (
    <Box as='aside'>
      <img src={`https://github.com/${props.githubUser}.png`} alt="Jefferson Soares" style={{borderRadius: '8px'}} />
      <hr />

      <p>
        <a className='boxLink' href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper >
      <h2 className='smallTitle'>
        {props.title} ({props.followers.length})
      </h2>

      <ul>
        {props.followers.map((item) => {
          return (
            <li key={item.id}>
              <a href={item.html_url}>
                <img src={item.avatar_url} />
                <span>{item.login}</span>
              </a>
            </li>
          )
        }).slice(0, 6)}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'jefferson1104';
  const friends = ['willianjusten', 'omariosouto', 'peas', 'loiane', 'andersonluizpereira', 'filipedeschamps'];
  const [communities, setCommunities] = useState([]);

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    // REST: Buscando dados da api do github
    fetch('https://api.github.com/users/peas/followers')
    .then(function (serverResponse) {
      return serverResponse.json();
    })
    .then(function (fullResponse) {
      setFollowers(fullResponse);
    })

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

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className='profileArea' style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
      
        <div className='welcomeArea' style={{gridArea: 'welcomeArea'}}>
          <Box >
            <h1 className='title'>
              Bem vindo
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
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
            }}>
            
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
          <ProfileRelationsBox title='Seguidores' followers={followers}/>

          <ProfileRelationsBoxWrapper >
            <h2 className='smallTitle'>
              Amigos ({friends.length})
            </h2>

            <ul>
              {friends.map((item) => {
                return (
                  <li key={item}>
                    <a href={`/users/${item}`}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              }).splice(0, 6)}
            </ul>
          </ProfileRelationsBoxWrapper>

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
