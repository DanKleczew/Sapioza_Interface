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
  styleUrls: ['./register.component.scss','../../user-profile/user-profile-register-login.component.scss']
})
export class RegisterComponent {
  protected showModal!: boolean;

  constructor(private userService: UserService) {
  }

  formUserRegister = new FormGroup({
    firstNameRegister: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastNameRegister: new FormControl('', [Validators.required, Validators.minLength(2)]),
    emailRegister: new FormControl('', [ Validators.required, Validators.email]),
    passwordRegister: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPasswordRegister: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  onSubmitRegister(){
    if(!this.formUserRegister.valid){
      this.showModal = true;
      return;
    }
    if(this.formUserRegister.get("passwordRegister")!.value != this.formUserRegister.get("confirmPasswordRegister")!.value){
      this.showModal = true;
      return;
    }
    let registerData : RegisterData = {
      firstName: this.formUserRegister.get("firstNameRegister")!.value as string,
      name: this.formUserRegister.get("lastNameRegister")!.value as string,
      email: this.formUserRegister.get("emailRegister")!.value as string,
      password: this.formUserRegister.get("passwordRegister")!.value as string,
    }
    this.userService.createAccount(registerData).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    }
    );
  }

  closeModal(){
    this.showModal = false;
  }
}
