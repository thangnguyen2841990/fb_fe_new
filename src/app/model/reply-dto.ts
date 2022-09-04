import {User} from './user';
import {CommentEntity} from './comment-entity';
import {Post} from './post';

export interface ReplyDto {
  id?: number;

  content?: string;

  dateCreated?: string;

  fromUser?: User;

  comment?: CommentEntity;

  post?: Post;
}
