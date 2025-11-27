export function isAdmin(req, res, next) {
  if (req.session.admin) {
    console.log("Admin session:", req.session.admin);
    return next();
  } else {
    return res.status(403).json("This page is forbidden for users");
  }
}




export function isUser(req, res, next) {

    if (req.session.role === "user") {
        console.log(req.session.role);

        return next()
    } else {
        res.status(403).json("this page is only for users")
    }

}


export const fontendauth =  (req, res) => {
    const adminId = req.session.admin
   
  if (adminId) {
    res.status(200).json({ adminId});
    console.log(adminId);
    
    
    
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
}