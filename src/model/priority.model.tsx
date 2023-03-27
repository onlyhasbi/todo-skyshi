import redCircle from "../assets/red.svg";
import orangeCircle from "../assets/orange.svg";
import greenCircle from "../assets/green.svg";
import blueCircle from "../assets/blue.svg";
import purpleCircle from "../assets/purple.svg";

export const PRIORITY = [
  {
    color: <img src={redCircle} alt="red-circle-icon" />,
    label: "Very High",
    value: "very-high",
  },
  {
    color: <img src={orangeCircle} alt="orange-circle-icon" />,
    label: "High",
    value: "high",
  },
  {
    color: <img src={greenCircle} alt="green-circle-icon" />,
    label: "Normal",
    value: "normal",
  },
  {
    color: <img src={blueCircle} alt="blue-circle-icon" />,
    label: "Low",
    value: "low",
  },
  {
    color: <img src={purpleCircle} alt="purple-circle-icon" />,
    label: "Very Low",
    value: "very-low",
  },
];
