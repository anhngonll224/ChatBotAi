import React from "react";
import { ConfigProvider } from "antd";
import vnVN from "antd/lib/locale/vi_VN";
import "moment/locale/vi";
import "dayjs/locale/vi";
import ReactDOM from "react-dom"; // Cập nhật dòng này
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "src/assets/scss/index.scss";
import "./index.scss";
import StoreProvider from "src/lib/store";
import store from "src/redux/store";
import { ThemeProvider } from "styled-components";
import App from "./App";
import ErrorBoundary from "./components/Boundary";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme";
import {
  AnchorProvider,
} from "react-anchor-navigation";

// const root = ReactDOM.createRoot(document.getElementById("root"));

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider
      theme={{
        ...theme,
      }}
    >
      <ConfigProvider locale={vnVN}>
        <Provider store={store}>
          <StoreProvider>
            <ErrorBoundary>
              < AnchorProvider >
                <App />
              </AnchorProvider >
            </ErrorBoundary>
          </StoreProvider>
        </Provider>
      </ConfigProvider>
    </ThemeProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
