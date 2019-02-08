// 1. Import React OM
import React from "react";
// 2. Import ReactDOM for rendering React Component in DOM
import ReactDom from "react-dom";
import SimpleComponent from "./component/simplecomponent/simpleComponent.jsx";
import ProductUIComponent from "./component/applications/productUIComponent.jsx"
ReactDom.render(<ProductUIComponent  />,document.getElementById("app"));
