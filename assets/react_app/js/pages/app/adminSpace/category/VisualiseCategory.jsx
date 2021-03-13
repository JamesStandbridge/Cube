import React from 'react';

import Layout from '../../../../views/Layout'
import DisplayCategory from '../../../../components/display/DisplayCategory'
import CategoryForm from '../../../../components/form/app/CategoryForm'
import CustomModal from '../../../../components/modals/Modal'



const VisualiseCategory = (props) => {
  return (
    <Layout>
    	<DisplayCategory />
        <CustomModal
            btnTitle={"Ajouter une nouvelle catégorie"}
        >
          
          <div
              style={{
                  position: 'absolute', 
                  left: '50%', 
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
              }}
          >

          <CategoryForm />
          </div>        
          
        </CustomModal>        
    </Layout>
  )
}

export default VisualiseCategory;


