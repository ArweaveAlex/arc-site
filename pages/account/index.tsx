import React from "react";
import Router from "next/router";

import { URLS } from "@/config";

export default function AccountIndex() {
    React.useEffect(() => {
        Router.push(URLS.account[0]!.url)
    })

    return null
}