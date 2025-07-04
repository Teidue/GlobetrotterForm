"use client";

import { useState } from "react";
import { FormData } from "@/types/FormData";

type Props = {
  formData: FormData;
  setFormData: (data: FormData) => void;
  next: () => void;
  back: () => void;
};

export default function Step3({ formData, setFormData, next, back }: Props) {
  const [error, setError] = useState("");

  const validateAndContinue = () => {
    if (
      formData.needsSpecialAssistance &&
      formData.specialAssistanceNote.trim().length < 5
    ) {
      setError("Describe tu requerimiento con al menos 5 caracteres.");
      return;
    }

    setError("");
    next();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-700 border-b pb-2">
        🧩 Paso 3: Servicios adicionales
      </h2>

      {/* Seguro de viaje */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">
          ¿Deseas agregar seguro de viaje?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              checked={formData.wantsInsurance}
              onChange={() =>
                setFormData({ ...formData, wantsInsurance: true })
              }
            />
            Sí
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              checked={!formData.wantsInsurance}
              onChange={() =>
                setFormData({ ...formData, wantsInsurance: false })
              }
            />
            No
          </label>
        </div>
      </div>

      {/* Asientos preferenciales */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">
          ¿Deseas seleccionar asientos preferenciales?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              checked={formData.wantsPreferentialSeat}
              onChange={() =>
                setFormData({ ...formData, wantsPreferentialSeat: true })
              }
            />
            Sí
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              checked={!formData.wantsPreferentialSeat}
              onChange={() =>
                setFormData({ ...formData, wantsPreferentialSeat: false })
              }
            />
            No
          </label>
        </div>
      </div>

      {/* Asistencia especial */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">
          ¿Requiere asistencia especial?
        </label>
        <div className="flex gap-4 mb-3">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              checked={formData.needsSpecialAssistance}
              onChange={() =>
                setFormData({ ...formData, needsSpecialAssistance: true })
              }
            />
            Sí
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              checked={!formData.needsSpecialAssistance}
              onChange={() =>
                setFormData({
                  ...formData,
                  needsSpecialAssistance: false,
                  specialAssistanceNote: "",
                })
              }
            />
            No
          </label>
        </div>

        {formData.needsSpecialAssistance && (
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Describe brevemente tu requerimiento (mín. 5 caracteres)
            </label>
            <textarea
              maxLength={200}
              value={formData.specialAssistanceNote || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specialAssistanceNote: e.target.value,
                })
              }
              className={`w-full border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded px-3 py-2 text-black resize-none focus:ring-blue-500 focus:outline-none focus:ring-2`}
              rows={3}
            />

            {/* Mensaje de error final */}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

            {/* Feedback dinámico si aún no llega a 5 caracteres */}
            {formData.specialAssistanceNote.length > 0 &&
              formData.specialAssistanceNote.length < 5 && !error && (
                <p className="text-xs text-yellow-600 mt-1">
                  Escribe al menos 5 caracteres.
                </p>
              )}
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-between pt-6">
        <button
          onClick={back}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
        >
          ← Anterior
        </button>
        <button
          onClick={validateAndContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
