import "styled-components"

declare module "styled-components" {
    export interface DefaultTheme {
        scheme: "dark" | "light"
        colors: {
            border: {
                primary: string
                alt1: string
                alt2: string
                alt3: string
                alt4: string
            }
            button: {
                primary: {
                    background: string
                    border: string
                    hover: string
                    label: string
                    active: {
                        background: string
                        hover: string
                        label: string
                    }
                    disabled: {
                        background: string
                        border: string
                        label: string
                    }
                }
                secondary: {
                    background: string
                    border: string
                    hover: string
                    label: string
                    active: {
                        background: string
                        hover: string
                        label: string
                    }
                    disabled: {
                        background: string
                        border: string
                        label: string
                    }
                }
                tertiary: {
                    background: string
                    border: string
                    hover: string
                    label: string
                    active: {
                        background: string
                        hover: string
                        label: string
                    }
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
                alt1: {
                    background: string
                }
                alt2: {
                    background: string
                }
                alt3: {
                    background: string
                }
                alt4: {
                    background: string
                }
                alt5: {
                    background: string
                }
            }
            font: {
                primary: {
                    base: string
                    alt1: string
                    alt2: string
                    alt3: string
                    alt4: string
                    alt5: string
                    alt6: string
                    alt7: string
                    active: {
                        base: string
                        hover: string
                    }
                    invalid: string
                }
            }
            form: {
                background: string
                border: string
                invalid: {
                    outline: string
                    shadow: string
                },
                valid: {
                    outline: string
                    shadow: string
                }
                disabled: {
                    background: string
                    label: string
                }
            }
            icon: {
                primary: {
                    fill: string
                    hover: string
                    alt1: {
                        fill: string
                    }
                }
                secondary: {
                    fill: string
                }
                inactive: string
            }
            indicator: {
                active: {
                    base: string
                    hover: string
                }
                inactive: {
                    base: string
                    hover: string
                }
            }
            navigation: {
                footer: {
                    background: string
                }
                header: {
                    background: string
                    logoFill: string
                }
            }
            notification: {
                success: string
                warning: string
                neutral: string
            }
            overlay: {
                primary: string
                alt1: string
                alt2: string
            }
            shadow: {
                primary: string
                secondary: string
                tertiary: string
            }
            table: {
                placeholder: {
                    background: string
                    backgroundStart: string
                    backgroundSlide: string
                    backgroundEnd: string
                }
            }
            tabs: {
                active: string
                inactive: string
            }
            transparent: string
            view: {
                background: string
            }
            warning: string
        }
        typography: {
            family: {
                primary: string
                secondary: string
            }
            size: {
                h1: string
                h2: string
                base: string
                small: string
                xSmall: string
            }
            weight: {
                regular: string
                medium: string
                bold: string
            }
        }
    }
}
