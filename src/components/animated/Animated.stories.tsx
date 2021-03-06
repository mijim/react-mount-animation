import Animated from "./Animated";

export default {
  component: Animation,
  title: "Simple Animation",
};

export const Basic = () => (
  <Animated.div
    show={true}
    mountAnim={`
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
  `}
    //mountAnimId={""}
    //unmountAnimId={"unmount-anim"}
    time={1}
    href="http://google.com"
    style={{
      width: "fit-content",
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
      show={true}
      mountAnim={`
      60% {transform: translate(0px, 0)}
      85% {transform: translate(10px, 0)}
    `}
      time={1.1}
      style={{
        fontFamily: "Arial",
      }}
    >
      Hi! This is a test component 😝
    </Animated.div>
  </Animated.div>
);
