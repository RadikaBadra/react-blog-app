import Sidebar from "../../../component/sidebar";
import { useState, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authUser } from "../../../store";
import { handleMakeBlog } from "../../../store";

export default function MakeBlog() {
  const user = useRecoilValue(authUser);

  const [image, setImage] = useState();
  const [author, setAuthor] = useState(user.name);
  const [author_id, setAuthor_id] = useState(parseInt(user.id));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const fileInput = useRef();
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
      setImage(null);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleMakeBlog({
      image,
      author,
      author_id,
      title,
      content,
    });
  }

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
              <h1 className="lg:text-7xl text-4xl font-bold">Write</h1>
              <p className="my-1 text-sm lg:text-m">write your thought into a good blog</p>
              <form
                action=""
                className="flex flex-col w-[55vw] lg:w-[50vw] my-5"
                onSubmit={(e) => handleSubmit(e)}
              >
                <label htmlFor="title" className="lg:text-lg mt-2">
                  Title
                </label>
                <input
                  type="text"
                  className="border-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="content" className="lg:text-lg mt-2">
                  Content
                </label>
                <textarea
                  type="text"
                  className="border-2 h-[100vw]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="11"
                />
                <label htmlFor="image" className="lg:text-lg mt-5">
                  Image
                </label>
                <div className="flex w-80 items-center mt-2 gap-2">
                  <button
                    className="bg-green-600 lg:w-40 lg:h-40 w-24 h-24 lg:text-lg text-sm"
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
