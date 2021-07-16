import React, { useState } from 'react';
import NextLink from 'next/link';

import SidebarLinks from '../SidebarLinks';
import githubIcon from '../../../public/github-icon.svg';

import { Logo, MenuWrapper } from './styles';
const BASE_URL = 'http://alurakut.vercel.app/';

const v = '1';

function Link({ href, children, ...props }) {
  return (
    <NextLink href={href} passHref>
      <a {...props}>
        {children}
      </a>
    </NextLink>
  )
}

function AlurakutMenuProfileSidebar({ githubUser }) {
  return (
    <div className="alurakutMenuProfileSidebar">
      <div>
        <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
        <hr />
        <p>
          <a className="boxLink" href={`/user/${githubUser}`}>
            @{githubUser}
          </a>
        </p>
        <hr />

        <SidebarLinks />
      </div>
    </div>
  )
}

function Menu({ githubUser }) {
  const [isMenuOpen, setMenuState] = React.useState(false);

  return (
    <MenuWrapper isMenuOpen={isMenuOpen}>
      <div className="container">
        <Logo>
          <img src={githubIcon} alt="" />
          <p>helloGit</p>
        </Logo>

        <nav style={{ flex: 1 }}>
          {[{ name: 'Inicio', slug: '/'}, {name: 'Seguidores', slug: '/seguidores'}, {name: 'Seguindo', slug: '/seguindo'}].map((menuItem) => (
            <Link key={`key__${menuItem.name.toLocaleLowerCase()}`} href={`${menuItem.slug.toLocaleLowerCase()}`}>
              {menuItem.name}
            </Link>
          ))}
        </nav>

        <nav>
          <a href={`/logout`}>
            Sair
          </a>
          <div>
            <input placeholder="Pesquisar no Orkut" />
          </div>
        </nav>

        <button onClick={() => setMenuState(!isMenuOpen)}>
          {isMenuOpen && <img src={`${BASE_URL}/icons/menu-open.svg?v=${v}`} />}
          {!isMenuOpen && <img src={`${BASE_URL}/icons/menu-closed.svg?v=${v}`} />}
        </button>
      </div>
      <AlurakutMenuProfileSidebar githubUser={githubUser} />
    </MenuWrapper>
  )
}

export default Menu;