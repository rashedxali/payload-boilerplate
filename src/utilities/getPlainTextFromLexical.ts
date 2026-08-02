type LexicalNode = {
  text?: string
  children?: LexicalNode[]
}

/** Extract plain text from Lexical JSON or return strings as-is. */
export function getPlainTextFromLexical(value: unknown): string {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return ''

  const root = (value as { root?: LexicalNode }).root
  if (!root) return ''

  const collect = (node: LexicalNode): string => {
    if (typeof node.text === 'string') return node.text
    if (!Array.isArray(node.children)) return ''
    return node.children.map(collect).join('')
  }

  return collect(root).trim()
}
