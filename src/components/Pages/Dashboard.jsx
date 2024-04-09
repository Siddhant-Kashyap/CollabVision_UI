import { useEffect, useState } from "react";
import Profile from "../Profile/Profile";
import ProjectList from "../ProjectList/ProjectList";
import ToDoList from "../TicketCard/ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faVideo, faPlus } from "@fortawesome/free-solid-svg-icons";
import typingMeme from "../../assets/typingmeme.gif";
import ProjectModal from "../Modals/ProjectModal";
import { jwtDecode } from "jwt-decode";
import { fetchProject,getUser } from "../../API/apiServices";
import AddTaskModal from "../Modals/AddTaskModal";
import {useRecoilValue} from 'recoil'
import { taskListState } from "../../recoil/atoms";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const tasks = useRecoilValue(taskListState);
  const [taskUpdated,setTaskUpdated] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [todoTask,setTodoTask]= useState([]);
  const [onGoing,setOnGoing]= useState([]);
  const [doneTask,setDone]= useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [projectList, setProjectList] = useState({ title: "", id: "" });
  const [_name,setName] = useState("");
  const [taskList,setTaskList] = useState([]);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const addTaskModelToggel = () => {
    setIsModalOpen(!modalOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };
  const getProfile=async ()=>{
    const res=await getUser(jwtDecode(localStorage.getItem("authToken")).userId);
    console.log(res);
    localStorage.setItem("firstName",res.firstName)
    localStorage.setItem("lastName",res.lastName)
    localStorage.setItem("email",res.email)
    setName(res.firstName+" "+res.lastName);

  }
  const handleUpdateTask=()=>{
    setTaskUpdated(!taskUpdated)
  }
  useEffect(() => {
    getProfile()
    console.log("Projectlist,", projectList);
  }, [projectList]);
  const fetchProjects = async () => {
    const res = await fetchProject(
      jwtDecode(localStorage.getItem("authToken")).userId
    );
    console.log(res.data);
    if (res && res.data && Array.isArray(res.data)) {
      const projects = res.data.map((project) => ({
        title: project.title,
        id: project._id,
      }));
      setProjectList(projects);
    }
  };

  useEffect(() => {
    setTaskList(tasks)
  
    
    fetchProjects();
   
  }, []);

  useEffect(() => {

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const array = [
    "Mark - 42",
    "Project Matrix",
    "Adam Project",
    "Umbrella Academy",
    "Project - X",
    "Project Manhaton",
    "Project Manhaton",
    "Project Manhaton",
  ];
  const [projectSelected, setProjectSelected] = useState(projectList.title);

  const handleProjectSelect = (projectName) => {
    setProjectSelected(projectName);
  };
  useEffect(() => {
    const filteredTodo= tasks.filter(task=>task.status==="To Do");
    setTodoTask(filteredTodo)
    const filteredOnGoing= tasks.filter(task=>task.status==="In Progress");
    setOnGoing(filteredOnGoing)
    const filteredDone= tasks.filter(task=>task.status==="Done");
    setDone(filteredDone)
  }, [tasks,taskUpdated]);

  return (
    <>
      {windowWidth < 768 ? (
        <div>
          <div className="text-center bg-yellow-200 p-2">
            Please download the mobile app for smaller devices.
          </div>
          <div className="flex justify-center">
            <img src={typingMeme} />
          </div>
          <div>
            <h1 className="text-xl text-orange-400 font-kodemono">
              Sorry, i am learning ReactNative Soon we will be available for
              mobile and smaller devices
            </h1>
          </div>
        </div>
      ) : (
        <div className="flex justify-center  bg-gray-900">
          <div className="w-1/4  ">
            {/* Profile */}
            <div className="flex justify-center overflow-hidden ">
              <Profile name={_name} />
            </div>
            <div className="mt-5 flex justify-center ">
              <h2 className="text-2xl font-bold font-kodemono text-orange-400 ">
                Projects
              </h2>
            </div>
            <div className="mt-5 flex flex-col items-center min-h-[250px] max-h-[250px] overflow-y-auto  scrollbar-hide ">
              {projectList.length > 0 &&
                projectList.map((project, index) => (
                  <ProjectList
                    onSelectProject={handleProjectSelect}
                    projectname={project.title}
                    key={index}
                    projectId={project.id}
                  />
                ))}
            </div>
            <div className="border  mt-8 shadow-purpleshade border-purple-500 rounded-2xl h-[200px]">
              <div className=" m-8 lg:flex">
                <div className="xl:m-4">
                  <button
                    onClick={toggleModal}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                  >
                    <span
                      className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                      title="Add Project"
                    >
                      <FontAwesomeIcon icon={faPlus} beat />
                    </span>
                  </button>
                  <ProjectModal
                    isOpen={isModalOpen}
                    onClose={toggleModal}
                    onAddProject={fetchProjects}
                  />
                </div>
                <div className="xl:m-4">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <FontAwesomeIcon icon={faBell} />
                    </span>
                  </button>
                </div>
                <div className="xl:m-4">
                  <Link to="/videolobby">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <FontAwesomeIcon icon={faVideo} />
                    </span>
                  </button>
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={handleLogout}
                  type="button"
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  LogOut
                </button>
              </div>
            </div>
          </div>
          <div className="w-3/4">
            <div className="flex">
              <div className="shadow-custom w-11/12 flex justify-center  h-svh border rounded-lg border-sky-700 m-3">
                <div className="w-full flex flex-col items-center">
                  <div className="text-2xl  font-bold font-kodemono text-orange-400">
                    {">>>>>"} {projectSelected} {"<<<<<"}
                  </div>
                  <div className="shadow-custom p-5 w-11/12 h-full flex justify-center items-center border rounded-lg border-purple-600">
                    {projectSelected.length > 0 ? (
                      <div className="h-full w-full">
                        <div className="flex justify-between">
                          <div>
                            {" "}
                            <button
                              type="button"
                              onClick={addTaskModelToggel}
                              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                            >
                              Add New Task
                            </button>
                          </div>
                          <AddTaskModal
                            isOpen={modalOpen}
                            onClose={addTaskModelToggel}
                            
                          />
                          <div>
                            {/* TO be implemented */}
                            {/* <button
                              type="button"
                              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                              BackLog
                            </button> */}
                          </div>
                        </div>

                        <div className="flex h-full justify-evenly ">
                          <div className="mt-2 max-h-[600px] flex-grow ml-2 border rounded-xl border-orange-500">
                            <div className="text-center text-amber-100  text-2xl  font-spaceGrotesk">
                              To-Do
                            </div>
                            <div className="flex flex-col scrollbar-hide  items-center max-h-[500px] overflow-y-auto">
                             {todoTask.map((task,index)=><ToDoList id={task._id} state={task.status} title={task.title} eta={task.ETA} description={task.description} key ={index} onUpdateStatus={handleUpdateTask} /> )}
                              
                            </div>
                          </div>
                          <div className="mt-2 max-h-[600px] flex-grow ml-2 border rounded-xl border-orange-500">
                            <div className="text-center  text-amber-100  text-2xl  font-spaceGrotesk">
                              OnGoing
                            </div>
                            <div className="flex flex-col scrollbar-hide items-center max-h-[500px] overflow-y-auto ">
                            {onGoing.map((task,index)=><ToDoList id={task._id} state={task.status} title={task.title} description={task.description} eta={task.ETA} key ={index} onUpdateStatus={handleUpdateTask} /> )}
                             
                            </div>
                          </div>
                          <div className="mt-2 flex-grow ml-2 max-h-[600px] border rounded-xl border-orange-500">
                            <div className="text-center text-amber-100 text-2xl font-spaceGrotesk">
                              Done
                            </div>
                            <div className="flex flex-col scrollbar-hide items-center max-h-[500px] overflow-y-auto">
                            {doneTask.map((task,index)=><ToDoList id={task._id} state={task.status} title={task.title} eta={task.ETA} description={task.description} key ={index} onUpdateStatus={handleUpdateTask}/> )}
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-center text-amber-100 text-2xl font-spaceGrotesk">
                          Select a project to see related tasks
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
