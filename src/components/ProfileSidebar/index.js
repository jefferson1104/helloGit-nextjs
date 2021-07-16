import Box from '../Box';
import SidebarLinks from '../SidebarLinks';

function ProfileSidebar(props) {
  return (
    <Box as='aside'>
      <img src={`https://github.com/${props.githubUser}.png`} alt="Jefferson Soares" style={{borderRadius: '8px'}} />
      <hr />

      <p>
        <a className='boxLink' href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <SidebarLinks />
    </Box>
  )
}

export default ProfileSidebar;