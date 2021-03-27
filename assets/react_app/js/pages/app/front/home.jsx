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
        <CardCatalogDisplay/>
    </Layout>
  )
}

export default Home