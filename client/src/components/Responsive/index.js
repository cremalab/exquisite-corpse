import React from 'react'
import Responsive from 'react-responsive'
import breakpoints from 'config/breakpoints'

// Desktop, tablet and mobile setup
export const Desktop = (props) => <Responsive minWidth={breakpoints.md} {...props} children={props.children} />
export const Mobile = (props) => <Responsive maxWidth={breakpoints.md} {...props} children={props.children} />
