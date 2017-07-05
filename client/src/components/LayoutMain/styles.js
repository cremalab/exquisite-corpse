import colors from 'config/colors'
import breakpoints from 'config/breakpoints'

export const containerStyles = `
  @media only screen and (max-width : ${breakpoints.sm}) {
    > div {
      flex-direction: column;

    }
  }
`

export const mainStyles = `
  background: ${colors['white']};

  @media only screen and (max-width : ${breakpoints.sm}) {
    height: 0;
    flex-grow: 0;
    flex-shrink: 1;
    &.ui-active {
      height: auto;
      > div {
        height: auto;
      }
    }
  }

`

export const sidebarStyles = `
  @media only screen and (max-width : ${breakpoints.sm}) {
    height: 0;

    &.ui-active {
      flex-grow: 1;
      flex-shrink: 0;
      height: 560px;
    }
  }
`
