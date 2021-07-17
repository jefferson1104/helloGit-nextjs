import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../services/api';

import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

function Followers({ githubUser }) {
  const [followers, setFollowers] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [responseFollowers, responseInfo] = await Promise.all([
        api.get(`users/${githubUser}/followers`),
        api.get(`users/${githubUser}`),
      ]);
      setFollowers(responseFollowers.data);
      setUserInfo(responseInfo.data);
    }
    loadData();
  }, []);

  return (
    <ProfileRelationsBoxWrapper >
      <h2 className='smallTitle'>
        Seguidores ({userInfo.followers})
      </h2>

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
        }).slice(0, 6)}
      </ul>

      <span>
        <Link href='/followers'>Ver todos</Link>
      </span>
    </ProfileRelationsBoxWrapper>
  )
}

export default Followers;