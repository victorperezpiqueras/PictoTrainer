import { trigger, transition, style, query } from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
  transition('One => Two, Two => Three', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ])
  ])
]);
