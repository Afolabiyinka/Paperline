import { QueryClient } from "@tanstack/react-query";

const prodEndpoint = "https://paperline.onrender.com/api";
const testingEndpoint = "http://localhost:8000/api";

const queryClient = new QueryClient()
export { testingEndpoint, prodEndpoint, queryClient };
