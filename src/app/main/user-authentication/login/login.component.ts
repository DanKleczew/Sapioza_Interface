import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../Services/user.service";
import {LoginData} from "../../../Interfaces/login-data";
import {ConnectionService} from "../../../Services/connection.service";
import {TokenData} from "../../../Interfaces/token-data";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',]
})
export class LoginComponent {
  protected name!: string;
  protected firstName!: string;
  protected uuid!: string;
  protected id !: number;
  protected searchUserId!: number;

  constructor(private userService: UserService,
              private connectionService: ConnectionService,
              private route: ActivatedRoute,
              private router: Router) {
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
  }

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
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
      this.router.navigate(['/profile/'+this.id]);
    });
  }
}
