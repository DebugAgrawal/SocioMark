import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Post from "./Post/Post";
import axios from "axios";
import { toast } from "react-toastify";
import { Loading } from "../Components/Common/Loader";
import { POST_GET_ALL_URL } from "../constants";
import { UPDATE_USER_URL } from "../constants";

export default function UserProfile() {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState({ fileUpload: null });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile({
      fileUpload: file,
    });
    e.preventDefault();
    setLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("description", description);
    if (file.fileUpload) {
      bodyFormData.append("image", file.fileUpload);
    }
    axios
      .patch(UPDATE_USER_URL, bodyFormData, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setLoading(false);
        toast.success(JSON.stringify(res.data.message));
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(JSON.stringify(response.data.detail));
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(POST_GET_ALL_URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setPosts(res.data.data);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col sm:flex-row mx-auto bg-white h-auto text-xl justify-center">
          <div className="flex md:flex-col flex-wrap w-full sm:w-1/2 items-center pt-20 ">
            <div className="relative flex flex-col md:w-1/2 items-center justify-center mx-auto z-0 hover:opacity-50 duration-300">
              <div className=" items-center ">
                <img
                  className="h-40 w-40 border-black border-2 rounded-full"
                  src={user[0].profile_picture}
                  alt
                />
              </div>
              <div className="absolute w-1/2 text-sm">
              <input aria-label="profile_picture"
                      name="profile_picture"
                      onChange={handleFileUpload}
                      type="file"
                      accept="image/*"
                      class="absolute w-full border z-10 opacity-0 hover:opacity-100 duration-300 rounded bg-blue-200 leading-tight focus:outline-none focus:shadow-outline"/>
                      {" "}
              </div>
            </div>

            <div className="flex flex-col w-full md:w-4/5 mx-auto py-2 text-center items-center">
              <div className="text-left pl-4 pt-3 text-center w-2/3">
                <span className="text-base text-gray-700 text-3xl">
                  {user[0].name}
                </span>
              </div>

              <div className="text-left pl-4 pt-3 text-center w-4/5">
                <p className="text-base font-medium text-black-700 mr-2 box-content text-xl font-mono ">
                  {user[0].description}
                </p>
              </div>
            </div>

            <div className="text-left text-center w-1/2 mx-auto">
              <button className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-6 border border-gray-600 hover:border-transparent rounded">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:2/3 w-full pt-20 items-start">
            <div className="flex-1 text-center px-4 py-2 m-2">
              {posts
                .filter((posts) => posts.user_id === user[0].user_id)
                .map((post) => {
                  return <Post post_initializer={post} />;
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
