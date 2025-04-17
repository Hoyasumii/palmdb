declare namespace NodeJS {
	export interface Process {
		palm: {
			currDir: string;
			dbFolderPath: string;
		};
	}
}
