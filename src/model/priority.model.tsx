import redCircle from "../assets/red.svg?inline";
import orangeCircle from "../assets/orange.svg?inline";
import greenCircle from "../assets/green.svg?inline";
import blueCircle from "../assets/blue.svg?inline";
import purpleCircle from "../assets/purple.svg?inline";

export const PRIORITY = [
  {
    color: <img loading="lazy" src={redCircle} alt="red-circle-icon" />,
    label: "Very High",
    value: "very-high",
  },
  {
    color: <img loading="lazy" src={orangeCircle} alt="orange-circle-icon" />,
    label: "High",
    value: "high",
  },
  {
    color: <img loading="lazy" src={greenCircle} alt="green-circle-icon" />,
    label: "Normal",
    value: "normal",
  },
  {
    color: <img loading="lazy" src={blueCircle} alt="blue-circle-icon" />,
    label: "Low",
    value: "low",
  },
  {
    color: <img loading="lazy" src={purpleCircle} alt="purple-circle-icon" />,
    label: "Very Low",
    value: "very-low",
  },
];
