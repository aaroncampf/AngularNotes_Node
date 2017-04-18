"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
function liftOffTransitions() {
    return liftOff();
}
exports.liftOffTransitions = liftOffTransitions;
function liftOff() {
    return animations_1.trigger('contentState', [
        animations_1.state('in', animations_1.style({
            opacity: '1',
            transform: 'translateY(0%) scale(1)',
        })),
        animations_1.state('out', animations_1.style({
            opacity: '0',
            transform: 'translateY(0%) scale(2)',
        })),
        animations_1.transition('out => in', animations_1.animate('400ms, ease-out')),
        animations_1.transition('in => out', animations_1.animate('400ms, ease-in')),
        animations_1.transition('void => in', [
            animations_1.style({ transform: 'translateX(100%)', opacity: 0 }),
            animations_1.animate('400ms, ease-out'),
        ]),
        animations_1.transition('in => void', [
            animations_1.animate(200, animations_1.style({ transform: 'translateX(-100%) scale(0)' }))
        ])
    ]);
}
function slideTransitions() {
    return slide();
}
exports.slideTransitions = slideTransitions;
function slide() {
    return animations_1.trigger('contentState', [
        animations_1.state('in', animations_1.style({
            opacity: '1',
            transform: 'translateY(0%)'
        })),
        animations_1.state('out', animations_1.style({
            opacity: '0',
            transform: 'translateY(200%)'
        })),
        animations_1.transition('void => in', [
            animations_1.style({ transform: 'translateY(-100%)' }),
            animations_1.animate('400ms, ease-out'),
        ]),
        animations_1.transition('in => out', [
            // style({transform: 'translateY(-200%)'}),
            animations_1.animate('400ms, ease-in'),
        ])
    ]);
}
//# sourceMappingURL=transitions.animation.js.map