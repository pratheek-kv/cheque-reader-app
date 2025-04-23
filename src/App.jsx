import React, { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      // const response = await fetch("https://your-api.com/extract-cheque-info", {
      //   method: "POST",
      //   body: formData,
      // });

      // const data = await response.json();
      const data = {name: "Pratheek", accountNumber : "1234"}
      setResult(data);
    } catch (err) {
      console.error("Upload failed", err);
      setResult({ error: "Failed to fetch data from API." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Cancelled Cheque Reader</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="text-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px]
                   file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50
                 hover:file:text-blue-700 mb-10"
      />

    {previewUrl && (
        <img src={previewUrl} alt="Preview" className="w-64 h-auto mb-4 rounded shadow" />
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Extract Info"}
      </button>

      {result && (
        <div className="mt-6 bg-white p-4 rounded shadow w-full max-w-sm">
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <>
              <p><strong>Name:</strong> {result.name}</p>
              <p><strong>Account Number:</strong> {result.accountNumber}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
