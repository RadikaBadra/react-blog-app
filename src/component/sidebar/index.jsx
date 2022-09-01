import { FaHome } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useState, useContext } from "react";
import AuthContext from "../../middleware/authProvider";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogout } = useContext(AuthContext);

  return (
    <>
      <div
        className={`${
          isOpen ? "w-60" : "w-24"
        } h-full duration-300 bg-sidebar-bg relative text-text`}
      >
        <div
          className={`${isOpen ? "rotate-0" : "rotate-180"} 
            absolute cursor-pointer -right-3 top-9 duration-300 control rounded-full bg-sidebar-bg`}
        >
          <IoIosArrowDropleftCircle
            size={35}
            onClick={(e) => setIsOpen(!isOpen)}
          />
        </div>
        <div className="flex flex-col md:h-full">
          <div>
            <ul className="list-reset mx-2 my-9 space-y-3 px-5 items-center ">
              <Link to={"/"}>
                <li className="flex space-x-4 items-center">
                  <div className="icon">
                    <FaHome size={17} />
                  </div>
                  <div
                    className={`${
                      isOpen ? "scale-100" : "scale-0"
                    } duration-300`}
                  >
                    <h1>Homepage</h1>
                  </div>
                </li>
              </Link>

              <Link to={"/makeBlog"}>
                <li className="my-2 flex space-x-4 items-center">
                  <div className="icon">
                    <FaPencilAlt size={17} />
                  </div>
                  <div
                    className={`${
                      isOpen ? "scale-100" : "scale-0"
                    } duration-300`}
                  >
                    <h1>Write</h1>
                  </div>
                </li>
              </Link>
              <Link to={"/dashboard"}>
                <li className="my-2 flex space-x-4 items-center">
                  <div className="icon">
                    <RiDashboardFill size={17} />
                  </div>
                  <div
                    className={`${
                      isOpen ? "scale-100" : "scale-0"
                    } duration-300`}
                  >
                    <h1>Dashboard</h1>
                  </div>
                </li>
              </Link>
              <button onClick={() => isLogout()}>
                <div className=" logout my-2 w-44 flex space-x-4 bottom-6 absolute items-center">
                  <div className="icon">
                    <RiLogoutBoxRFill size={17} />
                  </div>
                  <div
                    className={`${
                      isOpen ? "scale-100" : "scale-0"
                    } duration-300`}
                  >
                    <h2>Log Out</h2>
                  </div>
                </div>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
