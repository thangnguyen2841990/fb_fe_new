import {StatusPost} from './status-post';
import {User} from './user';

export interface PostDto {
   id?: number;

  content?: string;

  dateCreated?: string;

  statusPostImage?: number;

  statusPost?: StatusPost;

  user?: User;
}
