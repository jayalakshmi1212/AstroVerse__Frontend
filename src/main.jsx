import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./Redux/Store";
import { SocketProvider } from "./context/socket.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SocketProvider>
      <App />
    </SocketProvider>
  </Provider>
);
