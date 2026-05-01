import { Toaster } from "sonner";
import Routesconfig from "./shared/routes/routesconfig";
import { useFetchUser } from "./app/auth/hooks/useFetchUser";
import { useAuthStore } from "./app/auth/store/authStore";
import { useEffect } from "react";

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
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#fff",
            color: "#111",
            border: "1px solid #e5e5e5",
            borderRadius: "10px",
            fontSize: "14px",
          },
        }}
      />    </div>
  );
}

export default App;
