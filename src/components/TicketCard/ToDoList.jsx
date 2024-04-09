import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashArrowUp,faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import TaskInfoModal from "../Modals/TaskInfoModal";
import {useEffect, useState} from 'react'
import { updateTaskStatus,getTaskById,getProjectTasks } from "../../API/apiServices";
import { useRecoilState } from 'recoil';
import {deleteTask} from '../../API/apiServices'
import {taskListState} from '../../recoil/atoms'


const ToDoList = (props) => {
  const [taskList, setTaskList] = useRecoilState(taskListState);

  const [isModalOpen,setModalOpen]= useState(false);
  const toggleModal=()=>{
    setModalOpen(!isModalOpen);
  }
  const getTaskByID =async(id)=>{
    const res = await getTaskById(id);
    return res;
  }
 

  const handleupdateTaskStatus=async (newStatus,id)=>{
    const task=await getTaskByID(id);
    task.status = newStatus;
    task.updatedAt = new Date();
    console.log(task);
    const updateRes= await updateTaskStatus(task._id,task);
    const res = await getProjectTasks(task.project);
    console.log(res)
    setTaskList(res.data)
   
    return updateRes;

  }
  const handleDeleteTask=async(id)=>{
    const res = await deleteTask(id);
    const res2 = await getProjectTasks(localStorage.get("projectId"));
    setTaskList(res2.data)
    console.log(res2)   
    
  }
 
 
  return (
    <>
      <div className='mt-8 p-1 w-9/12 h-28 rounded-lg shadow-custom dark:bg-stone-500 '>
        <div className='flex flex-col items-center pb-10'>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white font-spaceGrotesk">{props.title}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-200 font-spaceGrotesk">ETA: {props.eta.slice(0,10)}</span>
        <div  className="md:flex lg:m-2">
          {props.state==="To Do"?( <div onClick={()=>handleupdateTaskStatus("In Progress",props.id)} className="m-2 cursor-pointer " title="Move to Next Category">
          <FontAwesomeIcon icon={faArrowRight} />
          </div>):props.state==="In Progress"?(<>
             <div onClick={()=>handleupdateTaskStatus("To Do",props.id)} className="m-2 cursor-pointer " title="Move to Previous Category">
             <FontAwesomeIcon icon={faArrowLeft} />
             </div>
             <div onClick={()=>handleupdateTaskStatus("Done",props.id)} className="m-2 cursor-pointer " title="Move to Next Category">
             <FontAwesomeIcon icon={faArrowRight} />
             </div>
             </>
          ):( <div onClick={()=>handleupdateTaskStatus("In Progress",props.id)} className="m-2 cursor-pointer " title="Move to Previous Category">
          <FontAwesomeIcon icon={faArrowLeft} />
          </div>)}
       
         
          {/* <div onClick={()=>console.log("Moved to done")} className="m-2 cursor-pointer" title="update">
          <FontAwesomeIcon icon={faPenToSquare} />
          </div> */}
          {/* to be implemented soon */}
          <div onClick={()=>handleDeleteTask(props.id)} className="m-2 cursor-pointer" title="Delete">
          <FontAwesomeIcon icon={faTrashArrowUp} />
          </div>
          <div onClick={toggleModal} className="m-2 cursor-pointer" title="Delete">
          <FontAwesomeIcon icon={faCircleInfo} />
          </div>
        </div>
        </div>
        <TaskInfoModal title={props.title} description={props.description} isOpen={isModalOpen} onClose={toggleModal}/>
   
    </div>
    </>
  );
};

export default ToDoList;
