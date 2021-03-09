<?php

/**
 * author: JamesStandbridge
 * date: 09/03/2021
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use App\Repository\UserRepository;
use App\Repository\TypeOfRelationshipRepository;
use App\Repository\CitizenRelationshipRepository;

use App\Entity\CitizenRelationship;

class RelationController extends AbstractController
{
    /**
     * @Route("/api/user/search", name="api_search_user", methods={"GET"})
     * @return json(user[])
     */
    public function searchUser(Request $request, UserRepository $repo) 
    {
        $query = $request->query->get('q');

        $usersResult = $repo->search($query);
        $users = [];
        foreach($usersResult as $user) {
            $users[] = array(
                'id' => $user->getId(), 
                'text' => (string) $user
            );
        }

        return $this->json([
            'users' => $users
        ], 200);
    }

    /**
     * @Route("/api/citizen-relationships", name="api_create_citizen_relation", methods={"POST"})
     * @param  Request $request
     * @return CitizenRelation
     */
    public function createCitizenRelation(Request $request, UserRepository $userRepo, TypeOfRelationshipRepository $typeRepo) 
    {
        $content = json_decode($request->getContent(), true);
        $em = $this->getDoctrine()->getManager();
        $user = $userRepo->find($content['user_id']);
        $userSource = $this->getUser();

        $relationType = $typeRepo->find($content['type_id']);

        $relation = new CitizenRelationship();
        $relation
            ->setUserSource($userSource)
            ->setUserTarget($user)
            ->setType($relationType);

        $userSource->addRelationship($relation);
        $em->persist($relation);
        $em->persist($userSource); 
        $em->flush();

        return $this->json([
            'relation_id' => $relation->getId()
        ], 200);
    }   

    /**
     * @Route("/api/citizen-relationships", name="api_get_citizen_relations")
     * @param  CitizenRelationshipRepository $repo 
     * @return json(CitizenRelationship[])
     */
    public function getCitizenRelations(CitizenRelationshipRepository $repo)
    {

        $relations = $this->getUser()->getRelationships();

        return $this->json([
            'relations' => $relations
        ], 200, [], ['groups'=>'app:read:relations']);
    }
}
