import React from 'react'
import ConnectedUsers from 'components/ConnectedUsers'
import ChatMessages from 'components/ChatMessages'
import Box from 'react-boxen'

const RouteMessagesGlobal = () =>
  <Box grow='1'>
    <ConnectedUsers />
    <ChatMessages grow='1'/>
  </Box>

export default RouteMessagesGlobal
