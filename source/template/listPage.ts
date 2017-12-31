import { base } from "./base"
import { SiteTree } from "@enkelpanna/core"

export const listPage = {
	...base,
	page: (generator: Generator, page: SiteTree.Page) => "",
	head: (generator: Generator, page: SiteTree.Page) => "",
	foot: (generator: Generator, page: SiteTree.Page) => "",
}
