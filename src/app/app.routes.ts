import { Routes } from '@angular/router';
import { ApiKeyFormComponent } from './pages/api-key-form/api-key-form.component';
import { KeyGuard } from './guards/key.guard';

export const routes: Routes = [
  {
    path: 'enter',
    component: ApiKeyFormComponent
  },
  {
    path: '',
    loadChildren: () => import('./layout-ui/layout-ui.routes').then(mod => mod.LAYOUT_UI_ROUTES),
    canActivate: [KeyGuard]
  }
];
