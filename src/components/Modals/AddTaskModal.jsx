import { useState } from "react";
import {createTask,getProjectTasks} from "../../API/apiServices.js"
import { useRecoilState } from 'recoil';
import {taskListState} from '../../recoil/atoms'

const AddTaskModal = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [taskList, setTaskList] = useRecoilState(taskListState);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    projectId: '',
    ETA:selectedDate
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleAddTask=async()=>{
    console.log(selectedDate)
    
    const postData = {
        title: formData.title,
        description: formData.description,
        project: localStorage.getItem("projectId"), // Assuming this retrieves the correct project ID
        priority: formData.priority,
        status: "To Do", // Assuming the default status is "To Do"
        ETA: selectedDate ,// Assuming selectedDate is a valid Date object
      };
      console.log(postData)
    //fire API 
    const res = await createTask(postData);
    const response = await getProjectTasks(localStorage.getItem("projectId"));
    setTaskList(response.data)
    console.log(res);
    setFormData( {
      title: "",
      description: "",
      project: localStorage.getItem("projectId"), // Assuming this retrieves the correct project ID
      priority: "",
      status: "To Do", // Assuming the default status is "To Do"
      ETA: selectedDate ,// Assuming selectedDate is a valid Date object
    });
    //instant loading

      

    //close-Modal
    onClose();


    

  }
 


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };
  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`modal ${
        isOpen ? "block" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      {" "}
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Task
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title of Task
                </label>
                <input
                value={formData.title}
                onChange={handleChange}
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required=""
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Estimated Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min={getCurrentDate()} // Set minimum value to current date
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Priority
                </label>
                <select
                name="priority" 
                value={formData.priority} 
                onChange={handleChange}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                    
                  <option selected="">Select category</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Task Description
                </label>
                <textarea
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write task description here"
                ></textarea>
              </div>
            </div>
            <button
              onClick={handleAddTask}
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Add Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
