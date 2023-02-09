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
  getOneBlog,
  getBlogUser,
  handleDeleteBlog,
  getRandomBlogs
};
