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

module.exports = {
    validatesingupdata 
}