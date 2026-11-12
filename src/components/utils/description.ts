import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

/** Splits the CMS description into its first paragraph (the hero lead) and the rest (the About section). */
export const splitDescription = (description: SerializedEditorState | null | undefined) => {
  if (!description) return { lead: null, rest: null };
  const { root } = description;
  const part = (children: typeof root.children): SerializedEditorState | null =>
    children.length > 0 ? { ...description, root: { ...root, children } } : null;

  return { lead: part(root.children.slice(0, 1)), rest: part(root.children.slice(1)) };
};
