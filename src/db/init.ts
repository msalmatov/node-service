import { File, User } from "./models";

const dbInit = () => Promise.all([
    User.sync({ alter: true }),
    File.sync({ alter: true })
]);

export default dbInit;