import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Canvas from '.'
import exampleJSON from './example'

storiesOf('Canvas', module)
  .add('default', () => {
    return <Canvas json={exampleJSON} />
  })
  .add('fixed width', () => {
    return <Canvas json={exampleJSON} width={200}/>
  })
