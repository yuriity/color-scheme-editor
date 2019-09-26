import {
  trigger,
  animate,
  transition,
  style,
  query,
  sequence,
  stagger
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    // Set a default  style for enter and leave
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)'
        })
      ],
      { optional: true }
    ),
    // Animate the new page in
    query(
      ':enter',
      [
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        )
      ],
      { optional: true }
    )
  ])
]);
