import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Image CDN')
    .items([
      S.documentTypeListItem('images').title('Images'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['images'].includes(item.getId()!),
      ),
    ])
