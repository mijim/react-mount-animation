import { FC, useEffect, useState } from "react";
import { HTMLElementsInterface } from "./model";

const AnimatedInternal: FC = (props: any) => {
  const [shouldRender, setRender] = useState(props.show);
  const [cleanedProps, setCleanedProps] = useState(props);
  const [mountId, setMountId] = useState("");
  const [unmountId, setUnmountId] = useState("");
  const [styleSheet, setStyleSheet] = useState<any>(null);
  const CustomTag = props.tagName as keyof JSX.IntrinsicElements;

  useEffect(() => {
    if(typeof document !== "undefined") {
      let newStyleSheet: any = document.styleSheets[0];
      if (!newStyleSheet) {
        newStyleSheet = document.createElement("style");
        document.appendChild(newStyleSheet);
      }
      setStyleSheet(newStyleSheet);
    }
    
  }, []);
  
  useEffect(() => {
    if(!styleSheet) return;

    if (!!props.mountAnimId) {
      setMountId(props.mountAnimId);
    } else {
      let newMountId = `mount-${makeid(8)}`;
      const keyframes = `@-webkit-keyframes ${newMountId} {
          ${props.mountAnim}
      }
      `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      setMountId(newMountId);
    }

    if (!!props.unmountAnimId) {
      setUnmountId(props.unmountAnimId);
    } else {
      let newUnmountId = `mount-${makeid(8)}`;
      const keyframes = `@-webkit-keyframes ${newUnmountId} {
        ${props.unmountAnim ? props.unmountAnim : props.mountAnim}
      }
      `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      setUnmountId(newUnmountId);
    }

    //Clean component props in DOM
    const newCleanedProps = {
      ...props,
    };

    delete newCleanedProps["tagName"];
    delete newCleanedProps["mountAnim"];
    delete newCleanedProps["unmountAnim"];
    delete newCleanedProps["mountAnimId"];
    delete newCleanedProps["unmountAnimId"];
    delete newCleanedProps["show"];
    delete newCleanedProps["time"];
    delete newCleanedProps["unmountTime"];

    setCleanedProps(newCleanedProps);
  }, [
    styleSheet,
    props.mountAnim,
    props.unmountAnim,
    props.mountAnimId,
    props.unmountAnimId,
  ]);

  useEffect(() => {
    if (props.show) setRender(true);
  }, [props.show]);

  const onAnimationEnd = () => {
    if (!props.show) setRender(false);
    if (props.onAnimationEnd) {
      props.onAnimationEnd();
    }
  };

  return (
    shouldRender && (
      <CustomTag
        {...cleanedProps}
        style={{
          animation: `${props.show ? mountId : unmountId}
           ${!!props.unmountTime && !props.show
            ?props.unmountTime
            :props.time
            ?props.time
            :1}s`,
          animationDirection:
            props.show || !!props.unmountAnim || !!props.unmountAnimId
              ? ""
              : "reverse",
          ...props.style,
        }}
        onAnimationEnd={onAnimationEnd}
      >
        {props.children}
      </CustomTag>
    )
  );
};

