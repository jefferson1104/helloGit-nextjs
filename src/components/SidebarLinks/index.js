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
        <a href="/">
          <img src={ProfileIcon} />
            Perfil
          </a>
        <a href="/">
          <img src={StarIcon} />
            Estrelas
          </a>
        <a href="/">
          <img src={CommitIcon} />
            Commits
          </a>
        <a href="/">
          <img src={PullRequestIcon} />
            Pull Requests
        </a>
        <a href="/">
          <img src={IssuesIcon} />
            Issues
        </a>
        <a href="/">
          <img src={ContributionIcon} />
            Contribuições
        </a>
      </nav>
      <hr />
      <nav>
        <a href="/">
          <img src={RepositoriesIcon} />
            Repositórios
          </a>
        <a href="/logout">
          <img src={logoutIcon} />
            Sair
          </a>
      </nav>
    </ProfileSidebarMenuResponsive>
  )
}

export default SidebarLinks;
