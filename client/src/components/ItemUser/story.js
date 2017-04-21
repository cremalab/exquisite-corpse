import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ItemUser from '.'
import Box from 'react-boxen'
import name from 'helpers/getDirName'

const props = {
  id: 'asdfkjasdf',
  status: 'active',
  name: 'Rob',
  provider: 'github',
}

storiesOf(name(__dirname), module)
  .add('default', () => {
    return <Box
      padding='1em'>

      <ItemUser {...props} />

    </Box>
  })
