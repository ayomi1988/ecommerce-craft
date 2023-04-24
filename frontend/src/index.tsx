import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { customerstore } from "./store/customer/index";
import { adminstore } from "./store/admin/index";
import { craftstore } from "./store/craft/index";
import { orderstore } from "./store/order/index";
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
    <Provider store={customerstore}>
      <Provider store={adminstore}>
        <Provider store={craftstore}>
          <Provider store={orderstore}>
            <App />
          </Provider>
        </Provider>
      </Provider>
    </Provider>
  </React.StrictMode>
);
