import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3600, { cors: { origin: '*' } })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer() server: Server;
  Players: any[] = [];

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }


  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected ${client.id}`);
    if (this.Players.length < 2)
      this.Players.push(client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client desconnected ${client.id}`);
    if (this.Players.length > 0)
      this.Players.splice(this.Players.indexOf(client.id), 1);
  }


  @SubscribeMessage('DataToServer')
  handleMessage(client: Socket, payload: { username: any, data: any }): void {
    payload.username = this.Players;
    client.broadcast.emit('DataToClient', payload);
  }

  @SubscribeMessage('DataToServer2')
  handleBall(client: Socket, payload: { username: any, data: any }): void {
    payload.username = this.Players;
    client.broadcast.emit('DataToClient2', payload);
  }
}
