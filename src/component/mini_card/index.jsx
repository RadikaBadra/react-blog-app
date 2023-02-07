import { Link } from "react-router-dom";

export const MiniCard = (props) => {
  return (
    <div className=" bg-gray-100">
      <div className="flex flex-row gap-10 h-14 mb-5 items-center justify-end">
        <h1 className="font-bold lg:text-xl ml-6 w-full truncate">{props.title}</h1>
        <div>
          <Link to={"/readBlog/" + props.id}>
            <button className="bg-sidebar-bg text-white p-4 lg:w-40 ">
              Read
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
