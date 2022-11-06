import { classNamesFunction, IProcessedStyleSet, IStyleFunctionOrObject, ITheme, styled } from "@fluentui/react"
import { getHangManStyles, IHangManStyles, IHangmManStyleProps } from "./HangManStyles"

type HangManDesignProps = {
    styles?: IStyleFunctionOrObject<IHangmManStyleProps, IHangManStyles>;
    theme?: ITheme,
    numberOfIncorrectLetters: number
}

const getClassNames = classNamesFunction<IHangmManStyleProps, IHangManStyles>()

const HangManDesign = ({ styles, theme, numberOfIncorrectLetters }: HangManDesignProps) => {
    const classNames: IProcessedStyleSet<IHangManStyles> = getClassNames(styles, { theme: theme! })

    const HangManHead = <div className={classNames.hangManHead}></div>
    const HangManBody = <div className={classNames.hangManBody}></div>
    const HangManRightHand = <div className={classNames.hangManRightHand}></div>
    const HangManLeftHand = <div className={classNames.hangManleftHand}></div>
    const HangManRightLeg = <div className={classNames.hangManRightLeg}></div>
    const HangManLeftLeg = <div className={classNames.hangManLeftLeg}></div>
    const hangMan = [HangManHead, HangManBody, HangManRightHand, HangManLeftHand, HangManRightLeg, HangManLeftLeg]
    return (
        <div className={classNames.designRoot}>
            {hangMan.slice(0, numberOfIncorrectLetters)}

            <div className={classNames.designHanger}></div>
            <div className={classNames.designHead}></div>
            <div className={classNames.designBar}></div>
            <div className={classNames.designBase}></div>
        </div>
    )
}

export const StyledHangManDesign = styled(HangManDesign, getHangManStyles)