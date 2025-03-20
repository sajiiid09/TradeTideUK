// ! # Deprecation warning
// if it does not work, please remove @sanity/client along with it

import SanityClient from '@sanity/client';

export const sanityClient = SanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-03-18',
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: true,
});
