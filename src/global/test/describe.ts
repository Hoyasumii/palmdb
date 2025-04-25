import settingProcessPalm from "@/setting-palm";
import { describe as vitestDescribe } from "vitest";

/**
 * Defines a test case with a given name and test function. The test function can optionally be configured with test options.
 *
 * @param {string} name - The name of the test or a function that will be used as a test name.
 * @param {TestOptions | TestFunction} [fn] - Optional. The test options or the test function if no explicit name is provided.
 * @throws {Error} If called inside another test function.
 * @example
 * ```ts
 * // Define a simple test
 * it('adds two numbers', () => {
 *   expect(add(1, 2)).toBe(3);
 * });
 * ```
 */
export async function describe(name: string, fn: () => void) {
	// new Promise(async () => {})
	await settingProcessPalm({ secret: "", testing: true });
	vitestDescribe(name, fn);
}
