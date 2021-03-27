<?php

namespace App\Repository;

use App\Entity\ResourceUserState;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ResourceUserState|null find($id, $lockMode = null, $lockVersion = null)
 * @method ResourceUserState|null findOneBy(array $criteria, array $orderBy = null)
 * @method ResourceUserState[]    findAll()
 * @method ResourceUserState[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResourceUserStateRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResourceUserState::class);
    }


    /**
     * Find an array of resource state by user id
     * @param  int    $userID 
     * @return ResourceUserState[]
     */
    public function findAllByUser(int $userID) : array
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.userEntity = :userID')
            ->setParameter('userID', $userID)
            ->getQuery()
            ->getResult()
        ;
    }
    

    /**
     * find a resource state by user and resourceid
     * @param  int    $resourceID 
     * @param  int    $userID    
     * @return ?ResourceUserState   
     */
    public function findByResourceID(int $resourceID, int $userID): ?ResourceUserState
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.resource = :resourceID')
            ->andWhere('r.userEntity = :userID')
            ->setParameter('resourceID', $resourceID)
            ->setParameter('userID', $userID)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    
}
