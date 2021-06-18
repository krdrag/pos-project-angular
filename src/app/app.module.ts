import { AnonymousOnlyGuard } from './guards/anonymous-only.guard';
import { UserState } from './stores/user/user.state';
import { AuthGuard } from './guards/auth.guard';
import { TransactionState } from './stores/transaction/transaction.state';
import { environment } from './../environments/environment.prod';
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
import { TabsContentComponent } from './components/tabs/tabs-content/tabs-content.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticlesTabComponent } from './components/tabs/articles-tab/articles-tab.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArticleButtonComponent } from './components/tabs/article-button/article-button.component';
import { VirtualReceiptComponent } from './components/presentations/virtual-receipt/virtual-receipt.component';
import { OperationsTabComponent } from './components/tabs/operations-tab/operations-tab.component';
import { LogoutOperationComponent } from './components/tabs/operations/logout-operation/logout-operation.component';
import { QuickPickTabComponent } from './components/tabs/quick-pick-tab/quick-pick-tab.component';
import { QuickPickButtonComponent } from './components/tabs/buttons/quick-pick-button/quick-pick-button.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PosComponent,
    NotFoundComponent,
    TabsContentComponent,
    ArticlesTabComponent,
    ArticleButtonComponent,
    VirtualReceiptComponent,
    OperationsTabComponent,
    LogoutOperationComponent,
    QuickPickTabComponent,
    QuickPickButtonComponent,
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
    ], { developmentMode: true }),
    NgbModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
