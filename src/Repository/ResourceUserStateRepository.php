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

    // /**
    //  * @return ResourceUserState[] Returns an array of ResourceUserState objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ResourceUserState
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
