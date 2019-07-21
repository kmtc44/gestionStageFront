// import Enterprise from "./components/all/Enterprise";
import User from './components/Profile/Profile';
import Attachments from './components/Attachments/Attachments';

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
    icon: "users_single-02",
    component: User,
    layout: "/dashboard"
  },
   {
    path: "/Attachments",
    name: "Pièces-jointes",
    icon: "files_paper",
    component: Attachments,
    layout: "/dashboard"
  },

];
export default dashRoutes;