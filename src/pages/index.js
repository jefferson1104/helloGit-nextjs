import MainGrid from '../components/MainGrid'
import Box from '../components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib/AluraKutCommons'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations';

function ProfileSidebar(props) {
  return (
    <Box >
      <img src={`https://github.com/${props.githubUser}.png`} alt="Jefferson Soares" style={{borderRadius: '8px'}} />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'jefferson1104';
  const friends = ['willianjusten', 'omariosouto', 'peas', 'loiane', 'andersonluizpereira'];

  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className='profileArea' style={{gridArea: 'profileArea'}}>
        <ProfileSidebar githubUser={githubUser} />
      </div>
     
      <div className='welcomeArea' style={{gridArea: 'welcomeArea'}}>
        <Box >
          <h1 className='title'>
            Bem vindo
          </h1>

          <OrkutNostalgicIconSet />

        </Box>
      </div>

      <div className='profileRelationsArea' style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper >
          <h2 className='smallTitle'>
            Amigos ({friends.length})
          </h2>

          <ul>
            {friends.map((item) => {
              return (
                <li>
                  <a href={`/users/${item}`} key={item}>
                    <img src={`https://github.com/${item}.png`} />
                    <span>{item}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
