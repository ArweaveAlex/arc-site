import { DefaultTheme } from "styled-components"

const DEFAULT = {
    neutral1: "#FFFFFF",
    neutral2: "#F2F3F4",
    neutral3: "#EEEEEE",
    neutral4: "#3A3A3A",
    neutral5: "#DDDDDD",
    neutral6: "#D9D9D9",
    neutral7: "#959595",
    neutral8: "#ACACAC",
    primary: "#003153",
    primary2: "#265F85",
    primary3: "#4C8CB8",
    primary4: "#A4CCE9",
    secondary: "#DAA520",
    tertiary: "#FFD877",
    overlay1: "rgba(59, 70, 78, 0.75)",
    warning: "#EE3C3C",
    transparent: "rgba(255, 255, 255, 0)"
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
            },
            secondary: {
                background: DEFAULT.primary,
                border: DEFAULT.transparent,
                hover: DEFAULT.primary2,
                label: DEFAULT.neutral1,
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
                alt1: DEFAULT.neutral4,
                alt2: DEFAULT.secondary,
                alt3: DEFAULT.tertiary,
                alt4: DEFAULT.primary3,
                alt5: DEFAULT.primary4,
                alt6: DEFAULT.neutral7,
                alt7: DEFAULT.neutral8,
                active: {
                    base: DEFAULT.primary,
                    hover: DEFAULT.primary2
                }
            }
        },
        icon: {
            primary: {
                fill: DEFAULT.neutral1,
                hover: DEFAULT.neutral6,
            },
            inactive: DEFAULT.neutral4
        },
        indicator: {
            active: {
                base: DEFAULT.primary,
                hover: DEFAULT.primary2
            },
            inactive: {
                base: DEFAULT.neutral6,
                hover: DEFAULT.neutral8
            }
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
            regular: "400",
            medium: "500",
            bold: "600"
        }
    }
}