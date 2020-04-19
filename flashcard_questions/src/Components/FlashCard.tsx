import React, { useState, useRef, useEffect } from "react";
import { IFlashCardInfo } from "../App";

interface IFlashCardProps {
  flashCard: IFlashCardInfo;
}

export const FlashCard: React.FC<IFlashCardProps> = ({ flashCard }) => {
  const [flip, setFlip] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const frontEl = useRef<HTMLDivElement>(null);
  const backEl = useRef<HTMLDivElement>(null);

  const setMaxHeight = () => {
    const frontHeight: number = frontEl.current
      ? frontEl.current.getBoundingClientRect().height
      : 0;
    const backHeight: number = backEl.current
      ? backEl.current.getBoundingClientRect().height
      : 0;
    setHeight(Math.max(frontHeight, backHeight, 100));
  };

  useEffect(setMaxHeight, [
    flashCard.options,
    flashCard.question,
    flashCard.answer,
  ]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  return (
    <>
      <div
        style={{ height: height }}
        onClick={() => setFlip(!flip)}
        className={`card ${flip ? "flip" : ""}`}
      >
        <div className="front" ref={frontEl}>
          {flashCard.question}
          <div className="flash-card-options">
            {flashCard.options.map((option: string, index: number) => {
              return (
                <div className="flash-card-option" key={index}>
                  {option}
                </div>
              );
            })}
          </div>
        </div>
        <div className="back" ref={backEl}>
          {flashCard.answer}
        </div>
      </div>
    </>
  );
};
