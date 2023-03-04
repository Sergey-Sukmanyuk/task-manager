// const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         const connect = await mongoose.connect(process.env.MONGO_URI);

//         console.log(`MongoDB connected`);
//     } catch(error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

// module.exports = connectDB;


//This function should be used in server js for connection to DB (I used promices for that)

// const startServer = async () => {
//     try {
//         await connectDB();
//         app.listen(PORT, () => {
//             console.log(`Server started on port ${PORT}`);
//         });

//     } catch(error) {
//         console.log (error)
//     }
// }

// startServer();