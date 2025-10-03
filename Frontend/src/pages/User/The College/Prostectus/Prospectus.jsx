import React, { useState, useEffect } from 'react';

const Prospectus = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load PDF from assets
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        const pdfModule = await import('../../../../assets/pp.pdf');
        setPdfUrl(pdfModule.default);
        setError(null);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load prospectus PDF');
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    setPageNumber(prevPage => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPage => Math.min(prevPage + 1, numPages));
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Govt-Zamindar-College-Prospectus.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading prospectus...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Prospectus</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">
            College Prospectus
          </h1>
          <p className="text-gray-600 text-lg">
            Download or view the complete prospectus for Government Zamindar College, Gujrat
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4"></div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={downloadPdf}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Prospectus (PDF)
          </button>
        </div>

        {/* PDF Viewer Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Prospectus Preview</h2>
            <div className="text-sm text-gray-600">
              Page {pageNumber} of {numPages || '--'}
            </div>
          </div>

          {/* PDF Navigation Controls */}
          <div className="flex justify-center items-center space-x-4 mb-6">
            <button
              onClick={goToPreviousPage}
              disabled={pageNumber <= 1}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <span className="text-gray-700 font-medium">
              Page {pageNumber} of {numPages || '--'}
            </span>
            
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* PDF Display */}
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[600px] flex items-center justify-center">
            {pdfUrl ? (
              <iframe
                src={`${pdfUrl}#page=${pageNumber}`}
                className="w-full h-[600px] border-none"
                title="College Prospectus"
              />
            ) : (
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">📄</div>
                <p>Prospectus preview not available</p>
              </div>
            )}
          </div>

          {/* Page Progress */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Reading progress</span>
              <span className="text-sm font-medium text-indigo-600">
                {Math.round((pageNumber / (numPages || 1)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(pageNumber / (numPages || 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">About Our Prospectus</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-indigo-700 mb-2">What's Included:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Admission requirements and procedures</li>
                <li>Academic programs and courses</li>
                <li>Fee structure and payment details</li>
                <li>Scholarship opportunities</li>
                <li>Campus facilities and resources</li>
                <li>Faculty information</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-700 mb-2">Need Help?</h4>
              <p className="text-gray-700 mb-4">
                If you have trouble viewing or downloading the prospectus, please contact our admission office.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-medium">Admission Office Contact:</p>
                <p className="text-blue-700">Phone: (053) 123-4567</p>
                <p className="text-blue-700">Email: admissions@zamindarcollege.edu.pk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prospectus;