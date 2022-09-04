import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth/auth.service';
import {PostService} from '../../service/post/post.service';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Router} from '@angular/router';
import {StatusPost} from '../../model/status-post';
import {FriendNotificationService} from '../../service/friend-notification/friend-notification.service';
import {NotificationService} from '../../service/notification/notification.service';
import {ListFriendService} from '../../service/list-friend/list-friend.service';
import {ListFriend} from '../../model/list-friend';
import {PostFrondtend} from '../../model/post-frondtend';
import {LikePostService} from '../../service/like-post/like-post.service';
import {LikeCommentService} from '../../service/like-comment/like-comment.service';
import {CommentService} from '../../service/comment/comment.service';
import {ReplyService} from '../../service/reply/reply.service';
import {Image} from '../../model/image';
import {ImageService} from '../../service/image/image.service';
import {CheckFriend} from '../../model/check-friend';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  submitted: boolean;
  selectedFile: File[] = [];
  currentUserId: number;
  user: User;
  users: User[];
  formData: FormData = new FormData();
  friends: ListFriend[] = [];
  totalFriends: number;
  status: StatusPost = {id: 1, name: 'Tất cả'};
  posts: PostFrondtend[] = [];
  image: Image;
  commentId: number;
  replyId: number;
  commentEdit: FormGroup;
  checkFriendStatus: boolean;

  commentForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required])
  });
  replyForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required])
  });

  postForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(6)]),
    statusId: new FormControl(this.status.id, Validators.required),
    status: new FormControl('')
  });

  replyEdit: FormGroup;

  constructor(private modalService: BsModalService,
              private authService: AuthService,
              private postService: PostService,
              private userService: UserService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              private fb: FormBuilder,
              private notificationFriendService: FriendNotificationService,
              private notificationService: NotificationService,
              private listFriendService: ListFriendService,
              private likePostService: LikePostService,
              private likeCommentService: LikeCommentService,
              private commentService: CommentService,
              private replyService: ReplyService,
              private imageService: ImageService) {
    this.currentUserId = authService.currentUserValue.id;
    this.findById(this.currentUserId);
    this.getAllFriends();


  }

  ngOnInit() {
    this.getAllPostOfFriend();
    this.getAllUser();
  }

  openModalCreate(templateCreate: TemplateRef<any>, currentUserId: number) {
    this.modalRef = this.modalService.show(
      templateCreate,
      Object.assign({}, {class: 'gray modal-lg'})
    );
  }

  changeFile($event) {
    this.selectedFile = $event.target.files;
    console.log(this.selectedFile);
  }

  save() {
    this.submitted = true;
    if (this.postForm.valid) {
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
      if (this.selectedFile != null) {
        for (let i = 0; i < this.selectedFile.length; i++) {
          formData.append('images', this.selectedFile[i]);
        }
      }
      console.log(this.currentUserId);
      console.log(formData);
      this.postService.savePost(this.currentUserId, formData).subscribe(() => {
        this.postForm.reset();
        this.modalRef.hide();
        this.router.navigateByUrl('/home/about');
      });
    } else {
      // this.notificationService.showMessage('error', 'Bạn chưa nhập đủ thông tin!');

    }
    // this.submitted = true;
    // if (this.postForm.valid) {
    //   const status = this.postForm.value;
    //   this.postForm.patchValue({
    //     status: {
    //       id: status.statusId,
    //       name: ''
    //     }
    //   });
    //
    //     // tslint:disable-next-line:prefer-for-of
    //     for (let i = 0; i < this.selectedFile.length; i++) {
    //       const nameImg = this.getCurrentDateTime() + this.selectedFile[i];
    //       const fileRef = this.storage.ref(nameImg);
    //       this.storage.upload(nameImg, this.selectedFile[i]).snapshotChanges().pipe(
    //         finalize(() => {
    //           fileRef.getDownloadURL().subscribe((url) => {
    //             this.imageLink = url;
    //             console.log(this.imageLink);
    //           });
    //         })
    //       ).subscribe();
    //
    //   }
    //   console.log(this.postForm.value);
    //   this.formData.append('content', status.content);
    //   this.formData.append('statusPost', status.statusId);
    //
    //   for (let i = 0; i < this.imageLink.length; i++) {
    //     this.formData.append('images', this.imageLink[i])
    //   }
    //   console.log(this.currentUserId);
    //
    //   this.postRequest.patchValue({
    //     content: status.content
    //   })
    //   this.postRequest.patchValue({
    //     statusPost: {
    //       id: status.statusId,
    //       name: ''
    //     }
    //   })
    //   for (let i = 0; i < this.imageLink.length; i++) {
    //  this.postRequest.setValue([{
    //    images: this.imageLink[i]
    //  }])
    //   }
    //
    //   this.postService.savePost(this.currentUserId, this.postRequest.value).subscribe(() => {
    //     this.postForm.reset();
    //     this.modalRef.hide();
    //     this.router.navigateByUrl('/home/about');
    //   });
    //
    // }
  }

  // getCurrentDateTime(): string {
  //   return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  // }

  getAllPostOfFriend() {
    this.postService.getAllPostOfFriends(this.currentUserId).subscribe((posts)=> {
      this.posts = posts;
    });
  }
  findById(id) {
    this.userService.findById(id).subscribe((user) => {
      this.user = user;
    });
  }

  getAllUser() {
    this.userService.getAllUser(this.currentUserId).subscribe((users) => {
      this.users = users;
    });
  }

  addFriend(fromUserId: number, toUserId: number) {
    this.notificationFriendService.createNewNotification(fromUserId, toUserId).subscribe(() => {
      this.notificationService.showMessage('success', 'Gửi lời mời kết bạn thành công!');
    });
  }
  getAllFriends() {
    this.listFriendService.getAllFriendOfUser(this.currentUserId).subscribe((listFriend) => {
      this.friends = listFriend;
      this.totalFriends = listFriend.length;
    });
  }
  openModalShowImage(templateShowImage: TemplateRef<any>, imageId: number) {
    this.modalRef = this.modalService.show(
      templateShowImage,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.findImageById(imageId);
  }
  likePost(currentUserId: number, postId: number) {
    this.likePostService.createLikePost(currentUserId, postId).subscribe((likePost) => {
      this.getAllPostOfFriend();
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
    this.likeCommentService.createNewLikeComment(currentUserId, postId, commentId).subscribe((likeComment) => {
      this.getAllPostOfFriend();
    })
  }
  createComment(currentUserId: number, postId: number) {
    this.commentService.createComment(currentUserId, postId, this.commentForm.value).subscribe(() => {
      this.getAllPostOfFriend();
      this.commentForm.reset();
    })
  }

  openModalDeleteReply(templateDeleteReply: TemplateRef<any>, replyId: number) {
    this.modalRef = this.modalService.show(
      templateDeleteReply,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.replyId = replyId;
  }

  createReply(currentUserId: number, postId: number, commentId: number) {
    this.replyService.createNewReply(currentUserId,postId,commentId,this.replyForm.value).subscribe((reply) => {
      this.replyForm.reset();
      this.getAllPostOfFriend();
    })
  }
  findImageById(imageId: number) {
    this.imageService.findImageById(imageId).subscribe((image) => {
      this.image = image;
    })
  }

  deleteComment() {
    this.commentService.deleteComment(this.commentId).subscribe((comment) => {
      this.getAllPostOfFriend();
      this.modalRef.hide();
    })
  }

  editComemnt() {
    this.commentService.editComment(this.commentId, this.commentEdit.value).subscribe((comment) => {
      this.getAllPostOfFriend();
      this.modalRef.hide();
    })
  }

  deleteReply() {
    this.replyService.deleteReply(this.replyId).subscribe((reply) => {
      this.modalRef.hide();
      this.getAllPostOfFriend();
    })
  }

  openModalEditReply(templateEditReply: TemplateRef<any>, replyId: number) {
    this.modalRef = this.modalService.show(
      templateEditReply,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.replyId = replyId;
    this.findReplyById(replyId);
  }

  editReply() {
    this.replyService.editReply(this.replyId, this.replyForm.value).subscribe((reply) => {
      this.modalRef.hide();
      this.getAllPostOfFriend();
    })
  }
  findCommentById(commentId: number) {
    this.commentService.findCommentByID(commentId).subscribe((comment) => {
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
