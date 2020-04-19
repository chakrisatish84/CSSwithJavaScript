import React from "react";
import { IFlashCardInfo } from "../App";
import { FlashCard } from "./FlashCard";

interface IFlashCardListProps {
  flashCards: IFlashCardInfo[];
}

export const FlashCardList: React.FC<IFlashCardListProps> = ({
  flashCards,
}) => {
  const renderFastCards: React.ReactNode = flashCards.map(
    (flashcard: IFlashCardInfo) => {
      return (
        <>
          <FlashCard flashCard={flashcard} key={flashcard.id} />
        </>
      );
    }
  );
  return (
    <>
      <div className="card-grid">{renderFastCards}</div>
    </>
  );
};
