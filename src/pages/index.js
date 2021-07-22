import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import useAuth from '../hooks/useAuth';

import Menu from '../components/Menu';
import MainGrid from '../components/MainGrid';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileInfos from '../components/ProfileInfos';

import Followers from '../components/Followers';
import Following from '../components/Following';
import Communities from '../components/Communities';

export default function Home() {
  const { user } = useAuth();
  console.log('HOMEPAGE', user)
  
  // gostaria de usar o 'user.login' aqui nesse variavel abaixo
  const githubUser = 'jefferson1104';

  return (
    <>
      <Head>
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie || !document.cookie.includes('user-auth')) {
                window.location.href = "/login"
              }
            `,
          }}
        />
      </Head>

      <Menu githubUser={githubUser} />
      <MainGrid>
        <div className='profileArea' style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
      
        <div className='welcomeArea' style={{gridArea: 'welcomeArea'}}>
          <ProfileInfos githubUser={githubUser}/>
          <Communities githubUser={githubUser} />
        </div>

        <div className='profileRelationsArea' style={{gridArea: 'profileRelationsArea'}}>
          <Following githubUser={githubUser}/>
          <Followers githubUser={githubUser}/>
        </div>
      </MainGrid>
    </>
  )
}
