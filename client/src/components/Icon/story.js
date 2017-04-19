import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Icon from '.'
import Box from 'react-boxen'

storiesOf('Icon', module)
  .add('default', () => {
    return <Box
      padding='1em'
      childDirection='row'
      childSpacing='1em'>
      <Icon glyph='draw' />
      <Icon glyph='newCorpse' />
    </Box>
  })
