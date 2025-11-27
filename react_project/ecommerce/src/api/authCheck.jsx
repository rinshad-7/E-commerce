

import  api  from "./api.jsx";

 const checkAuth = async () => {
  try {
    const res = await api.get("/authCheck")
    console.log(res)
        console.log(res.data.adminId)

    return res.data.adminId ? true : false
    
  } catch (error)
   {
    console.log(error)
    
    return false
  }
};


export default checkAuth