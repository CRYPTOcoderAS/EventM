const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');



const validate = (data) =>{
    for(const key in data){
        if(!data[key] || !key || !data[key].trim()){
            return false;
        }
    }
    return true;
} 

let generateToken = (_id) => {
    try {
        const token = jwt.sign({ _id }, process.env.SECRET_KEY, {
          expiresIn: process.env.EXPIRES,
        });
        return token;
      } catch (error) {
          console.log(error)
        throw new Error('Token is not generated!');
      }
}


module.exports = { validate, generateToken };