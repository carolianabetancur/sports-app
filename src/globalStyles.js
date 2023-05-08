import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
    width:100%;
  }
  h1 {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  label {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  input {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  footer {
    background-color: ${({ theme }) => theme.footer};
    color: ${({ theme }) => theme.footerText};
  }
  `