import React from 'react';
import { getSession } from "next-auth/client";

import Menu from '../components/Menu';
import MainGrid from '../components/MainGrid';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileInfos from '../components/ProfileInfos';
import Followers from '../components/Followers';
import Following from '../components/Following';
import Communities from '../components/Communities';

export default function Home({ session }) {
  const githubUser = session.user.name;

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
          <Following githubUser={githubUser}/>
          <Followers githubUser={githubUser}/>
        </div>
      </MainGrid>
    </>
  )
}

// Pegando os dados da session antes de renderizar a pagina.
export const getServerSideProps = async ({req, res}) => {
  const session = await getSession({ req });

  if(!session) {
    res.writeHead(302, {
      Location: "/signin",
    });
    res.end()
    return false;
  }

  return {
    props: {
      session
    }
  }
}