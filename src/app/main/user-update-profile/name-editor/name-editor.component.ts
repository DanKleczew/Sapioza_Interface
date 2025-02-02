import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnectionService} from "../../../Services/connection.service";
import {UserService} from "../../../Services/user.service";
import {TokenData} from "../../../Interfaces/token-data";
import {UpdateUserData} from "../../../Interfaces/updateUser/update-user-data";

@Component({
  selector: 'app-name-editor',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './name-editor.component.html',
  styleUrl: './name-editor.component.scss'
})
export class NameEditorComponent {
  constructor(private connectionService: ConnectionService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  protected userTokenInfo ?: TokenData;
  protected formUserProfile!: FormGroup;

  ngOnInit() {
    this.connectionService.updateTokenInfo(Number(localStorage.getItem('idSapioza')));
    this.route.paramMap.subscribe(params => {
      let id = Number(params.get('userId'));
      let tokenInfo = this.connectionService.getTokenInfo();
      if (tokenInfo?.id !== id) {
        this.router.navigate(['connection']);
      }
      this.userTokenInfo = tokenInfo;
    });
    this.initializeForm();
    this.userService.userInfo(this.userTokenInfo!.id).subscribe(user => {

      let tokenData: TokenData = {
        name: user.name,
        firstName: user.firstName,
        uuid: this.userTokenInfo!.uuid,
        id: this.userTokenInfo!.id
      }
      this.connectionService.saveToken(tokenData);
      this.updateForm(tokenData,user.email);
    })
  }

  initializeForm() {
    this.formUserProfile = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('1245', [Validators.required]),
    });
  }

  updateForm(tokenData: TokenData, email: string) {
    this.formUserProfile.patchValue({
      firstName: tokenData.firstName,
      lastName: tokenData.name,
      email: email
    })
  }
  updateFormAfterSubmit(){
    this.formUserProfile.patchValue({
      firstName: localStorage.getItem('firstNameSapioza'),
      lastName: localStorage.getItem('nameSapioza')
    });
  }


  onSubmit(){
    let user: UpdateUserData = {
      firstName: this.formUserProfile.value.firstName,
      name: this.formUserProfile.value.lastName,
      password: this.formUserProfile.value.password,
      id: this.userTokenInfo!.id
    }

    this.userService.updateAccount(user);
    this.connectionService.updateTokenInfo(Number(localStorage.getItem('idSapioza')));
    this.router.navigateByUrl('/profile/modify/'+localStorage.getItem('idSapioza'), { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
  }

