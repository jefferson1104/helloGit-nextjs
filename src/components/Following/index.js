import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../services/api';

import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

function Following({ githubUser }) {
  const [following, setFollowing] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [responseFollowing, responseInfo] = await Promise.all([
        api.get(`users/${githubUser}/following`),
        api.get(`users/${githubUser}`),
      ]);
      setFollowing(responseFollowing.data);
      setUserInfo(responseInfo.data);
    }
    loadData();
  }, []);

  return (
    <ProfileRelationsBoxWrapper >
      <h2 className='smallTitle'>
        Seguindo ({following.length})
      </h2>

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
        }).slice(0, 6)}
      </ul>

      <span>
        <Link href='/following'>Ver todos</Link>
      </span>
    </ProfileRelationsBoxWrapper>
  )
}

export default Following;