import styled from 'styled-components';
import search from '../../../public/search.svg'

export const MenuWrapper = styled.header`
width: 100%;
background-color: #333333;
.alurakutMenuProfileSidebar {
  background: #f4f4f4;
  position: fixed;
  z-index: 100;
  padding: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  top: 48px;
  transition: .3s;
  pointer-events: ${({ isMenuOpen }) => isMenuOpen ? 'all' : 'none'};
  opacity: ${({ isMenuOpen }) => isMenuOpen ? '1' : '0'};
  transform: ${({ isMenuOpen }) => isMenuOpen ? 'translateY(0)' : 'translateY(calc(-100% - 48px))'};
  @media(min-width: 860px) {
    display: none;
  }
  > div {
    max-width: 400px;
    margin: auto;
  }
  a {
    font-size: 18px;
  }
  .boxLink {
    font-size: 18px;
    color: #333333;
    -webkit-text-decoration: none;
    text-decoration: none;
    font-weight: 800;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #d3d3d3;
  }
}
.container {
  background-color: #333333;
  padding: 7px 16px;
  max-width: 1110px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 101;
  @media(min-width: 860px) {
    justify-content: flex-start;
  }
  button {
    border: 0;
    background: transparent;
    align-self: center;
    display: inline-block;
    @media(min-width: 860px) {
      display: none;
    }
  }
  nav {
    display: none;
    @media(min-width: 860px) {
      display: flex;
    }
    a {
      font-size: 12px;
      color: white;
      padding: 10px 16px;
      position: relative;
      text-decoration: none;
      &:after {
        content: " ";
        background-color: #ECF2FA;
        display: block;
        position: absolute;
        width: 1px;
        height: 12px;
        margin: auto;
        left: 0;
        top: 0;
        bottom: 0;
      }
    }
  }
  input {
    color: #333333;
    background: #ECF2FA;
    padding: 10px 42px;
    border: 0;
    background-image: url(${search});
    background-size: 15px;
    background-position: 15px center;
    background-repeat: no-repeat;
    border-radius: 1000px;
    font-size: 12px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  } 
}
`;

export const Logo = styled.div`
display: flex;
justify-content: center;
align-items: center;
p {
  font-size: 24px;
  color: #ffffff;
  margin: 0 20px 0 10px;
  font-weight: 700;
}
img {
  background-color: #ffffff;
  border-radius: 1000px;
  height: 34px;
}
`;