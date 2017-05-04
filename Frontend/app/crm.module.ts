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
import {FormComponent} from './main/forms/form.component';
import {FormQuestionComponent} from './main/forms/form-question.component';
import {UsersModule} from './users/users.module'
import {SharedModule} from './shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {ViewEditComponent} from './main/view.component';
import {QuestionService} from './shared/services/question.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const MAIN_ROUTES: Routes = [
	{path:'user', loadChildren: "./users/users.module#UsersModule"},
	{path:'create', component: FormComponent},
	{path:'dashboard', component: MainComponent},
	{path:'companies', component: ViewEditComponent},
	{path:'contacts', component: ViewEditComponent},
	{path:'notes', component: ViewEditComponent},
	{path:'quotes', component: ViewEditComponent},
	// {path:'', redirectTo: '/companies', pathMatch: 'full'},
	{path: '**', component: NotFoundComponent}
];

const MODULES = [
	FormsModule,
	ReactiveFormsModule,
	RouterModule.forRoot(MAIN_ROUTES),
	AngularCommonModule,
	BrowserAnimationsModule,
	NoopAnimationsModule,
	BrowserModule,
	HttpModule,
	ToastModule.forRoot(),
	UsersModule,
	SharedModule
];

const COMPONENTS = [
	FormQuestionComponent,
	FormComponent,
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
		QuestionService
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
