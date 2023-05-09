import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ShowContextProvider } from "./context/ShowContext";

import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ShowContextProvider>
      <App />
    </ShowContextProvider>
  </QueryClientProvider>
);
