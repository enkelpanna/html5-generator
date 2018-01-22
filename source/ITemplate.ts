import { Generator } from "./Generator"

export interface ITemplate {
	[key: string]: ITemplate | ((generator: Generator, item: any) => string),
}
