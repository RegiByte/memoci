import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "ui/src/tailwind.css"
import { BrowserRouter } from "react-router-dom"
import { AppStorageProvider } from "./components/wrappers/AppStorage"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppStorageProvider>
        <App />
      </AppStorageProvider>
    </BrowserRouter>
  </React.StrictMode>
)
