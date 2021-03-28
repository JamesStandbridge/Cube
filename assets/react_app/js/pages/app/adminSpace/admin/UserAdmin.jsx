import React, { useState, useEffect } from 'react';

import Layout from '../../../../views/Layout'

import UserList from '../../../../components/display/Administration/Utilisateurs'

const UserAdmin = (props) => {
  

  return (
    <Layout>
    	<UserList />    
    </Layout>
  )
}

export default UserAdmin;