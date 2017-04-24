import { generate } from 'shortid'

const ERROR = 'error'
const NOTICE = 'notice'

const createMessage = (message, type, autoDismiss = true) => ({
  id: generate(), message, type, autoDismiss
})

export const dismissError  = message => createMessage(message, ERROR , true)
export const dismissNotice = message => createMessage(message, NOTICE, true)
export const showError     = message => createMessage(message, ERROR , false)
export const showNotice    = message => createMessage(message, NOTICE, false)
