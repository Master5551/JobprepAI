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
  HiOutlineLogout,
} from "react-icons/hi";
import {
  MdHomeMini,
  MdLeaderboard,
  MdSubject,
  MdSubscript,
} from "react-icons/md";
let userId;
const token = localStorage.getItem("token");
if (token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  console.log("Decoded JWT token:", decodedToken);
  userId = decodedToken.id;
  console.log("User ID:", userId);
} else {
  console.error("JWT token not found in local storage.");
}

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "orders",
    label: "Students",
    path: "/admin/students",
    icon: <MdLeaderboard />,
    isadmin: true,
  },
  {
    key: "products",
    label: "Score Cards",
    path: `/scores/${userId}`,
    icon: <HiOutlineCube />,
    isadmin: false,
  },

  {
    key: "admin",
    label: "subjects",
    path: "/admin/subject",
    icon: <MdSubject></MdSubject>,
    isadmin: true,
  },

  {
    key: "dashboard",
    label: "Charts",
    path: "/",
    icon: <HiOutlineCube />,
    isadmin: false,
  },
  {
    key: "Interview",
    label: "Interview",
    path: "/jobrole",
    icon: <HiOutlineCube />,
    isadmin: false,
  },
  {
    key: "Profile",
    label: "Profile",
    path: "/profile",
    icon: <MdHomeMini></MdHomeMini>,
    isadmin: false,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "logout",
    label: "logout",
    path: "/login",
    icon: <HiOutlineLogout />,
    isadmin: false,
  },
];
