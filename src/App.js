import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NumberManagement = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const urls = [
        'http://104.211.219.98/numbers/primes',
        'http://104.211.219.98/numbers/fibo',
        'http://104.211.219.98/numbers/odd'
      ];

      const responses = await Promise.all(
        urls.map(url => axios.get(url))
      );

      const mergedNumbers = responses.reduce((acc, response) => {
        if (response.status === 200) {
          const { numbers } = response.data;
          return [...acc, ...numbers];
        }
        return acc;
      }, []);

      const uniqueNumbers = [...new Set(mergedNumbers)];
      setNumbers(uniqueNumbers.sort());
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Number Management</h1>
      <ul>
        {numbers.map(number => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumberManagement;
