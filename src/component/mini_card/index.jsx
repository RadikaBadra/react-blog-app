import { Link } from "react-router-dom";

export const MiniCard = (props) => {
  return (
    <div className=" bg-gray-100">
      <div className="flex flex-row gap-10 h-14 mb-5 items-center p-5">
        <h1 className="font-bold lg:text-xl w-2/3 truncate">{props.title}</h1>
        <Link to={"/readBlog/" + props.id} className={"absolute lg:right-36 right-7"}>
          <button className="bg-sidebar-bg text-white p-4 lg:w-40 ">Read</button>
        </Link>
      </div>
    </div>
  );
};
