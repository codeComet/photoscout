"use client";

import { useState, useEffect } from "react";
import { Slider } from "./step-slider";

export default function StepSlider({filterParams, setFilterParams}) {
  const [value, setValue] = useState([filterParams?.quality !== '' ? filterParams?.quality : 75]);

  useEffect(() => {
    if (filterParams?.quality) {
      setValue([filterParams.quality]);
    }
  }, [filterParams?.quality]);

  const handleValueChange = (newValue) => {
    setValue(newValue);
    setFilterParams(prev => ({...prev, quality: newValue[0]}));
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <Slider
        defaultValue={[100]}
        max={100}
        step={25}
        value={value}
        onValueChange={handleValueChange}
        color="#17A34A"
      />
    </div>
  );
}
