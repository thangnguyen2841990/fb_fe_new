import {User} from './user';

export interface FriendNotification {
   id?: number;

  fromUser?: User;

  toUser?: User;
}
