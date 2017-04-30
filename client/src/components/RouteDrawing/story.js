import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { addSeconds } from 'date-fns'
import LiveTimestamp from '.'

storiesOf('Logo', module)
  .add('default', () => {
    const d = addSeconds(new Date(), 50)
    return <LiveTimestamp target={d} prefix='world will end' />
  })
