import React, { useState, useEffect } from 'react';
import { getSession } from "next-auth/client";


import api from '../../services/api';

import Menu from '../../components/Menu';
import Box from '../../components/Box';

import { FollowersPage, FollowersContent } from '../../styles/FollowersStyles';

export default function PageFollowers({ session , data }) {
  // const [followers, setFollowers] = useState([data]);
  // const [currentPage, setCurrentPage] = useState(1);

  const githubUser = session.user.name;
  const followers = data;

  /*
  useEffect(() => {
    async function loadData() {
      const response = await api.get(`users/${githubUser}/followers?per_page=12&page=${currentPage}&order=DESC`);

      const newFollowers = response.data;

      if(followers.length > 0 ) {
        let oldFollowers = followers;
        oldFollowers.push(...newFollowers);
  
        setFollowers(oldFollowers);
      } else {
        setFollowers(newFollowers);
      }
    }

    loadData();
  }, [currentPage]);
  */

  /*
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        console.log('Elemento está visivel!');
        setCurrentPage((currentPageInsideState) => currentPageInsideState + 1);
      }
    });

    intersectionObserver.observe(document.querySelector('#checkpoint'));
    return () => intersectionObserver.disconnect();
  }, []);
  */

  return (
    <>
      <Menu githubUser={githubUser} />
      <FollowersPage>
      <div className='profileArea' style={{gridArea: 'profileArea'}}>
        <Box>
          <h1 className='Title'>
            Seguidores ({ followers.length })
            <hr />
          </h1>
        </Box>
      </div>

      <div className='welcomeArea' style={{gridArea: 'welcomeArea'}}>
        <FollowersContent >
          <section>
            <ul>
              {followers.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={item.html_url} target='_blank'>
                      <img src={item.avatar_url} />
                      <span>{item.login}</span>
                    </a>
                  </li>
                )
              })}
              <li id='checkpoint' />
            </ul>
          </section>
        </FollowersContent>
      </div>
      </FollowersPage>
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

  const response = await api.get(`users/${session.user.name}/followers`);
  const data = await response.data;
  // console.log('DADOS', data);

  return {
    props: {
      session,
      data
    }
  }
}