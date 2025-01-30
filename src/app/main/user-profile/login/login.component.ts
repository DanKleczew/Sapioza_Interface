import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserInfoData} from "../../../Interfaces/user-info-data";
import {UserService} from "../../../Services/user.service";
import {LoginData} from "../../../Interfaces/login-data";
import {ConnectionService} from "../../../Services/connection.service";
import {TokenData} from "../../../Interfaces/token-data";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected name!: string;
  protected firstName!: string;
  protected uuid!: string;
  protected id !: number;

  constructor(private userService: UserService, private connectionService: ConnectionService) {
  }

  ngOnInit() {
    if(this.connectionService.isLogged()){
      let tokenInfo = this.connectionService.getTokenInfo();
      if(tokenInfo != null){
        this.name = tokenInfo.name;
        this.firstName = tokenInfo.firstName;
        this.uuid = tokenInfo.uuid;
        this.id = tokenInfo.id;
        return;
      }
    }
    this.name = "";
    this.firstName = "";
    this.uuid = "";
    this.id = 0;
    console.log(this.uuid);
  }


  formLogin = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });

  onSubmitLogin(){
    let formData: LoginData = {
      email: "",
      password: ""
    }
    formData.email = String(this.formLogin.getRawValue().email);
    formData.password = String(this.formLogin.getRawValue().password);

    this.userService.userLoginLoginData(formData).subscribe(response => {
      this.name = response.name;
      this.firstName = response.firstName;
      this.uuid = response.uuid;
      this.id = response.id;
      let tokenData: TokenData = {
        name: this.name,
        firstName: this.firstName,
        uuid: this.uuid,
        id: this.id
      }
      this.connectionService.saveToken(tokenData);
    });
  }
}
