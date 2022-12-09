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
    neutral9: "#F4F5F6",
    neutral10: "#EAEAEA",
    neutral11: "#BABABA",
    primary: "#003153",
    primary2: "#265F85",
    primary3: "#4C8CB8",
    primary4: "#A4CCE9",
    secondary: "#DAA520",
    tertiary: "#FFD877",
    overlay1: "rgba(59, 70, 78, 0.75)",
    overlay2: "rgb(193, 193, 193, 0.75)",
    overlay3: "rgb(193, 193, 193, 0.85)",
    warning: "#EE3C3C",
    warningShadow: "#F27979",
    success: "#32C422",
    neutral: "#FFB600",
    transparent: "rgba(255, 255, 255, 0)"
}

export const defaultTheme: DefaultTheme = {
    scheme: "light",
    colors: {
        border: {
            primary: DEFAULT.neutral3,
            alt1: DEFAULT.neutral6,
            alt2: DEFAULT.primary3,
            alt3: DEFAULT.primary4,
            alt4: DEFAULT.primary
        },
        button: {
            primary: {
                background: DEFAULT.neutral1,
                border: DEFAULT.primary,
                hover: DEFAULT.neutral9,
                label: DEFAULT.primary,
                active: {
                    background: DEFAULT.primary,
                    hover: DEFAULT.primary2,
                    label: DEFAULT.neutral1
                },
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
                active: {
                    background: DEFAULT.neutral1,
                    hover: DEFAULT.neutral9,
                    label: DEFAULT.primary
                },
                disabled: {
                    background: DEFAULT.neutral5,
                    border: DEFAULT.neutral3,
                    label: DEFAULT.neutral7
                }
            },
            tertiary: {
                background: DEFAULT.neutral1,
                border: DEFAULT.transparent,
                hover: DEFAULT.neutral2,
                label: DEFAULT.primary,
                active: {
                    background: DEFAULT.primary3,
                    hover: DEFAULT.primary2,
                    label: DEFAULT.neutral1
                },
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
                hover: DEFAULT.neutral9
            },
            alt1: {
                background: DEFAULT.primary
            },
            alt2: {
                background: DEFAULT.primary2
            },
            alt3: {
                background: DEFAULT.neutral9
            },
            alt4: {
                background: DEFAULT.neutral10
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
                },
                invalid: DEFAULT.warning
            }
        },
        form: {
            background: DEFAULT.neutral1,
            border: DEFAULT.neutral6,
            invalid: {
                outline: DEFAULT.warning,
                shadow: DEFAULT.warningShadow
            },
            valid: {
                outline: DEFAULT.primary3,
                shadow: DEFAULT.primary4
            },
            disabled: {
                background: DEFAULT.neutral3,
                label: DEFAULT.neutral7
            }
        },
        icon: {
            primary: {
                fill: DEFAULT.neutral1,
                hover: DEFAULT.neutral6,
            },
            secondary: {
                fill: DEFAULT.secondary
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
        notification: {
            success: DEFAULT.success,
            warning: DEFAULT.warning,
            neutral: DEFAULT.neutral
        },
        overlay: {
            primary: DEFAULT.overlay1,
            alt1: DEFAULT.overlay2,
            alt2: DEFAULT.overlay3,
        },
        shadow: {
            primary: DEFAULT.neutral11,
            secondary: DEFAULT.neutral6,
            tertiary: DEFAULT.neutral7,
        },
        tabs: {
            active: DEFAULT.primary,
            inactive: DEFAULT.transparent
        },
        transparent: DEFAULT.transparent,
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