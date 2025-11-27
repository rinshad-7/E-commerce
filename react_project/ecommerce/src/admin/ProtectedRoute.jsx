import React, { useEffect, useState } from 'react'
import authCheck from  '../api/authCheck.jsx'
import { Navigate } from 'react-router-dom';
function ProtectedRoute({children}) {
   const [checked, setChecked] = useState(false);
  const [Logged, setLogged] = useState(false);
  useEffect(() => {
    const verify = async()=>{
      const result = await authCheck()
      setLogged(result)
      setChecked(true)
    }
  
   verify()
  }, [])
  
  if (!checked) return <p>Loading...</p>;

  if (!Logged) return <Navigate to="/admin/login" replace />;

  return children;
}

export default ProtectedRoute