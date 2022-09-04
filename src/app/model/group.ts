import {User} from './user';
import {StatusGroup} from './status-group';

export interface Group {
  id?: number;

  name?: string;

  avatar?: string;

  backGround?: string;

  groupStatus?: StatusGroup;

  admin?: User;
}
