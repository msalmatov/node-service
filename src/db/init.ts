import { File, User } from "./models";
import { createDb } from "./config";

// don't use this func in production
const dbInit = async () => {
    await createDb();

    await Promise.all([
        User.sync(/*{ alter: true }*/),
        File.sync(/*{ alter: true }*/)
    ]);
}

export default dbInit;