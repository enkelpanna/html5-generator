import { SiteTree } from "@enkelpanna/core"
import { Generator } from "../Generator"
import { ITemplate } from "../ITemplate"

export const base: ITemplate & any = {
	heading: (generator: Generator, heading: SiteTree.Block.Heading) => `<h${heading.level}>${generator.render(heading.content)}</h${heading.level}>\n`,
	paragraph: (generator: Generator, paragraph: SiteTree.Block.Paragraph) => `<p>${generator.render(paragraph.content)}</p>\n`,
	list_item: (generator: Generator, item: SiteTree.Block.ListItem) => `<li>${generator.render(item.content)}</li>\n`,
	unordered_list: (generator: Generator, list: SiteTree.Block.UnorderedList) => `<ul>\n${generator.render(list.content)}</ul>\n`,
	ordered_list: (generator: Generator, list: SiteTree.Block.OrderedList) => `<ol>\n${generator.render(list.content)}</ol>\n`,
	emphasize: (generator: Generator, emphasize: SiteTree.Inline.Emphasize) => `<em>${generator.render(emphasize.content)}</em>`,
	link: (generator: Generator, link: SiteTree.Inline.Link) => `<a href='${link.target}'>${generator.render(link.content)}</a><em></em>`,
	code: (generator: Generator, code: SiteTree.Inline.Code) => `<code>${code.content}</code>`,
	code_block: (generator: Generator, code: SiteTree.Block.CodeBlock) => `<figure>\n<pre><code>${code.code}</code></pre>\n<figcaption>${generator.render(code.content)}</figcaption>\n</figure>\n`,
	figure: (generator: Generator, figure: SiteTree.Block.Figure) => `<figure>\n<img src='${figure.source}' class='${figure.classes}' />\n<figcaption>${generator.render(figure.content)}</figcaption>\n</figure>\n`,
	video: (generator: Generator, video: SiteTree.Block.Video) => `<figure>\n<video controls class='${video.classes}'><source src='${video.source}' type='${video.sourceType}'>\n<figcaption>${generator.render(video.content)}</figcaption>\n</figure>\n`,
	math: (generator: Generator, math: SiteTree.Inline.Math) => `\\(${math.content}\\)`,
	math_block: (generator: Generator, math: SiteTree.Block.MathBlock) => `<figure>\n\\[${math.math}\\]\n<figcaption>${generator.render(math.content)}</figcaption>\n</figure>\n`,
}
