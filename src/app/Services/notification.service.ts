import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NotificationResponse} from "../Interfaces/notification-response";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http : HttpClient) { }

  public getPapers(userId: number): Observable<NotificationResponse[]>{
    return this.http.get<NotificationResponse[]>('/notifications/' + userId);
  }
}
