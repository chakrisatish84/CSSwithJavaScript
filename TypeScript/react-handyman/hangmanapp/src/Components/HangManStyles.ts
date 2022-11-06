import { FontSizes, FontWeights, IStyle, ITheme } from '@fluentui/react'
import { relative } from 'path'
import { transform } from 'typescript'

export interface IHangmManStyleProps {
    theme: ITheme
}

export interface IHangManStyles {
    root: IStyle
    designRoot: IStyle
    designBase: IStyle
    designBar: IStyle
    designHead: IStyle
    designHanger: IStyle
    hangManHead: IStyle
    hangManBody: IStyle
    hangManRightHand: IStyle
    hangManleftHand: IStyle
    hangManRightLeg: IStyle
    hangManLeftLeg: IStyle
    wordRoot: IStyle
    wordLetterStyles: IStyle
    keyboardRoot: IStyle
    keyboarKeyStyles: IStyle
    correctKey: IStyle
    inCorrectKey: IStyle
}

export const getHangManStyles = (props: IHangmManStyleProps): IHangManStyles => {
    return {
        root: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto'
        },
        designRoot: {
            position: 'relative'
        },
        designBase: {
            height: '10px',
            width: '200px',
            backgroundColor: 'black'
        },
        designBar: {
            height: '400px',
            width: '10px',
            backgroundColor: 'black',
            marginLeft: '100px'
        },
        designHead: {
            height: '10px',
            width: '200px',
            backgroundColor: 'black',
            marginLeft: '100px'
        },
        designHanger: {
            position: 'absolute',
            height: '50px',
            width: '10px',
            backgroundColor: 'black',
            right: 0
        },
        hangManHead: {
            position: 'absolute',
            height: '50px',
            width: '50px',
            border: '10px solid black',
            borderRadius: '100%',
            right: '-30px',
            top: '50px'
        },
        hangManBody: {
            position: 'absolute',
            height: '120px',
            width: '10px',
            right: '0px',
            top: '110px',
            backgroundColor: 'black'
        },
        hangManleftHand: {
            position: 'absolute',
            height: '10px',
            width: '100px',
            right: '-90px',
            top: '150px',
            backgroundColor: 'black',
            transform: 'rotate(-30deg)'
        },
        hangManRightHand: {
            position: 'absolute',
            height: '10px',
            width: '100px',
            right: '0px',
            top: '150px',
            backgroundColor: 'black',
            transform: 'rotate(30deg)'
        },
        hangManLeftLeg: {
            position: 'absolute',
            height: '10px',
            width: '100px',
            right: '-90px',
            top: '220px',
            backgroundColor: 'black',
            transform: 'rotate(50deg)',
            transformOrigin: 'left bottom'
        },
        hangManRightLeg: {
            position: 'absolute',
            height: '10px',
            width: '100px',
            right: '0px',
            top: '220px',
            backgroundColor: 'black',
            transform: 'rotate(-50deg)',
            transformOrigin: 'right bottom'
        },
        wordRoot: {
            position: 'relative',
            fontSize: FontSizes.xxLarge,
            fontWeight: FontWeights.bold,
            fontFamily: 'monospace',
            display: 'flex',
            gap: '0.5rem',
            textTransform: 'upperCase'
        },
        wordLetterStyles: {
            borderBottom: '5px solid black'
        },
        keyboardRoot: {
            display: 'grid',
            gap: '0.25em',
            gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))'
        },
        keyboarKeyStyles: {
            textTransform: 'upperCase',
            background: 'none',
            color: 'black',
            cursor: 'pointer',
            fontSize: FontSizes.xLarge,
            fontWeight: FontWeights.bold,
            aspectRatio: '1/1',
            selectors: {
                ':hover:not(:disabled)': {
                    backgroundColor: 'hsl(200,100%,80%)'
                },
                ':focus:not(:disabled)': {
                    backgroundColor: 'hsl(200,100%,80%)'
                }
            }
        },
        correctKey: {
            backgroundColor: 'hsl(200,100%,50%)'
        },
        inCorrectKey: {
            opacity: '0.3'
        }
    }
}