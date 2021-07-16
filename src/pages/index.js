import React from 'react';

import MainGrid from '../components/MainGrid';
import Box from '../components/Box';
import Menu from '../components/Menu';
import ProfileSidebar from '../components/ProfileSidebar';
import Followers from '../components/Followers';
import Following from '../components/Following';
import Communities from '../components/Communities';

import { OrkutNostalgicIconSet } from '../lib/AluraKutCommons';

export default function Home() {
  const githubUser = 'jefferson1104';


  return (
    <>
      <Menu githubUser={githubUser} />
      <MainGrid>
        <div className='profileArea' style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
      
        <div className='welcomeArea' style={{gridArea: 'welcomeArea'}}>
          <Box >
            <h1 className='title'>
              Bem vindo, {githubUser}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Communities githubUser={githubUser} />
        </div>

        <div className='profileRelationsArea' style={{gridArea: 'profileRelationsArea'}}>
          <Following />
          <Followers />
        </div>
      </MainGrid>
    </>
  )
}
