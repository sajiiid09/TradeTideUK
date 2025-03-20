import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {imageType} from "./images"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, imageType],
}
