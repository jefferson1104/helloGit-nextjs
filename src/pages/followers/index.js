import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu';
import Box from '../../components/Box';
import { FollowersPage, FollowersContent } from '../../styles/FollowersStyles';

import api from '../../services/api';

export default function PageFollowers() {
  const githubUser = 'omariosouto';
  const [followers, setFollowers] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
        setCurrentPage((currentPageInsideState) => currentPageInsideState + 1);
      }
    });

    intersectionObserver.observe(document.querySelector('#checkpoint'));
    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <>
      <Menu githubUser={userInfo.login} />
      <FollowersPage>
      <div className='profileArea' style={{gridArea: 'profileArea'}}>
        <Box>
          <h1 className='Title'>
            Seguidores ({userInfo.followers})
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