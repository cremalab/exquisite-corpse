import React from 'react'
import ConnectedUsers from 'components/ConnectedUsers'
import ChatMessages from 'components/ChatMessages'
import Box from 'react-boxen'

const RouteMessagesGlobal = () =>
  <Box childFlex>
    <ConnectedUsers />
    <ChatMessages grow />
  </Box>

export default RouteMessagesGlobal
