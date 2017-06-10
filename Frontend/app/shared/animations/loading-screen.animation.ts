// taken from https://codepen.io/IvanKhartov/pen/KmgzpX
import {Component} from '@angular/core';
@Component({
	selector: `data-loading-screen`,
	template: `
	<div class="diamonds">
		<div class="diamond diamond-1"></div>
		<div class="diamond diamond-2"></div>
		<div class="diamond diamond-3"></div>
		<div class="diamond diamond-4"></div>
	</div>
		<div class="loading">LOADING DATA</div>
	`,
})

export class DiamondLoaderComponent {}