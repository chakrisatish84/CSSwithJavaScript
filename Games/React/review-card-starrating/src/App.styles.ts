import { FontSizes, FontWeights, IStyle, Theme, classNamesFunction } from "@fluentui/react"


export interface IAppStyles {
    root: IStyle
    pageRoot: IStyle
    reviewHeader: IStyle
    reviewheaderTitle: IStyle
    averageRatingRoot: IStyle
    avergeRatingHeader: IStyle
    reviewAverageRatingText: IStyle
    ratingStarIcon: IStyle
    reviewRatingValue: IStyle
    mainRoot: IStyle
    reviewSearchTopics: IStyle
    reviewStarSectionRoot: IStyle
    reviewRatingGrid: IStyle
    reviewRatingProgress: IStyle
    writeaReviewButton: IStyle
}

interface IAppStyleProps {
    theme: Theme
}

export const getAppStyles = ({ theme }: IAppStyleProps): IAppStyles => {
    return {
        pageRoot: {
            position: 'relative',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E5E5E5',
            padding: 0,
            margin: 0,
            overflow: 'hidden'
        },
        root: {
            position: 'relative',
            backgroundColor: 'rgba(0,0,0,.1)',
            width: '570px',
            height: '630px',
            padding: '54px',
            boxShadow: '0 12px 92px 0 rgb(25,27,74,10%)',
            fontFamily: 'Poppins',
            borderRadius: '23px'
        },

        reviewHeader: {
            display: 'flex',
            gap: '80px',
            justifyContent: 'center',
            alignItems: 'center'

        },

        reviewheaderTitle: {
            fontWeight: FontWeights.semibold,
            fontSize: FontSizes.size32,
            fontFamily: 'Merriweather'
        },

        averageRatingRoot: {
            padding: '17px',
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: '15px'
        },

        avergeRatingHeader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '8px',
            gap: '8px',

        },
        reviewAverageRatingText: {
            fontSize: FontSizes.size14,
            textAlign: 'center'
        },
        ratingStarIcon: {
            selectors: {
                'img': {
                    height: '26px',
                    width: '26px'
                }
            }
        },

        reviewRatingValue: {
            fontSize: FontSizes.size24,
            fontWeight: FontWeights.semibold
        },

        mainRoot: {
            marginBottom: '54px'

        },
        reviewSearchTopics: {
            display: 'flex',
            padding: '16px',
            background: '#fff',
            borderRadius: '26px',
            margin: '56px 0',
            selectors: {
                'input': {
                    border: 'none',
                    marginLeft: '10px',
                    outline: 'none',
                    width: '100%',
                    fontSize: FontSizes.size16,
                    fontWeight: FontWeights.semibold
                }
            }
        },

        reviewStarSectionRoot: {
            selectors: {
                '>div:first-child': {
                    fontSize: FontSizes.size16,
                    fontWeight: FontWeights.semibold
                }
            }
        },

        reviewRatingGrid: {
            position: 'relative',
            marginTop: '16px',
            display: 'grid',
            gridTemplateColumns: 'auto auto 1fr auto',
            gridColumnGap: '8px',
            gridRowGap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            selectors: {
                'span': {
                    fontSize: FontSizes.size16,
                    fontWeight: FontWeights.semibold,
                    justifyContent: 'end'
                },
                'img': {
                    height: '25px',
                    width: '25px'
                },
            }
        },

        reviewRatingProgress: {
            '--progressbarWidth': '10%',
            position: 'relative',
            height: '10px',
            borderRadius: '13px',
            backgroundColor: '#EEEEEE',
            border: '1px solid #C9C9C9',
            selectors: {
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `var(--progressbarWidth)`,
                    backgroundColor: '#FFD66C',
                    border: '1px solid #EFB153',
                    borderRadius: '13px',
                }
            }
        },

        writeaReviewButton: {
            padding: '16px 24px',
            backgroundColor: '#191B4A',
            color: '#fff',
            borderRadius: '34px',
            fontSize: FontSizes.size16,
            fontWeight: FontWeights.semibold
        }
    }
}

export const getClassNames = classNamesFunction<IAppStyleProps, IAppStyles>()

