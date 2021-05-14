import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IDatePickerConfig } from 'ng2-date-picker';
import { MemberService } from '../services/member.service';
import { Member } from '../models/member';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {
  createMember: FormGroup;
  datePickerConfig: IDatePickerConfig = {
    locale: 'fr',
    showMultipleYearsNavigation: true,
  };
  @Input() imageName;

  constructor(private fb: FormBuilder, private memberService: MemberService) { }

  ngOnInit(): void {
    this.createMember = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      dob: [null],
      dateOfSubscription: [null],
      imageName: this.imageName,
      address: this.fb.group({
        street: [''],
        streetComplement: [''],
        zip: [''],
        town: [''],
      }),
    });
  }

  create() {
    console.log(this.createMember.value);
    let member: Member = this.createMember.value;
    // transformation des strings en date
    member = { ...this.createMember.value, dob: new Date(member.dob), dateOfSubscription: new Date(member.dateOfSubscription) }
    this.memberService.create(member).subscribe(
      (data) => {
        console.log('MemberFormComponent | create | data', data);
      },
      (err) => console.error(err)
    );
  }
}
