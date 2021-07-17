import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu';
import Box from '../../components/Box';
import { FollowingPage, FollowingContent } from './styles';

import api from '../../services/api';

function Following() {
  const githubUser = 'jefferson1104';
  const [following, setFollowing] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    // Modelo utilizando axios e async await
    async function loadData() {
      const [responseFollowing, responseInfo] = await Promise.all([
        api.get(`users/${githubUser}/following`),
        api.get(`users/${githubUser}`),
      ]);
      setFollowing(responseFollowing.data);
      setUserInfo(responseInfo.data);
    }
    loadData();


    // Modelo utilizando o fetch e .then
    /*
    fetch('https://api.github.com/users/jefferson1104/followers')
    .then(function (serverResponse) {
      console.log(serverResponse)
      return serverResponse.json();
    })
    .then(function (fullResponse) {
      setFollowers(fullResponse);
    })
    */
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
              }).slice(0, 12)}
            </ul>
          </FollowingContent>
        </div>
      </FollowingPage>
    </>
  )
}

export default Following;