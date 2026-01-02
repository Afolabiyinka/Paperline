import { Toaster } from "sonner";
import Routesconfig from "./routes/routesconfig";

function App() {
  return (
    <div className="font-[Montserrat]">
      <Routesconfig />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
