import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Button from '.'

storiesOf('Button', module)
  .add('default', () => {
    return <Button prefix='O'>Click Me!</Button>
  })
