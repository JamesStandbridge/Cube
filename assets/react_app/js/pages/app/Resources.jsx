import React from 'react';
import Layout from "../../views/Layout";
import CardCatalogDisplay from "../../components/display/front/cardCatalogDisplay";

const Catalog = (props) => {
  return (
    <div>
        <Layout>
            <CardCatalogDisplay>
    	        <h1>Catalogue</h1>
            </CardCatalogDisplay>
        </Layout>
    </div>
  )
}

export default Catalog;