import Admin from "@/pages/Admin";
import SignIn from "@/pages/Authentication/SignIn";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import PassengerList from "@/pages/Users/PassengerList";


export const publicRoutes = [
  { path: "/auth/login", element: <SignIn /> },
  { path: "*", element: <NotFound /> },

];

export const privateRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/user/list", element: <PassengerList /> },
  { path: "/user/admin/list", element: <Admin /> },

];
