import { IncomingMessage, ServerResponse } from 'node:http'

export type MyRequest = IncomingMessage & {
    myBody?: any
}
export type MyResponse = ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
}
