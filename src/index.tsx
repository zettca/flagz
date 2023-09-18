/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import "virtual:uno.css";
import "@unocss/reset/normalize.css";

import App from "./App";

const root = document.getElementById("root");

render(() => <App />, root!);
