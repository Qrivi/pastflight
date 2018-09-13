import { trigger, keyframes, style, animate, transition } from '@angular/animations';

export const Animations = {
  shakeTrigger: trigger('shake', [
    transition('inactive => active', animate(1000, keyframes([
      style({
        transform: 'translate3d(-2px, 0, 0)',
        offset: .1
      }),
      style({
        transform: 'translate3d(4px, 0, 0)',
        offset: .2
      }),
      style({
        transform: 'translate3d(-8px, 0, 0)',
        offset: .3
      }),
      style({
        transform: 'translate3d(8px, 0, 0)',
        offset: .4
      }),
      style({
        transform: 'translate3d(-8px, 0, 0)',
        offset: .5
      }),
      style({
        transform: 'translate3d(8px, 0, 0)',
        offset: .6
      }),
      style({
        transform: 'translate3d(-8px, 0, 0)',
        offset: .7
      }),
      style({
        transform: 'translate3d(4px, 0, 0)',
        offset: .8
      }),
      style({
        transform: 'translate3d(-2px, 0, 0)',
        offset: .9
      }),
      style({
        transform: 'none',
        offset: 1
      }),
    ]))),
  ])
}
