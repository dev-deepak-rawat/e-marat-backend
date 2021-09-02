import { readFile } from "fs/promises";
import admin from "firebase-admin";
import Logger from "../lib/logging.js";

export const initFirebaseAuth = async () => {
	const credentials = JSON.parse(
		await readFile(
			new URL("./firebase-service-account-key.json", import.meta.url)
		)
	);

	admin.initializeApp({
		credential: admin.credential.cert(credentials),
	});
};

// Return decoded token if token valid, otherwise return false
export const verifyToken = async (token) => {
	try {
		return await admin.auth().verifyIdToken(token);
	} catch (error) {
        Logger.error(`error when verifyIdToken: ${err}`);
	}
    return false;
};

export const addCustomClaims = async (uid, claims) => {
	return await admin.auth().setCustomUserClaims(uid, claims);
};

export const createToken = async ({uid, additionalClaims = {}}) => {
    try {
        const customToken = await admin.auth().createCustomToken(uid, additionalClaims);
        return customToken;
    } catch (err) {
        Logger.error(`err creating custom token: ${err}`);
        return '';
    }
}