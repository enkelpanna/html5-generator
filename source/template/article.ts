import { Site, SiteTree } from "@enkelpanna/core"
import { Generator } from "../Generator"
import { ITemplate } from "../ITemplate"
import { urlize } from "urlize"

export function article(parent: ITemplate = {}, prefix = ""): ITemplate {
	const result = { ...parent }
	result[prefix + "article"] = (generator: Generator, page: SiteTree.Page) => {
		const mode = generator.get("mode")
		const cssClass = page.get<string>("class")
		const cssStyle = page.get<string>("style")
		return `
<article id=${ urlize(page.get<string>("title")).toLowerCase() } class="mode-${ mode }${ cssClass ? " " + cssClass : "" }"${ cssStyle ? `style="${ cssStyle }"` : ""}>
		${ generator.render("article.mode." + mode, page) }
		${ generator.render("article.link", page) }
</article>
`
	}
	result[prefix + "article.link"] = (generator: Generator, page: SiteTree.Page) => {
		const link = page.get<string>("link")
		return link ? `<div class="link"><a href="${ link }"><span></span></a></div>` : ""
	}
	result[prefix + "article.self.link"] = (generator: Generator, page: SiteTree.Page) => {
		return generator.get<string>("url") ? `<div class="self-link"><a href="${ generator.get<string>("url") }"><span></span></a></div>` : ""
	}
	result[prefix + "article.part.aside"] = (generator: Generator, page: SiteTree.Page) => ``
	result[prefix + "article.part.content"] = (generator: Generator, page: SiteTree.Page) => generator.render(page.content)
	result[prefix + "article.part.footer"] = (generator: Generator, page: SiteTree.Page) => `<footer>
	<p>
		${ page.get<string>("copyright") ? `<span id="footer-copyright">${ page.get<string>("copyright") }</span>` : "" }
		${ page.get<string>("license") ? `<span id="footer-license">${ page.get<string>("license") }</span>` : "" }
	</p>
</footer>`
	result[prefix + "article.part.header"] = (generator: Generator, page: SiteTree.Page) => `<header>
	<h1>${ page.get<string>("title") }</h1>
	${ generator.generate(page, "article.part.meta") }
</header>`
	result[prefix + "article.part.meta"] = (generator: Generator, page: SiteTree.Page) => ``
	result[prefix + "article.part.summary"] = (generator: Generator, page: SiteTree.Page) => ``
	result[prefix + "article.part.toc"] = (generator: Generator, page: SiteTree.Page) => ``
	return result
}
