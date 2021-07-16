import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

function Following() {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    // REST: Buscando dados da api do github
    fetch('https://api.github.com/users/jefferson1104/following')
    .then(function (serverResponse) {
      return serverResponse.json();
    })
    .then(function (fullResponse) {
      setFollowing(fullResponse);
    })
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
        <Link href='/communities'>Ver mais</Link>
      </span>
    </ProfileRelationsBoxWrapper>
  )
}

export default Following;