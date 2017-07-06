import colors from 'config/colors'
import breakpoints from 'config/breakpoints'


// export const containerStyles = ``
// export const mainStyles = ``
// export const sidebarStyles = ``

export const containerStyles = `
  @media only screen and (max-width : ${breakpoints.md}px) {
    > div {
      flex-direction: column;

    }
  }
`

export const mainStyles = `
  background: ${colors['white']};

  @media only screen and (max-width : ${breakpoints.md}px) {
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
  background: ${colors['white-shade-1']};
  @media only screen and (max-width : ${breakpoints.md}px) {
    height: 1px;

    &.ui-active {
      flex-grow: 1;
      flex-shrink: 0;
      height: auto;
    }
  }
`
