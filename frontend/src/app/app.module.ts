import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "@app/app-routing.module";
import { AppComponent } from "@app/app.component";
import { AuthService } from "@app/services/auth.service";
import { ApiService } from "@app/services/api.service";
import { AppStoreModule } from "@app/store/app-store.module";
import { AuthComponent } from "@app/components/auth/auth.component";
import { UIModule } from "@app/ui.module";
import { NavbarComponent } from "@app/components/navbar/navbar.component";
import { UUIDGuard } from "@app/services/uuid.guard";

@NgModule({
  declarations: [AppComponent, AuthComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppStoreModule,
    UIModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, ApiService, UUIDGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
