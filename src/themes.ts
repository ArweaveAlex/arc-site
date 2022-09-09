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
    primary2: "#265F85",
    primary3: "#4C8CB8",
    primary4: "#A4CCE9",
    secondary: "#DAA520",
    tertiary: "#FFD877",
    overlay1: "rgba(59, 70, 78, 0.75)",
    warning: "#EE3C3C"
}

export const defaultTheme: DefaultTheme = {
    scheme: "light",
    colors: {
        border: {
            primary: DEFAULT.neutral3,
            secondary: DEFAULT.neutral6,
            tertiary: DEFAULT.primary3
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
                background: DEFAULT.primary2
            }
        },
        font: {
            primary: {
                base: DEFAULT.neutral1,
                alt: DEFAULT.neutral4,
                active: {
                    base: DEFAULT.primary,
                    hover: DEFAULT.primary2
                }
            },
            secondary: {
                base: DEFAULT.secondary
            },
            tertiary: {
                base: DEFAULT.tertiary
            },
            quarternary: {
                base: DEFAULT.primary3
            },
            quinary: {
                base: DEFAULT.primary4
            }
        },
        icon: {
            primary: {
                fill: DEFAULT.neutral1,
                hover: DEFAULT.neutral6,
            },
            inactive: DEFAULT.neutral4
        },
        navigation: {
            footer: {
                background: DEFAULT.primary
            },
            header: {
                background: DEFAULT.neutral1
            }
        },
        overlay: {
            primary: DEFAULT.overlay1
        },
        view: {
            background: DEFAULT.neutral2
        },
        warning: DEFAULT.warning
    },
    typography: {
        family: {
            primary: "'Fira Sans', sans-serif",
            secondary: "'PT Serif', serif"
        },
        size: {
            h1: "48px",
            h2: "24px",
            base: "16px",
            small: "15px",
            xSmall: "14px"
        },
        weight: {
            medium: "500",
            bold: "600"
        }
    }
}