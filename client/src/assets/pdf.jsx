import '../App.css';
import { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import '../App.css'
function Pdf() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    country: '',
  });
  const [loading, setLoading] = useState(null);
  const [downloadBtn, setdownloadBtn] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [file, setfile] = useState(null);
  //const [status, setstatus] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true); // Set loading state to true

    axios
      .post('http://localhost:3000/auth/createpdf', formData, {
        responseType: 'blob' // Set the response type to 'blob' to receive binary data
      })
      .then((response) => {
        const file = new Blob([response.data], { type: 'application/pdf' });
        alert(file)

            setPdfFile(file);
            setLoading(false); 
            setdownloadBtn(true)
        
         
      })
      .catch((error) => {
        console.error(error); // Handle any error that occurred
        alert(error)
         setLoading(false); // Set loading state to false if there's an error
        // setdownloadBtn(true)
      });
  };
  const logout = () => {
    window.open("http://localhost:3000/auth/logout", "_self");
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
  
  const handleUpload = (e) => {
    e.preventDefault(); // Prevent default form submission
  
    const formData = new FormData();
    formData.append('pdfFile', file);
  
    axios
      .post('http://localhost:3000/auth/uploadpdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data.status);
        response.data.status == 200 ? alert('File successfully saved') : 
        (response.data.status == 300 ? alert('File already exists') : 
        (response.data.status == 400 ? alert('Pdf File is not provided') : alert('Failed to upload PDF file')))
        //setstatus(response.data.status)
      })
      .catch((error) => {
        console.error(error);
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
        <button className='button' type="submit" disabled={loading}>
          {loading ? 'Generating PDF...' : 'Generate PDF'}
        </button>
      </form>
      {loading?<div className="progress-bar">Wait!!.. PDF generation in Progress</div>:''}
      
      {downloadBtn ? (
        <div className='afterDiv'><label className='comment-label'>PDF has been Generated</label>
        <button className="download-button" onClick={handleDownload}>
          Download PDF
        </button>
        </div>
      ):''}
      <div>
        <div className="upload">
        <form onSubmit={(e) => handleUpload(e)}>
          <h1>Upload a file</h1>
          <input type="file" accept="application/pdf" onChange={(e) => setfile(e.target.files[0])} />
          <button type="submit">Upload</button>
        </form>
        </div>
      </div>
      <button className="logoutbutton" onClick={logout}>
            Logout
      </button>
    </div>
  );
}

export default Pdf;
