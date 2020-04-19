import React, {
  useState,
  useEffect,
  SyntheticEvent,
  useReducer,
  useRef,
} from "react";
import "./App.css";
import { FlashCardList } from "./Components/FlashCardList";
import axios from "axios";

function App() {
  const [flashCards, setFlashCards] = useState<IFlashCardInfo[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  useEffect(() => {}, []);

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res: any) => {
      console.log(res.data);
      setCategories(res.data.trivia_categories);
    });
  }, []);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    axios.get("https://opentdb.com/api.php",{
      params:{
        amount: numberRef && numberRef.current && numberRef.current.value,
        category: categoryRef && categoryRef.current && categoryRef.current.value
      }
    }).then((res: any) => {
      setFlashCards(
        res.data.results.map((result: any, index: number) => {
          const answer = decodeString(result.correct_answer);
          const options = [
            ...result.incorrect_answers.map((a: string) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(result.question),
            answer: answer,
            options: options,
          };
        })
      );
    });
  };

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryRef}>
            {categories &&
              categories.map((category: ICategory) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of options</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue="1"
            ref={numberRef}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashCards={flashCards} />
      </div>
    </>
  );
}

const decodeString = (text: string) => {
  const element = document.createElement("textarea");
  element.innerHTML = text;
  return element.value;
};

export interface IFlashCardInfo {
  id: number;
  question: string;
  answer: string;
  options: string[];
}

export interface ICategory {
  id: number;
  name: string;
}

export default App;
