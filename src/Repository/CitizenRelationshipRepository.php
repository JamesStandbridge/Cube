<?php

namespace App\Repository;

use App\Entity\CitizenRelationship;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CitizenRelationship|null find($id, $lockMode = null, $lockVersion = null)
 * @method CitizenRelationship|null findOneBy(array $criteria, array $orderBy = null)
 * @method CitizenRelationship[]    findAll()
 * @method CitizenRelationship[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CitizenRelationshipRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CitizenRelationship::class);
    }

    /**
     * Permet de récuperer la liste des relations d'un utilisateur
     * @param  int    $user_id
     * @return CitizenRelationShip[]
     */
    public function findByUser(int $user_id) : array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.UserSource = :user_id')
            ->setParameter('user_id', $user_id)
            ->orderBy('c.type', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }
    
    /**
     * Permet de trouver une relation selon son ID et l'ID de l'utilisateur source
     * @param  int    $user_id     
     * @param  int    $relation_id 
     * @return ?CitizenRelationShip
     */
    public function findRelationByIds(int $user_id, int $relation_id) : ?CitizenRelationship
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.UserSource = :user_id')
            ->andWhere('c.id = :relation_id')
            ->setParameter('user_id', $user_id)
            ->setParameter('relation_id', $relation_id)
            ->getQuery()
            ->getOneOrNullResult()
        ;        
    }
}
