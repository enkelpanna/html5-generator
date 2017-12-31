import { Generator as Base, Filesystem, Site, SiteTree } from "@enkelpanna/core"
import { ITemplate } from "./ITemplate"

export class Generator extends Base {
	constructor(private template: ITemplate, readonly meta: { [key: string]: any } = {}) {
		super()
	}
	generate(site: Site): Filesystem.Folder {
		return this.render(site.root, "")
	}
	private create(name: string, meta: { [key: string]: any }) {
		return new Generator(this.template, { ...this.meta, ...meta, name })
	}
	render(item: SiteTree.Page, name: string): Filesystem.Folder
	render(item: SiteTree.BinaryResource, name: string): Filesystem.BinaryFile
	render(item: SiteTree.TextResource, name: string): Filesystem.TextFile
	render(item: SiteTree.Resource, name: string): Filesystem.File
	render(item: SiteTree.Inline.Inline | SiteTree.Block.Block | (SiteTree.Inline.Inline | SiteTree.Block.Block)[]): string
	render(item: SiteTree.Item | SiteTree.Item[], name?: string): string | Filesystem.Folder | Filesystem.File {
		let result: undefined | string | Filesystem.Node
		if (item instanceof SiteTree.Inline.Inline || item instanceof SiteTree.Block.Block)
			result = this.template[item.type](this, item)
		else if (item instanceof Array)
			result = item.map(i => this.render(i)).join()
		else if (item instanceof SiteTree.BinaryResource)
			result = new Filesystem.BinaryFile(item.content)
		else if (item instanceof SiteTree.TextResource)
			result = new Filesystem.TextFile(item.content)
		else if (item instanceof SiteTree.Page && name) {
			const generator = this.create(name, item.meta)
			result = new Filesystem.Folder(() => {
				const r: { [name: string]: Filesystem.Node } = {}
				r.index = new Filesystem.TextFile(() => generator.render(item.content))
				for (const n in item.pages)
					if (item.pages.hasOwnProperty(n))
						r[n] = generator.render(item.pages[n], n)
				for (const n in item.resources)
					if (item.resources.hasOwnProperty(n))
						r[n] = generator.render(item.resources[n], n)
				return r
			})
		}
		return result ? result : ""
	}
}
