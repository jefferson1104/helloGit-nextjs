import React, { useState, useEffect } from 'react';
import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

function Followers() {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    // REST: Buscando dados da api do github
    fetch('https://api.github.com/users/jefferson1104/followers')
    .then(function (serverResponse) {
      return serverResponse.json();
    })
    .then(function (fullResponse) {
      setFollowers(fullResponse);
    })
  }, []);

  return (
    <ProfileRelationsBoxWrapper >
      <h2 className='smallTitle'>
        Seguidores ({followers.length})
      </h2>

      <ul>
        {followers.map((item) => {
          return (
            <li key={item.id}>
              <a href={item.html_url}>
                <img src={item.avatar_url} />
                <span>{item.login}</span>
              </a>
            </li>
          )
        }).slice(0, 6)}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default Followers;