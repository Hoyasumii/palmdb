import type { Sea } from "@/core/sea";

declare global {
  interface Palm {
    coconut: Coconut;
    cache: Sea;
    info: {
      currDir: string;
      dbFolderPath: string;
      secret: string;
    };
    randomUUID: () => string;
    save: (path: string, data: string) => Promise<string>;
  }

  var palm: Palm;
}
