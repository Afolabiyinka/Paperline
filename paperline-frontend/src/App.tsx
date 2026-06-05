import { Toaster } from "sonner";
import Routesconfig from "./shared/routes/routesconfig";
import { useFetchUser } from "./app/auth/hooks/useFetchUser";
import { useAuthStore } from "./app/auth/store/authStore";
import { useEffect } from "react";
import Scrollbtn from "./components/custom/Scrollbtn";

function App() {
  const { fetchedUser, isLoading, } = useFetchUser()
  const { setAuthUser, setAuthResolved } = useAuthStore()

  useEffect(() => {
    if (!isLoading) {
      setAuthUser(fetchedUser || null);
      setAuthResolved(true);
    }
  }, [fetchedUser, isLoading, setAuthUser, setAuthResolved]);
  return (
    <div className="font-['IBM_Plex_Serif'] text-primary min-h-screen">
      <Routesconfig />
      <Scrollbtn />

      <Toaster
        position="top-left"
        richColors
        toastOptions={{
          style: {
            background: "#fff",
            color: "#111",
            borderRadius: "1px",
          },
        }}
      />    </div>
  );
}

export default App;
