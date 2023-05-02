import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/index";
import * as Sentry from '@sentry/react';
//import BrowserTracingT  from '@sentry/tracing';

//Sentry.init({
//  dsn: "https://c96204075a774be0b15588daa3238a3c@o4504614049284096.ingest.sentry.io/4504614050988032",
//  integrations: [new BrowserTracingT()],
//  tracesSampleRate: 1.0,
//});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
     <Provider store={store}>
            <App />
          </Provider>
  </React.StrictMode>
);
