import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../models/member';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  @Input() member: Member;
  url="http://localhost:1337/uploads/";

  constructor() { }

  ngOnInit(): void {
  }

}
