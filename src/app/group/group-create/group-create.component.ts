import { Component, OnInit } from '@angular/core';
import {GroupService} from '../../service/group/group.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StatusGroup} from '../../model/status-group';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
  statusDefault: StatusGroup = {id: 1, name: 'Công khai'};
  groupForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    groupStatus: new FormControl(''),
    statusId: new FormControl(this.statusDefault.id, Validators.required),

  })
  currentUserID: number;
  constructor(private groupService: GroupService,
              private authService: AuthService) {
    this.currentUserID = this.authService.currentUserValue.id;
  }

  ngOnInit() {
  }
  createNewGroup() {
      const status = this.groupForm.value;
      this.groupForm.patchValue({
        groupStatus: {
          id: status.statusId,
          name: ''
        }
      });
      this.groupService.createNewGroup(this.currentUserID, this.groupForm.value).subscribe((group) => {
        alert('success');
        this.groupForm.reset();
      });
  }
}
