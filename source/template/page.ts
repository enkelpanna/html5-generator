import { Site, SiteTree } from "@enkelpanna/core"
import { Generator } from "../Generator"
import { ITemplate } from "../ITemplate"

export function page(parent: ITemplate = {}, prefix = ""): ITemplate {
	const result = { ...parent }
	result[prefix + "page"] = (generator: Generator, p: SiteTree.Page) => `<!DOCTYPE html>
	<html${ generator.render("page_prefix", p) }${ p == generator.root ? 'class="home"' : "" }>
	${ generator.render("page.head", p) }
	${ generator.render("page.body", p) }
	</html>`
	result[prefix + "page.prefix"] = (generator: Generator, p: SiteTree.Page) => generator.get<string[]>("prefix") ? ` prefix="${generator.get<string[]>("prefix")!.join(", ")}"` : ""
	result[prefix + "page.head"] = (generator: Generator, p: SiteTree.Page) => `
		<meta http-equiv="content-type" content="text/html; charset=utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
		${ generator.render("page_title", p) }
		<link rel="stylesheet" href="css/reset.css">
		<link rel="stylesheet" href="css/text.css">
		<link rel="shortcut icon" href="favicon.ico">
		<link rel="icon" type="image/png" href="favicon-192.png" sizes="192x192">
		<link rel="apple-touch-icon" sizes="180x180" href="favicon-180.png">
		${ generator.root!.get<string[]>("styles")!.map(style => `<link rel="stylesheet" href="${ style }"/>`).join("\n") }
		${ generator.get<string[]>("styles")!.map(style => `<link rel="stylesheet" href="${ style }"/>`).join("\n") }`
	result[prefix + "page_foot"] = (generator: Generator, p: SiteTree.Page) => generator.get<string>("googleAnalytics") ? `<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		ga('create', '${ generator.get<string>("googleAnalytics") }', 'auto');
		ga('send', 'pageview');
		</script>` : ""
	result[prefix + "page.navigation"] = (generator: Generator, p: SiteTree.Page) => `
	<nav>
		${ generator.render("menu", p) }
	</nav>`
	result[prefix + "page.body"] = (generator: Generator, p: SiteTree.Page) =>
	`<body>
		<header>
	${ generator.render("page.header", p) }
		</header>
	${ generator.render("page.navigation", generator.get<Site>("site")!.root) }
		<footer>
	${ generator.render("page.footer", p) }
		</footer>
	${ generator.render("page.foot", p) }
		</body>`
	result[prefix + "page.header"] = (generator: Generator, p: SiteTree.Page) => `
		<h1>
			<a href="/">
				${ (generator.get<string>("logotype")) ? `<img src="${ generator.get<string>("logotype") }" />` : generator.get<string>("title") }
			</a>
		</h1>
		${ (generator.get<string>("description")) ? `<p>"${ generator.get<string>("description") }"</p>` : "" }
	`
	result[prefix + "page.footer"] = (generator: Generator, p: SiteTree.Page) => `${ (generator.get<string>("footer")) ? `<p>"${ generator.get<string>("footer") }"</p>` : "" }`
	result[prefix + "page.title"] = (generator: Generator, p: SiteTree.Page) => `<title>${ generator.get<string>("title") + (generator.root!.get<string>("title") == generator.get<string>("title") ? " &middot; " + generator.root!.get<string>("title") : "")}</title>`
	return result
}
