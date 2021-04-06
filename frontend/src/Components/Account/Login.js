import React, { useState } from "react";
import { navigate, A } from "hookrouter";
import axios from "axios";
import { Loading } from "../Common/Loader";
import { toast } from 'react-toastify';
 
export default function Login() {
  const initForm = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    const FieldValue = { ...form };
    FieldValue[name] = value;
    setForm(FieldValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:8000/user/login", { ...form })
      .then((resp) => {
        toast.success(JSON.stringify(resp.data.message));
        localStorage.setItem("access_token", resp.data.data.access_token);
        navigate("/home");
        setLoading(false);
        window.location.reload();
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(JSON.stringify(response.data.detail));
        }
        setLoading(false);
      });
  };

  return (
    <div className="body">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-login-img flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8 pb-96">
          <div className="max-w-md w-full">
            <div className="text-black text-3xl font-bold mt-6">
              To Continue, log in to SocioMark
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-transparent shadow rounded px-8 pt-6 pb-8 my-5 lg:my-20"
            >
              <div className="mb-4">
                <label
                  className="block text-white text-base font-bold mb-2 mt-4"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  aria-label="user name"
                  name="email"
                  value={form.email}
                  type="email"
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-2">
                <label
                  className="block text-white text-base font-bold mb-2 mt-10"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  aria-label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="********"
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="flex items-center bg-black hover:bg-primary text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline mt-10"
                >
                  <svg
                    className="h-5 w-5 text-white transition ease-in-out duration-150 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
