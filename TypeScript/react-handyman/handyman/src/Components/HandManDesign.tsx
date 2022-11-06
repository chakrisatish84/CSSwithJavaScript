import { styled, IStyleFunctionOrObject, ITheme, classNamesFunction, IProcessedStyleSet } from '@fluentui/react'
import { getHandymanStyles, IHandymanStyleProps, IHandyManStyles } from './HandyManStyles'

type HandyManDesignProps = {
    styles?: IStyleFunctionOrObject<IHandymanStyleProps, IHandyManStyles>;
    theme?: ITheme;
    numberofIncorrectGuessedLetters: number
}
const getClassNames = classNamesFunction<IHandymanStyleProps, IHandyManStyles>()
const HandyManDesign = ({ styles, theme, numberofIncorrectGuessedLetters }: HandyManDesignProps) => {
    const classNames: IProcessedStyleSet<IHandyManStyles> = getClassNames(styles, { theme: theme! })
    const hangmanHead = <div className={classNames.hangManHead}></div>
    const hangmanBody = <div className={classNames.hangManBody}></div>
    const hangManLeftHand = <div className={classNames.hangManLeftHand}></div>
    const hangManRighttHand = <div className={classNames.hangManRightHand}></div>
    const hangManLeftLeg = <div className={classNames.hangManLeftLeg}></div>
    const hangManRightLeg = <div className={classNames.hangManRightLeg}></div>
    const Body_Parts = [hangmanHead, hangmanBody, hangManLeftHand, hangManRighttHand, hangManLeftLeg, hangManRightLeg]
    return (
        <div className={classNames.designRoot}>
            <div className={classNames.designHead}></div>
            <div className={classNames.designHeadHanger}></div>
            {Body_Parts.slice(0, numberofIncorrectGuessedLetters)}
            <div className={classNames.designBar}></div>
            <div className={classNames.designBar}></div>
            <div className={classNames.designBase}></div>
        </div>
    )
}

export const StyledHandyManDesign = styled<
    HandyManDesignProps,
    IHandymanStyleProps,
    IHandyManStyles
>(HandyManDesign, getHandymanStyles, undefined, undefined, true)