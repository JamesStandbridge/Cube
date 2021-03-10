/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React from 'react';

import Layout from '../../../views/Layout'
import CardCatalogDisplay from "../../../components/display/front/cardCatalogDisplay";

const Home = (props) => {
  return (
    <Layout>
    	<h1>Accueil</h1>
        <CardCatalogDisplay/>
    </Layout>
  )
}

export default Home