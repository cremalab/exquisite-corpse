import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Box from 'react-boxen'
import name from 'helpers/getDirName'
import colors from '.'
import styled from 'styled-components'

const Text = styled.div`
  display: inline-block;
  padding: 0.25em 0.75em;
  border-radius: 1em;
  background: hsla(0,0%,100%,0.50);
  box-shadow: 0 0 2px hsla(0,0%,0%,0.125);
  color: hsla(0,0%,0%,0.75);
`

storiesOf(name(__dirname), module)
  .add('default', () => {
    return <Box
      childDirection='row'
      childWrap='wrap'
      childGrow
      childShrink
      childWrapLastGrow={false}
      childBasis='50%'
      padding='1em'>

      {
        Object.keys(colors).map((color, i) =>
          <Box
            key={i}
            basis={!color.match(/-/g) && '100%'}
            css={`
              padding: 20px;
              background: ${colors[color]};
            `}>
            <Text color={colors[color]}>
              <code>{ color }</code>
            </Text>
          </Box>
        )
      }

    </Box>
  })
