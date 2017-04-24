const ERROR = 'error'
const NOTICE = 'notice'

export const message =
  (type, autoDismiss = true) =>
    ({ id, resource, data: { message }}) => ({
      id, type, resource, message, autoDismiss
    })

export const messageError         = message(ERROR, true)
export const messageErrorPersist  = message(ERROR, false)
export const messageNotice        = message(NOTICE, true)
export const messageNoticePersist = message(NOTICE, false)
