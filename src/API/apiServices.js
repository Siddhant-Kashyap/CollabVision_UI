import axios from 'axios'
const BASE_URL = "http://localhost:8001/api/"
// const BASE_URL = "https://collabvision-backend.onrender.com/api/"

const apiService = axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":"application/json"
    },
})

export const  registerUser = async (userData)=>{
    try {
        const res = await apiService.post('/users/register',userData);
        return res;
    } catch (error) {
        return error
    }
}

export const loginUser = async(credential)=>{
    const res = await apiService.post("/users/login",credential);
    return res.data;
}
export const getUser = async(userId)=>{
    const res= await apiService.get(`/users/getuser/${userId}`);
    return res.data;
}

//Project APIs
export const createProject=async(projectData)=>{
    try{
        const res =await apiService.post('/project/create',projectData);
        return res;

    }catch(error){
        return error;
    }
}
export const fetchProject = async(userId)=>{
    try {
        const res= await apiService.get(`/project/user/${userId}`)
        return res;
    } catch (error) {
        return error
    }
}


//Task Related API
export const createTask = async (taskData)=>{
    try {
        const res =  await apiService.post('/task/create',taskData);
        return res;
    } catch (error) {
        return error
    }
}
export const getProjectTasks = async(projectId)=>{
    try {
        const res = await apiService.get(`/task/gettasks/${projectId}`)
        return res;
    } catch (error) {
        return error
        
    }
}
export const updateTaskStatus =async (taskId,updatedTask)=>{
    try {
        const res = await apiService.put(`/task/${taskId}`,updatedTask);
        return res;
    } catch (error) {
        return error
    }
}
export const getTaskById = async (taskId)=>{
    try {
        const res = await apiService.get(`/task/task/${taskId}`);
        return res.data;
    } catch (error) {
        return error
    }

}
export const deleteTask=async(taskId)=>{
    try {
        const res = await apiService.delete(`/task/${taskId}`)
        return res;
    } catch (error) {
        return error;
    }

}