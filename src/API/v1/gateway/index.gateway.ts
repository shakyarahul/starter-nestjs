import { Headers } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CommentService } from '../../../Entities/comment/Comment.service';
import { CreateRequestDto } from '../../../Entities/comment/dto/CreateRequest.dto';
import { UserService } from '../../../Entities/user/User.service';
@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server;

  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @SubscribeMessage('post_comment')
  async handlePostComment(@MessageBody() comment: string): Promise<void> {
    const format = JSON.parse(comment);
    const decoded_user = this.jwtService.decode(format.created_by);
    console.log(decoded_user, 'data');
    const user = await this.userService.findAEntity({
      id: decoded_user.sub,
    });

    const commentData = await this.commentService.create({
      ...format,
      created_by: user,
    });
    this.server.emit(
      'post_comment/' + format.roadmap,
      JSON.stringify({ ...commentData, number_of_users: 0 }),
    );
  }
}
