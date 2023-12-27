import React, { useEffect, useState } from 'react';
import { parse } from 'query-string';

import Breadcrumbs from '../components/Breadcrumbs';
import Layout from '../components/Layout/Layout';
import Container from '../components/Container/Container';
import ProductCardGrid from '../components/ProductCardGrid';

import { generateMockProductData } from '../helpers/mock';

import * as styles from './search.module.css';

const SearchPage = (props) => {
  const [searchResulets,setSearchResults]= useState([]);
  const params = parse(props.location.search);
  const searchQuery = params.q ? params.q : '';

  
  const sampleData = generateMockProductData(3, 'woman');


  useEffect(()=>{
    const fetchData= async ()=>{
      try{
        const response = await fetch ('fastapi后端地址')
        const data = await response.json();
        setSearchResults(data.products);
      }catch (error){
        console.error('Error fetching search results:',error);
      }
    };
    fetchData();
  
  },[searchQuery]);


  
  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Home' },
              { label: `Search results for '${searchQuery}'` },
            ]}
          />
          <div className={styles.searchLabels}>
            <h4>Search results for '{searchQuery}'</h4>
            <span>3 results</span>
          </div>
          <ProductCardGrid
            showSlider={false}
            height={580}
            columns={3}
            data={sampleData}
          />
        </Container>
      </div>
    </Layout>
  );
};

export default SearchPage;

