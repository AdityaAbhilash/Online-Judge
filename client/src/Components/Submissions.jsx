import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/submissions.css';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [selectedCode, setSelectedCode] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const { data } = await axios.get(import.meta.env.VITE_GET_SUBMISSIONS);
                setSubmissions(data);
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
                        {submissions.map((submission) => (
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
