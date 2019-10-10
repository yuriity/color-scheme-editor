import { trigger, transition, query, style, animate, group, stagger } from '@angular/animations';

const fadeInAnimationMetadata = [
  style({
    opacity: 0
  }),
  animate(
    '500ms ease-in-out',
    style({
      opacity: 1
    })
  )
];

const slideAnimationMetadata = [
  style({
    transform: 'translateY(-100%)'
  }),
  animate(
    '500ms ease',
    style({
      transform: 'translateY(0)'
    })
  )
];

const listAnimationMetadata = [
  style({
    opacity: 0,
    transform: 'translateY(-100px)'
  }),
  stagger(-30, [
    animate(
      '500ms cubic-bezier(0.35, 0, 0.25, 1)',
      style({
        opacity: 1,
        transform: 'none'
      })
    )
  ])
];

export const routeAnimation = trigger('routeAnimation', [
  transition('* => EditTokenPage', fadeInAnimationMetadata),
  transition('* => HelpPage', fadeInAnimationMetadata),
  transition('* => TokenColorsPage', [
    group([
      query(':enter mat-toolbar', slideAnimationMetadata, { optional: true }),
      query(':enter .list-item', listAnimationMetadata, { optional: true })
    ]),
    query(':enter cse-how-to', fadeInAnimationMetadata, { optional: true })
  ])
]);
