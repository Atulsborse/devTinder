const validator = require('validator');

const validatesingupdata = (req) => {
    const { FirstName, LastName, emailid, password, skills, gender  } = req.body;

    if (!FirstName || !LastName) {
        throw new Error("NAME is not valid");
    }
     else if  (!validator.isEmail(emailid)){

        throw new Error("Emailid is not valid!");
        
     }
     else if (!validator.isStrongPassword(password)){
        throw new Error("please enter srtong passsword");
        
     }  
     if (skills) {
        if (!Array.isArray(skills)) {
            throw new Error("Skills should be an array");
        }
        if (skills.length > 10) {
            throw new Error("You can add up to 10 skills only");
        }
        skills.forEach(skill => {
            if (skill.length > 20) {
                throw new Error("Each skill can be up to 20 characters long");
            }
        });
    }
    
    // Validate gender
    const allowedGenders = ["male", "female", "others"];
    if (gender && !allowedGenders.includes(gender)) {
        throw new Error("Gender is not valid");
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