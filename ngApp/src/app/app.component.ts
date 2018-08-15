import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngApp';
  email: string;
  password: string;
  found: boolean;
  name: string = '';
  constructor(
    private _authService: AuthService,
    private _httpClient: HttpClient) {}
    onNameKeyUp(event:any) {
      this.name = event.target.value;
      this.found = false;
    }
    getProfile() {
      console.log(this.name)
      this._httpClient.get(`http://localhost:3000/api/users/${this.name}`)
       .subscribe (
        (data:any[]) => {
          if(data.length) {
            this.password =data[0].password;
            this.email =data[0].email;
            this.found = true;
          }
        }
      )
    }
}
