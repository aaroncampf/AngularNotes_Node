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
	return trigger('routeAnimation', [
		state('*', style({transform: 'translateX(0)', opacity: 1})),
		transition('void => *', [
			style({transform: 'translateX(-100%)', opacity: 0}),
			animate('0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
		]),
		transition('* => void',
			animate('0.1s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({
				transform: 'translateX(100%)',
				opacity: 0
			}))
		)
	])
}