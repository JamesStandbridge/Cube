        <?php
        
        
        
        
        
        
        
        
        $shop = $em->getRepository(Shop::class)->find($idshop);

        $category = new ProductCategory();
    
        $category->setShop($shop);
        $category->setParent($em->getRepository(ProductCategory::class)->find(4));
        $category->setName("couleur");
        $em->persist($category);
        $em->flush();
        
        
        
        
        
        
        
        
        
        ?>