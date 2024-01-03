import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import "dotenv/config";

const firebaseConfig = {
	databaseURL: "https://pixel-art-7f45e-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
