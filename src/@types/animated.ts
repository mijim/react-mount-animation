export interface HTMLElements
  extends Omit<
    JSX.IntrinsicElements,
    | 'animate'
    | 'animateMotion'
    | 'animateTransform'
    | 'clipPath'
    | 'defs'
    | 'desc'
    | 'feBlend'
    | 'feColorMatrix'
    | 'feComponentTransfer'
    | 'feComposite'
    | 'feConvolveMatrix'
    | 'feDiffuseLighting'
    | 'feDisplacementMap'
    | 'feDistantLight'
    | 'feDropShadow'
    | 'feFlood'
    | 'feFuncA'
    | 'feFuncB'
    | 'feFuncG'
    | 'feFuncR'
    | 'feGaussianBlur'
    | 'feImage'
    | 'feMerge'
    | 'feMergeNode'
    | 'feMorphology'
    | 'feOffset'
    | 'fePointLight'
    | 'feSpecularLighting'
    | 'feSpotLight'
    | 'feTile'
    | 'feTurbulence'
    | 'filter'
    | 'foreignObject'
    | 'g'
    | 'line'
    | 'linearGradient'
    | 'marker'
    | 'metadata'
    | 'mpath'
    | 'pattern'
    | 'polygon'
    | 'polyline'
    | 'radialGradient'
    | 'stop'
    | 'switch'
    | 'symbol'
    | 'text'
    | 'textPath'
    | 'tspan'
    | 'use'
    | 'view'
  > {}

export interface AnimatedProps {
  /**
   * Used to indicate when the component has to be mounted and unmounted.
   */
  show: boolean
  /**
   * 	The total duration of the mount animation. Default 1.
   */
  time?: number
  /**
   * The total duration of the unmount animation. By default it takes the time prop.
   */
  unmountTime?: number
  /**
   * The total delay of the mount animation. Default 0.
   */
  delay?: number
  /**
   * The total delay of the unmount animation. By default it takes the delay prop.
   */
  unmountDelay?: number
  /**
   * Mount animation indicated as string just like CSS keyframes.
   */
  mountAnim: string
  /**
   * Unmount animation indicated as string just like CSS keyframes. If this prop is not filled, the component will execute the mountAnim reversed when unmount.
   */
  unmountAnim?: string
  /**
   * If you don't want to use mountAnim, you can specify the name of a keyframe defined in a CSS file. This will override mountAnim.
   */
  mountAnimId?: string
  /**
   * If you don't want to use unmountAnim, you can specify the name of a keyframe defined in a CSS file. This will override unmountAnim.
   */
  unmountAnimId?: string
  /**
   * Callback fired when the component ends its animation (mount or unmount).
   */
  onAnimationEnd?: () => void
  /**
   * Callback fired when the component ends its mount animation
   */
  onMountEnd?: () => void
  /**
   * Callback fired when the component ends its unmount animation
   */
  onUnmountEnd?: () => void
  /**
   * Timing function used for mount animation
   */
  mountTimingFunction?: React.CSSProperties['animationTimingFunction']
  /**
   * Timing function used for unmount animation
   */
  unmountTimingFunction?: React.CSSProperties['animationTimingFunction']
}

export type AnimatedComponentProps<T extends keyof HTMLElements> = React.ComponentPropsWithoutRef<T> &
  AnimatedProps & {
    tag: keyof HTMLElements
    style?: any
    children?: React.ReactNode
  }

export type AnimatedComponent = {
  [K in keyof HTMLElements]: (props: Omit<AnimatedComponentProps<K>, 'tag'>) => JSX.Element
}
