import { classNamesFunction, IProcessedStyleSet, IStyleFunctionOrObject, ITheme, styled } from "@fluentui/react"
import { getHangManStyles, IHangManStyles, IHangmManStyleProps } from "./HangManStyles"


const getClassNames = classNamesFunction<IHangmManStyleProps, IHangManStyles>()

type HangManWordProps = {
    styles?: IStyleFunctionOrObject<IHangmManStyleProps, IHangManStyles>;
    theme?: ITheme
    wordToGuess: string
    guessedLetters: string[]
}
const HangManWord = ({ styles, theme, wordToGuess, guessedLetters = [] }: HangManWordProps) => {
    const classNames: IProcessedStyleSet<IHangManStyles> = getClassNames(styles, { theme: theme! })
    console.log(wordToGuess);
    return (
        <div className={classNames.wordRoot}>
            {wordToGuess.split("").map((letter: string, index: number) => {
                return (
                    <span key={index} className={classNames.wordLetterStyles}>
                        <span style={{ visibility: guessedLetters.includes(letter) ? 'visible' : 'hidden' }}>{letter}</span>
                    </span>
                )
            })}
        </div>
    )
}

export const StyledHangManWord = styled(HangManWord, getHangManStyles)