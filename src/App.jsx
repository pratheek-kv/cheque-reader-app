import React, { useState } from "react";
import InputField from "./components/InputField";

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({name: "", Bank_Name: "", Account_Number: "", IFSC_Code: "", Branch: "" });
  const [hasError, setHasError] = useState(false);

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
      const response = await fetch("http://localhost:5678/webhook-test/ed5a3be4-53f1-4bea-85ea-9f8c03b95943", {
        method: "POST",
        body: formData,
      });
      debugger;
      // const data = await response.json();
      const data = { name: "Pratheek", accountNumber: "1234" }
      setResult(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setValue((prev) => ({
      ...prev,
      [e.target.name]: val,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 w-full">
      <h1 className="text-3xl font-bold mb-6">Cheque Reader Sample</h1>
      <div className="mb-4 w-1/2">
        <div className="mt-6 bg-white p-4 rounded shadow w-full">
          <div className="mt-1">
            <InputField
              label="Name"
              name="name"
              value={value.name}
              onChange={handleChange}
              error={( !(result) || (value.name === result.name) )? false : true}
              errorMessage= {`Provided Name doesnot match the name in the cheque. Name in cheque is: ${result? result.name : ""} `}
            />
          </div>

          <div className="mt-1">
            <InputField
              label="Bank Name"
              name="Bank_Name"
              value={value.Bank_Name}
              onChange={handleChange}
              error={( !(result) || (value.Bank_Name === result.Bank_Name) )? false : true}
              errorMessage= {`Bank Name Entered does not match. Bank name in cheque is : ${result? result.Bank_Name : ""}`}
            />
          </div>

          <div className="mt-1">
            <InputField
              label="Account Number"
              name="Account_Number"
              value={value.Account_Number}
              onChange={handleChange}
              error={( !(result) || (value.Account_Number === result.Account_Number) )? false : true}
              errorMessage={`Account Number does not match. Account Number in cheque is : ${result? result.Account_Number : ""}`}
            />
          </div>

          <div className="mt-1">
            <InputField
              label="IFSC Code"
              name="IFSC_Code"
              value={value.IFSC_Code}
              onChange={handleChange}
              error={( !(result) || (value.IFSC_Code === result.IFSC_Code) )? false : true}
              errorMessage="IFSC does not match"
            />
          </div>


          <div className="mt-1">
            <InputField
              label="Branch"
              name="Branch"
              value={value.Branch}
              onChange={handleChange}
              error={false}
              errorMessage=""
            />
          </div>

          <p><strong>Cancelled cheque :</strong> {result?.Cancelled_cheque ?? false}</p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px]
                     file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50"
        />

        <button onClick={handleSubmit} disabled={loading}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 disabled:opacity-50" >
          {loading ? "Processing..." : "Submit"}
        </button>

      </div>

      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="w-64 h-auto mb-4 rounded shadow" />
      )}

    </div>
  );
}

export default App;
