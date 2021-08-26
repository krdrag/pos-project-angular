import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from './../environments/environment';

import { AnonymousOnlyGuard } from './guards/anonymous-only.guard';
import { AuthGuard } from './guards/auth.guard';

import { UserState } from './stores/user/user.state';
import { TransactionState } from './stores/transaction/transaction.state';
import { WorkstationState } from './stores/workstation/workstation.state';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/general/login/login.component';
import { PosComponent } from './components/pos/pos.component';
import { NotFoundComponent } from './components/general/not-found/not-found.component';
import { VirtualReceiptComponent } from './components/presentations/virtual-receipt/virtual-receipt.component';
import { OperationsTabComponent } from './components/tabs/operations-tab/operations-tab.component';
import { QuickPickTabComponent } from './components/tabs/quick-pick-tab/quick-pick-tab.component';
import { QuickPickButtonComponent } from './components/tabs/buttons/quick-pick-button/quick-pick-button.component';
import { ArticleVirtualReceiptComponent } from './components/presentations/article-virtual-receipt/article-virtual-receipt.component';
import { TotalVirtualReceiptComponent } from './components/presentations/total-virtual-receipt/total-virtual-receipt.component';
import { NavbarComponent } from './components/general/navbar/navbar.component';
import {PaymentModalComponent} from './components/modals/payment-modal/payment-modal-component'
import { ClockComponent } from './components/utilities/clock/clock.component';
import { SidebarFooterComponent } from './components/general/sidebar-footer/sidebar-footer.component';
import { PaymentVirtualReceiptComponent } from './components/presentations/payment-virtual-receipt/payment-virtual-receipt.component';
import { FooterVirtualReceiptComponent } from './components/presentations/footer-virtual-receipt/footer-virtual-receipt.component';
import { BagsTabComponent } from './components/tabs/bags-tab/bags-tab.component';
import { EditArticleComponent } from './components/modals/edit-article/edit-article.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PosComponent,
    NotFoundComponent,
    VirtualReceiptComponent,
    OperationsTabComponent,
    QuickPickTabComponent,
    QuickPickButtonComponent,
    ArticleVirtualReceiptComponent,
    TotalVirtualReceiptComponent,
    NavbarComponent,
    ClockComponent,
    SidebarFooterComponent,
    PaymentModalComponent,
    PaymentVirtualReceiptComponent,
    FooterVirtualReceiptComponent,
    BagsTabComponent,
    EditArticleComponent
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
    DigitOnlyModule,
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