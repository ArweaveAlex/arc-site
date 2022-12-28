import React from "react";
import { ThemeProvider } from "styled-components";

import { ArweaveProvider } from "providers/ArweaveProvider";

import { defaultTheme } from "config/themes";

export function wrapWithProviders(children: React.ReactNode) {
    return (
        <ThemeProvider theme={defaultTheme}>
            
                {children}
            
        </ThemeProvider>
    )
}