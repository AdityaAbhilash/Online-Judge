import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/submissions.css';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [selectedCode, setSelectedCode] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const submissionsPerPage = 10;

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const { data } = await axios.get(import.meta.env.VITE_GET_SUBMISSIONS);

                // Ensure that createdAt is a Date object for sorting
                const sortedSubmissions = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                
                setSubmissions(sortedSubmissions);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            }
        };

        fetchSubmissions();
    }, []);

    const handleCodeClick = (code) => {
        console.log('Code clicked:', code); // Debugging line
        setSelectedCode(code);
    };

    const handleCloseModal = () => {
        setSelectedCode(null);
    };

    // Pagination logic
    const indexOfLastSubmission = currentPage * submissionsPerPage;
    const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
    const currentSubmissions = submissions.slice(indexOfFirstSubmission, indexOfLastSubmission);

    const totalPages = Math.ceil(submissions.length / submissionsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="submissions-page">
                <h1 className='page-heading'>Submissions</h1>
                <table className="submissions-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Problem</th>
                            <th>Language</th>
                            <th>Verdict</th>
                            <th>Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSubmissions.map((submission) => (
                            <tr key={submission._id}>
                                <td>{submission.username}</td>
                                <td>{submission.problemName}</td>
                                <td>{submission.language}</td>
                                <td>{submission.verdict}</td>
                                <td>
                                    <button className="view-code-btn" onClick={() => handleCodeClick(submission.code)}>View Code</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination-controls">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>&lt; Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next &gt;</button>
                </div>
            </div>

            {selectedCode && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <pre className='CODE'>{selectedCode}</pre>
                    </div>
                </div>
            )}
        </>
    );
};

export default Submissions;
