import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {EventsService} from "@/modules/events/events.service";

import {ApiSecurity, ApiTags} from "@nestjs/swagger";
import {Events} from "@/models/schemas/events.schema";
//import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags('Events')
//@ApiSecurity('bearerAuth', ['bearerAuth'])
@Controller()
export class EventController {
  constructor(
    private readonly rmqQueue: ClientProxy,
    private readonly eventsService: EventsService
  ) {}

  @Get('event/:id')
  async getOneEvents(@Request() req, @Body() body: {value: string}) {
    await this.rmqQueue
      .send('message', {
        value: this.eventsService.example(body.value) + ' is answer from mic one!'
      })
      .toPromise();
  }
}
