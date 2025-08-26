import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./scss/style.scss";

import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
