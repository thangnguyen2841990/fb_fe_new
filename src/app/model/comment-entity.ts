import {User} from './user';
import {Post} from './post';

export interface CommentEntity {
  id?: number;

  content?: string;

  dateCreated?: Date;

  formUser?: User;

  post?: Post;
}
