import { Toaster } from "sonner";
import Routesconfig from "./routes/routesconfig";

function App() {
  return (
    <div>
      <Routesconfig />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
