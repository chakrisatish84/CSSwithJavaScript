import React, { useState } from 'react';
import { Select, SelectOption } from './components/select';


const options: SelectOption[] = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
  { label: "Sixth", value: 6 },
]

function App() {
  const [value1, setValue1] = useState<SelectOption | undefined>(options[0])

  const [value2, setValue2] = useState<SelectOption[]>([options[0]])

  const handleChange = (option: SelectOption | undefined) => {
    setValue1(option);
  }

  const handleChange2 = (option: SelectOption[]) => {
    setValue2(option);
  }

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'0.5em'}}>
      {<Select multiple={false} options={options} value={value1} onChange={handleChange} />}
      {<Select multiple={true} options={options} value={value2} onChange={handleChange2} />}
    </div>
  );
}

export default App;
