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

    // /**
    //  * @return CitizenRelationship[] Returns an array of CitizenRelationship objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

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
