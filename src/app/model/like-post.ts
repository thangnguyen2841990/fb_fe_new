import {User} from './user';
import {Post} from './post';

export interface LikePost {
  id?: number;

  fromUser?: User;

  post?: Post;

}
