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
	`,
})

export class DiamondLoaderComponent {}