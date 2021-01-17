<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ResourceUserStateRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ResourceUserStateRepository::class)
 * @ApiResource
 */
class ResourceUserState
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isFavorite;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isExploited;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isAside;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsFavorite(): ?bool
    {
        return $this->isFavorite;
    }

    public function setIsFavorite(bool $isFavorite): self
    {
        $this->isFavorite = $isFavorite;

        return $this;
    }

    public function getIsExploited(): ?bool
    {
        return $this->isExploited;
    }

    public function setIsExploited(bool $isExploited): self
    {
        $this->isExploited = $isExploited;

        return $this;
    }

    public function getIsAside(): ?bool
    {
        return $this->isAside;
    }

    public function setIsAside(bool $isAside): self
    {
        $this->isAside = $isAside;

        return $this;
    }
}
