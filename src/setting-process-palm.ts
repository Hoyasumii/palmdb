export default () => {
	process.palm = {
		currDir: process.env.PWD || "",
		dbFolderPath: ".palm",
	};
};
