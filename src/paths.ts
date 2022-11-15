import * as urls from "./urls";
import { ASSETS } from "config";
import { LANGUAGE } from "./language";

export const NAV_PATHS = [
    {
        name: LANGUAGE.paths.about, 
        href: urls.about
    }, 
    {
        name: LANGUAGE.paths.collections, 
        href: urls.collections
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
        href: "https://discord.gg/jRTnwdrxg5",
        svg: ASSETS.social.discord
    }
]