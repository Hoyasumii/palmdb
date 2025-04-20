import type {
	AnyZodObject,
	PalmConfigCollection,
} from "./palm-config-collection";

export interface PalmConfig<
	Collections extends Record<string, PalmConfigCollection<AnyZodObject>>,
> {
	secret: string;
	collections: Collections;
}
