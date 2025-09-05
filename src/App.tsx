import { useRoutes } from "react-router-dom";
import { routes } from "./app/routes/routes";

export default function App() {
  const element = useRoutes(routes);
  return element;
}
