"use client";

import { FormData } from "@/types/FormData";
import Swal from "sweetalert2";

type Props = {
  formData: FormData;
  back: () => void;
};

export default function Step4({ formData, back }: Props) {
  const handleConfirm = () => {
    Swal.fire({
      title: "¡Reserva Confirmada!",
      text: "Tu reserva ha sido confirmada exitosamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
      background: "#462255",
      color: "#fff",
      customClass: {
        popup: "rounded-xl shadow-xl",
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] border-b pb-2">
        📋 Paso 4: Resumen y Confirmación
      </h2>

      {/* Información del viaje */}
      <div className="space-y-2">
        <p className="text-gray-700">
          <strong>Destino:</strong> {formData.destination}
        </p>
        <p className="text-gray-700">
          <strong>Fecha de salida:</strong> {formData.departureDate}
        </p>
        <p className="text-gray-700">
          <strong>Fecha de regreso:</strong> {formData.returnDate}
        </p>
        <p className="text-gray-700">
          <strong>Clase de vuelo:</strong> {formData.flightClass}
        </p>
      </div>

      {/* Viajeros */}
      <div>
        <p className="font-semibold text-gray-700">
          Viajeros ({formData.numberOfTravelers})
        </p>
        <ul className="list-disc ml-6 text-gray-700">
          {formData.travelers.map((t, i) => (
            <li key={i}>
              <strong>Nombre </strong>
              {t.fullName} - <strong>Nacimiento </strong> {t.birthDate} -{" "}
              <strong>Doc ID </strong> {t.documentType}
              {": "}
              {t.documentNumber}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        {/* Mascotas */}
        {formData.withPets && (
          <p className="text-gray-700">
            <strong>Mascotas:</strong> {formData.numberOfPets} (100$ c/u)
          </p>
        )}

        {/* Maletas extra */}
        {formData.withExtraBags && (
          <p className="text-gray-700">
            <strong>Maletas extra:</strong> {formData.numberOfBags} (50$ c/u)
          </p>
        )}
      </div>

      {/* Servicios adicionales */}
      <div className="space-y-1">
        <p className="text-gray-700">
          <strong>Seguro de viaje:</strong>{" "}
          {formData.wantsInsurance ? "Sí" : "No"}
        </p>
        <p className="text-gray-700">
          <strong>Asientos preferenciales:</strong>{" "}
          {formData.wantsPreferentialSeat ? "Sí" : "No"}
        </p>
        <p className="text-gray-700">
          <strong>Asistencia especial:</strong>{" "}
          {formData.needsSpecialAssistance ? "Sí" : "No"}
        </p>
        {formData.needsSpecialAssistance && formData.specialAssistanceNote && (
          <p className="text-sm italic text-gray-700">
            Nota: {formData.specialAssistanceNote}
          </p>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-between pt-6">
        <button
          onClick={back}
          className="bg-[var(--color-quaternary)] hover:bg-[var(--color-quaternary-dark)] font-semibold text-gray-800 px-6 py-2 rounded-lg"
        >
          ← Anterior
        </button>
        <button
          onClick={handleConfirm}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
}
