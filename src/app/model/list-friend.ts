import {User} from './user';

export interface ListFriend {
  id?: number;

  user?: User;

  friendOfUser?: User;
}
