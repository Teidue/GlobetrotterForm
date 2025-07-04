"use client";

import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { FormData } from "@/types/FormData";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"next" | "back">("next");

  const [formData, setFormData] = useState<FormData>({
    destination: "",
    departureDate: "",
    returnDate: "",
    flightClass: "Economy",
    numberOfTravelers: 1,
    travelers: [
      {
        fullName: "",
        birthDate: "",
        documentType: "DNI",
        documentNumber: "",
      },
    ],
    withPets: false,
    numberOfPets: 0,
    withExtraBags: false,
    numberOfBags: 0,
    wantsInsurance: false,
    wantsPreferentialSeat: false,
    needsSpecialAssistance: false,
    specialAssistanceNote: "",
  });

  const next = () => {
    setDirection("next");
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const back = () => {
    setDirection("back");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const animationClass =
    direction === "next" ? "animate-slide-in-left" : "animate-slide-in-right";

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 next={next} formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2 next={next} back={back} formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 next={next} back={back} formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4 back={back} formData={formData} />;
    }
  };

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl px-8 py-10 w-[95%] max-w-3xl transition-all duration-300 overflow-hidden relative">
      <div key={step} className={`transition-all duration-300 ${animationClass}`}>
        {renderStep()}
      </div>
    </div>
  );
}
