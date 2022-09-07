import { DefaultTheme } from "styled-components"

const DEFAULT = {
    neutral1: "#FFFFFF",
    neutral2: "#F2F3F4",
    neutral3: "#EEEEEE",
    neutral4: "#3B464E",
    neutral5: "#DDDDDD",
    neutral6: "#D4D4D4",
    neutral7: "#9D9D9D",
    neutral8: "#F0F0F0",
    primary: "#003153",
    primaryAlt: "#265F85",
    secondary: "#DAA520",
    tertiary: "#FFD877"
}

export const defaultTheme: DefaultTheme = {
    scheme: "light",
    colors: {
        border: {
            primary: DEFAULT.neutral3,
            secondary: DEFAULT.neutral6
        },
        button: {
            primary: {
                background: DEFAULT.neutral1,
                border: DEFAULT.primary,
                hover: DEFAULT.neutral2,
                label: DEFAULT.primary,
                disabled: {
                    background: DEFAULT.neutral5,
                    border: DEFAULT.neutral3,
                    label: DEFAULT.neutral7
                }
            }
        },
        container: {
            primary: {
                background: DEFAULT.neutral1,
                hover: DEFAULT.neutral2
            },
            secondary: {
                background: DEFAULT.primary
            },
            tertiary: {
                background: DEFAULT.primaryAlt
            }
        },
        font: {
            primary: {
                base: DEFAULT.neutral1,
                alt: DEFAULT.neutral4,
                active: {
                    base: DEFAULT.primary,
                    hover: DEFAULT.primaryAlt
                }
            },
            secondary: {
                base: DEFAULT.secondary
            },
            tertiary: {
                base: DEFAULT.tertiary
            }
        },
        icon: {
            inactive: DEFAULT.neutral4
        },
        navigation: {
            footer: {
                background: DEFAULT.neutral8
            },
            header: {
                background: DEFAULT.neutral1
            }
        },
        view: {
            background: DEFAULT.neutral2
        }
    },
    typography: {
        family: {
            primary: "'Fira Sans', sans-serif",
            secondary: "'PT Serif', serif"
        },
        size: {
            h1: "24px",
            h2: "18px",
            base: "16px",
            small: "15px",
            xSmall: "14px",
        },
        weight: {
            bold: "600",
            medium: "500"
        }
    }
}