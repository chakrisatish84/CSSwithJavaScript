import { classNamesFunction, IProcessedStyleSet, IStyleFunctionOrObject, ITheme, styled, mergeStyles } from "@fluentui/react"
import { getHangManStyles, IHangManStyles, IHangmManStyleProps } from "./HangManStyles"
import { keys } from './Utils'

const getClassNames = classNamesFunction<IHangmManStyleProps, IHangManStyles>()

type HangManKeyboardProps = {
    styles?: IStyleFunctionOrObject<IHangmManStyleProps, IHangManStyles>;
    theme?: ITheme
    correctLetters: string[],
    inCorrectLetters: string[],
    isLoser: boolean,
    isWinner: boolean,
    addGuessLetter: (key: string) => void
}

const HangManKeyboard = ({ styles, theme, correctLetters, inCorrectLetters, isWinner, isLoser, addGuessLetter }: HangManKeyboardProps) => {
    const classNames: IProcessedStyleSet<IHangManStyles> = getClassNames(styles, { theme: theme! })
    return (
        <div className={classNames.keyboardRoot}>
            {keys.map((key: string, index: number) => {
                const isCorrect = correctLetters.includes(key)
                const isIncorrect = inCorrectLetters.includes(key)
                return <button disabled={isCorrect || isIncorrect || isWinner || isLoser} tabIndex={0} onClick={() => addGuessLetter(key)} key={index} className={mergeStyles(classNames.keyboarKeyStyles, isCorrect && classNames.correctKey, isIncorrect && classNames.inCorrectKey)}>{key}</button>
            })}
        </div>
    )
}

export const StyledHangManKeyboard = styled(HangManKeyboard, getHangManStyles)