<?php

namespace App\Repository;

use App\Entity\TypeOfRelationship;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TypeOfRelationship|null find($id, $lockMode = null, $lockVersion = null)
 * @method TypeOfRelationship|null findOneBy(array $criteria, array $orderBy = null)
 * @method TypeOfRelationship[]    findAll()
 * @method TypeOfRelationship[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TypeOfRelationshipRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TypeOfRelationship::class);
    }

    // /**
    //  * @return TypeOfRelationship[] Returns an array of TypeOfRelationship objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TypeOfRelationship
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
