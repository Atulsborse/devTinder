const validator = require('validator');

const validatesingupdata = (req) => {
    const { FirstName, LastName, emailid, password } = req.body;

    if (!FirstName || !LastName) {
        throw new Error("NAME is not valid");
    }
     else if  (!validator.isEmail(emailid)){

        throw new Error("Emailid is not valid!");
        
     }
     else if (!validator.isStrongPassword(password)){
        throw new Error("please enter srtong passsword");
        
     }
};

     const validateEditedata =(req)=>{
      const  allowedEditFilds = ["FirstName"  , "LastName" , "emailid","photoURL", "about", "skills","gender"];

    const isEditfieldsallowed = Object.keys(req.body).every((field)=>
    allowedEditFilds.includes(field)
); // boject.key aplyaalam filde dete age ,gender,email apn je post man madhe adit dathi takto te 
    // yachyat je fild dilya aahe tech edit hotil baki error yeil 
     

    return isEditfieldsallowed;
    }

module.exports = {
    validatesingupdata ,
    validateEditedata
}