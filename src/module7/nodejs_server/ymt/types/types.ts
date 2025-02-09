import { IncomingMessage, ServerResponse } from 'node:http'

export type MyRequest = IncomingMessage
export type MyResponse = ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
}
