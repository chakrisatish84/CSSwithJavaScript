import React, { useCallback, useEffect, useState } from 'react';
import { StyledHandyManDesign } from './Components/HandManDesign';
import { StyledHandyManKeyboard } from './Components/HandyManKeyboard';
import { HandyManResult } from './Components/HandyManResult';
import { StyledHandyManWordComp } from './Components/HandyManWord';
import { classNamesFunction, IProcessedStyleSet, styled, ITheme } from '@fluentui/react'
import { getHandymanStyles, IHandymanStyleProps, IHandyManStyles } from './Components/HandyManStyles';
import words from './Common/wordList.json'

const getClassNames = classNamesFunction<IHandymanStyleProps, IHandyManStyles>();
const App = (props: any) => {

  const getWord = () => {
    return words[Math.floor(Math.random() * words.length)]
  }
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const { styles, theme } = props;


  const classNames: IProcessedStyleSet<IHandyManStyles> = getClassNames(styles, theme)

  console.log("345", wordToGuess)

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || incorrectLetters.length > 6) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters])

  const incorrectLetters = guessedLetters.filter((letter: string) => { return !wordToGuess.includes(letter) })
  const isLoser: boolean = incorrectLetters.length > 5
  const isWinner: boolean = incorrectLetters.length <= 6 && wordToGuess.split("").every((letter: string) => { return guessedLetters.includes(letter) })

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return
      addGuessedLetter(key);
    }
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key != "Enter") return
      setWordToGuess(getWord())
      setGuessedLetters([])
    }
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [])

  return (
    <div className={classNames.root}>
      <HandyManResult isWinner={isWinner} isLoser={isLoser} />
      <StyledHandyManDesign numberofIncorrectGuessedLetters={incorrectLetters.length} />
      <StyledHandyManWordComp reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: 'stretch' }}>
        <StyledHandyManKeyboard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter((letter: string) => { return wordToGuess.includes(letter) })} inActiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter} />
      </div>
    </div>
  );
}

export const StyledAppComp = styled<{}, IHandymanStyleProps, IHandyManStyles>(App, getHandymanStyles)
