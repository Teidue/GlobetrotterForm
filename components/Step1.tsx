"use client";

import { useEffect, useState } from "react";
import { FormData, FlightClass } from "@/types/FormData";
import { fetchFlightOptions, FlightOption } from "@/utils/flights";

type Props = {
  formData: FormData;
  setFormData: (data: FormData) => void;
  next: () => void;
};

export default function Step1({ formData, setFormData, next }: Props) {
  const [flights, setFlights] = useState<FlightOption[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>([]);
  const [uniqueDestinations, setUniqueDestinations] = useState<string[]>([]);

  // Errores
  const [errors, setErrors] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
  });

  useEffect(() => {
    fetchFlightOptions().then((data) => {
      setFlights(data);
      const uniques = [...new Set(data.map((f) => f.destination))];
      setUniqueDestinations(uniques);
    });
  }, []);

  const handleDestinationChange = (value: string) => {
    setFormData({ ...formData, destination: value });
    const matches = uniqueDestinations.filter((dest) =>
      dest.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDestinations(matches);
  };

  const validateAndContinue = () => {
    const newErrors = { destination: "", departureDate: "", returnDate: "" };
    let isValid = true;

    if (!formData.destination.trim()) {
      newErrors.destination = "Debes ingresar un destino.";
      isValid = false;
    }

    if (!formData.departureDate) {
      newErrors.departureDate = "La fecha de salida es obligatoria.";
      isValid = false;
    }

    if (!formData.returnDate) {
      newErrors.returnDate = "La fecha de regreso es obligatoria.";
      isValid = false;
    }

    if (
      formData.departureDate &&
      formData.returnDate &&
      formData.returnDate < formData.departureDate
    ) {
      newErrors.returnDate = "La fecha de regreso debe ser posterior a la de salida.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) next();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] border-b pb-2">
        🛫 Paso 1: Información del Viaje
      </h2>

      {/* DESTINO */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Destino</label>
        <input
          type="text"
          className={`w-full border ${
            errors.destination ? "border-red-500" : "border-gray-300"
          } placeholder-gray-400 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition`}
          value={formData.destination}
          onChange={(e) => handleDestinationChange(e.target.value)}
          placeholder="Ej. París, Nueva York, Tokio"
        />
        {errors.destination && (
          <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
        )}
        {formData.destination && filteredDestinations.length > 0 && (
          <ul className="border mt-2 rounded-lg shadow bg-white max-h-40 overflow-y-auto">
            {filteredDestinations.map((dest, idx) => (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition text-gray-700"
                onClick={() => {
                  setFormData({ ...formData, destination: dest });
                  setFilteredDestinations([]);
                }}
              >
                {dest}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* FECHAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Fecha de salida
          </label>
          <input
            type="date"
            className={`w-full border ${
              errors.departureDate ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-gray-700`}
            value={formData.departureDate}
            onChange={(e) =>
              setFormData({ ...formData, departureDate: e.target.value })
            }
          />
          {errors.departureDate && (
            <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Fecha de regreso
          </label>
          <input
            type="date"
            className={`w-full border ${
              errors.returnDate ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-gray-700`}
            value={formData.returnDate}
            onChange={(e) =>
              setFormData({ ...formData, returnDate: e.target.value })
            }
          />
          {errors.returnDate && (
            <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
          )}
        </div>
      </div>

      {/* CLASE DE VUELO */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">
          Clase de vuelo
        </label>
        <div className="flex flex-wrap gap-3 mt-2">
          {(["Economy", "Business", "First Class"] as FlightClass[]).map(
            (clase) => (
              <button
                key={clase}
                className={`px-5 py-2 rounded-full border transition ${
                  formData.flightClass === clase
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() =>
                  setFormData({ ...formData, flightClass: clase })
                }
                type="button"
              >
                {clase}
              </button>
            )
          )}
        </div>
      </div>

      {/* BOTÓN SIGUIENTE */}
      <div className="text-right pt-4">
        <button
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold px-6 py-2 rounded-lg transition"
          onClick={validateAndContinue}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
