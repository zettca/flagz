/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import "virtual:uno.css";

import App from "./App";

const root = document.getElementById("root");

render(() => <App />, root!);
