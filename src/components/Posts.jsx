import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/AuthApi";
import Form from "./Form";

const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const getPostData = async () => {
    const res = await getPost();
    setData(res.data);
  };

  const handlePostDelete = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatesData = data.filter((currPost) => {
          return currPost.id !== id;
        });
        setData(newUpdatesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleEditPost = (curElem) => {
    setUpdateDataApi(curElem);
  };

  return (
    <>
      <section className="flex justify-center items-center p-8 bg-gray-100">
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="bg-gray-100 mt-4">
        <ol className=" ml-8 space-y-6">
          {data.map((curElem) => {
            const { body, name, email, id } = curElem;
            return (
              <li
                key={id}
                className="list-decimal p-4 bg-white rounded-lg shadow-md hover:shadow-lg"
              >
                <div className="">
                  <p className="text-lg font-bold ">
                    Name: <span className="font-normal px-1">{name}</span>
                  </p>
                  <p className="text-lg font-bold">
                    Email:{" "}
                    <span className="font-normal text-blue-600 px-1">
                      {email}
                    </span>
                  </p>
                  <p className="text-lg font-bold mt-1">
                    Details:{" "}
                    <span className="font-normal text-gray-700 px-1">
                      {body}
                    </span>
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    className="bg-green-500 px-4 py-2 rounded-lg mr-2 text-white transition-colors hover:bg-green-600"
                    onClick={() => handleEditPost(curElem)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 px-4 py-2 rounded-lg text-white transition-colors hover:bg-red-700"
                    onClick={() => handlePostDelete(id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};

export default Posts;
