import React from "react";

interface PaginationProps {
  totalUsers: number;
  usersPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalUsers,
  usersPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="flex justify-center mt-6">
      <ul className="flex gap-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-white font-semibold transition ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Prev
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              onClick={() => onPageChange(i + 1)}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md text-white font-semibold transition ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
