import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/readone/${id}`
          );
          const taskData = response.data.task;

          if (taskData) {
            setValue("taskname", taskData.taskname);
            setValue("description", taskData.description);
            setValue("taskstatus", String(taskData.taskstatus));
          }
        } catch (error) {
          toast.error("Error fetching task details");
        }
      };

      fetchTask();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await axios.put(`http://localhost:4000/update/${id}`, data);
        
        toast.success("Task updated successfully!"); 
  
        setTimeout(() => {
          navigate("/");
        }, 1500); 
  
      } else {
        await axios.post("http://localhost:4000/taskcreate/", data);
        toast.success("Task created successfully!");
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="p-6 my-16 border-2 rounded-lg  mx-auto max-w-2xl bg-slate-100 ">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Update Task" : "Add a New Task"}{" "}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="taskname" className="block text-gray-700">
            Task Name
          </label>
          <input
            type="text"
            id="taskname"
            {...register("taskname", { required: "Task Name is required" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.taskname && (
            <p className="text-red-500">{errors.taskname.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border rounded-md"
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="taskstatus" className="block text-gray-700">
            Task Status
          </label>
          <select
            id="taskstatus"
            {...register("taskstatus", { required: "Task status is required" })}
            className="w-full p-2 border rounded-md"
          >
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
          {errors.taskstatus && (
            <p className="text-red-500">{errors.taskstatus.message}</p>
          )}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="flex items-center mx-auto px-10 py-1 my-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-150 uppercase"
          >
            {id ? "update task" : "Add Task"}
          </button>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
          />
        </div>
        <button className=" flex items-center text-center  mx-auto px-20 py-1  bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-150">
          <Link to={"/"}>
            <span className=" uppercase">Back to home</span>
          </Link>
        </button>
      </form>
    </div>
  );
};

export default AddTask;
