import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu';
import Box from '../../components/Box';
import { FollowersPage, FollowersContent } from './styles';

import api from '../../services/api';

function Followers() {
  const githubUser = 'jefferson1104';
  const [followers, setFollowers] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    // Modelo utilizando axios e async await
    async function loadData() {
      const [responseFollowers, responseInfo] = await Promise.all([
        api.get(`users/${githubUser}/followers`),
        api.get(`users/${githubUser}`),
      ]);
      setFollowers(responseFollowers.data);
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
            }).slice(0, 12)}
          </ul>
        </FollowersContent>
      </div>
      </FollowersPage>
    </>
  )
}

export default Followers;