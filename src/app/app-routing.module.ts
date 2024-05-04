import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { RegistrationformComponent } from './Component/registrationform/registrationform.component';
import { ProfileComponent } from './Component/profile/profile.component';

const routes: Routes = [
  {
    path:'home',component:HomeComponent
  },
  {
    path:'',component:HomeComponent
  },
  {
    path:'registration-form',component:RegistrationformComponent
  },
  {
    path:'profile',component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
