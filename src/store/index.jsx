import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  selectorFamily,
  atomFamily,
} from "recoil";

import api from "../api";

const successAlert = atom({
  key : "successAlert",
  default : false,

})

const authUser = selector({
  key: "authUser",
  get: async ({ get }) => {
    const response = await api("user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  },
});

const handleMakeBlog = async (data) => {
  let images = data.image;
  let fd = new FormData();
  fd.append("author", data.author);
  fd.append("author_id", parseInt(data.author_id));
  fd.append("image", images);
  fd.append("title", data.title);
  fd.append("content", data.content);
  try {
    const response = await api("makeBlog", {
      method: "POST",
      headers: {
        contentType: "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: fd,
    });
    return response.data;
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

const getBlogs = selector({
  key: "getBlogs",
  get: async () => {
    const response = await api("getBlogs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  }
});

const getOneBlog = atomFamily({
  key: "getOneBlog",
  default: selectorFamily({
    key: "getOneBlog",
    get:
      (id) =>
      async ({ get }) => {
        const response = await api(`getBlog/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response.data;
      },
  }),
});

const getBlogUser = atomFamily({
  key: "getUserBlogs",
  default: selectorFamily({
    key: "getUserBlogs",
    get:
      (id) =>
      async ({ get }) => {
        const response = await api(`userBlog/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response.data;
      },
  }),
});

// const getBlogUser = async (id) => {
//   const response = await api(`userBlog/${id}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });
//   return response.data;
// };

const handleUpdateBlog = async (data) => {
  let images = data.image;
  let fd = new FormData();
  fd.append("author", data.author);
  fd.append("author_id", parseInt(data.author_id));
  fd.append("image", images);
  fd.append("title", data.title);
  fd.append("content", data.content);

  try {
    const response = await api(`updateBlog/${data.id}`, {
      method: "POST",
      headers: {
        contentType: "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: fd,
    });
    return response;
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

const handleDeleteBlog = async (id) => {
  try {
    const response = await api(`deleteBlog/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

export {
  authUser,
  getBlogs,
  handleMakeBlog,
  getOneBlog,
  getBlogUser,
  handleUpdateBlog,
  handleDeleteBlog,
};
