import "styled-components"

declare module "styled-components" {
    export interface DefaultTheme {
        scheme: "dark" | "light"
        colors: {
            border: {
                primary: string
                secondary: string
                tertiary: string
            }
            button: {
                primary: {
                    background: string
                    border: string
                    hover: string
                    label: string
                    disabled: {
                        background: string
                        border: string
                        label: string
                    }
                }
            }
            container: {
                primary: {
                    background: string
                    hover: string
                }
                secondary: {
                    background: stringß
                }
                tertiary: {
                    background: string
                }
            }
            font: {
                primary: {
                    base: string
                    alt: string
                    active: {
                        base: string
                        hover: string
                    }
                }
                secondary: {
                    base: string
                }
                tertiary: {
                    base: string
                }
                quarternary: {
                    base: string
                }
                quinary: {
                    base: string
                }
            }
            icon: {
                primary: {
                    fill: string,
                    hover: string,
                }
                inactive: string
            }
            navigation: {
                footer: {
                    background: string
                }
                header: {
                    background: string
                }
            }
            overlay: {
                primary: string
            }
            view: {
                background: string
            }
            warning: string
        }
        typography: {
            family: {
                primary: string
                secondary: string
            },
            size: {
                h1: string
                h2: string
                base: string
                small: string
                xSmall: string
            }
            weight: {
                medium: string
                bold: string
            }
        }
    }
}
