import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {ConnectionService} from "../../../Services/connection.service";
import {TokenData} from "../../../Interfaces/token-data";
import {DeleteUserData} from "../../../Interfaces/updateUser/delete-user-data";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BannerService} from "../../../Services/banner.service";
import {BannerType} from "../../../Constantes/banner-type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.scss'
})
export class UserDeleteComponent implements OnInit{
  constructor(private userService: UserService,
              private connectionService: ConnectionService,
              private bannerService: BannerService,
              private router: Router) {
  }

  protected showModal!: boolean;
  private user!: TokenData;

  ngOnInit() {
    this.connectionService.checkAccess();
    this.user = this.connectionService.getTokenInfo();
  }

  confirmDeleteForm: FormGroup = new FormGroup({
    password : new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required)
    })

  public swapModal():void{
    this.showModal = !this.showModal;
  }

  public deleteUser():void{
    this.showModal = true;
  }

  public confirmDeleteUser():void{
    if(this.confirmDeleteForm.get("password")!.value != this.confirmDeleteForm.get("confirmPassword")!.value){
      this.bannerService.showBanner("The Password and Confirm Password do not match", BannerType.ERROR);
      this.swapModal();
      return;
    }

    let deleteUser : DeleteUserData = {
      id: this.user.id,
      password: this.confirmDeleteForm.get("password")!.value as string
    }

    this.userService.deleteAccount(deleteUser).subscribe({
      next: () => {
        this.bannerService.showPersistentBanner("Your account has been deleted", BannerType.SUCCESS);
        this.connectionService.logout();
        this.router.navigate(['/']);
      },
      error: error => {
        if (error.status == 403) {
          this.bannerService.showBanner("Incorrect password. Please try again", BannerType.ERROR);
          return;
        }
        this.bannerService.showBanner("An error occurred while deleting your account", BannerType.ERROR);
      }
    });
  }
}
