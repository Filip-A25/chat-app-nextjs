export const connection = `${process.env.POSTGRES_DATABASE}`;

export const authenticateDb = async (db: any) => {
    await db.authenticate().then(() => {
        console.log("Connection to database successfully established...");
    }).catch((err: any) => {
        console.log("Something went wrong ", err);
    })
}

export const connectToDb = async (db: any) => {
    await db.sync().then(() => {
        console.log("Models are successfully synchronized...");
    }).catch((err: any) => {
        console.log("Something went wrong: ", err);
    })
}

export const closeDbConnection = async (db: any) => {
    await db.close().then(() => {
        console.log("Connection successfully closed...");
    }).catch((err: any) => {
        console.log("Something went wrong: ", err);
    })
}

