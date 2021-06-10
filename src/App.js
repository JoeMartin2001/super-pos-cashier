import { AppProvider } from './context/AppProvider';  
import RouteProvider from './routes/RouteProvider';
const electron = window.require("electron")

function App() {
  return (
    <AppProvider>
        <RouteProvider />
    </AppProvider>
  )
}

export default App;
