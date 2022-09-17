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
import Swal from "sweetalert2";

const successAlert = atom({
  key: "successAlert",
  default: false,
});

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

  await api("makeBlog", {
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
        text: "Blog published",
        icon: "success",
        confirmButtonText: "Cool",
      });
      return data.data;
    })
    .catch((error) => {
      Swal.fire({
        title: "Failed",
        text: error.data.message,
        icon: "error",
        confirmButtonText: "ok",
      });
    });
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
  },
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

  await api(`updateBlog/${data.id}`, {
    method: "POST",
    headers: {
      contentType: "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: fd,
  })
    .then((data) => {
      Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
        confirmButtonText: "ok",
      });
      return data.data;
    })
    .catch((error) => {
      Swal.fire({
        title: "Failed",
        text: error.data.message,
        icon: "error",
        confirmButtonText: "ok",
      });
    });
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

const getRandomBlogs = selector({
  key: "getRandomBlogs",
  get: async () => {
    const response = await api("getRandomBlogs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
});

export {
  authUser,
  getBlogs,
  handleMakeBlog,
  getOneBlog,
  getBlogUser,
  handleUpdateBlog,
  handleDeleteBlog,
  getRandomBlogs
};
