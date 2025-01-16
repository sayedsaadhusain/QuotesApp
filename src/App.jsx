
  import React, { useState, useEffect } from 'react';
  import './App.css';
  
  const App = () => {
      const [quote, setQuote] = useState('Loading...');
      const [author, setAuthor] = useState('-');
      const [error, setError] = useState('');
  
      const fetchDailyQuote = async () => {
          const apiKey = 'Wg9KXWL4VwimvMdeS9Cy3g==Fdy84pW2bdsMgNXx'; // Replace with your API key
          const apiUrl = 'https://api.api-ninjas.com/v1/quotes';
  
          try {
              const response = await fetch(apiUrl, {
                  method: 'GET',
                  headers: {
                      'X-Api-Key': apiKey,
                  },
              });
  
              if (!response.ok) {
                  console.error('Response Status:', response.status, response.statusText);
                  const errorText = await response.text();
                  throw new Error(`HTTP error! status: ${response.status}, Details: ${errorText}`);
              }
  
              const data = await response.json();
              setQuote(data[0].quote);
              setAuthor(data[0].author);
              setError('');
          } catch (error) {
              console.error('Error fetching the quote:', error);
              setQuote('Failed to load quote.');
              setAuthor('');
              setError(error.message);
          }
      };
  
      useEffect(() => {
          // Call the function on page load
          fetchDailyQuote();
      }, []);
  
      return (
          <div className="app">
              <nav className="nav">Daily Quotes</nav>
              <div className="hero">
                  <div className="content">
                      <h1>Quotes of the day</h1>
                      <h2 id="quote">{quote}</h2>
                      <h2 id="author">{author && `- ${author}`}</h2>
                  </div>
                  <button id="fetchQuoteButton" onClick={fetchDailyQuote}>Get A New Quote</button>
              </div>
          </div>
      );
  };
  
  export default App;
  