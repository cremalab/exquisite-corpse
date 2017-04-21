import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@kadira/storybook'
import List from '.'
import Box from 'react-boxen'

const data = [
  { name: 'Rob', age: 30 },
  { name: 'Ross', age: 'Unknown' },
  { name: 'Deric', age: 'Old' },
]

const ListItem = ({ name, age }) =>
  <Box
    css={`
      background: whitesmoke;
      padding: 5px 8px;
    `}
    childJustify='space-between'
    childSpacing='10px'
    childDirection='row'>
    <div>{ name }</div>
    <div>{ age }</div>
  </Box>

ListItem.propTypes = {
  name: PropTypes.string,
  age: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

storiesOf('List', module)
  .add('default', () => {
    return <Box
      css={`
        max-width: 20em;
      `}
      padding='1em'>
      <List
        data={data}
        itemSpacing='2px'
        itemComponent={ListItem} />
    </Box>
  })
