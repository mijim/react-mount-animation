import { useEffect, useState } from 'react'

// Types
import { AnimatedComponentProps, AnimatedComponent, HTMLElements } from '../../@types/animated'

const AnimatedInternal = <T extends keyof HTMLElements>(props: AnimatedComponentProps<T>): JSX.Element => {
  const [shouldRender, setRender] = useState<boolean>(props.show)
  const [cleanedProps, setCleanedProps] = useState<Partial<AnimatedComponentProps<T>>>(props)
  const [mountId, setMountId] = useState<string>('')
  const [unmountId, setUnmountId] = useState<string>('')
  const [styleSheet, setStyleSheet] = useState<any>(null)
  const CustomTag = props.tag

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
      ...cleanedProps,
    }

    delete newCleanedProps['tag']
    delete newCleanedProps['mountAnim']
    delete newCleanedProps['unmountAnim']
    delete newCleanedProps['mountAnimId']
    delete newCleanedProps['unmountAnimId']
    delete newCleanedProps['show']
    delete newCleanedProps['time']
    delete newCleanedProps['unmountTime']
    delete newCleanedProps['delay']
    delete newCleanedProps['unmountDelay']
    delete newCleanedProps['onMountEnd']
    delete newCleanedProps['onUnmountEnd']
    delete newCleanedProps['mountTimingFunction']
    delete newCleanedProps['unmountTimingFunction']

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
            animationTimingFunction:
              props.unmountTimingFunction !== undefined && !props.show
                ? props.unmountTimingFunction
                : props.mountTimingFunction,
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

