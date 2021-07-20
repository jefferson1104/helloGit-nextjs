import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

import githubIcon from '../../public/github-icon.svg'
import githubIcon2 from '../../public/profile-icon.svg'

function PageLogin() {
  const router = useRouter();
  const { user, signInWithGithub } = useAuth();

  async function handleSignIn() {
    if (!user) {
      await signInWithGithub();
    }

    router.push('/')
  }

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src={githubIcon} />
          <h1>HelloGit</h1>

          <p><strong>Conecte-se</strong> a repositórios, quem você está seguindo, seus seguidores e comunidades</p>
          <p><strong>Conheça</strong> novas pessoas saiba mais sobre seus elas e seus trabalhos</p>
          <p><strong>Veja</strong> seus repositórios estrelados, pull requests e commits </p>
        </section>

        <section className="formArea">
          <div className="box">
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <button onClick={handleSignIn}>
              <img src={githubIcon2} />
              Login
            </button>
          </div>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 helloGit - <a href="/">Sobre o helloGit</a>
          </p>
        </footer>
      </div>
    </main>
  )
}

export default PageLogin;