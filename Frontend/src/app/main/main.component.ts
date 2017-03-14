import {Component, ViewContainerRef, OnInit} from '@angular/core';
import '../styles/main.scss';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'main',
	template: `
	<router-outlet></router-outlet>
`
})
export class MainComponent {

}
