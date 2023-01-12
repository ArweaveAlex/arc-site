import * as urls from "./urls";
import { ASSETS } from "helpers/config";
import { LANGUAGE } from "./language";

export const NAV_PATHS = [
    {
        name: LANGUAGE.paths.pools, 
        href: urls.pools
    }
]

export const SOCIAL_PATHS = [
    {
        name: LANGUAGE.social.twitter, 
        href: "https://twitter.com/thealexarchive",
        svg: ASSETS.social.twitter
    }, 
    {
        name: LANGUAGE.social.discord, 
        href: "https://discord.gg/EGBWRvx6Hu",
        svg: ASSETS.social.discord
    }
]