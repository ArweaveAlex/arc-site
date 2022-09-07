import * as urls from "./urls";
import { language } from "./language";

export const NAV_PATHS = [
    {
        name: language.paths.about, 
        href: urls.about
    }, 
    {
        name: language.paths.collections, 
        href: urls.collections
    }
]

export const SOCIAL_PATHS = [
    {
        name: language.social.twitter, 
        href: "#",
        svg: "twitter.svg"
    }, 
    {
        name: language.social.discord, 
        href: "#",
        svg: "discord.svg"
    }
]