import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../service/post/post.service';
import {PostFrondtend} from '../../model/post-frondtend';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';
import {AuthService} from '../../service/auth/auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ImageService} from '../../service/image/image.service';
import {Image} from '../../model/image';
import {LikePostService} from '../../service/like-post/like-post.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../../service/comment/comment.service';
import {LikeCommentService} from '../../service/like-comment/like-comment.service';
import {ReplyService} from '../../service/reply/reply.service';
import {UserToken} from '../../model/user-token';
import {Chat} from '../../model/chat';
import {SocketService} from '../../service/socket/socket.service';
import {ChatService} from '../../service/chat/chat.service';

@Component({
  selector: 'app-about-friend',
  templateUrl: './about-friend.component.html',
  styleUrls: ['./about-friend.component.css']
})
export class AboutFriendComponent implements OnInit {
  friendId: number;
  posts: PostFrondtend[] = [];
  friend: User;
  currentUserId: number;
  modalRef: BsModalRef;
  image: Image;
  commentEdit:FormGroup;
  replyEdit: FormGroup;
  user: User;
  commentId: number;
  replyId: number;
  replyForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  });
  commentForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  });
  @ViewChild('message', {static: false, read: ElementRef}) public message: ElementRef<any>;
  isOpened = false;
  content = '';
  currentUser: UserToken = {};
  listMessage: Chat[] = [];
  size = 10;
  toId: number;
  fullname: string;
  avatar: string;
  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private userService: UserService,
              private authService: AuthService,
              private modalService: BsModalService,
              private imageService: ImageService,
              private likePostService: LikePostService,
              private commentService: CommentService,
              private likeCommentService: LikeCommentService,
              private replyService: ReplyService,
              private socketService: SocketService,
              private chatService: ChatService) {
    this.currentUserId = this.authService.currentUserValue.id;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.friendId = +paramMap.get('id');
      this.findUserById(this.friendId);
      this.findCurrentUserById(this.currentUserId);
      this.getAllPostAboutFriend(this.friendId);

    });
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
    });
  }

  getAllPostAboutFriend(friendId) {
    this.postService.getAllPostAboutFriend(friendId).subscribe((posts) => {
      this.posts = posts;
    });
  }
  findCurrentUserById(userID: number) {
    this.userService.findById(userID).subscribe((user)=>{
      this.user = user;
    })
  }
  findUserById(friendId: number) {
    this.userService.findById(friendId).subscribe((friend) => {
      this.friend = friend;
    });
  }

  findImageById(imageId) {
    this.imageService.findImageById(imageId).subscribe((image) => {
      this.image = image;
    });
  }

  openModalShowImage(templateShowImage: TemplateRef<any>, imageId: number) {
    this.modalRef = this.modalService.show(
      templateShowImage,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.findImageById(imageId);
  }

  createLikePost(currentUserId: number, postId: number) {
    this.likePostService.createLikePost(currentUserId, postId).subscribe(()=>{
      this.getAllPostAboutFriend(this.friendId);
    })
  }
  findCommentById(commentId: number) {
    this.commentService.findCommentByID(commentId).subscribe((comment)=>{
      this.commentEdit = new FormGroup({
        content: new FormControl(comment.content, Validators.required)
      })
    })
  }
  findReplyById(replyId: number) {
    this.replyService.findReplyById(replyId).subscribe((reply) => {
      this.replyEdit = new FormGroup({
        content: new FormControl(reply.content, Validators.required)
      })
    })
  }
  openModalEditComment(templateEditComment: TemplateRef<any>, commentId: number) {
    this.modalRef = this.modalService.show(
      templateEditComment,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.commentId = commentId;
    this.findCommentById(commentId);
  }

  openModalDeleteComment(templateDeleteComment: TemplateRef<any>, commentId: number) {
    this.modalRef = this.modalService.show(
      templateDeleteComment,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.commentId = commentId;
  }

  likeComment(currentUserId: number, postId: number, commentId: number) {
    this.likeCommentService.createNewLikeComment(currentUserId, postId, commentId).subscribe((likeComment)=>{
      this.getAllPostAboutFriend(this.friendId);
    })
  }

  openModalEditReply(templateEditReply: TemplateRef<any>, replyID: number) {
    this.modalRef = this.modalService.show(
      templateEditReply,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.replyId = replyID;
    this.findReplyById(replyID);
  }

  openModalDeleteReply(templateDeleteReply: TemplateRef<any>, replyId: number) {
    this.modalRef = this.modalService.show(
      templateDeleteReply,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.replyId = replyId;
  }

  createReply(currentUserId: number, postId: number, commentId: number) {
    this.replyService.createNewReply(currentUserId,postId,commentId,this.replyForm.value).subscribe((reply)=>{
      this.getAllPostAboutFriend(this.friendId);
    })
  }

  createComment(currentUserId: number, postId: number) {
    this.commentService.createComment(currentUserId,postId, this.commentForm.value).subscribe((comment)=>{
      this.getAllPostAboutFriend(this.friendId);
    })
  }


  deleteComment() {
    this.commentService.deleteComment(this.commentId).subscribe((comment)=>{
      this.getAllPostAboutFriend(this.friendId);
    })
  }

  editComemnt() {
    this.commentService.editComment(this.commentId, this.commentEdit.value).subscribe((comment)=>{
      this.getAllPostAboutFriend(this.friendId);
    })
  }

  deleteReply() {
    this.replyService.deleteReply(this.replyId).subscribe((reply) => {
      this.getAllPostAboutFriend(this.friendId);
    })
  }

  editReply() {
    this.replyService.editReply(this.replyId, this.replyEdit.value).subscribe((reply)=>{
      this.getAllPostAboutFriend(this.friendId);
    })
  }
  async openForm() {
    this.isOpened = true;
    if (this.user) {
      this.listMessage = await this.getAllChatHistory(this.currentUserId, this.friend.id);
      this.socketService.connectToChat(this.user, this.message);
      this.scrollBottom();
    }
  }

  scrollBottom() {
    setTimeout(() => {
      this.message.nativeElement.scrollTop = this.message.nativeElement.scrollHeight;
    }, 1);
  }

  closeForm(): void {
    this.isOpened = false;
    this.socketService.disconnect();
  }

  async sentMessage(user: UserToken) {
    const chat: Chat = {
      content: this.content,
      sender: {
        id: this.currentUserId
      },
      status: false,
      receiver: {
        id: this.friend.id
      }
    };
    this.socketService.sendMessage(chat);
    this.content = '';
    this.socketService.drawNewChatMessage(chat, user);
    this.scrollBottom();
  }

  getAllChatHistory(user1Id, user2Id) {
    return this.chatService.getAllChat(user1Id, user2Id).toPromise();
  }

  async loadNewData(user) {
    const element = this.message.nativeElement.scrollTop;
    if (element < 10) {
      this.size += 5;
      this.listMessage = await this.getAllChatHistory(user.id, 1);
    }
  }

  findByUserId(id) {
    this.userService.findById(id).subscribe(userInfo => {
      this.fullname = userInfo.fullName;
      this.avatar = userInfo.avatar;
    });
  }
}
