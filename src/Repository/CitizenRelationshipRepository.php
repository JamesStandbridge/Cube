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


    public function findByUser(int $user_id)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.UserSource = :user_id')
            ->setParameter('user_id', $user_id)
            ->orderBy('c.type', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }
    
    public function findRelationByIds(int $user_id, int $relation_id)
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

    /*
    public function findOneBySomeField($value): ?CitizenRelationship
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
