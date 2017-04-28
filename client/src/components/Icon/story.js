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
      <Icon glyph='eye' />
      <Icon glyph='newCorpse' />
      <Icon glyph='trash' />
      <Icon glyph='close' />
      <Icon glyph='user' />
      <Icon glyph='undo' />
      <Icon glyph='slack' />
      <Icon glyph='github' />
    </Box>
  })
