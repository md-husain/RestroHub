import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//MAT MODULES
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupComponent } from './components/signup/signup.component';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  PB_DIRECTION,
} from 'ngx-ui-loader';
import { AuthGuardService, JwtInterceptor } from '@frontend/users';
import { Route, RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { UtilitiesModule } from '@frontend/utilities';
import { UsersModule } from '@frontend/users';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PanelComponent } from './pages/panel/panel.component';
import { CategoryComponent } from './pages/category/category.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { BillsComponent } from './pages/bills/bills.component';
import { ViewBillComponent } from './components/view-bill/view-bill.component';
import { UsersComponent } from './pages/users/users.component';
const routes: Route[] = [
  { path: '', component: HomePageComponent },
  {
    path: 'panel',
    component: PanelComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'bills', component: BillsComponent },
      { path: 'users', component: UsersComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: '#ffffff',
  textPosition: 'center-center',
  pbColor: 'red',
  bgsColor: 'red',
  fgsColor: 'red',
  fgsSize: 100,
  pbThickness: 5,
  fgsType: SPINNER.ballSpinClockwise,
  pbDirection: PB_DIRECTION.leftToRight,
};

const UI_MODULES = [
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  HotToastModule.forRoot(),
  UtilitiesModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    PanelComponent,
    CategoryComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    CategoriesFormComponent,
    ProductsComponent,
    ProductsFormComponent,
    OrdersComponent,
    BillsComponent,
    ViewBillComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    UI_MODULES,
    UsersModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [HomePageComponent, SignupComponent],
})
export class AppModule {}
