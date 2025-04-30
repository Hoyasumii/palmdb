export class ResourceRequester {
  private queue: Array<() => void> = [];
  public running = false;

  public async acquire(): Promise<true> {
    return new Promise<true>((resolve) => {
      const tryRun = () => {
        if (!this.running) {
          this.running = true;
          resolve(true);
          return;
        }

        this.queue.push(tryRun);
      };

      tryRun();
    });
  }

  public release(): void {
    this.running = false;
    const next = this.queue.shift();
    if (next) next();
  }
}
