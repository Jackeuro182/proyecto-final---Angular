import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { Not404Component } from './pages/not404/not404.component';
import { PatientComponent } from './pages/patient/patient.component';
import { MedicComponent } from './pages/medic/medic.component';
import { MedicDialogComponent } from './pages/medic/medic-dialog/medic-dialog.component';

const routes: Routes = [
  //{ path: '', component: LoginComponent },
  //{ path: 'login', component: LoginComponent },
  {
    path: 'pages',
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/pages.routes').then((x) => x.PagesRoutes),
  },
  //{ path: 'not-404', component: Not404Component },
  { path: 'otra-pagina', component: MedicComponent },
  { path: '**', redirectTo: 'otra-pagina' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
