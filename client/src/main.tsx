import { Provider } from "@/components/ui/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./redux/store.ts";
import { Provider as ReduxProvider } from "react-redux";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ReduxProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
