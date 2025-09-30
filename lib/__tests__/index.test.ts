import fs from "node:fs";
import { toDocx } from "@m2d/core"; // Adjust path based on your setup
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { describe, it } from "vitest";
import { listPlugin } from "../src";

const markdown = fs.readFileSync("../sample.md", "utf-8");

describe("toDocx", () => {
  it("should handle lists", async ({ expect }) => {
    const mdast = unified().use(remarkParse).use(remarkGfm).parse(markdown);

    const docxBlob = await toDocx(mdast, {}, { plugins: [listPlugin()] });

    expect(docxBlob).toBeInstanceOf(Blob);
  });
});
