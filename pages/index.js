import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');


  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/search`, {
        params: { 
          query: query, 
          category: category, 
          minPrice: minPrice, 
          maxPrice: maxPrice 
        }
      });
      setResults(res.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  useEffect(() => {

  }, []);

  return (
    <>
      <h1>search app</h1>

      <h1>  Search area </h1>
      <input  type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..." />

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />

      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Min Price"
      />

      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max Price"
      />

      <button onClick={handleSearch}> search </button>
      <ul>
        {results.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
