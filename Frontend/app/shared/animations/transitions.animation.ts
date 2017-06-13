import {animate, state, style, transition, trigger} from '@angular/animations';

export const slideLeft = () =>  {
	return trigger('contentState', [
		state('void => in', style({
			opacity: '1',
			transform: 'translateY(-100%) scale(1)',
		})),
		state('out => void', style({
			opacity: '0',
			transform: 'translateY(100%) scale(1)',
		})),
		transition('out => void', animate('400ms, ease-out')),
		transition('void => in', animate('400ms, ease-in')),
		transition('', [
			style({transform: 'translateX(0%)', opacity: 0}),
			animate('400ms, ease-out'),
		]),
	])
}

export function slideTransitions() {
	return slide();
}

function slide() {
	return trigger('contentState', [
		state('in', style({
			opacity: '1',
			transform: 'translateY(0%)'
		})),
		state('out', style({
			opacity: '0',
			transform: 'translateY(200%)'
		})),
		transition('void => in', [
			style({transform: 'translateY(-100%)'}),
			animate('400ms, ease-out'),
		]),
		transition('in => out', [
			// style({transform: 'translateY(-200%)'}),
			animate('400ms, ease-in'),
		])
	])
}