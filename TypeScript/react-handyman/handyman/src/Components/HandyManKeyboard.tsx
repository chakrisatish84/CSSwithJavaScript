import { styled, IStyleFunctionOrObject, ITheme, classNamesFunction, IProcessedStyleSet, mergeStyles } from '@fluentui/react'
import { getHandymanStyles, IHandymanStyleProps, IHandyManStyles } from './HandyManStyles'
import { Keys } from './Utils'

type HandyManKeyboardProps = {
    styles?: IStyleFunctionOrObject<IHandymanStyleProps, IHandyManStyles>;
    theme?: ITheme,
    activeLetters: string[],
    inActiveLetters: string[],
    disabled: boolean
    addGuessedLetter: (letter: string) => void
}

const getClasssNames = classNamesFunction<IHandymanStyleProps, IHandyManStyles>();
const HandyManKeyboard = ({ styles, theme, addGuessedLetter, activeLetters, inActiveLetters, disabled = false }: HandyManKeyboardProps) => {
    const classNames: IProcessedStyleSet<IHandyManStyles> = getClasssNames(styles, { theme: theme! })
    return (
        <div className={classNames.keyboardRoot}>{Keys.map((key: string, index: number) => {
            const isActive = activeLetters.includes(key);
            const isInActive = inActiveLetters.includes(key);
            return <button disabled={isActive || isInActive || disabled} onClick={() => addGuessedLetter(key)} tabIndex={0} className={mergeStyles(classNames.keyboardButtonStyles, isActive ? classNames.keyboardButtonActive : '', isInActive ? classNames.keyboardButtonInActive : '')} key={index}>{key}</button>
        })}</div>
    )
}

export const StyledHandyManKeyboard = styled<HandyManKeyboardProps, IHandymanStyleProps, IHandyManStyles>(HandyManKeyboard, getHandymanStyles)