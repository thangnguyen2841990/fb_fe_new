import {Component, OnInit, TemplateRef} from '@angular/core';
import {Group} from '../../model/group';
import {AuthService} from '../../service/auth/auth.service';
import {GroupService} from '../../service/group/group.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  currentUserId: number;
  modalRef: BsModalRef;
  groupId: number;
  groupEditForm: FormGroup;
  constructor(private authService: AuthService,
              private groupService: GroupService,
              private modalService: BsModalService) {
    this.currentUserId = this.authService.currentUserValue.id;
  }

  ngOnInit() {
    this.getAllGroupOfUser();
  }
  getAllGroupOfUser() {
    this.groupService.getAllGroupOfUser(this.currentUserId).subscribe((groups) => {
      this.groups  = groups;
    })
  }
  findGroupById(groupId:number) {
    this.groupService.findById(groupId).subscribe((group)=>{
      this.groupEditForm = new FormGroup({
        name: new FormControl(group.name, Validators.required),
        groupStatus: new FormControl(''),
        statusId: new FormControl(group.groupStatus.id, Validators.required),
      })
    })
  }
  openModalEdit(templateEditGroup: TemplateRef<any>, groupId: number) {
    this.modalRef = this.modalService.show(
      templateEditGroup,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.groupId = groupId;
    this.findGroupById(groupId);
  }

  editGroup() {
    const status = this.groupEditForm.value;
    this.groupEditForm.patchValue({
      groupStatus: {
        id: status.statusId,
        name: ''
      }
    });
    this.groupService.update(this.groupId, this.groupEditForm.value).subscribe(() => {
      this.getAllGroupOfUser();
      this.modalRef.hide();
    });
  }

  openModalDelete(templateDeleteGroup: TemplateRef<any>, groupId: number) {
    this.modalRef = this.modalService.show(
      templateDeleteGroup,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.groupId = groupId;
  }

  deleteGroup() {
    this.groupService.delete(this.groupId).subscribe((group)=>{
      this.modalRef.hide();
      this.getAllGroupOfUser();
    })
  }
}
