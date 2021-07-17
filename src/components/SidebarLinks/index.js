import React from 'react';
import Link from 'next/link';
import { ProfileSidebarMenuResponsive } from './styles';

import ProfileIcon from '../../../public/profile-icon.svg';
import StarIcon from '../../../public/star-icon.svg';
import CommitIcon from '../../../public/commit-icon.svg';
import PullRequestIcon from '../../../public/pull-request-icon.svg';
import ContributionIcon from '../../../public/heart-icon.svg';
import IssuesIcon from '../../../public/issues-icon.svg';
import RepositoriesIcon from '../../../public/repository-icon.svg';
import logoutIcon from '../../../public/logout-icon.svg';

function SidebarLinks() {
  return (
    <ProfileSidebarMenuResponsive>
      <nav>
        <Link href='/'>
          <a>
            <img src={ProfileIcon} />
            Perfil
          </a>
        </Link>

        <Link href="/asd">
          <a>
            <img src={StarIcon} />
            Estrelas
          </a>
        </Link>

        <Link href="/aaa">
          <a>
            <img src={CommitIcon} />
            Commits
          </a>
        </Link>

        <Link href="/aaa">
          <a>
            <img src={PullRequestIcon} />
            Pull Requests
          </a>
        </Link>

        <Link href="/aa">
          <a>
            <img src={IssuesIcon} />
            Issues
          </a>
        </Link>

        <Link href="/ss">
          <a>
            <img src={ContributionIcon} />
            Contribuições
          </a>
        </Link>
      </nav>
      <hr />
      <nav>
        <Link href="/dd">
          <a>
            <img src={RepositoriesIcon} />
            Repositórios
          </a>
        </Link>
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
