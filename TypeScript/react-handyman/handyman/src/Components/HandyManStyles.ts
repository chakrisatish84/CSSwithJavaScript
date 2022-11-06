import { IStyle, ITheme, FontSizes, FontWeights } from '@fluentui/react'
import { relative } from 'path';

export interface IHandyManStyles {
    root: IStyle
    designRoot: IStyle
    designBase: IStyle
    designBar: IStyle
    designHead: IStyle
    designHeadHanger: IStyle
    hangManHead: IStyle
    hangManBody: IStyle
    hangManLeftHand: IStyle
    hangManRightHand: IStyle
    hangManLeftLeg: IStyle
    hangManRightLeg: IStyle
    handyManWordRoot: IStyle
    handyManWordLetter: IStyle
    keyboardRoot: IStyle
    keyboardButtonStyles: IStyle
    keyboardButtonActive: IStyle
    keyboardButtonInActive: IStyle
}
export interface IHandymanStyleProps {
    theme: ITheme
}

export const getHandymanStyles = (props: IHandymanStyleProps): IHandyManStyles => {
    const { theme } = props;
    return {
        root: {
            padding: 0,
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center'
        },
        designRoot: {
            position: 'relative'
        },
        designBase: {
            width: '200px',
            height: '10px',
            backgroundColor: 'black'
        },
        designBar: {
            width: '10px',
            height: '200px',
            backgroundColor: 'black',
            marginLeft: '100px'
        },
        designHead: {
            width: '200px',
            height: '10px',
            backgroundColor: 'black',
            marginLeft: '100px'
        },
        designHeadHanger: {
            position: 'absolute',
            height: '50px',
            width: '10px',
            backgroundColor: 'black',
            right: '0',
        },
        hangManHead: {
            position: 'absolute',
            width: '50px',
            height: '50px',
            border: '10px solid black',
            borderRadius: '100%',
            top: '50px',
            right: '-30px'
        },
        hangManBody: {
            position: 'absolute',
            width: '10px',
            height: '100px',
            top: '118px',
            right: '0',
            backgroundColor: 'black'
        },
        hangManLeftHand: {
            position: 'absolute',
            width: '100px',
            height: '10px',
            top: '160px',
            right: '10px',
            backgroundColor: 'black',
            transform: 'rotate(30deg)',
            transformOrigin: 'right bottom'
        },
        hangManRightHand: {
            position: 'absolute',
            width: '100px',
            height: '10px',
            top: '160px',
            right: '-100px',
            backgroundColor: 'black',
            transform: 'rotate(-30deg)',
            transformOrigin: 'left bottom'
        },
        hangManLeftLeg: {
            position: 'absolute',
            width: '100px',
            height: '10px',
            top: '204px',
            right: '0px',
            backgroundColor: 'black',
            transform: 'rotate(-60deg)',
            transformOrigin: 'right bottom'
        },
        hangManRightLeg: {
            position: 'absolute',
            width: '100px',
            height: '10px',
            top: '204px',
            right: '-90px',
            backgroundColor: 'black',
            transform: 'rotate(60deg)',
            transformOrigin: 'left bottom'
        },
        handyManWordRoot: {
            display: 'flex',
            gap: '.25em',
            fontSize: '6rem',
            textTransform: 'upperCase',
            fontWeight: 'bold',
            fontFamily: 'monospace'
        },
        handyManWordLetter: {
            borderBottom: '10px solid black'
        },
        keyboardRoot: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
            gap: '0.5rem'
        },
        keyboardButtonStyles: {
            width: '100%',
            background: 'none',
            fontSize: FontSizes.xLarge,
            fontWeight: FontWeights.bold,
            textTransform: 'upperCase',
            cursor: 'pointer',
            aspectRatio: '1/1',
            padding: '0.5rem',
            border: '3px solid black',
            color: 'black',
            selectors: {
                ':hover:not(:disabled)': {
                    backgroundColor: 'hsl(200,100%,75%)'
                },
                ':focus:not(:disabled)': {
                    backgroundColor: 'hsl(200,100%,75%)'
                }
            }
        },
        keyboardButtonActive: {
            backgroundColor: 'hsl(200,100%,50%)',
            color: 'white'
        },
        keyboardButtonInActive: {
            opacity: '0.3'
        }
    }
}