const Animated: AnimatedComponent = {
  a: props => AnimatedInternal<'a'>({ tag: 'a', ...props }),
  abbr: props => AnimatedInternal<'abbr'>({ tag: 'abbr', ...props }),
  address: props => AnimatedInternal<'address'>({ tag: 'address', ...props }),
  area: props => AnimatedInternal<'area'>({ tag: 'area', ...props }),
  article: props => AnimatedInternal<'article'>({ tag: 'article', ...props }),
  aside: props => AnimatedInternal<'aside'>({ tag: 'aside', ...props }),
  audio: props => AnimatedInternal<'audio'>({ tag: 'audio', ...props }),
  b: props => AnimatedInternal<'b'>({ tag: 'b', ...props }),
  base: props => AnimatedInternal<'base'>({ tag: 'base', ...props }),
  bdi: props => AnimatedInternal<'bdi'>({ tag: 'bdi', ...props }),
  bdo: props => AnimatedInternal<'bdo'>({ tag: 'bdo', ...props }),
  big: props => AnimatedInternal<'big'>({ tag: 'big', ...props }),
  blockquote: props => AnimatedInternal<'blockquote'>({ tag: 'blockquote', ...props }),
  body: props => AnimatedInternal<'body'>({ tag: 'body', ...props }),
  br: props => AnimatedInternal<'br'>({ tag: 'br', ...props }),
  button: props => AnimatedInternal<'button'>({ tag: 'button', ...props }),
  canvas: props => AnimatedInternal<'canvas'>({ tag: 'canvas', ...props }),
  caption: props => AnimatedInternal<'caption'>({ tag: 'caption', ...props }),
  cite: props => AnimatedInternal<'cite'>({ tag: 'cite', ...props }),
  code: props => AnimatedInternal<'code'>({ tag: 'code', ...props }),
  col: props => AnimatedInternal<'col'>({ tag: 'col', ...props }),
  colgroup: props => AnimatedInternal<'colgroup'>({ tag: 'colgroup', ...props }),
  data: props => AnimatedInternal<'data'>({ tag: 'data', ...props }),
  datalist: props => AnimatedInternal<'datalist'>({ tag: 'datalist', ...props }),
  dd: props => AnimatedInternal<'dd'>({ tag: 'dd', ...props }),
  del: props => AnimatedInternal<'del'>({ tag: 'del', ...props }),
  details: props => AnimatedInternal<'details'>({ tag: 'details', ...props }),
  dfn: props => AnimatedInternal<'dfn'>({ tag: 'dfn', ...props }),
  dialog: props => AnimatedInternal<'dialog'>({ tag: 'dialog', ...props }),
  div: props => AnimatedInternal<'div'>({ tag: 'div', ...props }),
  dl: props => AnimatedInternal<'dl'>({ tag: 'dl', ...props }),
  dt: props => AnimatedInternal<'dt'>({ tag: 'dt', ...props }),
  em: props => AnimatedInternal<'em'>({ tag: 'em', ...props }),
  embed: props => AnimatedInternal<'embed'>({ tag: 'embed', ...props }),
  fieldset: props => AnimatedInternal<'fieldset'>({ tag: 'fieldset', ...props }),
  figcaption: props => AnimatedInternal<'figcaption'>({ tag: 'figcaption', ...props }),
  figure: props => AnimatedInternal<'figure'>({ tag: 'figure', ...props }),
  footer: props => AnimatedInternal<'footer'>({ tag: 'footer', ...props }),
  form: props => AnimatedInternal<'form'>({ tag: 'form', ...props }),
  h1: props => AnimatedInternal<'h1'>({ tag: 'h1', ...props }),
  h2: props => AnimatedInternal<'h2'>({ tag: 'h2', ...props }),
  h3: props => AnimatedInternal<'h3'>({ tag: 'h3', ...props }),
  h4: props => AnimatedInternal<'h4'>({ tag: 'h4', ...props }),
  h5: props => AnimatedInternal<'h5'>({ tag: 'h5', ...props }),
  h6: props => AnimatedInternal<'h6'>({ tag: 'h6', ...props }),
  head: props => AnimatedInternal<'head'>({ tag: 'head', ...props }),
  header: props => AnimatedInternal<'header'>({ tag: 'header', ...props }),
  hgroup: props => AnimatedInternal<'hgroup'>({ tag: 'hgroup', ...props }),
  hr: props => AnimatedInternal<'hr'>({ tag: 'hr', ...props }),
  html: props => AnimatedInternal<'html'>({ tag: 'html', ...props }),
  i: props => AnimatedInternal<'i'>({ tag: 'i', ...props }),
  iframe: props => AnimatedInternal<'iframe'>({ tag: 'iframe', ...props }),
  img: props => AnimatedInternal<'img'>({ tag: 'img', ...props }),
  input: props => AnimatedInternal<'input'>({ tag: 'input', ...props }),
  ins: props => AnimatedInternal<'ins'>({ tag: 'ins', ...props }),
  kbd: props => AnimatedInternal<'kbd'>({ tag: 'kbd', ...props }),
  keygen: props => AnimatedInternal<'keygen'>({ tag: 'keygen', ...props }),
  label: props => AnimatedInternal<'label'>({ tag: 'label', ...props }),
  legend: props => AnimatedInternal<'legend'>({ tag: 'legend', ...props }),
  li: props => AnimatedInternal<'li'>({ tag: 'li', ...props }),
  link: props => AnimatedInternal<'link'>({ tag: 'link', ...props }),
  main: props => AnimatedInternal<'main'>({ tag: 'main', ...props }),
  map: props => AnimatedInternal<'map'>({ tag: 'map', ...props }),
  mark: props => AnimatedInternal<'mark'>({ tag: 'mark', ...props }),
  menu: props => AnimatedInternal<'menu'>({ tag: 'menu', ...props }),
  menuitem: props => AnimatedInternal<'menuitem'>({ tag: 'menuitem', ...props }),
  meta: props => AnimatedInternal<'meta'>({ tag: 'meta', ...props }),
  meter: props => AnimatedInternal<'meter'>({ tag: 'meter', ...props }),
  nav: props => AnimatedInternal<'nav'>({ tag: 'nav', ...props }),
  noindex: props => AnimatedInternal<'noindex'>({ tag: 'noindex', ...props }),
  noscript: props => AnimatedInternal<'noscript'>({ tag: 'noscript', ...props }),
  object: props => AnimatedInternal<'object'>({ tag: 'object', ...props }),
  ol: props => AnimatedInternal<'ol'>({ tag: 'ol', ...props }),
  optgroup: props => AnimatedInternal<'optgroup'>({ tag: 'optgroup', ...props }),
  option: props => AnimatedInternal<'option'>({ tag: 'option', ...props }),
  output: props => AnimatedInternal<'output'>({ tag: 'output', ...props }),
  p: props => AnimatedInternal<'p'>({ tag: 'p', ...props }),
  param: props => AnimatedInternal<'param'>({ tag: 'param', ...props }),
  picture: props => AnimatedInternal<'picture'>({ tag: 'picture', ...props }),
  pre: props => AnimatedInternal<'pre'>({ tag: 'pre', ...props }),
  progress: props => AnimatedInternal<'progress'>({ tag: 'progress', ...props }),
  q: props => AnimatedInternal<'q'>({ tag: 'q', ...props }),
  rp: props => AnimatedInternal<'rp'>({ tag: 'rp', ...props }),
  rt: props => AnimatedInternal<'rt'>({ tag: 'rt', ...props }),
  ruby: props => AnimatedInternal<'ruby'>({ tag: 'ruby', ...props }),
  s: props => AnimatedInternal<'s'>({ tag: 's', ...props }),
  samp: props => AnimatedInternal<'samp'>({ tag: 'samp', ...props }),
  slot: props => AnimatedInternal<'slot'>({ tag: 'slot', ...props }),
  script: props => AnimatedInternal<'script'>({ tag: 'script', ...props }),
  section: props => AnimatedInternal<'section'>({ tag: 'section', ...props }),
  select: props => AnimatedInternal<'select'>({ tag: 'select', ...props }),
  small: props => AnimatedInternal<'small'>({ tag: 'small', ...props }),
  source: props => AnimatedInternal<'source'>({ tag: 'source', ...props }),
  span: props => AnimatedInternal<'span'>({ tag: 'span', ...props }),
  strong: props => AnimatedInternal<'strong'>({ tag: 'strong', ...props }),
  style: props => AnimatedInternal<'style'>({ tag: 'style', ...props }),
  sub: props => AnimatedInternal<'sub'>({ tag: 'sub', ...props }),
  summary: props => AnimatedInternal<'summary'>({ tag: 'summary', ...props }),
  sup: props => AnimatedInternal<'sup'>({ tag: 'sup', ...props }),
  table: props => AnimatedInternal<'table'>({ tag: 'table', ...props }),
  template: props => AnimatedInternal<'template'>({ tag: 'template', ...props }),
  tbody: props => AnimatedInternal<'tbody'>({ tag: 'tbody', ...props }),
  td: props => AnimatedInternal<'td'>({ tag: 'td', ...props }),
  textarea: props => AnimatedInternal<'textarea'>({ tag: 'textarea', ...props }),
  tfoot: props => AnimatedInternal<'tfoot'>({ tag: 'tfoot', ...props }),
  th: props => AnimatedInternal<'th'>({ tag: 'th', ...props }),
  thead: props => AnimatedInternal<'thead'>({ tag: 'thead', ...props }),
  time: props => AnimatedInternal<'time'>({ tag: 'time', ...props }),
  title: props => AnimatedInternal<'title'>({ tag: 'title', ...props }),
  tr: props => AnimatedInternal<'tr'>({ tag: 'tr', ...props }),
  track: props => AnimatedInternal<'track'>({ tag: 'track', ...props }),
  u: props => AnimatedInternal<'u'>({ tag: 'u', ...props }),
  ul: props => AnimatedInternal<'ul'>({ tag: 'ul', ...props }),
  var: props => AnimatedInternal<'var'>({ tag: 'var', ...props }),
  video: props => AnimatedInternal<'video'>({ tag: 'video', ...props }),
  wbr: props => AnimatedInternal<'wbr'>({ tag: 'wbr', ...props }),
  webview: props => AnimatedInternal<'webview'>({ tag: 'webview', ...props }),
  svg: props => AnimatedInternal<'svg'>({ tag: 'svg', ...props }),
  circle: props => AnimatedInternal<'circle'>({ tag: 'circle', ...props }),
  ellipse: props => AnimatedInternal<'ellipse'>({ tag: 'ellipse', ...props }),
  image: props => AnimatedInternal<'image'>({ tag: 'image', ...props }),
  mask: props => AnimatedInternal<'mask'>({ tag: 'mask', ...props }),
  path: props => AnimatedInternal<'path'>({ tag: 'path', ...props }),
  rect: props => AnimatedInternal<'rect'>({ tag: 'rect', ...props }),
}

export default Animated
