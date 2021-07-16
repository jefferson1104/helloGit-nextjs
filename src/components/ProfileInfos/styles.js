import styled from 'styled-components';

export const ProfileInfoContent = styled.ul`
    margin-top: 32px;
    list-style: none;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      display: flex;
      justify-content: center;
      font-size: 12px;
      color: #5A5A5A;
      display: grid;
      grid-template-areas:
        "title title"
        "number number"; 
      
      &:not(:last-child) {
        margin-right: 5px;
      }
      .OrkutNostalgicIconSet__title {
        display: block;
        font-style: italic; 
      }
      .OrkutNostalgicIconSet__number {
        min-width: 15px;
        width: 25px;
        color: #333333;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        .OrkutNostalgicIconSet__iconSample {
          margin-right: 7px;
        }
      }
    }
  `;


export const ProfileBio = styled.div`
  p {
    margin-top: 15px;
    letter-spacing: 0.64px;
    font-size: 14px;
    color: #333333;

    a {
      text-decoration: none;
      color: #2f4a71;
    }
  }
`;