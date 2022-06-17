import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { CreateEditPartComponent } from './create-edit-part/create-edit-part.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PartComponent } from './part/part.component';
import { PartsComponent } from './parts/parts.component';
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
    component: CreateEditPartComponent,
    canActivate: [AuthGuardGuard]
  }, {
    path: 'parts/:id/edit',
    component: CreateEditPartComponent,
    canActivate: [AuthGuardGuard]
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
    component: UsersComponent,
    canActivate: [AuthGuardGuard]
  }, {
    path: 'users/:id',
    component: UserComponent,
    canActivate: [AuthGuardGuard]
  }, {
    path: 'register',
    component: CreateEditUserComponent
  }, {
    path: 'users/:id/edit',
    component: CreateEditUserComponent,
    canActivate: [AuthGuardGuard]
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
