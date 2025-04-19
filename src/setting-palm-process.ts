export default (secret: string) => {
	process.palm = {
		currDir: process.env.PWD || "",
		dbFolderPath: ".palm",
		secret,
	};
};
