import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiLogOut,
} from "react-icons/fi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailPage from "./DetailPage";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/readtask/", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setTasks(res.data.tasks);
      } catch (error) {
        toast.error("Error fetching tasks");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success("Task deleted successfully");
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting task");
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:4000/logout/", {
        withCredentials: true,
      });
      toast.success("User logged out successfully");
      localStorage.removeItem("jwt");

      setTimeout(() => {
        window.location.reload();
        navigate("/login");
      }, 600);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out");
    }
  };

  return (
    <div className="px-5 py-2 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6 bg-white px-10 py-5 rounded-xl shadow-md">
        <div className="flex items-center space-x-3 ">
          <div className="p-5 me-5 bg-blue-500 rounded-xl shadow-lg">
            <FiCheckCircle className="text-2xl text-white" />
          </div>
          <div className="font-bold">
            <h1 className="text-3xl text-gray-800">Task Manager</h1>
            <h2 className="py-1 text-gray-600">
              Task Pending ⏳:{" "}
              {tasks.filter((task) => task.taskstatus === false).length}
            </h2>
            <h2 className="text-gray-600">
              Task Completed ✅ :{" "}
              {tasks.filter((task) => task.taskstatus === true).length}
            </h2>
          </div>
        </div>

        <div className="flex space-x-4">
          <Link
            to="/addtask"
            className="flex items-center space-x-2 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transform transition-all duration-150 hover:scale-105"
          >
            <FiPlus className="text-lg" />
            <span>Add Task</span>
          </Link>

          <button
            onClick={logout}
            className="flex items-center space-x-2 px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transform transition-all duration-150 hover:scale-105"
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tasks.map((task) => (
            <div
              key={task._id}
              onClick={() => {
                setSelectedTask(task);
                document.getElementById("task_detail_modal").showModal();
              }}
              className={`relative border-s-4 bg-white rounded-xl p-5 shadow-md  hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:translate-y-2  ${
                task.taskstatus
                  ? "border-red-500 "
                  : "border-blue-500 cursor-pointer"
              } h-[200px] flex flex-col justify-between`}
            >
              <div className="flex-grow">
                <h2
                  className={`text-lg font-semibold truncate ${
                    task.taskstatus
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                  title={task.taskname}
                >
                  {task.taskname?.length > 30
                    ? `${task.taskname.slice(0, 30)}...`
                    : task.taskname}
                </h2>

                <p
                  className={`text-gray-600 ${
                    task.taskstatus && "text-gray-400"
                  } overflow-hidden line-clamp-3`}
                >
                  {task.description}
                </p>
              </div>

              <h2
                className={`font-semibold ${
                  task.taskstatus ? "text-green-500" : "text-red-500"
                }`}
              >
                Status: {task.taskstatus ? "Completed ✅" : "Pending ⏳"}
              </h2>

              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-blue-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link to={`/updatetask/${task._id}`}>
                    <FiEdit className="text-lg" />
                  </Link>
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task._id);
                  }}
                >
                  <FiTrash2 className="text-lg" />
                </button>
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-12 col-span-full">
              <div className="mb-4 text-gray-400 text-6xl">
                <FiCheckCircle className="inline-block" />
              </div>
              <h3 className="text-gray-500 text-xl">No tasks found</h3>
              <p className="text-gray-400">
                Add a new task by clicking the button above
              </p>
            </div>
          )}
        </div>
      )}

      <dialog id="task_detail_modal" className="modal">
        <div className="modal-box  max-w-[900px]  bg-slate-800 hover:bg-opacity-95 text-slate-50  font-sarif">
          {selectedTask && <DetailPage task={selectedTask} />}
          <div className="modal-action">
            <button
              className="btn  text-white  hover:border-white hover:bg-transparent hover:text-white  uppercase px-8 py-2 rounded-full transition-all duration-300 transform hover:scale-110 "
              onClick={() => document.getElementById("task_detail_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button >close</button>
        </form>
      </dialog>

      <ToastContainer
        position="top-center"
        autoClose={600}
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
  );
};

export default TaskList;