import app from "./app";
import { sequelize } from "./db";

async function init() {
    sequelize.sync()
        .then(() => console.log("Synced DB"))
        .catch((err) => console.log("DB sync failed:", err.message));
    // await sequelize.authenticate();
}

init().then(() => {
    app.listen(app.get("port"), () => {
        console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));

    });
}).catch(err => {
    console.log(err);
});