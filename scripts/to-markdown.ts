import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseHTML } from "linkedom";

const root = resolve(import.meta.dirname, "..");
const html = readFileSync(resolve(root, "index.html"), "utf-8");
const { document } = parseHTML(html);

const SKIP_TAGS = new Set(["head", "style", "script", "img", "link", "meta"]);

const SECTION_TAGS = new Set(["section", "main", "footer"]);

function shouldPreserveWhitespace(el: Element): boolean {
  const parent = el.parentElement;
  return !!(
    parent?.classList.contains("timeline-item") ||
    el.classList.contains("tree-line")
  );
}

type BlockKind = "section" | "line" | "inline";

function blockKind(el: Element): BlockKind {
  const tag = el.tagName.toLowerCase();
  const cls = el.className ?? "";
  const parent = el.parentElement;

  if (SECTION_TAGS.has(tag)) return "section";
  if (tag === "p") return "section";

  if (tag === "li" || tag === "ul") return "section";

  if (
    cls.includes("timeline-item") ||
    cls.includes("tree-line") ||
    cls.includes("project-card") ||
    cls.includes("hero")
  )
    return "line";

  if (tag === "div" && cls.includes("footer-links")) return "line";

  if (tag === "span" && parent) {
    if (parent.classList.contains("timeline-item")) return "line";

    const grandparent = parent.parentElement;
    const parentIsCard = parent.classList.contains("project-card");
    const parentIsPostLink =
      parent.tagName.toLowerCase() === "a" &&
      grandparent?.classList.contains("post-item");

    if (
      (parentIsCard || parentIsPostLink) &&
      (cls.includes("label") ||
        cls.includes("bold") ||
        cls.includes("muted") ||
        cls.includes("dim"))
    )
      return "line";
  }

  if (tag === "a" && parent?.classList.contains("post-item")) return "line";

  if (tag === "div") return "line";

  return "inline";
}

function extractText(node: Node, preserveWs = false): string {
  if (node.nodeType === 3) {
    const raw = node.textContent ?? "";
    return preserveWs ? raw : raw.replace(/\s+/g, " ");
  }

  if (node.nodeType !== 1) return "";

  const el = node as Element;
  const tag = el.tagName.toLowerCase();

  if (SKIP_TAGS.has(tag)) return "";
  if (tag === "br") return "\n";

  const preserve = preserveWs || shouldPreserveWhitespace(el);

  let prefix = "";
  if (tag === "p" && el.classList.contains("label")) {
    prefix = "# ";
  }

  const childText = Array.from(el.childNodes)
    .map((c) => extractText(c, preserve))
    .join("");

  const kind = blockKind(el);

  if (kind === "section") {
    const trimmed = childText.trim();
    if (!trimmed) return "";
    return `\n\n${prefix}${trimmed}\n`;
  }

  if (kind === "line") {
    const trimmed = preserve ? childText.trimEnd() : childText.trim();
    if (!trimmed) return "";
    return `\n${prefix}${trimmed}`;
  }

  return prefix + childText;
}

const raw = extractText(document.body);

const text = raw
  .replace(/[ \t]+$/gm, "")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

const md = "```\n" + text + "\n```\n";

const out = resolve(root, "index.md");
writeFileSync(out, md);
console.log(`Written to ${out}`);
