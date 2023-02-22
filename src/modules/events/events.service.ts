import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Events,
  EventsDocument,
} from '@/models/schemas/events.schema';


@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name)
    private readonly EventsModel: Model<EventsDocument>,
  ) {}

  example(value) {
    return 'Hello, ' + value
  }
}
