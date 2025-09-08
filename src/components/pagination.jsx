"use client";

import { useRouter } from "next/navigation";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export const Pagination = ({ currentPage = 1 }) => {
  const router = useRouter();

  const goToPage = (page) => {
    router.push(`/?page=${page}`);
  };

  return (
    <div className="flex items-center justify-center gap-6 pb-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
          ${
            currentPage <= 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
      >
        <FiArrowLeft />
        Anterior
      </button>

      <span className="font-semibold">Página {currentPage}</span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Siguiente
        <FiArrowRight />
      </button>
    </div>
  );
};
