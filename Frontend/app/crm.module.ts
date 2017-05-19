import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {MainComponent} from './main/main.component';
import {MobileNavigationComponent} from './main/ui/mobile/m-navigation.component';
import {MobileDashboardComponent} from './main/ui/mobile-dashboard.component';
import {NotFoundComponent} from './main/routes/not-found.component';
import {UsersModule} from './users/users.module'
import {SharedModule} from './shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {DynamicFormsModule} from './forms/dynamic-forms.module';
import {HomeComponent} from './main/ui/home.component';
import {SideMenuComponent} from './main/ui/mobile/side-menu.component';
import {CRMStoreModule} from './store/store.module'
import {CRMType} from './main/models/crm-models.type';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CRMService} from './main/services/crm.service';
import {CompaniesComponent} from './main/components/companies.component';
import {ContactComponent} from './main/components/contacts.component';
import {QuotesComponent} from './main/components/quotes.component';
import {NotesComponent} from './main/components/notes.component';

const MAIN_ROUTES: Routes = [
	{path:'main', component: HomeComponent},
	{path:'', redirectTo: '/main', pathMatch: 'full'},
	{path: '**', component: NotFoundComponent}
];
const COMPONENTS = [
	SideMenuComponent,
	HomeComponent,
	MainComponent,
	MobileNavigationComponent,
	MobileDashboardComponent,
	NotFoundComponent,
	CompaniesComponent,
	ContactComponent,
	QuotesComponent,
	NotesComponent,
];
const MODULES = [
	CRMStoreModule,
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
];
export interface CRMStore {
	crm?: {
		[index:number]:CRMType[];
		key: string;
	}[];
	user?: {};
	session?: {
		selected: CRMType;
		formContext: string;
		sideMenu: {
			toggle: number;
			toggled: boolean;
		},
		bottomMenu: {
			toggle: number;
			toggled: boolean;
		},
		listItems: {
			items: {}[]
			questions: {}[],
			controls: {[name: string]: FormControl}
		}
	}
}

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		MODULES,
	],
	providers: [
		CRMService
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	exports: [
		COMPONENTS
	],
	bootstrap: [MainComponent]
})

export class CRMModule {}
