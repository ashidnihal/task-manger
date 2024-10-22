import { serverURL } from "./serverURL";
import { commonAPI } from "./commonAPI";


// register api call

export const registerAPI =async(user)=>{
    return await commonAPI("post",`${serverURL}/register/`,user,"")
}

// login api call

export const loginAPI =async(user)=>{
    return await commonAPI("post",`${serverURL}/login/`,user,"")
}
// profile api call
export const profileAPI=async(reqHeader)=>{
    return await commonAPI("get",`${serverURL}/profile/`,"",reqHeader)
}
// addTaskAPI  call
export const addTaskAPI = async (reqbody, reqHeader) => {
    return await commonAPI("post", `${serverURL}/tasks/`, reqbody, reqHeader);
  };

// getTaskAPI
export const getTaskAPI = async (reqHeader) => {
    return await commonAPI("get", `${serverURL}/tasks/`, "", reqHeader);
  };
//   updateTaskapi
export const UpdateTaskAPI = async (id,reqbody,reqHeader) => {
    return await commonAPI("put", `${serverURL}/tasks/${id}/`, reqbody, reqHeader);
  };

  //   deleteTaskapi
export const DeleteTaskAPI = async (id,reqHeader) => {
    return await commonAPI("delete", `${serverURL}/tasks/${id}/`, "", reqHeader);
  };
  // logout
  export const logoutAPI = async (reqBody,reqHeader) => {
    return await commonAPI("post", `${serverURL}/logout/`, reqBody,reqHeader);
};
export const getTaskDetailApi=async(id,reqHeader)=>{
  return await commonAPI("get",`${serverURL}/tasks/${id}`,"",reqHeader)
}

// filter
// Get Task by Status API call
export const getTaskByStatusAPI = async (status, reqHeader) => {
  return await commonAPI("get", `${serverURL}/tasks/status/${status}/`, "", reqHeader);
};
