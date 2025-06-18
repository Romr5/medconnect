import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = false;
  title = 'medconnect-client';

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
