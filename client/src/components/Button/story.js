import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Button from '.'
import Box from 'react-boxen'

storiesOf('Button', module)
  .add('default', () => {
    return <Box
      padding='1em'
      childDirection='row'
      childSpacing='1em'>
      <Button prefix='✍'>Click Me!</Button>
      <Button suffix='➡'>Click Me!</Button>
      <Button skin='secondary'>Click Me!</Button>
      <Button skin='tertiary'>Click Me!</Button>
    </Box>
  })
