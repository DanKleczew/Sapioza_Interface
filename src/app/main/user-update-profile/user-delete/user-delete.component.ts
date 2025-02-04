import {Component, Input} from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {ConnectionService} from "../../../Services/connection.service";
import {DeleteUserData} from "../../../Interfaces/updateUser/delete-user-data";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BannerService} from "../../../Services/banner.service";
import {BannerType} from "../../../Constantes/banner-type";
import {Router} from "@angular/router";
import {ButtonComponent} from "../../widgets/buttons/button/button.component";

@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss', '../../common-stylesheets/form-components.scss']
})
export class UserDeleteComponent {

  @Input()
  userId!: number;

  protected showModal: boolean = false;

  constructor(private userService: UserService,
              private connectionService: ConnectionService,
              private bannerService: BannerService,
              private router: Router) {
  }


  confirmDeleteForm: FormGroup = new FormGroup({
    password : new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required)
    })

  protected swapModal(): void {
    this.showModal = !this.showModal;
  }

  protected askDeleteUser(): void {
    this.showModal = true;
  }

  protected confirmDeleteUser(): void {
    if(this.confirmDeleteForm.invalid){
      this.swapModal();
      this.bannerService.showBanner('Veuillez remplir correctement les champs du formulaire', BannerType.WARNING);
      return;
    }
    if(this.confirmDeleteForm.get("password")!.value != this.confirmDeleteForm.get("confirmPassword")!.value){
      this.swapModal();
      this.bannerService.showBanner("Vos mots de passe ne correspondent pas, veuillez réessayer", BannerType.WARNING);
      return;
    }

    const deleteUser : DeleteUserData = {
      id: this.userId,
      password: this.confirmDeleteForm.get("password")!.value
    };
    this.doDelete(deleteUser);
  }

  private doDelete(deleteUserData: DeleteUserData){
    this.userService.deleteAccount(deleteUserData).subscribe({
      next: () => {
        this.bannerService.showPersistentBanner("Votre compte a été supprimé avec succès.", BannerType.SUCCESS);
        this.connectionService.logout();
        this.router.navigate(['/']);
      },
      error: error => {
        this.swapModal();
        if (error.status == 403) {
          this.bannerService.showBanner("Mauvais mot de passe, veuillez réessayer", BannerType.WARNING);
          return;
        }
        this.bannerService.showBanner("Une erreur s'est produite pendant la suppression de votre compte",
          BannerType.ERROR);
      }
    });
  }
}
