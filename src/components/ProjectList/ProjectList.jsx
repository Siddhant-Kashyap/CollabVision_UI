import {getProjectTasks} from "../../API/apiServices"
import { useRecoilState } from 'recoil';
import {taskListState} from '../../recoil/atoms'
const ProjectList = (props) => {
  const [taskList, setTaskList] = useRecoilState(taskListState);
    const handleClick=async()=>{
        console.log(props.projectname)
        props.onSelectProject(props.projectname);
        console.log(props.projectId)
        localStorage.setItem("projectId",props.projectId);
        //get all the tasks of project
        const res = await getProjectTasks(props.projectId);
        console.log(res.data)
        setTaskList(res.data);


      }
  return (
    <>
    <div onClick={handleClick}  className="mt-2 p-1 w-9/12 h-auto font-protestriot rounded-xl shadow bg-stone-600 text-center text-orange-200 cursor-pointer hover:bg-orange-500 hover:text-black">
        {props.projectname}
    </div>
    </>
  )
}

export default ProjectList