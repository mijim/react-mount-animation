import React, { useEffect, useState } from 'react'
import { RMAComponentProps, RMAComponent } from '../../@types'

const AnimatedInternal: React.FC<RMAComponentProps> = props => {
  const [shouldRender, setRender] = useState(props.show)
  const [cleanedProps, setCleanedProps] = useState(props)
  const [mountId, setMountId] = useState('')
  const [unmountId, setUnmountId] = useState('')
  const [styleSheet, setStyleSheet] = useState<any>(null)
  const CustomTag = props.tag as keyof JSX.IntrinsicElements

  useEffect(() => {
    if (typeof document !== 'undefined') {
      let newStyleSheet: any = document.styleSheets[0]
      if (!newStyleSheet) {
        newStyleSheet = document.createElement('style')
        document.head.appendChild(newStyleSheet)
      }
      setStyleSheet(document.styleSheets[0])
    }
  }, [])

  useEffect(() => {
    if (!styleSheet) return
    if (!!props.mountAnimId) {
      setMountId(props.mountAnimId)
    } else {
      let newMountId = `mount-${makeid(8)}`
      const keyframes = `@-webkit-keyframes ${newMountId} {
          ${props.mountAnim}
      }
      `
      styleSheet.insertRule(keyframes, styleSheet.cssRules ? styleSheet.cssRules.length : 0)
      setMountId(newMountId)
    }

    if (!!props.unmountAnimId) {
      setUnmountId(props.unmountAnimId)
    } else {
      let newUnmountId = `mount-${makeid(8)}`
      const keyframes = `@-webkit-keyframes ${newUnmountId} {
        ${props.unmountAnim ? props.unmountAnim : props.mountAnim}
      }
      `
      styleSheet.insertRule(keyframes, styleSheet.cssRules ? styleSheet.cssRules.length : 0)
      setUnmountId(newUnmountId)
    }

    //Clean component props in DOM
    const newCleanedProps = {
      ...props,
    }

    delete newCleanedProps['tagName']
    // delete newCleanedProps["mountAnim"];
    delete newCleanedProps['unmountAnim']
    delete newCleanedProps['mountAnimId']
    delete newCleanedProps['unmountAnimId']
    // delete newCleanedProps["show"];
    delete newCleanedProps['time']
    delete newCleanedProps['unmountTime']
    delete newCleanedProps['delay']
    delete newCleanedProps['unmountDelay']
    delete newCleanedProps['onMountEnd']
    delete newCleanedProps['onUnmountEnd']

    setCleanedProps(newCleanedProps)
  }, [styleSheet, props.mountAnim, props.unmountAnim, props.mountAnimId, props.unmountAnimId])

  useEffect(() => {
    if (props.show) {
      if (props.delay) {
        setTimeout(() => {
          setRender(true)
        }, props.delay * 1000)
      } else {
        setRender(true)
      }
    }
  }, [props.show, props.delay])

  const onAnimationEnd = () => {
    if (!props.show) setRender(false)
    if (props.onMountEnd && props.show) {
      props.onMountEnd()
    }
    if (props.onUnmountEnd && !props.show) {
      props.onUnmountEnd()
    }
    if (props.onAnimationEnd) {
      props.onAnimationEnd()
    }
  }

  return (
    <>
      {shouldRender && (
        <CustomTag
          {...cleanedProps}
          style={{
            animationName: `${props.show ? mountId : unmountId}`,
            animationDuration: `${
              props.unmountTime !== undefined && !props.show ? props.unmountTime : props.time ? props.time : 1
            }s`,
            animationDirection:
              props.show || !!props.unmountAnim || !!props.unmountAnimId ? 'normal' : 'reverse',
            animationDelay: `${props.unmountDelay !== undefined && !props.show ? props.unmountDelay : 0}s`,
            ...props.style,
          }}
          onAnimationEnd={onAnimationEnd}
        >
          {props.children}
        </CustomTag>
      )}
    </>
  )
}

