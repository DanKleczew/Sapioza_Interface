import { Component } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ConnectionService} from "../../Services/connection.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.scss'
})
export class ConnectionComponent {
  constructor(private connectionService: ConnectionService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.connectionService.isLogged()) {
      this.router.navigate(['']);
    }
  }
}
