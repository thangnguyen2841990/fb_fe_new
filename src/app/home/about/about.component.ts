import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';
import {AuthService} from '../../service/auth/auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostFrondtend} from '../../model/post-frondtend';
import {PostService} from '../../service/post/post.service';
import {ImageService} from '../../service/image/image.service';
import {Image} from '../../model/image';
import {NotificationService} from '../../service/notification/notification.service';
import {Router} from '@angular/router';
import {LikePostService} from '../../service/like-post/like-post.service';
import {CommentService} from '../../service/comment/comment.service';
import {ReplyService} from '../../service/reply/reply.service';
import {LikeCommentService} from '../../service/like-comment/like-comment.service';
import {CommentEntity} from '../../model/comment-entity';
import {StatusPost} from '../../model/status-post';
import {ListFriendService} from '../../service/list-friend/list-friend.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  user: User;
  modalRef: BsModalRef;
  currentUserId: number;
  avatarFile: any;
  backGroundFile: any;
  isShowComment = false;
  image: Image;
  commentId: number;
  comment: CommentEntity;
  postId: number;
  status: StatusPost = {id: 1, name: 'Tất cả'};
  statusEdit: StatusPost = {};
  postForm: FormGroup;
  images: any[];
  selectedFile: any;
  replyId: number;
  commentForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required])
  });
  avatarForm: FormGroup = new FormGroup({
    statusId: new FormControl(this.status.id, Validators.required),
    avatar: new FormControl('', Validators.required)
  });
  backGroundForm: FormGroup = new FormGroup({
    statusId: new FormControl(this.status.id, [Validators.required]),
    background: new FormControl('', [Validators.required])
  });
  posts: PostFrondtend[] = [];
  replyForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  });
  commentEdit: FormGroup;
  imageId: number;
  replyEdit: FormGroup;
  checkFriendStatus: boolean;

  constructor(private userService: UserService,
              private authService: AuthService,
              private modalService: BsModalService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private postService: PostService,
              private imageService: ImageService,
              private notificationService: NotificationService,
              private router: Router,
              private likePostService: LikePostService,
              private commentService: CommentService,
              private replyService: ReplyService,
              private likeCommentService: LikeCommentService,
              private listFriendService: ListFriendService) {
    this.currentUserId = this.authService.currentUserValue.id;
    this.findUserByUserId(this.currentUserId);
    this.findCommentByID(this.commentId);
    this.getAllPostOfUser();

  }

  ngOnInit() {
  }

  findUserByUserId(id) {
    this.userService.findById(id).subscribe((user) => {
      this.user = user;
    });
  }

  openModalChangeAvatar(templateChangeAvatar: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      templateChangeAvatar,
      Object.assign({}, {class: 'gray modal-lg'})
    );
  }

  changeAvatar($event) {
    this.avatarFile = $event.target.files[0];
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  editAvatar() {
    const formData = new FormData();
    formData.append('avatar', this.avatarFile);
    formData.append('statusPost', this.avatarForm.value.statusId);
    this.userService.changeAvatar(formData, this.currentUserId).subscribe((user) => {
      this.user = user;
      this.notificationService.showMessage('success', 'Thay đổi avatar thành công!');
      this.getAllPostOfUser();
      this.modalRef.hide();
      this.router.navigateByUrl('/home/about');
    }, error => {
      this.notificationService.showMessage('error', 'Thay đổi avatar thất bại!');
    });
    // const fileRef = this.storage.ref(nameImg);
    // this.storage.upload(nameImg, this.avatarFile).snapshotChanges().pipe(
    //   finalize(() => {
    //     fileRef.getDownloadURL().subscribe((url) => {
    //       console.log(url);
    //       this.avatarRequest.patchValue({avatar: url});
    //       this.userService.changeAvatar(this.avatarRequest.value, this.currentUserId).subscribe(() => {
    //         alert('success');
    //       });
    //     });
    //   })
    // ).subscribe();
  }

  changeBackground($event) {
    this.backGroundFile = $event.target.files[0];
  }

  editBackground() {
    const formData = new FormData();
    formData.append('backGround', this.backGroundFile);
    formData.append('statusPost', this.backGroundForm.value.statusId);
    this.userService.changeBackGround(formData, this.currentUserId).subscribe((user) => {
      this.user = user;
      this.notificationService.showMessage('success', 'Thay đổi ảnh nền thành công!');
      this.getAllPostOfUser();
      this.modalRef.hide();
    }, error => {
      this.notificationService.showMessage('error', 'Thay đổi ảnh nền thất bại!');
    });
  }

  openModalChangeBackground(templateChangeBackground: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      templateChangeBackground,
      Object.assign({}, {class: 'gray modal-lg'})
    );
  }

  getAllPostOfUser() {
    this.postService.getAllPostOfUser(this.currentUserId).subscribe((posts) => {
      this.posts = posts;
    });
  }

  showComment() {
    this.isShowComment = !this.isShowComment;
  }

  openModalEdit(templateEdit: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateEdit,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.findPostByPostID(id);
    this.postId = id;
  }

  openModalWithClass(templateDelete: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateDelete,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.postId = id;
  }

  openModalShowImage(templateShowImage: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateShowImage,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.findImageById(id);
  }

  findImageById(id) {
    this.imageService.findImageById(id).subscribe((image) => {
      this.image = image;
    });
  }

  createLikePost(userId: number, postId: number) {
    this.likePostService.createLikePost(userId, postId).subscribe((likePost) => {
      this.getAllPostOfUser();
    });
  }

  createComment(userId: number, postId: number) {
    this.commentService.createComment(userId, postId, this.commentForm.value).subscribe((comment) => {
      this.commentForm.reset();
      this.getAllPostOfUser();
    });
  }

  createReply(currentUserId: number, commentId: number, postId: number) {
    this.replyService.createNewReply(currentUserId, postId, commentId, this.replyForm.value).subscribe(() => {
      this.replyForm.reset();
      this.getAllPostOfUser();
    });
  }

  likeComment(userId: number, postId: number, commentId: number) {
    this.likeCommentService.createNewLikeComment(userId, postId, commentId).subscribe((like) => {
      this.getAllPostOfUser();
    });
  }

  openModalEditComment(templateEditComment: TemplateRef<any>, commentId: number) {
    this.modalRef = this.modalService.show(
      templateEditComment,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.commentId = commentId;
    this.findCommentByID(commentId);
  }

  openModalDeleteComment(templateDeleteComment: TemplateRef<any>, commentId: number) {
    this.modalRef = this.modalService.show(
      templateDeleteComment,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.commentId = commentId;
  }

  editComemnt() {
    this.commentService.editComment(this.commentId, this.commentEdit.value).subscribe(() => {
      this.getAllPostOfUser();
      this.modalRef.hide();
    });
  }

  deleteComment() {
    this.commentService.deleteComment(this.commentId).subscribe((comment) => {
      this.modalRef.hide();
      this.getAllPostOfUser();
    })
  }

  findCommentByID(commentId: number) {
    this.commentService.findCommentByID(commentId).subscribe((comment) => {
      this.comment = comment;
      this.commentEdit = new FormGroup({
        content: new FormControl(comment.content, Validators.required)
      })
    })
  }

  deletePost() {
    this.postService.deletePost(this.postId).subscribe(() => {
      this.getAllPostOfUser();
      this.modalRef.hide();
    })
  }

  findPostByPostID(postId: number) {
    this.postService.getPostById(postId).subscribe((post) => {
      this.statusEdit = {id: post.postDTO.statusPost.id, name: post.postDTO.statusPost.name}
      this.postForm = new FormGroup({
        content: new FormControl(post.postDTO.content, [Validators.required, Validators.minLength(6)]),
        statusId: new FormControl(this.statusEdit.id, Validators.required),
        status: new FormControl('')
      })
      this.images = post.images;
    })
  }
  changeFile($event) {
    this.selectedFile = $event.target.files;
  }
  updatePost() {
    const status = this.postForm.value;
    this.postForm.patchValue({
      status: {
        id: status.statusId,
        name: ''
      }
    });
    const formData = new FormData();
    console.log(this.postForm.value);
    formData.append('content', this.postForm.value.content);
    formData.append('statusPost', this.postForm.value.status.id);
    if (this.selectedFile !== null) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.selectedFile.length; i++) {
        formData.append('images', this.selectedFile[i]);
      }
    }
    this.postService.updatePost(this.postId, formData).subscribe(() => {
      this.notificationService.showMessage('success', 'Cập nhật bài đăng thành công!');
      this.modalRef.hide();
      this.getAllPostOfUser();
      this.selectedFile = null;
    });
  }


  openModalDeleteImage(templateDeleteImage: TemplateRef<any>, imageId: number) {
    this.modalRef = this.modalService.show(
      templateDeleteImage,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.imageId = imageId;
    console.log('id image '+this.imageId);
  }

  deleteImage() {
    this.imageService.deleteImage(this.imageId).subscribe((image) => {
      this.findPostByPostID(this.postId);
      this.getAllPostOfUser();
      this.modalRef.hide();
    });
  }

  openModalEditReply(templateEditReply: TemplateRef<any>, replyId: number) {
    this.modalRef = this.modalService.show(
      templateEditReply,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.replyId = replyId;
    this.findReplyById();
  }

  openModalDeleteReply(templateDeleteReply: TemplateRef<any>, replyId: number) {
    this.modalRef = this.modalService.show(
      templateDeleteReply,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.replyId = replyId;
  }

  deleteReply() {
    this.replyService.deleteReply(this.replyId).subscribe((reply)=> {
        this.getAllPostOfUser();
        this.modalRef.hide();
    })
  }
  findReplyById() {
    this.replyService.findReplyById(this.replyId).subscribe((reply) => {
      this.replyEdit = new FormGroup({
        content : new FormControl(reply.content, [Validators.required])
      });
    })
  }

  editReply() {
    this.replyService.editReply(this.replyId, this.replyEdit.value).subscribe((reply)=>{
        this.modalRef.hide();
        this.getAllPostOfUser();
    })
  }

  checkFriend(currentUserId: number, userId: number) {
    this.listFriendService.checkFriend(currentUserId, userId).subscribe((checkFriend)=>{
      this.checkFriendStatus = checkFriend.status;
    })
  }

  navigateUrl(userId: number) {
    this.checkFriend(this.currentUserId, userId);
    if (this.checkFriendStatus === true) {
      this.router.navigateByUrl(`/home/aboutFriend/${userId}`);
    }
    if (this.checkFriendStatus === false) {
      this.router.navigateByUrl(`/home/aboutUser/${userId}`);
    }
  }
}
