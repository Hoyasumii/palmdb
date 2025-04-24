import type { Cache } from "@/core/sea";

declare global {
  interface Palm {
    coconut: Coconut;
    cache?: Sea;
    info: {
      currDir: string;
      dbFolderPath: string;
      secret: string;
    };
    randomUUID?: () => string;
    save?: () => Promise<void>;
  }

  var palm: Palm;
}
