import {User} from './user';
import {Group} from './group';

export interface GroupNotification {
  id?: number;

  fromUser?: User;

  group?: Group;
}
