export interface TwitterResponseProps {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  source: string;
  truncated: boolean;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  user: User;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  quoted_status_id?: number;
  quoted_status_id_str?: string;
  quoted_status?: TwitterResponseProps;
  quoted_status_permalink?: QuotedStatusPermalink;
  is_quote_status: boolean;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  entities: Entities;
  favorited: boolean;
  retweeted: boolean;
  filter_level: string;
  lang: string;
  timestamp_ms?: string;
  extended_tweet?: ExtendedTweet;
}

export interface Entities {
  hashtags: Hashtag[];
  urls: URL[];
  user_mentions: any[];
  symbols: any[];
}

export interface Hashtag {
  text: string;
  indices: number[];
}

export interface URL {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

export interface ExtendedTweet {
  full_text: string;
  display_text_range: number[];
  entities: Entities;
}

export interface QuotedStatusPermalink {
  url: string;
  expanded: string;
  display: string;
}

export interface User {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  url: string;
  description: string;
  translator_type: string;
  protected: boolean;
  verified: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  statuses_count: number;
  created_at: string;
  utc_offset: null;
  time_zone: null;
  geo_enabled: boolean;
  lang: null;
  contributors_enabled: boolean;
  is_translator: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url: string;
  default_profile: boolean;
  default_profile_image: boolean;
  following: null;
  follow_request_sent: null;
  notifications: null;
  withheld_in_countries: any[];
}