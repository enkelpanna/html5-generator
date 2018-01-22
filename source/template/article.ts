import { Site, SiteTree } from "@enkelpanna/core"
import { Generator } from "../Generator"
import { ITemplate } from "../ITemplate"
import { urlize } from "urlize"

export const article: ITemplate = {
	article: (generator: Generator, page: SiteTree.Page) => {
		const mode = generator.get("mode")
		const cssClass = page.get<string>("class")
		const cssStyle = page.get<string>("style")
		return `
<article id=${ urlize(page.get<string>("title")).toLowerCase() } class="mode-${ mode }${ cssClass ? " " + cssClass : "" }"${ cssStyle ? `style="${ cssStyle }"` : ""}>
		${ generator.render("article_mode_" + mode, page) }
		${ generator.render("article_link", page) }
</article>
`
	},
	article_link: (generator: Generator, page: SiteTree.Page) => {
		const link = page.get<string>("link")
		return link ? `<div class="link"><a href="${ link }"><span></span></a></div>` : ""
	},
	article_self_link: (generator: Generator, page: SiteTree.Page) => {
		return generator.get<string>("url") ? `<div class="self-link"><a href="${ generator.get<string>("url") }"><span></span></a></div>` : ""
	},
	article_part_aside: (generator: Generator, page: SiteTree.Page) => ``,
	article_part_content: (generator: Generator, page: SiteTree.Page) => generator.render(page.content),
	article_part_footer: (generator: Generator, page: SiteTree.Page) => `<footer>
	<p>
		${ page.get<string>("copyright") ? `<span id="footer-copyright">${ page.get<string>("copyright") }</span>` : "" }
		${ page.get<string>("license") ? `<span id="footer-license">${ page.get<string>("license") }</span>` : "" }
	</p>
</footer>`,
	article_part_header: (generator: Generator, page: SiteTree.Page) => `<header>
	<h1>${ page.get<string>("title") }</h1>
	${ generator.generate(page, "article_part_meta") }
</header>`,
	article_part_meta: (generator: Generator, page: SiteTree.Page) => ``,
	article_part_summary: (generator: Generator, page: SiteTree.Page) => ``,
	article_part_toc: (generator: Generator, page: SiteTree.Page) => ``,
}
