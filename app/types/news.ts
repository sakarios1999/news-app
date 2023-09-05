type MediaMetadatas = {
  url: string;
  format: string;
  height: number;
  width: number;
};

type MediaItem = {
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
  approved_for_syndication: number;
  'media-metadata': MediaMetadatas[];
};

type newsData = {
  image?: string;
  uri?: string;
  url: string;
  id: number;
  asset_id?: number;
  source?: string;
  published_date?: string;
  updated?: string;
  section: string;
  subsection?: string;
  nytdsection?: string;
  adx_keywords: string;
  column?: string | null;
  byline?: string;
  type?: string;
  title: string;
  abstract: string;
  des_facet?: string[];
  org_facet?: string[];
  per_facet?: string[];
  geo_facet?: string[];
  media: MediaItem[];
  eta_id?: number;
};
