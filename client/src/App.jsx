import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    country: ''
  });
  const [loading, setLoading] = useState(null);
  const [downloadBtn, setdownloadBtn] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true); // Set loading state to true

    axios
      .post('http://localhost:3000/api/createpdf', formData, {
        responseType: 'blob' // Set the response type to 'blob' to receive binary data
      })
      .then((response) => {
        const file = new Blob([response.data], { type: 'application/pdf' });
        setPdfFile(file); // Store the PDF file in state

        //saveAs(file, 'document.pdf'); // Trigger the file download
        setLoading(false); // Set loading state to false once the PDF is received
        setdownloadBtn(true) 
      })
      .catch((error) => {
        console.error(error); // Handle any error that occurred
        setLoading(false); // Set loading state to false if there's an error
        setdownloadBtn(true)
      });
  };
  const handleDownload = () => {
    
      saveAs(pdfFile, 'document.pdf'); // Trigger the file download
    
  };

  const handleChange = (e) => {
    setdownloadBtn(false)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
        <label >Application Status: </label>
          <select name="status" 
            value={formData.status}
            onChange={handleChange} >
            <option value="Approved">Approved</option>
            <option value="Not Approved">Not Approved</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating PDF...' : 'Generate PDF'}
        </button>
      </form>
      {loading?<div className="progress-bar">Wait!!.. PDF generation in Progress</div>:''}
      
      {downloadBtn ? (
        <><label>PDF has been Generated</label>
        <button className="download-button" onClick={handleDownload}>
          Download PDF
        </button>
        </>
      ):''}
    </div>
  );
}

export default App;
