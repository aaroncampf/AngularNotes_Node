import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {MainComponent} from './main/main.component';
import {MobileNavigationComponent} from './main/ui/mobile/m-navigation.component';
import {MobileDashboardComponent} from './main/ui/mobile-dashboard.component';
import {NotFoundComponent} from './main/routes/not-found.component';
import {SharedModule} from './shared/shared.module';
import {UsersModule} from './users/users.module';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from './store/store.module';
import {DynamicFormsModule} from './forms/dynamic-forms.module';
import {SideMenuComponent} from './main/ui/mobile/side-menu.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CRMService} from './main/services/crm.service';
import {CompaniesComponent} from './main/components/companies.component';
import {ContactComponent} from './main/components/contacts.component';
import {QuotesComponent} from './main/components/quotes.component';
import {NotesComponent} from './main/components/notes.component';
import {ViewComponent} from './main/view.component';
import {FormsService} from './forms/services/forms.service';
import {UIService} from './main/services/ui.service';
import {BottomMenuComponent} from './main/ui/bottom-menu.component';

const MAIN_ROUTES: Routes = [
	{path:'main', component: MainComponent},
	{path:'', redirectTo: '/main', pathMatch: 'full'},
	{path: '**', component: NotFoundComponent}
];

const COMPONENTS = [
	ViewComponent,
	SideMenuComponent,
	MainComponent,
	MobileNavigationComponent,
	MobileDashboardComponent,
	NotFoundComponent,
	CompaniesComponent,
	ContactComponent,
	QuotesComponent,
	NotesComponent,
	BottomMenuComponent,
];

const MODULES = [
	RouterModule.forRoot(MAIN_ROUTES),
	CommonModule,
	BrowserAnimationsModule,
	NoopAnimationsModule,
	BrowserModule,
	HttpModule,
	ToastModule.forRoot(),
	UsersModule,
	SharedModule,
	FormsModule,
	ReactiveFormsModule,
	DynamicFormsModule,
	StoreModule,
];

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		MODULES,
	],
	providers: [
		CRMService,
		UIService,

	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	exports: [
		COMPONENTS
	],
	entryComponents: [MainComponent],
	bootstrap: [ViewComponent]
})

export class CRMModule {}
