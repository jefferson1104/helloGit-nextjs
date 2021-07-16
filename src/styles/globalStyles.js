import { createGlobalStyle } from 'styled-components';
import { AlurakutStyles } from '../lib/AluraKutCommons'
import githubBackground from '../../public/github-background.svg';


export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background: #3333 url(${githubBackground}) no-repeat;
    background-position: revert;
    -webkit-font-smoothing: antialiased;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`;