import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../hooks/useAuth';

import Menu from '../components/Menu';
import MainGrid from '../components/MainGrid';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileInfos from '../components/ProfileInfos';

import Followers from '../components/Followers';
import Following from '../components/Following';
import Communities from '../components/Communities';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.push('/login')
  }

  const githubUser = user.login;

  return (
    <>
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
          <Following githubUser={user.login}/>
          <Followers githubUser={githubUser}/>
        </div>
      </MainGrid>
    </>
  )
}
