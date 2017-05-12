import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {MainComponent} from './main/main.component';
import {NavigationComponent} from './main/ui/navigation.component';
import {DashboardComponent} from './main/ui/dashboard.component';
import {NotFoundComponent} from './main/routes/not-found.component';
import {FormQuestionComponent} from './forms/form-question.component';
import {UsersModule} from './users/users.module'
import {SharedModule} from './shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {ViewEditComponent} from './main/view.component';
import {DynamicFormModule} from './forms/dynamic-forms.module';
import {FormComponent} from './forms/components/form.component';

const MAIN_ROUTES: Routes = [
	{path:'user', loadChildren: "./users/users.module#UsersModule"},
	{path:'create', component: FormComponent },
	{path:'dashboard', component: MainComponent},
	{path:'companies', component: ViewEditComponent},
	{path:'contacts', component: ViewEditComponent},
	{path:'notes', component: ViewEditComponent},
	{path:'quotes', component: ViewEditComponent},
	// {path:'', redirectTo: '/user/my-account', pathMatch: 'full'},
	{path: '**', component: NotFoundComponent}
];

const MODULES = [
	RouterModule.forRoot(MAIN_ROUTES),
	AngularCommonModule,
	BrowserAnimationsModule,
	NoopAnimationsModule,
	BrowserModule,
	HttpModule,
	ToastModule.forRoot(),
	UsersModule,
	SharedModule,
	DynamicFormModule
];

const COMPONENTS = [
	FormQuestionComponent,
	ViewEditComponent,
	MainComponent,
	NavigationComponent,
	DashboardComponent,
	NotFoundComponent,
];

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		MODULES,
	],
	providers: [
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
