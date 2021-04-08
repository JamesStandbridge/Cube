<?php

namespace App\Repository;

use App\Entity\Resource;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Resource|null find($id, $lockMode = null, $lockVersion = null)
 * @method Resource|null findOneBy(array $criteria, array $orderBy = null)
 * @method Resource[]    findAll()
 * @method Resource[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResourceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Resource::class);
    }

    public function search(array $filters, int $limit = 10) {
        $whereAdded = false;
        $conn = $this->getEntityManager()->getConnection();
        $params = [];
        $query = "SELECT R.id, R.title, R.created_at, R.category_id, R.number_views, COUNT(*) OVER() FROM resource as R JOIN resource_type_of_relationship as RR ON RR.resource_id = R.id WHERE (R.is_validated = true OR R.is_validated IS NULL)";


        if(count($filters['relations']) > 0) {
            $subQuery = "";
            foreach($filters['relations'] as $key => $relation) {
                if(array_key_first($filters['relations']) === $key) {
                    $subQuery .= " (RR.type_of_relationship_id = :relation".$key;
                } else {
                    $subQuery .= " OR RR.type_of_relationship_id = :relation".$key;
                }   
                $params["relation".$key] = $relation['id'];
            }
            $query .= " AND";
            $query .= $subQuery.")";
        }

        if(count($filters['categories']) > 0) {
            $subQuery = "";
            foreach($filters['categories'] as $key => $category) {
                if(array_key_first($filters['categories']) === $key) {
                    $subQuery .= " (R.category_id = :category".$key;
                } else {
                    $subQuery .= " OR R.category_id = :category".$key;
                }   
                $params["category".$key] = $category['id'];
            }
            $query .= " AND";
            $query .= $subQuery.")";
        }

        if(strlen($filters['title']) > 0) {
            $query .= " AND";
            $query .= " (LOWER(R.title) like LOWER(:query))";
            $params["query"] = "%".$filters['title']."%";     
        }

        if(strlen($filters['dateFrom']) > 0) {
            $query .= " AND";
            $query .= " (R.created_at >= :dateFrom)";
            $params["dateFrom"] = $filters['dateFrom'];     
        }

        if(strlen($filters['dateTo']) > 0) {
            $query .= " AND";
            $query .= " (R.created_at <= :dateTo)";
            $params["dateTo"] = $filters['dateTo'];     
        }
        $query .= " GROUP BY R.id";

        if(count($filters['relations']) > 0) {
            $query .= " HAVING count(R.id) = ".count($filters['relations']);
        }
        $query .= " ORDER BY R.created_at DESC";
        $query .= " LIMIT ".$limit." OFFSET ".$filters['page'];
        $stmt = $conn->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }
    
    public function findAllNew(): array
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.isValidated IS NULL')
            ->getQuery()
            ->getResult()
        ;
    }

    public function getResourcesByDate(int $user_id, $from = null, $to = null): array
    {
        $query = $this->createQueryBuilder('r')
            ->andWhere('r.author = :user_id')
            ->setParameter('user_id', $user_id);

        if($from != null) {
            $query = $query 
                ->andWhere('r.createdAt >= :from')
                ->setParameter('from', $from);   
        }

        if($to != null) {
            $query = $query 
                ->andWhere('r.createdAt <= :to')
                ->setParameter('to', $to);
        }

        $query = $query
            ->getQuery()
            ->getResult();

        return $query;
    }
}
