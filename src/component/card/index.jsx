import "./index.css";
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { handleDeleteBlog, getBlogUser } from "../../store";
import Swal from "sweetalert2";

const Card = (props) => {
  const [isDashboard, setIsDashboard] = useState(false);
  const pathname = window.location.pathname;

  useEffect(() => {
    if (pathname === "/dashboard") {
      setIsDashboard(true);
    }
  });

  function deleteFunction(e) {
    e.preventDefault();
    Swal.fire({
      title: "are you sure to delete this blog?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteBlog(props.id);
        Swal.fire("Deleted", "", "success");
        props.refresh();
      }
    });
  }

  return (
    <div
      key={props.id}
      className="card md:h-[40vw] lg:h-[30vw] lg:w-80 h-[70vw] w-56 bg-text flex flex-col relative"
    >
      <div className="image">
        <img
          className="lg:h-40 lg:w-80 h-40 w-56 object-cover"
          key={props.id + props.image}
          src={`http://127.0.0.1:8000/storage/images/` + props.image}
        />
      </div>
      <div className="p-5">
        <h2
          className="lg:text-2xl md:text-1xl text-lg font-bold truncate"
          key={props.id + props.title}
        >
          {props.title}
        </h2>
        <div className="flex items-center lg:text-sm text-[2.5vw] md:text-sm my-2 detail">
          <MdDateRange className="icons mr-1 text-gray-600" />
          <span key={props.id + props.created}>{props.created}</span>
          <FaUserAlt className="icons ml-5 mr-1" />
          <span key={props.id + props.author}>{props.author}</span>
        </div>
        <div>
          {isDashboard ? (
            <>
              <div className="flex absolute bottom-5 gap-2 lg:w-90">
                <Link to={"/readBlog/" + props.id}>
                  <button
                    key={"button" + props.id}
                    className="lg:w-20 w-14 text-text p-2 text-sm bg-sidebar-bg"
                  >
                    Read
                  </button>
                </Link>

                <Link to={"/editBlog/" + props.id}>
                  <button
                    key={"button" + props.id}
                    className="lg:w-20 w-14 text-text p-2 text-sm bg-blue-500"
                  >
                    Edit
                  </button>
                </Link>

                <button
                  key={"button" + props.id}
                  onClick={(e) => deleteFunction(e)}
                  className="lg:w-20 w-14 text-text p-2 text-sm bg-red-500"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <Link to={"/readBlog/" + props.id}>
              <button
                key={"button" + props.id}
                className="w-32 absolute bottom-5 text-text p-2 bg-sidebar-bg"
              >
                Read
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
