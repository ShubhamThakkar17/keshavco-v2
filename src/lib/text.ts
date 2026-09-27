/**
 * Split approved long copy into paragraphs of at most `max` words (brief §8.1:
 * no paragraph over 60 words on inner pages), breaking only between
 * sentences so the text itself is unchanged.
 */
export function toParagraphs(text: string | readonly string[], max = 60): string[] {
  const input = typeof text === "string" ? [text] : [...text];
  const out: string[] = [];
  for (const paragraph of input) {
    const sentences = paragraph.match(/[^.!?]+[.!?]+["”’)]*\s*|[^.!?]+$/g) ?? [paragraph];
    let current = "";
    for (const sentence of sentences) {
      const next = `${current}${sentence}`;
      if (current && next.trim().split(/\s+/).length > max) {
        out.push(current.trim());
        current = sentence;
      } else {
        current = next;
      }
    }
    if (current.trim()) out.push(current.trim());
  }
  return out;
}
