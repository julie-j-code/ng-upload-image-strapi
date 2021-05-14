import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  url = 'http://localhost:1337/members';

  constructor(private http: HttpClient) {}

  create(member: Member) {
    return this.http.post<Member>(this.url, member);
  }
}
