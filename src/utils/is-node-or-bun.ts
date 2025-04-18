export function isNodeOrBun(): "node" | "bun" {
	if (process.versions.bun) return "bun";

	return "node";
}
