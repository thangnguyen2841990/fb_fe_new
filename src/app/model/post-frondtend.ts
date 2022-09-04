import {PostDto} from './post-dto';
import {Comment} from './comment';
import {Image} from './image';


export interface PostFrondtend {

  postDTO?: PostDto;

  totalLikePost?: number;

  comments?: Comment[];

  totalComments?: number;

  images?: Image[];

}
