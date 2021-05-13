import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDatePickerConfig } from 'ng2-date-picker';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {
  createMember: FormGroup;
  datePickerConfig: IDatePickerConfig = { locale: 'fr', showMultipleYearsNavigation: true };
  @Input() imageName;

  // comme on utilise ReactiveFormsModule,
  // le formulaire est déjà crée côté ts
  // puis on lie FormGroup au formulaire côté html

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createMember = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      dob: [''],
      imageName: this.imageName
    });
  }

  create() {
    console.log(this.createMember.value);
  }
}
