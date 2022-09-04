import {User} from './user';
import {CommentEntity} from './comment-entity';
import {Post} from './post';

export interface ReplyEntity {
   id?: number;

  content?: string;

  dateCreated?: Date;

  fromUser?: User;

  comment?: CommentEntity;

  post?: Post;
}
