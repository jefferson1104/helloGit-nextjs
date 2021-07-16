import React, { useState, useEffect } from 'react';
import Box from '../Box';

import { ProfileInfoContent, ProfileBio } from './styles';


import repositoryIcon from '../../../public/repository-icon.svg';
import starIcon from '../../../public/star-icon.svg';
import followingIcon from '../../../public/following-icon.svg';
import followersIcon from '../../../public/followers-icon.svg';


function ProfileInfos(props) {
  const [profileData, setProfileData] = useState([])
  const [starred, setStarred] = useState([]);

  useEffect(() => {
    // REST: Buscando dados geral do usuario
    fetch('https://api.github.com/users/jefferson1104')
    .then(function (serverResponse) {
      return serverResponse.json();
    })
    .then(function (fullResponse) {
      setProfileData(fullResponse);
    })

    // REST: Buscando dados geral do usuario
    fetch('https://api.github.com/users/jefferson1104/starred')
    .then(function (serverResponse) {
      return serverResponse.json();
    })
    .then(function (fullResponse) {
      setStarred(fullResponse);
    })

    console.log('STARRED', starred)
    console.log('DADOS API', profileData)
  }, []);

  return (
    <Box >
      <h1 className='title'>
        Bem vindo, {profileData.name}
      </h1>

      <ProfileInfoContent>
        <li>
          <span style={{ gridArea: 'title' }} className="OrkutNostalgicIconSet__title">
            Repositórios
          </span>
          <span className="OrkutNostalgicIconSet__number" style={{ gridArea: 'number' }}>
            <img 
              className="OrkutNostalgicIconSet__iconSample" 
              src={repositoryIcon}
            />
            {profileData.public_repos}
          </span>
        </li>

        <li>
          <span style={{ gridArea: 'title' }} className="OrkutNostalgicIconSet__title">
            Starred
          </span>
          <span className="OrkutNostalgicIconSet__number" style={{ gridArea: 'number' }}>
            <img 
              className="OrkutNostalgicIconSet__iconSample" 
              src={starIcon}
            />
            {starred.length}
          </span>
        </li>

        <li>
          <span style={{ gridArea: 'title' }} className="OrkutNostalgicIconSet__title">
            Seguindo
          </span>
          <span className="OrkutNostalgicIconSet__number" style={{ gridArea: 'number' }}>
            <img 
              className="OrkutNostalgicIconSet__iconSample" 
              src={followingIcon}
            />
            {profileData.following}
          </span>
        </li>

        <li>
          <span style={{ gridArea: 'title' }} className="OrkutNostalgicIconSet__title">
            Seguidores
          </span>
          <span className="OrkutNostalgicIconSet__number" style={{ gridArea: 'number' }}>
            <img 
              className="OrkutNostalgicIconSet__iconSample" 
              src={followersIcon}
            />
            {profileData.followers}
          </span>
        </li>
      </ProfileInfoContent>

      <ProfileBio>
        <p> <strong>Bio:</strong> {profileData.bio}</p>
        <p><strong>Website</strong> <a href={profileData.blog} target='_blank'>{profileData.blog}</a></p>
      </ProfileBio>
    </Box>
  )
}

export default ProfileInfos;