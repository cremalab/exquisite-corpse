import React from 'react'
import PropTypes from 'prop-types'
import colors from 'config/colors'

const DrawingSectionName = ({
  corpse,
  section,
  prefix,
}) => {
  const sectionName = corpse.sections
    .filter(x => x._id === section)
    .map(s => <em key={s._id} style={{color: colors['primary']}}>{s.description}</em>)[0]
  return (<p style={{ fontWeight: 'bold' }}>{prefix}{sectionName}</p>)
}

DrawingSectionName.propTypes = {
  section: PropTypes.string.isRequired,
  corpse: PropTypes.object,
  prefix: PropTypes.string,
}

DrawingSectionName.defaultProps = {
  corpse: {}
}

export default DrawingSectionName
