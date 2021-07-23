import React from 'react';
import { providers, signIn, getSession } from 'next-auth/client';

import githubIcon from '../../public/github-icon.svg';
import githubIcon2 from '../../public/profile-icon.svg';

export default function SignIn({ providers }) {
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
            {Object.values(providers).map((provider) => {
            return (
              <button key={provider.name} onClick={() => signIn(provider.id)}>
                <img src={githubIcon2} />
                LOGIN
              </button>
            );
          })}
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

SignIn.getInitialProps = async(context) => {
  const {req, res} = context;
  const session = await getSession({req});

  if (session && res) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end()
    return;
  }

  return {
    session: undefined,
    providers: await providers(context),
  };
}