import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AxiosProvider } from "./setup/app-context-manager/AxiosContext";
import { setupAuthAxios, setupPublicAxios } from "setup/auth/axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

setupPublicAxios(process.env.REACT_APP_BASE_URL);
setupAuthAxios(process.env.REACT_APP_BASE_URL, "your-auth-token");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <React.StrictMode>
        <AxiosProvider>
          <App />
        </AxiosProvider>
      </React.StrictMode>
    </BrowserRouter>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
