import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from "recoil";
import { getOneBlog, getRandomBlogs } from "../../../store";
import { useEffect } from "react";
import Sidebar from "../../../component/sidebar";
import { MdDateRange } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MiniCard } from "../../../component/mini_card";

export default function ReadBlog() {
  const id = useParams().id;
  const blog = useRecoilValue(getOneBlog(id));
  const randomBlog = useRecoilValue(getRandomBlogs);
  const refresh = useRecoilRefresher_UNSTABLE(getOneBlog(id));
  const imageUrl = "http://127.0.0.1:8000/storage/images/" + blog.image;

  htmlDecode(content) {
    let e = document.createElement('div');
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
  
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

          <div className="lg:px-10 lg:py-10 h-full py-5 w-full">
            <div className="m-auto w-[60vw] flex flex-col justify-center lg:w-11/12">
              <img
                className="lg:h-[80vh] w-full m-auto object-cover"
                src={imageUrl}
              />
              <h1 className="text-[5vw] font-bold text-center my-16">
                {blog.title}
              </h1>
              <div className="flex items-center my-10 detail">
                <MdDateRange className="icons mr-1 text-gray" size={10} />
                <span
                  className="text-md text-gray"
                  key={blog.id + blog.created}
                >
                  {blog.created_at}
                </span>
                <FaUserAlt className="icons ml-5 mr-1 text-gray" size={10} />
                <span className="text-md text-gray" key={blog.id + blog.author}>
                  {blog.author}
                </span>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: {blog.content} }}
              ></div>
              <div className="mt-40 w-full">
                <div className="mb-10">
                  <h1 className="text-[3vw] font-bold">Random Blogs</h1>
                </div>
                {blog.content}
                {randomBlog.map((data) => (
                  <MiniCard title={data.title} id={data.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
