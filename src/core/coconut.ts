export class Coconut {
	private queue: Array<() => void> = [];
	public running = false;

	public async letMeKnowWhenAvailable(): Promise<true> {
		return new Promise<true>((resolve) => {
			const tryRun = () => {
				if (!this.running) {
					this.running = true;
					resolve(true);
				} else {
					this.queue.push(tryRun);
				}
			};

			tryRun();
		});
	}

	public async release() {
		this.running = false;
		const next = this.queue.shift();
		if (next) next();
	}
}