function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const Animated: HTMLElementsInterface = {
  a: (props: any) => AnimatedInternal({tagName: "a", ...props}),
  abbr: (props: any) => AnimatedInternal({tagName: "abbr", ...props}),
  address: (props: any) => AnimatedInternal({tagName: "address", ...props}),
  area: (props: any) => AnimatedInternal({tagName: "area", ...props}),
  article: (props: any) => AnimatedInternal({tagName: "article", ...props}),
  aside: (props: any) => AnimatedInternal({tagName: "aside", ...props}),
  audio: (props: any) => AnimatedInternal({tagName: "audio", ...props}),
  b: (props: any) => AnimatedInternal({tagName: "b", ...props}),
  base: (props: any) => AnimatedInternal({tagName: "base", ...props}),
  bdi: (props: any) => AnimatedInternal({tagName: "bdi", ...props}),
  bdo: (props: any) => AnimatedInternal({tagName: "bdo", ...props}),
  big: (props: any) => AnimatedInternal({tagName: "big", ...props}),
  blockquote: (props: any) => AnimatedInternal({tagName: "blockquote", ...props}),
  body: (props: any) => AnimatedInternal({tagName: "body", ...props}),
  br: (props: any) => AnimatedInternal({tagName: "br", ...props}),
  button: (props: any) => AnimatedInternal({tagName: "button", ...props}),
  canvas: (props: any) => AnimatedInternal({tagName: "canvas", ...props}),
  caption: (props: any) => AnimatedInternal({tagName: "caption", ...props}),
  cite: (props: any) => AnimatedInternal({tagName: "cite", ...props}),
  code: (props: any) => AnimatedInternal({tagName: "code", ...props}),
  col: (props: any) => AnimatedInternal({tagName: "col", ...props}),
  colgroup: (props: any) => AnimatedInternal({tagName: "colgroup", ...props}),
  data: (props: any) => AnimatedInternal({tagName: "data", ...props}),
  datalist: (props: any) => AnimatedInternal({tagName: "datalist", ...props}),
  dd: (props: any) => AnimatedInternal({tagName: "dd", ...props}),
  del: (props: any) => AnimatedInternal({tagName: "del", ...props}),
  details: (props: any) => AnimatedInternal({tagName: "details", ...props}),
  dfn: (props: any) => AnimatedInternal({tagName: "dfn", ...props}),
  dialog: (props: any) => AnimatedInternal({tagName: "dialog", ...props}),
  div: (props: any) => AnimatedInternal({tagName: "div", ...props}),
  dl: (props: any) => AnimatedInternal({tagName: "dl", ...props}),
  dt: (props: any) => AnimatedInternal({tagName: "dt", ...props}),
  em: (props: any) => AnimatedInternal({tagName: "em", ...props}),
  embed: (props: any) => AnimatedInternal({tagName: "embed", ...props}),
  fieldset: (props: any) => AnimatedInternal({tagName: "fieldset", ...props}),
  figcaption: (props: any) => AnimatedInternal({tagName: "figcaption", ...props}),
  figure: (props: any) => AnimatedInternal({tagName: "figure", ...props}),
  footer: (props: any) => AnimatedInternal({tagName: "footer", ...props}),
  form: (props: any) => AnimatedInternal({tagName: "form", ...props}),
  h1: (props: any) => AnimatedInternal({tagName: "h1", ...props}),
  h2: (props: any) => AnimatedInternal({tagName: "h2", ...props}),
  h3: (props: any) => AnimatedInternal({tagName: "h3", ...props}),
  h4: (props: any) => AnimatedInternal({tagName: "h4", ...props}),
  h5: (props: any) => AnimatedInternal({tagName: "h5", ...props}),
  h6: (props: any) => AnimatedInternal({tagName: "h6", ...props}),
  head: (props: any) => AnimatedInternal({tagName: "head", ...props}),
  header: (props: any) => AnimatedInternal({tagName: "header", ...props}),
  hgroup: (props: any) => AnimatedInternal({tagName: "hgroup", ...props}),
  hr: (props: any) => AnimatedInternal({tagName: "hr", ...props}),
  html: (props: any) => AnimatedInternal({tagName: "html", ...props}),
  i: (props: any) => AnimatedInternal({tagName: "i", ...props}),
  iframe: (props: any) => AnimatedInternal({tagName: "iframe", ...props}),
  img: (props: any) => AnimatedInternal({tagName: "img", ...props}),
  input: (props: any) => AnimatedInternal({tagName: "input", ...props}),
  ins: (props: any) => AnimatedInternal({tagName: "ins", ...props}),
  kbd: (props: any) => AnimatedInternal({tagName: "kbd", ...props}),
  keygen: (props: any) => AnimatedInternal({tagName: "keygen", ...props}),
  label: (props: any) => AnimatedInternal({tagName: "label", ...props}),
  legend: (props: any) => AnimatedInternal({tagName: "legend", ...props}),
  li: (props: any) => AnimatedInternal({tagName: "li", ...props}),
  link: (props: any) => AnimatedInternal({tagName: "link", ...props}),
  main: (props: any) => AnimatedInternal({tagName: "main", ...props}),
  map: (props: any) => AnimatedInternal({tagName: "map", ...props}),
  mark: (props: any) => AnimatedInternal({tagName: "mark", ...props}),
  menu: (props: any) => AnimatedInternal({tagName: "menu", ...props}),
  menuitem: (props: any) => AnimatedInternal({tagName: "menuitem", ...props}),
  meta: (props: any) => AnimatedInternal({tagName: "meta", ...props}),
  meter: (props: any) => AnimatedInternal({tagName: "meter", ...props}),
  nav: (props: any) => AnimatedInternal({tagName: "nav", ...props}),
  noindex: (props: any) => AnimatedInternal({tagName: "noindex", ...props}),
  noscript: (props: any) => AnimatedInternal({tagName: "noscript", ...props}),
  object: (props: any) => AnimatedInternal({tagName: "object", ...props}),
  ol: (props: any) => AnimatedInternal({tagName: "ol", ...props}),
  optgroup: (props: any) => AnimatedInternal({tagName: "optgroup", ...props}),
  option: (props: any) => AnimatedInternal({tagName: "option", ...props}),
  output: (props: any) => AnimatedInternal({tagName: "output", ...props}),
  p: (props: any) => AnimatedInternal({tagName: "p", ...props}),
  param: (props: any) => AnimatedInternal({tagName: "param", ...props}),
  picture: (props: any) => AnimatedInternal({tagName: "picture", ...props}),
  pre: (props: any) => AnimatedInternal({tagName: "pre", ...props}),
  progress: (props: any) => AnimatedInternal({tagName: "progress", ...props}),
  q: (props: any) => AnimatedInternal({tagName: "q", ...props}),
  rp: (props: any) => AnimatedInternal({tagName: "rp", ...props}),
  rt: (props: any) => AnimatedInternal({tagName: "rt", ...props}),
  ruby: (props: any) => AnimatedInternal({tagName: "ruby", ...props}),
  s: (props: any) => AnimatedInternal({tagName: "s", ...props}),
  samp: (props: any) => AnimatedInternal({tagName: "samp", ...props}),
  slot: (props: any) => AnimatedInternal({tagName: "slot", ...props}),
  script: (props: any) => AnimatedInternal({tagName: "script", ...props}),
  section: (props: any) => AnimatedInternal({tagName: "section", ...props}),
  select: (props: any) => AnimatedInternal({tagName: "select", ...props}),
  small: (props: any) => AnimatedInternal({tagName: "small", ...props}),
  source: (props: any) => AnimatedInternal({tagName: "source", ...props}),
  span: (props: any) => AnimatedInternal({tagName: "span", ...props}),
  strong: (props: any) => AnimatedInternal({tagName: "strong", ...props}),
  style: (props: any) => AnimatedInternal({tagName: "style", ...props}),
  sub: (props: any) => AnimatedInternal({tagName: "sub", ...props}),
  summary: (props: any) => AnimatedInternal({tagName: "summary", ...props}),
  sup: (props: any) => AnimatedInternal({tagName: "sup", ...props}),
  table: (props: any) => AnimatedInternal({tagName: "table", ...props}),
  template: (props: any) => AnimatedInternal({tagName: "template", ...props}),
  tbody: (props: any) => AnimatedInternal({tagName: "tbody", ...props}),
  td: (props: any) => AnimatedInternal({tagName: "td", ...props}),
  textarea: (props: any) => AnimatedInternal({tagName: "textarea", ...props}),
  tfoot: (props: any) => AnimatedInternal({tagName: "tfoot", ...props}),
  th: (props: any) => AnimatedInternal({tagName: "th", ...props}),
  thead: (props: any) => AnimatedInternal({tagName: "thead", ...props}),
  time: (props: any) => AnimatedInternal({tagName: "time", ...props}),
  title: (props: any) => AnimatedInternal({tagName: "title", ...props}),
  tr: (props: any) => AnimatedInternal({tagName: "tr", ...props}),
  track: (props: any) => AnimatedInternal({tagName: "track", ...props}),
  u: (props: any) => AnimatedInternal({tagName: "u", ...props}),
  ul: (props: any) => AnimatedInternal({tagName: "ul", ...props}),
  var: (props: any) => AnimatedInternal({tagName: "var", ...props}),
  video: (props: any) => AnimatedInternal({tagName: "video", ...props}),
  wbr: (props: any) => AnimatedInternal({tagName: "wbr", ...props}),
  webview: (props: any) => AnimatedInternal({tagName: "webview", ...props}),
};

export default Animated;
