import React from 'react';

import Layout from '../../views/Layout'
import DisplayCategory from '../../components/display/DisplayCategory'
import CategoryForm from '../../components/form/app/CategoryForm'
import CustomModal from '../../components/Modal'


const VisualiseCategory = (props) => {
  return (
    <Layout>
    	<DisplayCategory />
        <CustomModal
            btnTitle={"Ajouter une nouvelle catégorie"}
        >
            <CategoryForm/>
        </CustomModal>
         
    </Layout>
  )
}

export default VisualiseCategory;