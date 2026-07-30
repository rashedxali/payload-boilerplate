import type { Block } from 'payload'

import { notionhiveBlocks } from '@/blocks/notionhive/configs'

/** All blocks available on page-like collections (pages, services, our work) */
export const layoutBlocks: Block[] = [...notionhiveBlocks]
