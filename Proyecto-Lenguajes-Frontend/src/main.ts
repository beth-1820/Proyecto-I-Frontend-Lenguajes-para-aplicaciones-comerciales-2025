// src/main.ts
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication }                from '@angular/platform-browser';
import { provideRouter }                      from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { provideZoneChangeDetection }         from '@angular/core';

import { AppComponent }         from './app/app.component';
import { routes }               from './app/app.routes';
import { AuthInterceptor }      from './app/interceptors/auth.interceptor';
import { environment }          from './app/enviroments/enviroment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    
    // 1) Optimización de detección de cambios
    provideZoneChangeDetection({ eventCoalescing: true }),

    // 2) Enrutamiento
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()   
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
.catch(err => console.error(err));
