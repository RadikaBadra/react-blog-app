import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from "recoil";
import { getOneBlog } from "../../../store";
import { useEffect } from "react";
import Sidebar from "../../../component/sidebar";
import { MdDateRange } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

export default function ReadBlog() {
  const id = useParams().id;
  const blog = useRecoilValue(getOneBlog(id));
  const refresh = useRecoilRefresher_UNSTABLE(getOneBlog(id));
  const imageUrl = "http://127.0.0.1:8000/storage/images/" + blog.image;

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-row bg-text-bg w-full text-title">
          <div>
            <aside className="h-full">
              <Sidebar />
            </aside>
          </div>

          <div className="flex-col px-10 h-full py-5 w-11/12">
            <div className="m-auto lg:w-[70vw] w-[65vw]">
              <h1 className="text-3xl font-bold text-center my-16">
                {blog.title}
              </h1>{" "}
              <img
                className="lg:h-[50vw] lg:h-[80vw] m-auto object-cover"
                src={imageUrl}
              />
              <div className="flex items-center my-10 detail">
                <MdDateRange className="icons mr-1 text-gray" size={30} />
                <span
                  className="text-md text-gray"
                  key={blog.id + blog.created}
                >
                  {blog.created_at}
                </span>
                <FaUserAlt className="icons ml-5 mr-1 text-gray" size={30} />
                <span
                  className="text-md text-gray"
                  key={blog.id + blog.author}
                >
                  {blog.author}
                </span>
              </div>
              <p className="mt-10 text-justify">&emsp; {blog.content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
