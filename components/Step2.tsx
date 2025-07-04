"use client";

import { useEffect, useState } from "react";
import { FormData } from "@/types/FormData";

type Props = {
  formData: FormData;
  setFormData: (data: FormData) => void;
  next: () => void;
  back: () => void;
};

export default function Step2({ formData, setFormData, next, back }: Props) {
  const [localTravelerCount, setLocalTravelerCount] = useState(
    formData.numberOfTravelers
  );
  const [errors, setErrors] = useState<string[]>([]); // errores por viajero
  const [generalError, setGeneralError] = useState("");

  const handleTravelerCountUpdate = () => {
    const count = Math.max(1, Math.min(10, localTravelerCount));
    const updatedTravelers = [...formData.travelers];

    if (count > updatedTravelers.length) {
      for (let i = updatedTravelers.length; i < count; i++) {
        updatedTravelers.push({
          fullName: "",
          birthDate: "",
          documentType: "DNI",
          documentNumber: "",
        });
      }
    } else {
      updatedTravelers.length = count;
    }

    setFormData({
      ...formData,
      numberOfTravelers: count,
      travelers: updatedTravelers,
    });

    setLocalTravelerCount(count);
  };

  const validateAndContinue = () => {
    const validationErrors: string[] = [];

    // Validar datos de cada viajero
    formData.travelers.forEach((t, index) => {
      if (!t.fullName.trim() || !t.birthDate || !t.documentNumber.trim()) {
        validationErrors.push(
          `Debes completar todos los datos del viajero ${index + 1}.`
        );
      }
    });

    // Mascotas
    if (
      formData.withPets &&
      (!formData.numberOfPets || formData.numberOfPets <= 0)
    ) {
      validationErrors.push("Indica cuántas mascotas viajan contigo.");
    }

    // Maletas extra
    if (
      formData.withExtraBags &&
      (!formData.numberOfBags || formData.numberOfBags <= 0)
    ) {
      validationErrors.push("Indica cuántas maletas extra necesitas.");
    }

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      next();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] border-b pb-2">
        👥 Paso 2: Información de los Viajeros
      </h2>

      {/* Número de viajeros */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">
          Número de viajeros
        </label>
        <input
          type="number"
          min={1}
          max={10}
          value={localTravelerCount}
          onChange={(e) => setLocalTravelerCount(Number(e.target.value))}
          onBlur={handleTravelerCountUpdate}
          className="w-24 border border-gray-300 rounded px-3 py-2 text-black focus:ring-[var(--color-primary)] focus:outline-none focus:ring-2"
        />
        <p className="text-sm text-gray-500 mt-1">
          Máximo 10 viajeros permitidos.
        </p>
      </div>

      {/* Errores generales */}
      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded space-y-1">
          {errors.map((error, idx) => (
            <p key={idx} className="text-sm">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Campos por viajero */}
      <div className="space-y-8">
        {formData.travelers.map((traveler, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 bg-[var(--color-primary)] bg-opacity-80 shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4 text-white">
              Viajero {index + 1}
            </h3>

            {/* Nombre */}
            <div className="mb-4">
              <label className="block font-medium text-white mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                value={traveler.fullName}
                onChange={(e) => {
                  const updated = [...formData.travelers];
                  updated[index].fullName = e.target.value;
                  setFormData({ ...formData, travelers: updated });
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:ring-[var(--color-primary)] focus:outline-none focus:ring-2 bg-white"
              />
            </div>

            {/* Fecha de nacimiento */}
            <div className="mb-4">
              <label className="block font-medium text-white mb-1">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                value={traveler.birthDate}
                onChange={(e) => {
                  const updated = [...formData.travelers];
                  updated[index].birthDate = e.target.value;
                  setFormData({ ...formData, travelers: updated });
                }}
                className="w-full border border-gray-300 bg-white rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>

            {/* Documento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-white mb-1">
                  Tipo de documento
                </label>
                <select
                  value={traveler.documentType}
                  onChange={(e) => {
                    const updated = [...formData.travelers];
                    updated[index].documentType = e.target.value as
                      | "DNI"
                      | "Pasaporte"
                      | "Otro";
                    setFormData({ ...formData, travelers: updated });
                  }}
                  className="w-full border bg-white border-gray-300 rounded px-3 py-2 text-black focus:ring-[var(--color-primary)] focus:outline-none focus:ring-2"
                >
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-white mb-1">
                  Número de documento
                </label>
                <input
                  type="text"
                  maxLength={9}
                  value={traveler.documentNumber}
                  onChange={(e) => {
                    const updated = [...formData.travelers];
                    updated[index].documentNumber = e.target.value;
                    setFormData({ ...formData, travelers: updated });
                  }}
                  className="w-full border border-gray-300 bg-white rounded px-3 py-2 text-black focus:ring-[var(--color-primary)] focus:outline-none focus:ring-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mascotas */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">
          ¿Viajas con mascotas?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center text-gray-700 gap-2">
            <input
              className="accent-[var(--color-primary)]"
              type="radio"
              checked={formData.withPets}
              onChange={() =>
                setFormData({
                  ...formData,
                  withPets: true,
                  numberOfPets: formData.numberOfPets || 1, // 👈 asegura valor por defecto
                })
              }
            />
            Sí
          </label>
          <label className="flex items-center text-gray-700 gap-2">
            <input
              className="accent-[var(--color-primary)]"
              type="radio"
              checked={!formData.withPets}
              onChange={() =>
                setFormData({ ...formData, withPets: false, numberOfPets: 0 })
              }
            />
            No
          </label>
        </div>

        {formData.withPets && (
          <div className="mt-3">
            <label className="block text-sm text-gray-700 mb-1">
              Cantidad de mascotas (100$ c/u)
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={formData.numberOfPets || 1}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  numberOfPets: Number(e.target.value),
                })
              }
              onBlur={() => {
                const corrected = Math.max(
                  1,
                  Math.min(5, formData.numberOfPets || 1)
                );
                setFormData({ ...formData, numberOfPets: corrected });
              }}
              className="w-24 border border-gray-300 rounded px-3 py-2 text-black focus:ring-[var(--color-primary)] focus:outline-none focus:ring-2"
            />
          </div>
        )}
      </div>

      {/* Maletas extra */}
      <div>
        <label className="block font-medium text-gray-700 mt-6 mb-2">
          ¿Necesitas maletas extra?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              className="accent-[var(--color-primary)]"
              type="radio"
              checked={formData.withExtraBags}
              onChange={() =>
                setFormData({
                  ...formData,
                  withExtraBags: true,
                  numberOfBags: formData.numberOfBags || 1, // 👈 asegura valor por defecto
                })
              }
            />
            Sí
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input
              className="accent-[var(--color-primary)]"
              type="radio"
              checked={!formData.withExtraBags}
              onChange={() =>
                setFormData({
                  ...formData,
                  withExtraBags: false,
                  numberOfBags: 0,
                })
              }
            />
            No
          </label>
        </div>

        {formData.withExtraBags && (
          <div className="mt-3">
            <label className="block text-sm text-gray-700 mb-1">
              Cantidad de maletas extra (50$ c/u)
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={formData.numberOfBags || 1}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  numberOfBags: Number(e.target.value),
                })
              }
              onBlur={() => {
                const corrected = Math.max(
                  1,
                  Math.min(10, formData.numberOfBags || 1)
                );
                setFormData({ ...formData, numberOfBags: corrected });
              }}
              className="w-24 border border-gray-300 rounded px-3 py-2 text-black focus:ring-[var(--color-primary)] focus:outline-none focus:ring-2"
            />
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-between pt-6">
        <button
          onClick={back}
          className="bg-[var(--color-quaternary-dark)] hover:bg-[var(--color-quaternary)] font-semibold text-gray-800 px-6 py-2 rounded"
        >
          ← Anterior
        </button>
        <button
          onClick={validateAndContinue}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
