import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, collectionsRes, latestRes, recentRes] = await Promise.all([
          axios.get('http://localhost:3000/api/v1/products/get/featured/4'),
          axios.get('http://localhost:3000/api/v1/collections'),
          axios.get('http://localhost:3000/api/v1/products?limit=8'),
          axios.get('http://localhost:3000/api/v1/products?sort=-dateCreated&limit=8')
        ]);

        setFeaturedProducts(featuredRes.data);
        setCollections(collectionsRes.data);
        setLatestProducts(latestRes.data);
        setRecentProducts(recentRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { featuredProducts, latestProducts, recentProducts, collections, loading, error };
}; 