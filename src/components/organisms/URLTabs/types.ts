import { URLViewType } from "@/types";

export interface ITProps {
    label: string;
    icon: string;
    active: boolean;
    handlePress: (url: string) => void;
    url: string;
}

export interface ICProps {
    tabs: URLViewType[];
}

export interface IUProps {
    tabs: URLViewType[];
    activeUrl: string;
}