import { Component, input } from '@angular/core';

@Component({
	selector: 'app-loader',
	imports: [],
	templateUrl: './loader.html',
	standalone: true,
})
export class Loader {
	title = input<string>(''); //sto od dobijamo od parenta
}
