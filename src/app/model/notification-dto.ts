import {User} from './user';

export interface NotificationDto {
  id?: number;

  content?: string;

  status?: number;

  dateCreated?: string;

  fromUser?: User;

  toUser?: User;
}
