import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --green-light: #9cb080;
    --green-medium: #618764;
    --green-dark: #2b5748;
    --green-deep: #273338;

    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--green-deep);
    background-color: #ffffff;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }
`

export default GlobalStyles
