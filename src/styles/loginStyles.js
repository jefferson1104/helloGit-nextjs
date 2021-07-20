import { css } from 'styled-components';

export const helloGitLoginStyles = css`
  :root {
    --backgroundPrimary: #333333;
    --backgroundSecondary: #5A5A5A;
    --backgroundTertiary: #F5F5F5;
    --backgroundQuarternary: #333333;

    --colorPrimary: #F5F5F5;
    
    --colorQuarternary: #333333;

    --textPrimaryColor: #333333;
    --textSecondaryColor: #F5F5F5;

    --textTertiaryColor: #5A5A5A;
    --textQuarternaryColor: #C5C6CA;

    --commonRadius: 8px;
  }
  
  .loginScreen {
    padding: 16px;
    max-width: 1110px;
    display: grid;
    --gap: 12px;
    --gutter: 16px;
    grid-gap: var(--gap);
    grid-template-areas: 
      "logoArea"
      "formArea"
      "footerArea";
    @media(min-width: 860px) {
      grid-template-columns: 2fr 1fr;
      grid-template-areas: 
        "logoArea formArea"
        "logoArea formArea"
        "footerArea footerArea";
    }

    .logoArea {
      grid-area: logoArea;
      background-color: var(--backgroundTertiary);
      border-radius: var(--commonRadius);
      padding: var(--gutter);
      text-align: center;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      min-height: 263px;

      @media(min-width: 860px) {
        min-height: 368px;
      }

      p {
        font-size: 14px;
        line-height: 1.2;
        &:not(:last-child) {
          margin-bottom: 12px;
        }
        strong {
          color: var(--colorQuarternary);
        }
      }

      img {
        max-height: 150px;
      }

      h1 {
        font-size: 36px;
        font-weight: 700;
        letter-spacing: 0.65px;
        color: #333333;
        margin-bottom: 20px;
      }
    }

    .formArea {
      grid-area: formArea;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      
      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        text-align: center;
        padding: var(--gutter);
        padding-left: 50px;
        padding-right: 50px;
        background-color: var(--backgroundSecondary);
        border-radius: var(--commonRadius);
        flex: 1;

        p {
          font-size: 16px;
          color: var(--colorPrimary);
          margin-bottom: 20px;
        }

        button {
          width: 100%;
          display: block;
          border: 0;
          padding: 12px;
          border-radius: var(--commonRadius);
          background-color: var(--colorPrimary);
          color: var(--textPrimaryColor);
          letter-spacing: 0.65px;
          font-weight: 500;
          font-size: 18px;

          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          img {
            margin-right: 10px;
          }
        }
      }
    }

    .footerArea {
      grid-area: footerArea;
      background-color: var(--backgroundQuarternary);
      border-radius: var(--commonRadius);
      padding: 8px;
      p {
        font-size: 12px;
        text-align: center;
        color: var(--colorPrimary);
        a {
          text-decoration: none;
          color: var(--colorPrimary);
        }
      }
    }
  }
`;