'use client'

import { cn } from '@heroui/react'
import React from 'react'

import { Icon, IconProps } from '.'

export interface LogoProps extends IconProps {
  classNames?: {
    base?: string
    text?: string
    square1?: string
    square2?: string
    square3?: string
    square4?: string
    square5?: string
  }
}

export const Logo = React.forwardRef<SVGSVGElement, LogoProps>(function Logo(
  { viewBox = '0 0 799 736', className, classNames = {}, ...props },
  ref
) {
  return (
    <Icon ref={ref} viewBox={viewBox} className={cn(className, classNames.base)} {...props}>
      <path
        d="M76.514 523.019V547.019C62.014 536.519 44.514 536.519 44.514 536.519C27.514 537.019 26.514 549.519 26.514 549.519C26.514 559.519 42.014 563.019 42.014 563.019C53.014 566.019 62.514 570.019 62.514 570.019C81.514 577.019 83.514 599.019 83.514 599.019V605.019C79.014 640.519 38.014 639.019 38.014 639.019C11.514 638.019 1.51405 630.019 1.51405 630.019L1.75858 605.184C15.6881 614.536 30.514 616.019 30.514 616.019C44.514 617.019 47.514 615.519 47.514 615.519C58.514 611.519 57.514 602.019 57.514 602.019C56.514 596.519 51.514 593.019 51.514 593.019C47.514 589.019 26.514 583.019 26.514 583.019C-1.48596 575.519 0.0140481 549.519 0.0140481 549.519C2.01404 512.019 44.514 514.019 44.514 514.019C68.514 515.519 76.514 523.019 76.514 523.019Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path
        d="M196 616.083V639H114V514H193.988V536.917H139.656V565.042H188.454V586.917H139.656V616.083H196Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path
        d="M228.5 514L226 639H251L253 556.355L285.5 615.756H295.5L327 556.355L329 639H356L352 514H322L290.5 579.599L258 514H228.5Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path d="M412 639H386V514H412V639Z" className={cn('text-primary', classNames?.text)} fill="currentColor" />
      <path
        d="M551 602.647V628.54C536.936 639.494 510.316 638.997 510.316 638.997C439.997 637.503 442.006 576.754 442.006 576.754C444.517 511.523 510.818 514.013 510.818 514.013C534.927 514.013 551 523.971 551 523.971V551.856C536.936 536.918 512.827 536.918 512.827 536.918C468.124 537.914 469.631 576.754 469.631 576.754C470.636 618.083 513.329 616.589 513.329 616.589C537.439 616.589 551 602.647 551 602.647Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path
        d="M663 616.083V639H581V514H660.988V536.917H606.656V565.042H655.454V586.917H606.656V616.083H663Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path
        d="M693 514V639H719.123V595.095L727.664 587.347L767.351 639H799L746.251 570.818L795.483 514H764.336L719.123 566.686V514H693Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path d="M76 736H65V685H76V736Z" className={cn('text-primary', classNames?.text)} fill="currentColor" />
      <path
        d="M100 685V736H110V702L134 736H144V685H133V715L111 685H100Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path
        d="M168 685V736H178V702L202 736H212V685H201V715L179 685H168Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M261.5 685C275.583 685 287 696.417 287 710.5C287 724.583 275.583 736 261.5 736C247.417 736 236 724.583 236 710.5C236 696.417 247.417 685 261.5 685ZM261.972 695.389C253.366 695.389 246.389 702.366 246.389 710.972C246.389 719.579 253.366 726.556 261.972 726.556C270.579 726.556 277.556 719.579 277.556 710.972C277.556 702.366 270.579 695.389 261.972 695.389Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path
        d="M331 736L311 685H323L336.5 720L349 685H360.5L341 736H331Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M435 736H424L419 724H399L395 736H384L403 685H416L435 736ZM402.5 715H416L409.5 697L402.5 715Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path
        d="M473 695V736H484V695H498V685H459V695H473Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path d="M533 736H522V685H533V736Z" className={cn('text-primary', classNames?.text)} fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M582.5 685C596.583 685 608 696.417 608 710.5C608 724.583 596.583 736 582.5 736C568.417 736 557 724.583 557 710.5C557 696.417 568.417 685 582.5 685ZM582.972 695.389C574.366 695.389 567.389 702.366 567.389 710.972C567.389 719.579 574.366 726.556 582.972 726.556C591.579 726.556 598.556 719.579 598.556 710.972C598.556 702.366 591.579 695.389 582.972 695.389Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path
        d="M632 685V736H642V702L666 736H676V685H665V715L643 685H632Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path
        d="M731.15 688.679V698.469C725.247 694.186 718.122 694.186 718.122 694.186C711.201 694.389 710.794 699.488 710.794 699.488C710.794 703.567 717.105 704.995 717.105 704.995C721.583 706.219 725.451 707.851 725.451 707.851C733.186 710.706 734 719.68 734 719.68V722.127C732.168 736.608 715.476 735.996 715.476 735.996C704.688 735.588 700.616 732.325 700.616 732.325L700.716 722.195C706.387 726.01 712.423 726.614 712.423 726.614C718.122 727.022 719.344 726.41 719.344 726.41C723.822 724.779 723.415 720.904 723.415 720.904C723.008 718.66 720.972 717.232 720.972 717.232C719.344 715.601 710.794 713.153 710.794 713.153C699.395 710.094 700.006 699.488 700.006 699.488C700.82 684.192 718.122 685.008 718.122 685.008C727.893 685.619 731.15 688.679 731.15 688.679Z"
        className={cn('text-primary', classNames?.text)}
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M525 0C582.99 5.41183e-06 630 47.0101 630 105V341C630 398.99 582.99 446 525 446H273C215.01 446 168 398.99 168 341V105C168 47.0101 215.01 1.6912e-06 273 0H525ZM411.008 62C411.008 62 358.008 68.5 353.008 122V144.5C353.008 144.5 351.008 186 411.008 209C411.008 209 478.508 228 492.008 236.5C492.008 236.5 510.008 246.5 509.508 273.5C509.508 273.5 509.508 324 465.008 343V387.5C465.008 387.5 561.508 391 569.508 280.5V253C569.508 252.965 569.493 212.49 534.508 188.5C534.495 188.491 523.981 180.492 479.008 167.5C478.988 167.496 416.008 154.498 416.508 139C416.504 138.979 413.516 123.497 425.508 118.5H538.5C538.5 118.5 550.508 118.5 550.508 107.5V74C550.508 61.5009 538.5 62 538.5 62H411.008Z"
        className={cn('text-primary', classNames?.square1)}
        fill="currentColor"
      />
      <rect
        x="235"
        y="66"
        width="96"
        height="94"
        rx="18"
        className={cn('text-secondary', classNames?.square2)}
        fill="currentColor"
      />
      <rect
        x="235"
        y="180"
        width="96"
        height="94"
        rx="18"
        className={cn('text-violet-a', classNames?.square3)}
        fill="currentColor"
      />
      <rect
        x="235"
        y="294"
        width="96"
        height="94"
        rx="18"
        className={cn('text-violet-b', classNames?.square4)}
        fill="currentColor"
      />
      <rect
        x="351"
        y="294"
        width="96"
        height="94"
        rx="18"
        className={cn('text-violet-c', classNames?.square5)}
        fill="currentColor"
      />
    </Icon>
  )
})
