import React from "react";
import { FiInfo, FiFileText, FiClock, FiEdit } from "react-icons/fi";

const DetailPage = ({ task }) => {
  if (!task) return null;

  return (
    <div className=" text-slate-50  p-2 ">
      <div className="flex items-center gap-3 mb-6">
        <div className="  py-4 rounded-xl">
          <FiInfo className="text-2xl text-primary" />
        </div>
        <h1 className="text-3xl font-bold ">{task.taskname}</h1>
      </div>

      <div className="space-y-6  py-2">
        <div className="rounded-lg  ">
          <div className="flex   items-center gap-2 mb-3">
            <FiFileText className="text-xl text-secondary" />
            <h4 className="text-lg    font-semibold">Description</h4>
          </div>
          <p className="text-slate-400 whitespace-pre-line">
            {task.description}
          </p>
        </div>

        <div className="  py-2 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <FiClock className="text-xl text-accent" />
            <h4 className="text-lg font-semibold">Current Status</h4>
          </div>
          <span
            className={`badge py-4 font-bold px-10 ${
              task.taskstatus ? "badge-success" : "badge-warning"
            } gap-2`}
          >
            {task.taskstatus ? "Completed  ✅" : "Pending ⏳"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
