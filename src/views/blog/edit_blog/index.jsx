import Sidebar from "../../../component/sidebar";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from "recoil";
import { authUser } from "../../../store";
import { useParams } from "react-router-dom";
import { getOneBlog } from "../../../store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import api from './../../../api/index';
import Swal from "sweetalert2";

export default function EditBlog() {
  const user = useRecoilValue(authUser);
  const id = useParams().id;
  const fileInput = useRef();
  const blog = useRecoilValue(getOneBlog(id));
  // const refresh = useRecoilRefresher_UNSTABLE(getOneBlog(id));

  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [author, setAuthor] = useState(user.name);
  const [author_id, setAuthor_id] = useState(parseInt(user.id));
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  function handleImage(e) {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(blog.image);
    }
  }

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    let status = false;
    let fd = new FormData();
    fd.append("author", author);
    fd.append("author_id", parseInt(author_id));
    fd.append("image", image);
    fd.append("title", title);
    fd.append("content", content);

    await api(`updateBlog/${id}`, {
      method: "POST",
      headers: {
        contentType: "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: fd,
    })
      .then((data) => {
        Swal.fire({
          title: "Successs",
          text: "Blog Updated",
          icon: "success",
          confirmButtonText: "Cool",
        });
        status = true;
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed",
          text: error.data.data,
          icon: "error",
          confirmButtonText: "ok",
        });
      });
      
      if(status == true){
        navigate("/dashboard")
      }
  };

  return (
    <>
      <div className="flex flex-row bg-text-bg w-full text-title">
        <div>
          <aside className="h-full">
            <Sidebar />
          </aside>
        </div>

        <div className="flex-col px-10 py-5 h-full">
          <div className="flex flex-row items-center relative">
            <div>
              <h1 className="lg:text-5xl text-4xl font-bold">Update</h1>
              <p className="my-2 text-sm lg:text-m">update your own blogs</p>
              <form
                action=""
                className="flex flex-col w-[55vw] lg:w-[75vw] my-5"
                onSubmit={(e) => handleUpdateBlog(e)}
              >
                <label htmlFor="title" className="lg:text-lg mt-10">
                  Title
                </label>
                <input
                  type="text"
                  className="border-2 mb-8"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="content" className="lg:text-lg">
                  Content
                </label>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="h-screen"
                />
                <label htmlFor="image" className="lg:text-lg mt-20">
                  Image
                </label>
                <div className="flex w-80 items-center mt-2 gap-2">
                  <button
                    className="bg-gray-200 lg:w-40 lg:h-40 w-24 h-24 lg:text-lg text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      fileInput.current.click();
                    }}
                  >
                    Add Image
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImage(e)}
                    style={{ display: "none" }}
                    ref={fileInput}
                  />

                  {image ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="lg:w-40 lg:h-40 w-24 h-24 object-cover"
                    />
                  ) : (
                    <p className="text-sm">No image selected</p>
                  )}
                </div>

                <button className="bg-sidebar-bg text-text py-3 px-9 mt-5">
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
