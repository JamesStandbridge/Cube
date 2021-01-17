<?php

namespace App\Repository;

use App\Entity\LastName;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method LastName|null find($id, $lockMode = null, $lockVersion = null)
 * @method LastName|null findOneBy(array $criteria, array $orderBy = null)
 * @method LastName[]    findAll()
 * @method LastName[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LastNameRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LastName::class);
    }

    // /**
    //  * @return LastName[] Returns an array of LastName objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?LastName
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
