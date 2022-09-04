import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../service/post/post.service';
import {UserService} from '../../service/user/user.service';
import {AuthService} from '../../service/auth/auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ImageService} from '../../service/image/image.service';
import {LikePostService} from '../../service/like-post/like-post.service';
import {CommentService} from '../../service/comment/comment.service';
import {LikeCommentService} from '../../service/like-comment/like-comment.service';
import {ReplyService} from '../../service/reply/reply.service';
import {PostFrondtend} from '../../model/post-frondtend';
import {User} from '../../model/user';
import {Image} from '../../model/image';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.css']
})
export class AboutUserComponent implements OnInit {
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
  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private userService: UserService,
              private authService: AuthService,
              private modalService: BsModalService,
              private imageService: ImageService,
              private likePostService: LikePostService,
              private commentService: CommentService,
              private likeCommentService: LikeCommentService,
              private replyService: ReplyService) {
    this.currentUserId = this.authService.currentUserValue.id;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.friendId = +paramMap.get('id');
      this.findUserById(this.friendId);
      this.findCurrentUserById(this.currentUserId);
      this.getAllPostAboutUser(this.friendId);

    });
  }

  ngOnInit() {
  }
  getAllPostAboutUser(friendId) {
    this.postService.getAllPostAboutUser(friendId).subscribe((posts) => {
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
      this.getAllPostAboutUser(this.friendId);
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
      this.getAllPostAboutUser(this.friendId);
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
      this.getAllPostAboutUser(this.friendId);
    })
  }

  createComment(currentUserId: number, postId: number) {
    this.commentService.createComment(currentUserId,postId, this.commentForm.value).subscribe((comment)=>{
      this.getAllPostAboutUser(this.friendId);
    })
  }


  deleteComment() {
    this.commentService.deleteComment(this.commentId).subscribe((comment)=>{
      this.getAllPostAboutUser(this.friendId);
    })
  }

  editComemnt() {
    this.commentService.editComment(this.commentId, this.commentEdit.value).subscribe((comment)=>{
      this.getAllPostAboutUser(this.friendId);
    })
  }

  deleteReply() {
    this.replyService.deleteReply(this.replyId).subscribe((reply) => {
      this.getAllPostAboutUser(this.friendId);
    })
  }

  editReply() {
    this.replyService.editReply(this.replyId, this.replyEdit.value).subscribe((reply)=>{
      this.getAllPostAboutUser(this.friendId);
    })
  }
}
