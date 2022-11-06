import { styled, IStyleFunctionOrObject, ITheme, classNamesFunction, IProcessedStyleSet } from '@fluentui/react'
import { getHandymanStyles, IHandymanStyleProps, IHandyManStyles } from './HandyManStyles';

type HandyManWordProps = {
    styles?: IStyleFunctionOrObject<IHandymanStyleProps, IHandyManStyles>;
    theme?: ITheme,
    guessedLetters: string[],
    wordToGuess: string,
    reveal: boolean
}


const getCLassNames = classNamesFunction<IHandymanStyleProps, IHandyManStyles>();
const HandyManWord = ({ styles, theme, wordToGuess, guessedLetters, reveal = false }: HandyManWordProps) => {
    const classNames: IProcessedStyleSet<IHandyManStyles> = getCLassNames(styles, { theme: theme! })
    return (
        <div className={classNames.handyManWordRoot}>
            {wordToGuess.split("").map((letter: string, index: number) => {
                return (
                    <span key={index} className={classNames.handyManWordLetter}>
                        <span style={{ visibility: (guessedLetters.includes(letter)) || reveal ? "visible" : "hidden", color: `${!guessedLetters.includes(letter) && reveal ? "red" : "black"}` }}> {letter}</span>
                    </span>
                )
            })}

        </div>
    )
}

export const StyledHandyManWordComp = styled<HandyManWordProps, IHandymanStyleProps, IHandyManStyles>(HandyManWord, getHandymanStyles)