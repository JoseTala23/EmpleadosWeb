import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private http: HttpClient,
              private router: Router) { }

  onSubmit() {
   
    this.http.get<any>(`https://localhost:8080/employee/getAllByUPN/${this.username}`).subscribe(
      response => {
        
        debugger;
        if (response.Result != null ) {
          this.router.navigate(['/datos-usuario', JSON.stringify(response.Result)]);
        } else {
          this.router.navigate(['/login']);
          console.error('Error: La respuesta del inicio de sesión es nula.');
        }
        console.log(response);
      },
      error => {
        alert(error);
        console.error(error);
      }
    );
  }
}
