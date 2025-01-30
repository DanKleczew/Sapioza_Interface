import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../Services/user.service";
import {RegisterData} from "../../../Interfaces/register-data";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  protected showModal!: boolean;

  constructor(private userService: UserService) {
  }

  formUserRegister = new FormGroup({
    firstNameRegister: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastNameRegister: new FormControl('', [Validators.required, Validators.minLength(2)]),
    emailRegister: new FormControl('', [Validators.email, Validators.required]),
    passwordRegister: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPasswordRegister: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  onSubmitRegister(){
    if(this.formUserRegister.getRawValue().passwordRegister != this.formUserRegister.getRawValue().confirmPasswordRegister){
      this.showModal = true;
      return;
    }
    let registerData : RegisterData = {
      firstName: "",
      name: "",
      email: "",
      password: ""
    }
    registerData.firstName = String(this.formUserRegister.getRawValue().firstNameRegister);
    registerData.name = String(this.formUserRegister.getRawValue().lastNameRegister);
    registerData.email = String(this.formUserRegister.getRawValue().emailRegister);
    registerData.password = String(this.formUserRegister.getRawValue().passwordRegister);
    this.userService.createAccount(registerData);
  }

  closeModal(){
    this.showModal = false;
  }
}
