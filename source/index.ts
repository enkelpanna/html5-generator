import { Generator as Base } from "@enkelpanna/core"
import { base } from "./template"
import { Generator } from "./Generator"

export default function(): Base {
	return new Generator(base)
}
