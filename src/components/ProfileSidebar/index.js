import Box from '../Box';
import SidebarLinks from '../SidebarLinks';

function ProfileSidebar({ githubUser }) {
  return (
    <Box as='aside'>
      <img src={`https://github.com/${githubUser}.png`} alt="Jefferson Soares" style={{borderRadius: '8px'}} />
      <hr />

      <p>
        <a className='boxLink' href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />

      <SidebarLinks />
    </Box>
  )
}

export default ProfileSidebar;