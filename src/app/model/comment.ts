import {User} from './user';
import {Post} from './post';
import {ReplyDto} from './reply-dto';

export interface Comment {
  id?: number;

  content?: string;

  dateCreated?: string;

  formUser?: User;

  post?: Post;

  totalReply?: number;

  totalLike?: number;

  listReply?: ReplyDto[];
}
