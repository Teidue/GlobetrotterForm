// utils/flights.ts

export interface FlightOption {
  destination: string;
  price: number;
  class: string;
}

export async function fetchFlightOptions(): Promise<FlightOption[]> {
  const res = await fetch(
    "https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json"
  );
  if (!res.ok) throw new Error("Error al obtener los datos de vuelos");
  return res.json();
}
