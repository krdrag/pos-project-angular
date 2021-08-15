import { AnonymousOnlyGuard } from './guards/anonymous-only.guard';
import { UserState } from './stores/user/user.state';
import { AuthGuard } from './guards/auth.guard';
import { TransactionState } from './stores/transaction/transaction.state';
import { WorkstationState } from './stores/workstation/workstation.state';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/general/login/login.component';
import { PosComponent } from './components/pos/pos.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/general/not-found/not-found.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VirtualReceiptComponent } from './components/presentations/virtual-receipt/virtual-receipt.component';
import { OperationsTabComponent } from './components/tabs/operations-tab/operations-tab.component';
import { LogoutOperationComponent } from './components/tabs/operations/logout-operation/logout-operation.component';
import { QuickPickTabComponent } from './components/tabs/quick-pick-tab/quick-pick-tab.component';
import { QuickPickButtonComponent } from './components/tabs/buttons/quick-pick-button/quick-pick-button.component';
import { ArticleVirtualReceiptComponent } from './components/presentations/article-virtual-receipt/article-virtual-receipt.component';
import { TotalVirtualReceiptComponent } from './components/presentations/total-virtual-receipt/total-virtual-receipt.component';
import { NavbarComponent } from './components/general/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { environment } from './../environments/environment';
import { ClockComponent } from './components/utilities/clock/clock.component';
import { SidebarFooterComponent } from './components/general/sidebar-footer/sidebar-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PosComponent,
    NotFoundComponent,
    VirtualReceiptComponent,
    OperationsTabComponent,
    LogoutOperationComponent,
    QuickPickTabComponent,
    QuickPickButtonComponent,
    ArticleVirtualReceiptComponent,
    TotalVirtualReceiptComponent,
    NavbarComponent,
    ClockComponent,
    SidebarFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent, canActivate: [AnonymousOnlyGuard]},
      {path: 'pos', component: PosComponent, canActivate: [AuthGuard]},
      { path: '', redirectTo: '/pos', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ]),
    NgxsModule.forRoot([
      WorkstationState,
      TransactionState,
      UserState
    ], { developmentMode: !environment.production }),
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  if(!environment.production)
  {
    return new TranslateHttpLoader(http);
  }
  else
  {
    return new TranslateHttpLoader(http, "assets/i18n/");
  }
  
}