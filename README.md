#  Easy React mount/unmount animations with react-mount-animation 🏃🏽‍♀️🚀

Add animations as you would from CSS (using keyframes) when mounting and unmounting React components with a very clear and easy syntax. The 'react-mount-animation' component takes care of mounting and unmounting the component through the 'show' attribute and executing the animations.

<br>
<br>

### Simple Example

Instead of this (mount/unmount without animation):
```JSX
const MyComponent = () => {
  const [isMounted, setIsMounted] = useState(false);

  ...

  return (
   <>
      {isMounted && (
        <div>
          Hi World!
        </div>
      )}
   </>
)
...
```
We do this (same with animation):
```JSX
import Animated from "react-mount-animation";

const MyComponent = () => {
  const [isMounted, setIsMounted] = useState(false);

  ...

  return (
      <Animated.div //You can use any HTML element here
        show={isMounted}
        mountAnim={` 
            0% {opacity: 0}
            100% {opacity: 1}
        `}
      >
        Hi World!
      </Animated.div>
)
...
```

<br>
<br>

### Composite Example
![Example 1](/images/example1.gif)
```JSX
import Animated from "react-mount-animation";

const mountAnimation1 = `
            0% {border-radius: 4px}
            0% {opacity: 0}
            0% {font-size: 12px}
            10% {opacity: 0}
            35% {font-size: 12px}
            60% {font-size: 24px}
            70% {border-radius: 4px}
            70% {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0), inset 0px 0px 2px 2px rgba(255,255,255,0)}
            100% {opacity: 1}
            100% {box-shadow: 0px 0px 13px 4px rgba(0,0,0,1), inset 0px 0px 2px 2px rgba(255,255,255,0.2)}
          `

const unmountAnimation1 = `
            0% { opacity: 1; }
            10% { transform: rotate(-20deg); }
            100% {opacity: 0;}
          `

const mountAnimation2 = `
    60% {transform: translate(0px, 0)}
    85% {transform: translate(10px, 0)}
`

const MyComponent = () => {
  const [isMounted, setIsMounted] = useState(false);

  ...

  return (
      <>
      <button onClick={() => setIsMounted(!isMounted)}>
        Mount/Unmount
       </button>
      <Animated.div
          show={isMounted}
          mountAnim={mountAnimation1}
          unmountAnim={unmountAnimation1}
          style={{
            fontSize: 24,
            color: "white",
            backgroundColor: "black",
            padding: 20,
            borderRadius: 20,
            boxShadow:
              "0px 0px 13px 4px rgba(0,0,0,1), inset 0px 0px 2px 2px rgba(255,255,255,0.2)",
          }}
        >
          <Animated.div
            show={isMounted}
            mountAnim={mountAnimation2}
            time={1.1}
          >
            Hi! This is a test component 😝
          </Animated.div>
        </Animated.div>
        </>
)
...
```
<br>
<br>
<br>

# Props

| name          | type    | description                                                                                                                         |
|---------------|---------|-------------------------------------------------------------------------------------------------------------------------------------|
| show*         | boolean | Used to indicate when the component has to be mounted and unmounted.                                                                |
| time          | number  | The total duration of the mount animation. Default 1.                                                                    |
| unmountTime          | number  | The total duration of the unmount animation. By default it takes the time prop. 
| delay          | number  | The total delay of the mount animation. Default 0.                                                                    |
| unmountDelay          | number  | The total delay of the unmount animation. By default it takes the delay prop.                                                                    |
| mountAnim*     | string  | Mount animation indicated as string just like CSS keyframes.                                                                        |
| unmountAnim   | string  | Unmount animation indicated as string just like CSS keyframes. If this prop is not filled, the component will execute the mountAnim reversed when unmount.                                                                      |
| mountAnimId   | string  | If you don't want to use mountAnim, you can specify the name of a keyframe defined in a CSS file. This will override mountAnim.     |
| unmountAnimId | string  | If you don't want to use unmountAnim, you can specify the name of a keyframe defined in a CSS file. This will override unmountAnim. |
| onAnimationEnd | function  | Callback fired when the component ends its animation (mount or unmount). |
| onMountEnd | function  | Callback fired when the component ends its mount animation |
| onUnmountEnd | function  | Callback fired when the component ends its unmount animation |

<br>
<br>
<br>

You are invited to collaborate 😋, if you are interested, you can contact me through <migueljimenezbenajes@gmail.com>.
