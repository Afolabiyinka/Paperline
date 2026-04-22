import { Toaster } from "sonner";
import Routesconfig from "./shared/routes/routesconfig";
import { useFetchUser } from "./app/auth/hooks/useFetchUser";
import { useAuthStore } from "./app/auth/store/authStore";

function App() {
  const { fetchedUser, } = useFetchUser()
  // const { setAuthUser } = useAuthStore()

  // if (fetchedUser) {
  //   setAuthUser(fetchedUser)
  // }

  return (
    <div className="font-[Montserrat]">
      <Routesconfig />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
