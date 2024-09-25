import { ConfirmComponent } from './components/confirm/confirm.component';
import { PayComponent } from './components/pay/pay.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'pay', component: PayComponent, canActivate: [AuthGuard] },
  { path: 'confirm', component: ConfirmComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
