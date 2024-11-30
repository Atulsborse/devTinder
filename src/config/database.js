
const mongoose = require('mongoose');


const connectDB =async () => {

await mongoose.connect(
  "mongodb+srv://Namastedev:y8xiECAvLsMTjSTp@namatedev.zahod.mongodb.net/?retryWrites=true&w=majority&appName=namatedev"
)


};


module.exports = connectDB