function makeid(length: number) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const Animated: RMAComponent = {
  a: props => AnimatedInternal({ tag: 'a', ...props }),
  abbr: props => AnimatedInternal({ tag: 'abbr', ...props }),
  address: props => AnimatedInternal({ tag: 'address', ...props }),
  area: props => AnimatedInternal({ tag: 'area', ...props }),
  article: props => AnimatedInternal({ tag: 'article', ...props }),
  aside: props => AnimatedInternal({ tag: 'aside', ...props }),
  audio: props => AnimatedInternal({ tag: 'audio', ...props }),
  b: props => AnimatedInternal({ tag: 'b', ...props }),
  base: props => AnimatedInternal({ tag: 'base', ...props }),
  bdi: props => AnimatedInternal({ tag: 'bdi', ...props }),
  bdo: props => AnimatedInternal({ tag: 'bdo', ...props }),
  big: props => AnimatedInternal({ tag: 'big', ...props }),
  blockquote: props => AnimatedInternal({ tag: 'blockquote', ...props }),
  body: props => AnimatedInternal({ tag: 'body', ...props }),
  br: props => AnimatedInternal({ tag: 'br', ...props }),
  button: props => AnimatedInternal({ tag: 'button', ...props }),
  canvas: props => AnimatedInternal({ tag: 'canvas', ...props }),
  caption: props => AnimatedInternal({ tag: 'caption', ...props }),
  cite: props => AnimatedInternal({ tag: 'cite', ...props }),
  code: props => AnimatedInternal({ tag: 'code', ...props }),
  col: props => AnimatedInternal({ tag: 'col', ...props }),
  colgroup: props => AnimatedInternal({ tag: 'colgroup', ...props }),
  data: props => AnimatedInternal({ tag: 'data', ...props }),
  datalist: props => AnimatedInternal({ tag: 'datalist', ...props }),
  dd: props => AnimatedInternal({ tag: 'dd', ...props }),
  del: props => AnimatedInternal({ tag: 'del', ...props }),
  details: props => AnimatedInternal({ tag: 'details', ...props }),
  dfn: props => AnimatedInternal({ tag: 'dfn', ...props }),
  dialog: props => AnimatedInternal({ tag: 'dialog', ...props }),
  div: props => AnimatedInternal({ tag: 'div', ...props }),
  dl: props => AnimatedInternal({ tag: 'dl', ...props }),
  dt: props => AnimatedInternal({ tag: 'dt', ...props }),
  em: props => AnimatedInternal({ tag: 'em', ...props }),
  embed: props => AnimatedInternal({ tag: 'embed', ...props }),
  fieldset: props => AnimatedInternal({ tag: 'fieldset', ...props }),
  figcaption: props => AnimatedInternal({ tag: 'figcaption', ...props }),
  figure: props => AnimatedInternal({ tag: 'figure', ...props }),
  footer: props => AnimatedInternal({ tag: 'footer', ...props }),
  form: props => AnimatedInternal({ tag: 'form', ...props }),
  h1: props => AnimatedInternal({ tag: 'h1', ...props }),
  h2: props => AnimatedInternal({ tag: 'h2', ...props }),
  h3: props => AnimatedInternal({ tag: 'h3', ...props }),
  h4: props => AnimatedInternal({ tag: 'h4', ...props }),
  h5: props => AnimatedInternal({ tag: 'h5', ...props }),
  h6: props => AnimatedInternal({ tag: 'h6', ...props }),
  head: props => AnimatedInternal({ tag: 'head', ...props }),
  header: props => AnimatedInternal({ tag: 'header', ...props }),
  hgroup: props => AnimatedInternal({ tag: 'hgroup', ...props }),
  hr: props => AnimatedInternal({ tag: 'hr', ...props }),
  html: props => AnimatedInternal({ tag: 'html', ...props }),
  i: props => AnimatedInternal({ tag: 'i', ...props }),
  iframe: props => AnimatedInternal({ tag: 'iframe', ...props }),
  img: props => AnimatedInternal({ tag: 'img', ...props }),
  input: props => AnimatedInternal({ tag: 'input', ...props }),
  ins: props => AnimatedInternal({ tag: 'ins', ...props }),
  kbd: props => AnimatedInternal({ tag: 'kbd', ...props }),
  keygen: props => AnimatedInternal({ tag: 'keygen', ...props }),
  label: props => AnimatedInternal({ tag: 'label', ...props }),
  legend: props => AnimatedInternal({ tag: 'legend', ...props }),
  li: props => AnimatedInternal({ tag: 'li', ...props }),
  link: props => AnimatedInternal({ tag: 'link', ...props }),
  main: props => AnimatedInternal({ tag: 'main', ...props }),
  map: props => AnimatedInternal({ tag: 'map', ...props }),
  mark: props => AnimatedInternal({ tag: 'mark', ...props }),
  menu: props => AnimatedInternal({ tag: 'menu', ...props }),
  menuitem: props => AnimatedInternal({ tag: 'menuitem', ...props }),
  meta: props => AnimatedInternal({ tag: 'meta', ...props }),
  meter: props => AnimatedInternal({ tag: 'meter', ...props }),
  nav: props => AnimatedInternal({ tag: 'nav', ...props }),
  noindex: props => AnimatedInternal({ tag: 'noindex', ...props }),
  noscript: props => AnimatedInternal({ tag: 'noscript', ...props }),
  object: props => AnimatedInternal({ tag: 'object', ...props }),
  ol: props => AnimatedInternal({ tag: 'ol', ...props }),
  optgroup: props => AnimatedInternal({ tag: 'optgroup', ...props }),
  option: props => AnimatedInternal({ tag: 'option', ...props }),
  output: props => AnimatedInternal({ tag: 'output', ...props }),
  p: props => AnimatedInternal({ tag: 'p', ...props }),
  param: props => AnimatedInternal({ tag: 'param', ...props }),
  picture: props => AnimatedInternal({ tag: 'picture', ...props }),
  pre: props => AnimatedInternal({ tag: 'pre', ...props }),
  progress: props => AnimatedInternal({ tag: 'progress', ...props }),
  q: props => AnimatedInternal({ tag: 'q', ...props }),
  rp: props => AnimatedInternal({ tag: 'rp', ...props }),
  rt: props => AnimatedInternal({ tag: 'rt', ...props }),
  ruby: props => AnimatedInternal({ tag: 'ruby', ...props }),
  s: props => AnimatedInternal({ tag: 's', ...props }),
  samp: props => AnimatedInternal({ tag: 'samp', ...props }),
  slot: props => AnimatedInternal({ tag: 'slot', ...props }),
  script: props => AnimatedInternal({ tag: 'script', ...props }),
  section: props => AnimatedInternal({ tag: 'section', ...props }),
  select: props => AnimatedInternal({ tag: 'select', ...props }),
  small: props => AnimatedInternal({ tag: 'small', ...props }),
  source: props => AnimatedInternal({ tag: 'source', ...props }),
  span: props => AnimatedInternal({ tag: 'span', ...props }),
  strong: props => AnimatedInternal({ tag: 'strong', ...props }),
  style: props => AnimatedInternal({ tag: 'style', ...props }),
  sub: props => AnimatedInternal({ tag: 'sub', ...props }),
  summary: props => AnimatedInternal({ tag: 'summary', ...props }),
  sup: props => AnimatedInternal({ tag: 'sup', ...props }),
  table: props => AnimatedInternal({ tag: 'table', ...props }),
  template: props => AnimatedInternal({ tag: 'template', ...props }),
  tbody: props => AnimatedInternal({ tag: 'tbody', ...props }),
  td: props => AnimatedInternal({ tag: 'td', ...props }),
  textarea: props => AnimatedInternal({ tag: 'textarea', ...props }),
  tfoot: props => AnimatedInternal({ tag: 'tfoot', ...props }),
  th: props => AnimatedInternal({ tag: 'th', ...props }),
  thead: props => AnimatedInternal({ tag: 'thead', ...props }),
  time: props => AnimatedInternal({ tag: 'time', ...props }),
  title: props => AnimatedInternal({ tag: 'title', ...props }),
  tr: props => AnimatedInternal({ tag: 'tr', ...props }),
  track: props => AnimatedInternal({ tag: 'track', ...props }),
  u: props => AnimatedInternal({ tag: 'u', ...props }),
  ul: props => AnimatedInternal({ tag: 'ul', ...props }),
  var: props => AnimatedInternal({ tag: 'var', ...props }),
  video: props => AnimatedInternal({ tag: 'video', ...props }),
  wbr: props => AnimatedInternal({ tag: 'wbr', ...props }),
  webview: props => AnimatedInternal({ tag: 'webview', ...props }),
  svg: props => AnimatedInternal({ tag: 'svg', ...props }),
  circle: props => AnimatedInternal({ tag: 'circle', ...props }),
  ellipse: props => AnimatedInternal({ tag: 'ellipse', ...props }),
  image: props => AnimatedInternal({ tag: 'image', ...props }),
  mask: props => AnimatedInternal({ tag: 'mask', ...props }),
  path: props => AnimatedInternal({ tag: 'path', ...props }),
  rect: props => AnimatedInternal({ tag: 'rect', ...props }),
}

export default Animated
