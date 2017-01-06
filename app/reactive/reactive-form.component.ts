import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'reactive-form',
	templateUrl: './app/reactive/reactive-form.component.html'
})

export class ReactiveFormComponent implements OnInit {
	form: FormGroup;
	nameError: string;
	usernameError: string;
	constructor(private fb: FormBuilder){
	
	}
	ngOnInit(){
	this.buildForm();	
	}

	//watch for changes
	processForm(){
		console.log(this.form.value);
	}
	buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.minLength(3)],
      username:['']
    });
  this.form.valueChanges.subscribe(data => {
  this.nameError='';
  this.usernameError='';
  console.log(data)
  let name = this.form.get('name');
  let username = this.form.get('username');
  if (name.invalid && name.dirty) {
    if (name.errors['required']){
    this.nameError = 'Name is required';
    }
    if (name.errors['minlength']){
    this.nameError = 'Name must be atleast 3 characters';
    }
    }
  if (username.invalid && username.dirty) {
    this.usernameError = 'Username is required.';
    }
  });
	} //end build form
}
