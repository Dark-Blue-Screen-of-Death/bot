import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [url, setUrl] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleExtract = async () => {
        setError('');
        setContent('');

        if (!url) {
            setError('Please enter a valid URL.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/extract', { url });
            setContent(response.data.content);
        } catch (err) {
            setError('Failed to extract content. Please check the URL or try again later.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Website Content Extractor</h1>
            <input
                type="text"
                placeholder="Enter website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ width: '80%', padding: '10px', margin: '10px 0' }}
            />
            <button onClick={handleExtract} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Extract Content
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {content && (
                <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
                    <h3>Extracted Content:</h3>
                    <p>{content}</p>
                </div>
            )}
        </div>
    );
}

export default App;
