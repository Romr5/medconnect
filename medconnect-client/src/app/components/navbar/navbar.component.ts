import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  user: any = null;

 constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUser();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadUser();
      }
    });
  }

  loadUser(): void {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user = null;
    this.router.navigate(['/']);
  }
}