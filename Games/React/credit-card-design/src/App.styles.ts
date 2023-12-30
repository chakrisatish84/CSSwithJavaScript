import { IStyle, classNamesFunction } from "@fluentui/react";

interface ICreditCardStyleProps { }

export interface ICreditCardtStyles {
    root: IStyle
    cardRoot: IStyle
    cardFront: IStyle
    cardBack: IStyle
    cardHeader: IStyle
    cardTitle: IStyle
    cardLogo: IStyle
    cardBody: IStyle
    cardNumberRoot: IStyle
    fieldSet: IStyle
    cardInputRow: IStyle
    cardExpirationRoot: IStyle
    cardExpirationInput: IStyle
    cardStripe: IStyle
    cardCVCRoot: IStyle
    subComponentStyles: {}
}

export const getCreditCardStyles = (_props: ICreditCardStyleProps): ICreditCardtStyles => {
    return {
        root: { position: 'relative', fontFamily: 'Arial', color: 'white' },
        cardRoot: {
            padding: '20px',
            borderRadius: '15px',
            width: '325px',
            height: '150px',
            backgroundColor: 'hsl(200,80%,30%)',
            '& +div': {
                paddingRight: 0,

            }
        },
        cardFront: {
            position: 'relative',
            boxShadow: '0 0 10px rgba(0,0,0,.5)',
            zIndex: 1,
            selectors: {
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    height: '400px',
                    width: '400px',
                    backgroundColor: 'hsl(0,0%,100%,.15)',
                    left: '-150px',
                    top: '-250px',
                    borderRadius: '100%',
                    zIndex: -1
                },
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    height: '600px',
                    width: '600px',
                    backgroundColor: 'hsl(0,0%,100%,.075)',
                    bottom: '-475px',
                    left: '-150px',
                    borderRadius: '100%',
                    zIndex: -1,
                    overflow: "hidden"
                }
            }

        },
        cardBack: {
            position: 'absolute',
            top: 30,
            left: 80,


        },
        cardHeader: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        cardTitle: {

        },
        cardLogo: {
            marginTop: '-8px',
            selectors: {
                'img': {
                    height: '40px',
                    width: '40px'
                }
            }
        },

        cardBody: {},

        cardNumberRoot: {
            display: 'flex',
            fontSize: '10px',
            gap: '8px',
            'input': {
                width: '4ch',
                padding: '3px',
                border: 'none',
                borderRadius: '4px',
                selectors: {
                    ':focus-visible': {
                        outline: 'none'
                    }
                }

            }
        },
        fieldSet: {
            border: 'none',
            paddingLeft: 0,
            marginLeft: 0,
            selectors: {
                'legend': {
                    position: "absolute",
                    visibility: 'hidden',
                    height: 0,
                    width: 0,
                    top: '-200px'
                }
            }
        },
        cardInputRow: {
            display: 'flex',
            justifyContent: 'space-between',
            appearance: 'none',
            selectors: {
                'input': {
                    borderRadius: '5px',
                    padding: '3px',
                    border: 'none',
                    selectors: {
                        ':focus-visible': {
                            outline: 'none'
                        }
                    }
                }
            }
        },
        cardExpirationRoot: {
            position: 'relative',
            top: '-8px'
        },
        cardExpirationInput: {
            display: 'flex',
            gap: '5px',
            selectors: {
                'select': {
                    appearance: 'none',
                    padding: '3px',
                    borderRadius: '4px',
                    selectors: {
                        ':focus-visible': {
                            outline: 'none'
                        },
                        ':focus': {
                            outline: '2px solid black'
                        }
                    }
                }
            }
        },

        cardStripe: {
            height: '35px',
            backgroundColor: 'black'
        },
        cardCVCRoot: {
            position: 'absolute',
            right: '10px',
            bottom: '62px',
            display: 'flex',
            flexDirection: 'column',
            selectors: {
                'input': {
                    margin: '3px',
                    width: '3ch',
                    padding: '5px',
                    paddingLeft: '10px',
                    borderRadius: '3px',
                    border: 'none',
                    zIndex: 1,
                    selectors: {
                        ':focus-visible': {
                            outline: 'none'
                        },
                        ':focus': {
                            outline: '2px solid black'
                        }
                    }
                },
                'label': {
                    fontSize: '12px'
                }
            }
        },

        subComponentStyles: {

        }
    }
};

export const getClassNames = classNamesFunction<ICreditCardStyleProps, ICreditCardtStyles>()