import { Generator	 } from "./Generator"

export interface ITemplate {
	[key: string]: (generator: Generator, item: any) => string,
}
