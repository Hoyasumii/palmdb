import type { Cache } from "@/core/cache";
import type { ResourceRequester } from "@/core/resource-requester";

declare global {
  interface Palm {
    request: ResourceRequester;
    cache: Cache;
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
