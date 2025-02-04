import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnectionService} from "../../../Services/connection.service";
import {UserService} from "../../../Services/user.service";
import {TokenData} from "../../../Interfaces/token-data";
import {NameUpdateData} from "../../../Interfaces/updateUser/name-update-data";
import {FirstNameUpdateData} from "../../../Interfaces/updateUser/first-name-update-data";
import {BannerService} from "../../../Services/banner.service";
import {BannerType} from "../../../Constantes/banner-type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-name-editor',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './name-editor.component.html',
  styleUrl: '../../common-stylesheets/form-components.scss'
})
export class NameEditorComponent implements OnInit {

  @Input()
  userId!: number;

  constructor(private connectionService: ConnectionService,
              private router: Router,
              private userService: UserService,
              private bannerService: BannerService,
              ) {
  }

  protected formUserProfile: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.fillForm(this.connectionService.getTokenInfo());
  }


  private fillForm(tokenData: TokenData): void {
    this.formUserProfile.patchValue({
      firstName: tokenData.firstName,
      lastName: tokenData.name,
    })
  }

  protected onSubmit(): void {
    if (this.formUserProfile.invalid){
      this.bannerService.showBanner('Veuillez remplir correctement les champs du formulaire', BannerType.WARNING)
    }

    const nameUpdateData : NameUpdateData = {
      id: this.userId,
      password: this.formUserProfile.get('password')!.value,
      name: this.formUserProfile.get('lastName')!.value
    }
    const firstNameUpdateData: FirstNameUpdateData = {
      id: this.userId,
      password: this.formUserProfile.get('password')!.value,
      firstName: this.formUserProfile.get('firstName')!.value
    };

    this.doUpdate(nameUpdateData, firstNameUpdateData);
  }

  private doUpdate(lastNameData: NameUpdateData, firstNameData: FirstNameUpdateData): void{
    this.userService.updateName(lastNameData).subscribe({
      next: ()=> {
        this.userService.updateFirstName(firstNameData).subscribe({
          next: () => {
            this.connectionService.updateTokenInfo(this.userId);
            this.bannerService.showPersistentBanner("Vos informations ont été modifiées avec succès", BannerType.SUCCESS);
            this.router.navigate(['/user/profile/' + this.connectionService.getTokenInfo().id]);
          },
          error: () => {
            // Theoretically impossible
            this.bannerService.showBanner("Il y a eu un problème pendant l'enregistrement de votre prénom", BannerType.ERROR);
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 403){
          this.bannerService.showBanner("Votre mot de passe est incorrect", BannerType.WARNING);
          return;
        }
        this.bannerService.showBanner("Il y a eu un problème pendant la modification de vos informations", BannerType.ERROR);
      }
    });
  }
  }

