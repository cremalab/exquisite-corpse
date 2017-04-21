import React from 'react'
import { connect } from 'react-redux'
import List from 'components/List'
import ItemUser from 'components/ItemUser'

const ListUsers = (props) =>
  <List { ...props } itemSpacing='1px' itemComponent={ItemUser} />

function mapStateToProps(state) {
  return {
    data: state.users.users,
  }
}

const Connected = connect(mapStateToProps)(ListUsers)

export {
  Connected as default,
  ListUsers
}
