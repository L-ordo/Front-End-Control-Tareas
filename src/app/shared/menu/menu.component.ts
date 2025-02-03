import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  public menuItems = routes
  .map((route) => route.children ?? [])
  .flat()
  .filter((route) => route && route.path)
  .filter((route) => !route.path?.includes(':'));
}
