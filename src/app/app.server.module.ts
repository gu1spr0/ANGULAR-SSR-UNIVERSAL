import { Inject, NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HeaderService } from './services/haeder.service';
@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor(headerService: HeaderService,
              @Inject('REQUEST_HEADERS') private headers: any) {
    headerService.saveHeaders(this.headers);
  }
}
