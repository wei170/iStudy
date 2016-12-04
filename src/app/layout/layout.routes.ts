import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
import { AuthGuard } from '../_guards/index'

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: Layout, children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    // { path: 'dashboard', loadChildren: () => System.import('../dashboard/dashboard.module') },
    // { path: 'charts', loadChildren: () => System.import('../charts/charts.module') },
    // { path: 'forms', loadChildren: () => System.import('../forms/forms.module') },
    // { path: 'ui', loadChildren: () => System.import('../ui-elements/ui-elements.module') },
    // { path: 'extra', loadChildren: () => System.import('../extra/extra.module') },
    // { path: 'tables', loadChildren: () => System.import('../tables/tables.module') },
    // { path: 'maps', loadChildren: () => System.import('../maps/maps.module') },
    // { path: 'grid', loadChildren: () => System.import('../grid/grid.module') },
    // { path: 'charts', loadChildren: () => System.import('../charts/charts.module') },
    // { path: 'widgets', loadChildren: () => System.import('../widgets/widgets.module') },

    // iStudy
    { path: 'profile', loadChildren: () => System.import('../profile/profile.module') },
    { path: 'inbox', loadChildren: () => System.import('../inbox/inbox.module') },
    { path: 'registration', loadChildren: () => System.import('../registration/registration.module') },
    { path: 'classroom', loadChildren: () => System.import('../classroom/classroom.module') }
  ]}
];

export const ROUTES = RouterModule.forChild(routes);
