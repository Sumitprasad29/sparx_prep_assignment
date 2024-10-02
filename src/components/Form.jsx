/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { addPost, updatePost } from "../api/AuthApi";

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    name: "",
    email: "",
    body: "",
  });

  const len = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    updateDataApi &&
      setAddData({
        name: updateDataApi.name || "",
        email: updateDataApi.email || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    const res = await addPost(addData);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({
        name: "",
        email: "",
        body: "",
      });
    }
  };

  const updatePostData = async () => {
    const res = await updatePost(updateDataApi.id, addData);
    console.log(res);
    setData((prev) => {
      return prev.map((curElem) => {
        return curElem.id === res.data.id ? res.data : curElem;
      });
    });
    setAddData({
      name: "",
      email: "",
      body: "",
    });
    setUpdateDataApi({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;

    if (action == "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <>
      <form
        className="flex justify-center items-center"
        onSubmit={handleFormSubmit}
      >
        <div className="flex gap-4 mb-4">
          <input
            className="w-1/3 p-3 border border-gray-300 text-black rounded-md "
            type="text"
            autoComplete="off"
            placeholder="Add name"
            name="name"
            value={addData.name}
            onChange={handleInputChange}
          />
          <label htmlFor="email"></label>
          <input
            className="w-1/3 p-3 border border-gray-300 text-black rounded-md"
            type="email"
            autoComplete="off"
            placeholder="email"
            name="email"
            value={addData.email}
            onChange={handleInputChange}
          />
          <input
            className="w-1/3 p-3 border border-gray-300 text-black rounded-md"
            type="text"
            autoComplete="off"
            placeholder="details"
            name="body"
            value={addData.body}
            onChange={handleInputChange}
          />
          <div>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
              type="submit"
              value={len ? "Add" : "Edit"}
            >
              {len ? "Add" : "Edit"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
