import mongoose from 'mongoose';

export const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "MERN_PORTFOLIO"
        })
        .then(() => {
            console.log("Database connection successfull");
        })
        .catch((err) => {
            console.log(`Connection failed ${err}`);
        })
}