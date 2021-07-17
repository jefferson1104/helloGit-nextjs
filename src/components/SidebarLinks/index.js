import React from 'react';
import Link from 'next/link';
import { ProfileSidebarMenuResponsive } from './styles';


import HomeIcon from '../../../public/home-icon.svg';
import ProfileIcon from '../../../public/profile-icon.svg';
import StarIcon from '../../../public/star-icon.svg';
import ProjectIcon from '../../../public/project-icon.svg';
import RepositoriesIcon from '../../../public/repository-icon.svg';
import logoutIcon from '../../../public/logout-icon.svg';

function SidebarLinks({ githubUser }) {
  return (
    <ProfileSidebarMenuResponsive>
      <nav>
        <Link href='/'>
          <a>
            <img src={HomeIcon} />
            Início
          </a>
        </Link>

        <Link href={`https://github.com/${githubUser}`} passHref >
          <a target='_blank'>
            <img src={ProfileIcon} />
            Github
          </a>
        </Link>

        <Link href={`https://github.com/${githubUser}?tab=repositories`}>
          <a target='_blank'>
            <img src={RepositoriesIcon} />
            Repositórios
          </a>
        </Link>

        <Link href={`https://github.com/${githubUser}?tab=stars`}>
          <a target='_blank'>
            <img src={StarIcon} />
            Starred Repos
          </a>
        </Link>

        <Link href={`https://github.com/${githubUser}?tab=projects`}>
          <a>
            <img src={ProjectIcon} />
            Projetos
          </a>
        </Link>

        <Link href={`https://github.com/${githubUser}?tab=projects`}>
          <a>
            <img src={ProjectIcon} />
            Projetos
          </a>
        </Link>

        <Link href={`https://github.com/${githubUser}?tab=projects`}>
          <a>
            <img src={ProjectIcon} />
            Projetos
          </a>
        </Link>

        <Link href={`https://github.com/${githubUser}?tab=projects`}>
          <a>
            <img src={ProjectIcon} />
            Projetos
          </a>
        </Link>

      </nav>
      <hr />
      <nav>
        <Link href="/logout">
          <a>
            <img src={logoutIcon} />
            Sair
          </a>
        </Link>
        
      </nav>
    </ProfileSidebarMenuResponsive>
  )
}

export default SidebarLinks;
