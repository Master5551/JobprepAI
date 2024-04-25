import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
  HiScissors,
} from "react-icons/hi";
import { MdLeaderboard } from "react-icons/md";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Charts",
    path: "/",
    icon: <HiOutlineCube />,
  },
  {
    key: "products",
    label: "Score Cards",
    path: "/scores",
    icon: <HiOutlineCube />,
  },
  {
    key: "orders",
    label: "LeaderBoard",
    path: "/orders",
    icon: <MdLeaderboard />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
];
