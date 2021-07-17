import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu';
import Box from '../../components/Box';
import { FollowingPage, FollowingContent } from './styles';

import api from '../../services/api';

function Following() {
  const githubUser = 'omariosouto';
  const [following, setFollowing] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`users/${githubUser}`);

      const userIformation = response.data;

      setUserInfo(userIformation);
    }
    loadData();
  }, []);

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

  return (
    <>
      <Menu githubUser={githubUser} />
      <FollowingPage>
        <div className='profileArea' style={{gridArea: 'profileArea'}}>
          <Box>
            <h1 className='Title'>
              Seguindo ({userInfo.following})
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

export default Following;