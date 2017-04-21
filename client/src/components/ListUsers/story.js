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
      status: 'active',
      name: 'Rob',
      provider: 'github',
    },
    {
      id: 'sdfa',
      status: 'active',
      name: 'Ross',
      provider: 'github',
    },
    {
      id: 'asdfkjaagagsdf',
      status: 'active',
      name: 'Deric',
      provider: 'github',
    },
  ]
}
