import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
@WebSocketGateway()
export class AppGateway implements OnGatewayInit ,OnGatewayConnection,OnGatewayDisconnect{

  private logger: Logger = new Logger('AppGateway'); 

  @WebSocketServer () server: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  
  handleConnection(client: Socket, ...args: any[]) 
  {
    this.logger.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: Socket)
  {
    this.logger.log(`Client desconnected ${client.id}`);

  }


  @SubscribeMessage('DataToServer')
  handleMessage(client: Socket, payload: string ): WsResponse<any> {
    // this.server.emit('DataToClient', payload);
    return {event :'DataToClient' ,data: payload}; 
  }
}
