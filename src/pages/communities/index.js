import React, { useState, useEffect } from 'react';
import { getSession } from "next-auth/client";

import Menu from '../../components/Menu';
import Box from '../../components/Box';

import { CommunitiesPage, CommunitiesContent } from '../../styles/CommunitiesStyles';

export default function PageCommunities({ session }) {
  const githubUser = session.user.name;
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

  return (
    <>
      <Menu githubUser={githubUser} />
      <CommunitiesPage>
        <div className='profileArea' style={{gridArea: 'profileArea'}}>
          <Box>
            <h1 className='Title'>
              Comunidades ({communities.length})
              <hr />
            </h1>
          </Box>
        </div>

        <div className='welcomeArea' style={{gridArea: 'welcomeArea'}}>
          <CommunitiesContent>
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
              }).splice(0, 12)}
            </ul>
          </CommunitiesContent>
        </div>
      </CommunitiesPage>
    </>
  )
}

// Pegando os dados da session antes de renderizar a pagina.
export const getServerSideProps = async (context) => {
  const {req, res} = context;
  const session = await getSession({ req })

  if(!session) {
    res.writeHead(302, {
      Location: "/signin",
    });
    res.end()
    return;
  }

  return {
    props: {
      session
    }
  }
}