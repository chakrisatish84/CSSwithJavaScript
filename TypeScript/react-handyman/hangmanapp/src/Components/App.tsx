import { classNamesFunction, IProcessedStyleSet, styled } from '@fluentui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { StyledHangManDesign } from './HangManDesign';
import { StyledHangManKeyboard } from './HangManKeyboard';
import { HangManResult } from './HangmanResult';
import { getHangManStyles, IHangManStyles, IHangmManStyleProps } from './HangManStyles';
import { StyledHangManWord } from './HangManWord';
import words from '../Common/wordList.json'

const getClassNames = classNamesFunction<IHangmManStyleProps, IHangManStyles>()
function App(props: any) {
  const getWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  }
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const inCorrectLetters = guessedLetters.filter((letter: string) => { return !wordToGuess.includes(letter) })
  const correctLetters = guessedLetters.filter((letter: string) => { return wordToGuess.includes(letter) })

  const isLoser = inCorrectLetters.length > 5

  const isWinner = inCorrectLetters.length < 6 && wordToGuess.split("").every((letter: string) => { return guessedLetters.includes(letter) })

  const addGuessLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter)) return

    setGuessedLetters(currentGuessesLetters => [...currentGuessesLetters, letter])
  }, [guessedLetters])
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/) || isWinner || isLoser) return

      addGuessLetter(key);
    }
    document.addEventListener('keypress', handler)
    return () => document.removeEventListener('keypress', handler)
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return
      setGuessedLetters([]);
      setWordToGuess(getWord())

    }
    document.addEventListener('keypress', handler)
    return () => document.removeEventListener('keypress', handler)
  }, [])

  const { styles, theme } = props;
  const classNames: IProcessedStyleSet<IHangManStyles> = getClassNames(styles, theme)
  return (
    <div className={classNames.root}>
      <HangManResult isLoser={isLoser} isWinner={isWinner} />
      <StyledHangManDesign numberOfIncorrectLetters={inCorrectLetters.length} />
      <StyledHangManWord wordToGuess={wordToGuess} guessedLetters={guessedLetters} />
      <div style={{ alignSelf: 'stretch' }}>
        <StyledHangManKeyboard addGuessLetter={addGuessLetter} correctLetters={correctLetters} inCorrectLetters={inCorrectLetters} isLoser={isLoser} isWinner={isWinner} />
      </div>
    </div>
  );
}

export const StyledApp = styled(App, getHangManStyles)
