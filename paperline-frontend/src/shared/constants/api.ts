import { QueryClient } from "@tanstack/react-query";

const prodEndpoint = "https://paperline.onrender.com";
const testingEndpoint = "http://localhost:8000/";

const queryClient = new QueryClient()
export { testingEndpoint, prodEndpoint, queryClient };
