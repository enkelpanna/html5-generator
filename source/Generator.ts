import { Generator as Base, Filesystem, Site, SiteTree } from "@enkelpanna/core"
import { ITemplate } from "./ITemplate"

export class Generator extends Base {
	readonly root?: SiteTree.Page
	constructor(private prefix: string[], private template: ITemplate, private meta: { [key: string]: any } = {}, root?: SiteTree.Page) {
		super()
		this.root = root
	}
	protected create(prefix: string[], template: ITemplate, meta: { [key: string]: any }, root?: SiteTree.Page): Generator {
		return new Generator(prefix, template, meta, root)
	}
	get<T>(key: string): T | undefined {
		return this.meta[key]
	}
	set(key: string, value: any): Generator
	set(meta: { [key: string]: any }): Generator
	set(meta: string | { [key: string]: any }, value?: any): Generator {
		return this.create(this.prefix, this.template, typeof(meta) == "string" ? { ...this.meta, meta: value } : { ...this.meta, ...meta})
	}
	select(prefix: string[]): Generator {
		return this.create(prefix, this.template, this.meta, this.root)
	}
	render(item: SiteTree.Inline.Inline | SiteTree.Block.Block | (SiteTree.Inline.Inline | SiteTree.Block.Block)[]): string
	render(name: string, item: SiteTree.Inline.Inline | SiteTree.Block.Block): string
	render(first: string | SiteTree.Inline.Inline | SiteTree.Block.Block | (SiteTree.Inline.Inline | SiteTree.Block.Block)[], second?: SiteTree.Inline.Inline | SiteTree.Block.Block): string {
		return typeof(first) == "string" && (second instanceof SiteTree.Inline.Inline || second instanceof SiteTree.Block.Block) ? this.renderItem(first, second) :
			first instanceof SiteTree.Inline.Inline || first instanceof SiteTree.Block.Block ? this.render(first.type, first) :
			first instanceof Array ? first.map(i => this.render(i)).join() :
			""
	}
	rerender(item: SiteTree.Inline.Inline | SiteTree.Block.Block | (SiteTree.Inline.Inline | SiteTree.Block.Block)[]): string
	rerender(name: string, item: SiteTree.Inline.Inline | SiteTree.Block.Block): string
	rerender(first: string | SiteTree.Inline.Inline | SiteTree.Block.Block | (SiteTree.Inline.Inline | SiteTree.Block.Block)[], second?: SiteTree.Inline.Inline | SiteTree.Block.Block): string {
		return typeof(first) == "string" && (second instanceof SiteTree.Inline.Inline || second instanceof SiteTree.Block.Block) ? this.renderItem(first, second) :
			first instanceof SiteTree.Inline.Inline || first instanceof SiteTree.Block.Block ? this.rerender(first.type, first) :
			first instanceof Array ? first.map(i => this.rerender(i)).join() :
			""
	}
	protected renderItem(template: string, item: SiteTree.Item): string {
		let result: string | undefined
		const selector = [...this.prefix, template]
		while (!result) {
			result = this.template[selector.join(".")](this, item)
			selector.shift()
		}
		return result
	}
	generate(site: Site): Filesystem.Folder
	generate(item: SiteTree.Page, name: string): Filesystem.Folder
	generate(item: SiteTree.BinaryResource, name: string): Filesystem.BinaryFile
	generate(item: SiteTree.TextResource, name: string): Filesystem.TextFile
	generate(item: SiteTree.Resource, name: string): Filesystem.File
	generate(item: Site | SiteTree.Item | SiteTree.Item[], name?: string): string | Filesystem.Folder | Filesystem.File {
		let result: undefined | Filesystem.Node
		if (item instanceof SiteTree.BinaryResource)
			result = new Filesystem.BinaryFile(item.content)
		else if (item instanceof SiteTree.TextResource)
			result = new Filesystem.TextFile(item.content)
		else if (item instanceof SiteTree.Page && name) {
			const generator = this.set("name", name).set("url", this.get<string>("url") + "/" + name).set(item.meta)
			result = new Filesystem.Folder(() => {
				const r: { [name: string]: Filesystem.Node } = {}
				r.index = new Filesystem.TextFile(() => generator.render("page", item))
				for (const n in item.pages)
					if (item.pages.hasOwnProperty(n))
						r[n] = generator.generate(item.pages[n], n)
				for (const n in item.resources)
					if (item.resources.hasOwnProperty(n))
						r[n] = generator.generate(item.resources[n], n)
				return r
			})
		} else if (item instanceof Site) {
			this.create(this.prefix, this.template, this.meta, item.root).set("url", "/").generate(item.root, "")
		}
		return result ? result : ""
	}
}
