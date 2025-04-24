import React from 'react';

const InputField = ({ label, name, value, onChange, error, errorMessage }) => {
  return (
    <div className="flex flex-col space-y-1 mb-1">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type="text"
        name = {name}
        value={value}
        onChange={onChange}
        className={`border rounded px-3 py-2 text-sm outline-none transition-all
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}
        `}
      />
      {error && (
        <span className="text-xs text-red-600">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;
