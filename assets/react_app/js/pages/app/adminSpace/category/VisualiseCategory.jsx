import React, { useState, useEffect } from 'react';

import Layout from '../../../../views/Layout'
import DisplayCategory from '../../../../components/display/DisplayCategory'
import CategoryForm from '../../../../components/form/app/CategoryForm'
import CustomModal from '../../../../components/modals/Modal'


const VisualiseCategory = (props) => {
  const [refresh, setRefresh] = useState(0)
  

  return (
    <Layout>
    	<DisplayCategory update={refresh}/>
        <CustomModal
            btnTitle={"Ajouter une nouvelle catégorie"}
        >
          <CategoryForm refresh={() => setRefresh(refresh+1)} />        
        </CustomModal>        
    </Layout>
  )
}

export default VisualiseCategory;