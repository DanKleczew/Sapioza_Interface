import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnectionService} from "../../../Services/connection.service";
import {UserService} from "../../../Services/user.service";
import {TokenData} from "../../../Interfaces/token-data";
import {NameUpdateData} from "../../../Interfaces/updateUser/name-update-data";
import {FirstNameUpdateData} from "../../../Interfaces/updateUser/first-name-update-data";
import {BannerService} from "../../../Services/banner.service";
import {BannerType} from "../../../Constantes/banner-type";

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
              private userService: UserService,
              private bannerService: BannerService,
              ) {
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
      password: new FormControl('1234', [Validators.required]),
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
    let nameUpdateData : NameUpdateData = {
      id: this.userTokenInfo!.id,
      password: this.formUserProfile.value.password,
      name: this.formUserProfile.value.lastName
    }
    this.userService.updateName(nameUpdateData).subscribe({
      next: ()=> {
        localStorage.setItem('nameSapioza', this.formUserProfile.value.lastName);
        let firstNameUpdateData: FirstNameUpdateData = {
          id: this.userTokenInfo!.id,
          password: this.formUserProfile.value.password,
          firstName: this.formUserProfile.value.firstName
        };
        this.userService.updateFirstName(firstNameUpdateData).subscribe({
          next: () => {
            localStorage.setItem('firstNameSapioza', this.formUserProfile.value.firstName);
            console.log(localStorage.getItem('firstNameSapioza'));
            this.updateFormAfterSubmit();
            this.bannerService.showBanner("Your update have been updated with success", BannerType.SUCCESS);
          },
          error: () => {
            this.bannerService.showBanner("Error while processing the firstName update", BannerType.ERROR);
          }
        });
      },
        error: error => {
        if(error.status == 403){
          this.bannerService.showBanner("Your Email and Password do not match", BannerType.ERROR);
          return;
        }
        this.bannerService.showBanner("Error while processing the lastName update", BannerType.ERROR);
      }
    });
  }
  }

