<?php

namespace App\Repository;

use App\Entity\CitizenRelationShip;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CitizenRelationShip|null find($id, $lockMode = null, $lockVersion = null)
 * @method CitizenRelationShip|null findOneBy(array $criteria, array $orderBy = null)
 * @method CitizenRelationShip[]    findAll()
 * @method CitizenRelationShip[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CitizenRelationShipRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CitizenRelationShip::class);
    }

    // /**
    //  * @return CitizenRelationShip[] Returns an array of CitizenRelationShip objects
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
    public function findOneBySomeField($value): ?CitizenRelationShip
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
