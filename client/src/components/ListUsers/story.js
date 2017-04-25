import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { ListUsers } from '.'
import Box from 'react-boxen'
import name from 'helpers/getDirName'

storiesOf(name(__dirname), module)
  .add('default', () => {
    return <Box
      padding='1em'>

      <ListUsers {...props} />

    </Box>
  })

const props = {
  data: [
    {
      id: 'asdfkjasdf',
      status: 'idle',
      name: 'Rob',
      provider: 'slack',
    },
    {
      id: 'sdfa',
      status: 'drawing',
      name: 'Ross',
      provider: 'github',
    },
    {
      id: 'asdfkjaagagsdf',
      status: 'typing',
      name: 'Deric',
      provider: 'guest',
    },
  ]
}
