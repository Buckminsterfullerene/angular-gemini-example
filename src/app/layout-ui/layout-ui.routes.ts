import { Route } from '@angular/router';
import { AskFormComponent } from '../pages/ask-form/ask-form.component';
import { LayoutUiComponent } from './layout-ui.component';

export const LAYOUT_UI_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutUiComponent,
    children: [
      {
        path: '',
        component: AskFormComponent
      }
    ]
  }
]
