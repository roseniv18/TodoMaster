import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { Provider } from "react-redux"
import "./index.scss"
import { store } from "./redux/store.ts"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

disableReactDevTools()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>
)
