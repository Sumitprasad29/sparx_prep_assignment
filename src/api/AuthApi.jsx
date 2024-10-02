import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPost = () => {
  return api.get("/posts/1/comments");
};

export const deletePost = (id) => {
  return api.delete(`/comments/${id}`);
};

export const addPost = (post) => {
  return api.post("/posts", post);
};

export const updatePost = (id, post) => {
  return api.put(`/comments/${id}`, post);
};
