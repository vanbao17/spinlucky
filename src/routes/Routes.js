import Cilent from "../components/Cilent/Cilent";
import Admin from "../components/Admin/Admin";
import routes from "../configs/Configs";
import Login from "../components/Login/Login";
import PageAtemp from "../components/Layouts/PageAtemp/PageAtemp";
import Register from "../components/Register/Register";
import GameSettings from "../components/GameSettings/GameSettings";
import SettingUser from "../components/SettingUser/SettingUser";
import React from "react";
const publicRoutes = [
  {
    path: routes.home,
    component: Cilent,
    layout: PageAtemp,
  },
  {
    path: routes.admin,
    component: Admin,
  },
  {
    path: routes.settinguser,
    component: SettingUser,
  },
  {
    path: routes.game,
    component: GameSettings,
  },
  {
    path: routes.login,
    component: Login,
    layout: PageAtemp,
  },
  {
    path: routes.register,
    component: Register,
    layout: PageAtemp,
  },
];
export default publicRoutes;
