import { Generator as Base } from "@enkelpanna/core"
import { template } from "./template"
import { Generator } from "./Generator"

export default function(): Base {
	return new Generator([], template())
}
