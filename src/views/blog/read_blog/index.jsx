import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from "recoil";
import { getOneBlog } from "../../../store";
import { useEffect } from "react";
import Sidebar from "../../../component/sidebar";
import reactImageSize from "react-image-size";

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

          <div className="flex-col px-10 md:h-full lg:h-screen h-full py-5 w-11/12">
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            <img className="lg:h-5/6 h-[100vw] mt-10" src={imageUrl} />
            <p>{blog.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
