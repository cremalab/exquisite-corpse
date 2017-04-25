import React from 'react'
import ChatMessages from 'components/ChatMessages'
import ListUsers from 'components/ListUsers'
import Box from 'react-boxen'

const RouteMessagesGlobal = () =>
  <Box
    childFlex
    grow>
    <ListUsers />
    <ChatMessages grow />
  </Box>

export default RouteMessagesGlobal
