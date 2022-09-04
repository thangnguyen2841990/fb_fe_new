import {User} from './user';
import {Post} from './post';
import {CommentEntity} from './comment-entity';

export interface LikeComment {
  id?: number;

  fromUser?: User;

  post?: Post;

  comment?: CommentEntity;
}
