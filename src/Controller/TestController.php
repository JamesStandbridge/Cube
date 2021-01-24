<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

use App\Entity\User;
use App\Entity\Address;

class TestController extends AbstractController
{
    /**
     * @Route("/create-users", name="create_user")
     */
    public function createSuperAdmin() {
        $entityManager = $this->getDoctrine()->getManager();
        $address1 = new Address();
        $address1 
            ->setCity('Montrouge')
            ->setStreet('8 jules vernes')
            ->setCp('92100');

        $user1 = new User();
        $user1
            ->setPlainPassword('root')
            ->setEmail('superadmin@gmail.com')
            ->setUsername('superadmin@gmail.com')
            ->setLastname('superadmin')
            ->setFirstname('superadmin')
            ->setAddress($address1)
            ->setEnabled(true)
            ->addRole("ROLE_SUPER_ADMIN");

        $entityManager->persist($address1);
        $entityManager->persist($user1);

        $address2 = new Address();
        $address2
            ->setCity('Aix-en-Provence')
            ->setStreet('15 rue pavillon')
            ->setCp('13100');

        $user2 = new User();
        $user2
            ->setPlainPassword('root')
            ->setEmail('admin@gmail.com')
            ->setUsername('admin@gmail.com')
            ->setLastname('admin')
            ->setFirstname('admin')
            ->setAddress($address2)
            ->setEnabled(true)
            ->addRole("ROLE_ADMIN");

        $entityManager->persist($address2);
        $entityManager->persist($user2);

        $address3 = new Address();
        $address3 
            ->setCity('Morainvilliers')
            ->setStreet('7 rue des epinettes')
            ->setCp('78630');

        $user3 = new User();
        $user3
            ->setPlainPassword('root')
            ->setEmail('mode@gmail.com')
            ->setUsername('mode@gmail.com')
            ->setLastname('mode')
            ->setFirstname('mode')
            ->setAddress($address3)
            ->setEnabled(true)
            ->addRole("ROLE_MODERATOR");

        $entityManager->persist($address3);
        $entityManager->persist($user3);

        $entityManager->flush();  

        return $this->json([
            'message' => 'success'
        ], 200);          
    }
}
