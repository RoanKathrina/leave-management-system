import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  isAdminLoggedIn = new BehaviorSubject(false);
  user = new BehaviorSubject(null);
}