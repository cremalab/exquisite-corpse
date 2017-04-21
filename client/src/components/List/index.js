import React from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'

const List = ({
  data,
  itemComponent: Component,
  itemSpacing
}) =>
  <Box
    childSpacing={ itemSpacing }>
    {
      data.map((item, i) =>
        Component
          ? <Component
              key={ item._id || item.id || i }
              { ...item } />
          : item
      )
    }
  </Box>

List.propTypes = {
  data: PropTypes.array.isRequired,
  itemComponent: PropTypes.func.isRequired,
  itemSpacing: PropTypes.string,
}

List.defaultProps = {
  data: []
}

export default List
