import React, { useState } from 'react';
import { Select, SelectOption } from './Components/select';

const options: SelectOption[] = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
  { label: "Sixth", value: 6 },
]

function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0])

  const [value1, setValue1] = useState<SelectOption[]>([options[0]])

  const handleChange = (option: SelectOption | undefined) => {
    setValue(option);
  }

  const handleMultiChange = (options: SelectOption[]) => {
    setValue1(options);
  }
  return (
    <div className="App">
      <Select multiple={false} value={value} options={options} onChange={handleChange} />
      <br />
      <Select multiple={true} value={value1} options={options} onChange={handleMultiChange} />
    </div>
  );
}

export default App;
