import React, { useState, useEffect } from 'react';
import { getSession } from "next-auth/client";

import api from '../../services/api';

import Menu from '../../components/Menu';
import Box from '../../components/Box';

import { FollowingPage, FollowingContent } from '../../styles/FollowingStyles';

export default function PageFollowing({ session, data }) {
  // const [following, setFollowing] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const githubUser = session.user.name;
  const following = data;

  /*
  useEffect(() => {
    async function loadData() {
      const response = await api.get(`users/${githubUser}/following?per_page=12&page=${currentPage}&order=DESC`);

      const newFollowing = response.data;

      if(following.length > 0 ) {
        let oldFollowing = following;
        oldFollowing.push(...newFollowing);
  
        setFollowing(oldFollowing);
      } else {
        setFollowing(newFollowing);
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
        setCurrentPage((currentPageFollowing) => currentPageFollowing + 1);
      }
    });

    intersectionObserver.observe(document.querySelector('#checkpoint'));
    return () => intersectionObserver.disconnect();
  }, []);
  */

  return (
    <>
      <Menu githubUser={githubUser} />
      <FollowingPage>
        <div className='profileArea' style={{gridArea: 'profileArea'}}>
          <Box>
            <h1 className='Title'>
              Seguindo ({following.length})
              <hr />
            </h1>
          </Box>
        </div>

        <div className='welcomeArea' style={{gridArea: 'welcomeArea'}}>
          <FollowingContent >
            <section>
              <ul>
                {following.map((item) => {
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
          </FollowingContent>
        </div>
      </FollowingPage>
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

  const response = await api.get(`users/${session.user.name}/following`);
  const data = await response.data;

  return {
    props: {
      session,
      data
    }
  }
}