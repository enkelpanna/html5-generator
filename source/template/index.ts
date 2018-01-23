import { base } from "./base"
import { page } from "./page"
import { ITemplate } from "../ITemplate"

export function template(parent: ITemplate = {}, prefix = ""): ITemplate {
	return page(base(parent, prefix), prefix)
}
