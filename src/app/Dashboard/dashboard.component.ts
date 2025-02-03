import { Component } from '@angular/core';

import { MenuComponent } from '../shared/menu/menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ MenuComponent, RouterModule ],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {

}
