import { SiteTree } from "@enkelpanna/core"
import { Generator } from "../Generator"
import { ITemplate } from "../ITemplate"

export function base(parent: ITemplate = {}, prefix = ""): ITemplate {
	const result = { ...parent }
	result[prefix + "block.heading"] = (generator: Generator, heading: SiteTree.Block.Heading) => `<h${heading.level}>${generator.render(heading.content)}</h${heading.level}>\n`
	result[prefix + "block.paragraph"] = (generator: Generator, paragraph: SiteTree.Block.Paragraph) => `<p>${generator.render(paragraph.content)}</p>\n`
	result[prefix + "block.listItem"] = (generator: Generator, item: SiteTree.Block.ListItem) => `<li>${generator.render(item.content)}</li>\n`
	result[prefix + "block.unorderedList"] = (generator: Generator, list: SiteTree.Block.UnorderedList) => `<ul>\n${generator.render(list.content)}</ul>\n`
	result[prefix + "block.orderedList"] = (generator: Generator, list: SiteTree.Block.OrderedList) => `<ol>\n${generator.render(list.content)}</ol>\n`
	result[prefix + "inline.emphasize"] = (generator: Generator, emphasize: SiteTree.Inline.Emphasize) => `<em>${generator.render(emphasize.content)}</em>`
	result[prefix + "inline.link"] = (generator: Generator, link: SiteTree.Inline.Link) => `<a href='${link.target}'>${generator.render(link.content)}</a><em></em>`
	result[prefix + "inline.code"] = (generator: Generator, code: SiteTree.Inline.Code) => `<code>${code.content}</code>`
	result[prefix + "block.code"] = (generator: Generator, code: SiteTree.Block.CodeBlock) => `<figure>\n<pre><code>${code.code}</code></pre>\n<figcaption>${generator.render(code.content)}</figcaption>\n</figure>\n`
	result[prefix + "block.figure"] = (generator: Generator, figure: SiteTree.Block.Figure) => `<figure>\n<img src='${figure.source}' class='${figure.classes}' />\n<figcaption>${generator.render(figure.content)}</figcaption>\n</figure>\n`
	result[prefix + "block.video"] = (generator: Generator, video: SiteTree.Block.Video) => `<figure>\n<video controls class='${video.classes}'><source src='${video.source}' type='${video.sourceType}'>\n<figcaption>${generator.render(video.content)}</figcaption>\n</figure>\n`
	result[prefix + "inline.math"] = (generator: Generator, math: SiteTree.Inline.Math) => `\\(${math.content}\\)`
	result[prefix + "block.math"] = (generator: Generator, math: SiteTree.Block.MathBlock) => `<figure>\n\\[${math.math}\\]\n<figcaption>${generator.render(math.content)}</figcaption>\n</figure>\n`
	return result
}
