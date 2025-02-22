'use client';

import React from "react";

const Timeline = ({ currentStep }) => {
  const steps = [
    { number: 1, name: "Select Services" },
    { number: 2, name: "Enter API Keys" },
    { number: 3, name: "Confirmation" },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.number
                    ? "bg-green-600 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.number}
              </div>
              <div className="text-xs mt-2 text-center hidden sm:block">
                {step.name}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep > step.number ? "bg-green-600" : "bg-muted"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
