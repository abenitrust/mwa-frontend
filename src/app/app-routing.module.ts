import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditPartComponent } from './create-edit-part/create-edit-part.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PartComponent } from './part/part.component';
import { PartsComponent } from './parts/parts.component';

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
    children: [
      {
        path: 'models',
        component: PageNotFoundComponent
      }
    ]
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
