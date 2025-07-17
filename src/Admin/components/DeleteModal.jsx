import React from 'react';

export default function DeleteModal({ isOpen, onClose, onConfirm, title }) {
  if (!isOpen) return null;

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
  <div className="w-full max-w-sm p-6 mx-4 transition-colors duration-300 bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">
      Confirm Deletion
    </h3>
    <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
      Are you sure you want to delete <strong>"{title}"</strong>? This action cannot be undone.
    </p>
    <div className="flex justify-end gap-2">
      <button
        onClick={onClose}
        className="px-4 py-2 text-gray-700 transition-colors duration-200 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 text-white transition-colors duration-200 bg-red-600 rounded-md hover:bg-red-700"
      >
        Delete News
      </button>
    </div>
  </div>
</div>

  );
}