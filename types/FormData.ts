// types/formData.ts

export type FlightClass = "Economy" | "Business" | "First Class";

export interface Traveler {
  fullName: string;
  birthDate: string;
  documentType: "DNI" | "Pasaporte" | "Otro";
  documentNumber: string;
}

export interface FormData {
  //INPUTS DEL STEP 1
  destination: string;
  departureDate: string;
  returnDate: string;
  flightClass: FlightClass;
  numberOfTravelers: number;

  //INPUTS DEL STEP 2
  travelers: Traveler[];
  withPets: boolean;
  numberOfPets?: number;
  withExtraBags: boolean;
  numberOfBags?: number;

  //INPUTS DEL STEP 3
  wantsInsurance: boolean;
  wantsPreferentialSeat: boolean;
  needsSpecialAssistance: boolean;
  specialAssistanceNote?: string;
}


