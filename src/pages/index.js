import React from 'react';
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
  console.log('HOME', user);
  
  const githubUser = user.login;

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
