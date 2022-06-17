import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditPartComponent } from './create-edit-part/create-edit-part.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PartComponent } from './part/part.component';
import { PartsComponent } from './parts/parts.component';
import { RegisterComponent } from './register/register.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: PartsComponent
  }, {
    path: 'parts',
    component: PartsComponent
  }, {
    path: 'parts/:id/new',
    component: CreateEditPartComponent
  }, {
    path: 'parts/:id/edit',
    component: CreateEditPartComponent
  }, {
    path: 'parts/:id',
    component: PartComponent,
    // children: [
    //   {
    //     path: 'models',
    //     component: PageNotFoundComponent
    //   }
    // ]
  }, {
    path: 'users',
    component: UsersComponent
  }, {
    path: 'users/:id',
    component: UserComponent
  }, {
    path: 'register',
    component: CreateEditUserComponent
  }, {
    path: 'users/:id/edit',
    component: CreateEditUserComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'unauthorized',
    component: UnauthorizedComponent
  }, {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
