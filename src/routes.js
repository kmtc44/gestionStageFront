// import Enterprise from "./components/all/Enterprise";
import User from './components/Profile/Profile'

var dashRoutes = [
  // {
  //     path: "/enterprise",
  //     name: "Enterprise",
  //     icon: "design_app",
  //     component: Enterprise,
  //     layout: "/dashboard"
  //   },
  {
    path: "/profile",
    name: "Profile",
    icon: "design_app",
    component: User,
    layout: "/dashboard"
  },

];
export default dashRoutes;