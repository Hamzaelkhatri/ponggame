import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3600, { cors: { origin: '*' } })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer() server: Server;
  Players: any[] = [];
  P1 : string = "0";
  P2 : string = "1";

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
  handleMessage(client: Socket, payload:any): void {
    // payload = {P1: this.P1, P2: this.P2};
    client.broadcast.emit('DataToClient', payload);
  }

  @SubscribeMessage('DataToServer2')
  handleBall(client: Socket,payload:any): void {
    // payload = {players:{P1:this.P1,P2:this.P2},data}
    client.broadcast.emit('DataToClient2', payload);
  }

  @SubscribeMessage('connectServer')
  connect_users(client: Socket, payload : any): void 
  {
    // console.log(this.P1 +" || "+ this.P2);
    if(payload === "init")
    {
      client.broadcast.emit('connectClient', {P1: this.P1, P2: this.P2});
      return ;
    }
    this.P1 = payload.p1;
    this.P2 = payload.p2;
    // if(this.P1 == "0" && this.P1 != this.P2)
    // {
    //   this.P1 = payload;
    // } 
    // else if(this.P2 == "1" && this.P1 !== this.P2)
    // {
    //   this.P2 = payload;
    // }

    
  }
}
