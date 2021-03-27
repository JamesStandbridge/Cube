<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ResourceUserStateRepository;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Serializer\Annotation\Groups;

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
     * @groups("read:resource_state")
     * @groups("read:resource_states")
     */
    private $id;

    /**
     * @ORM\Column(type="boolean")
     * @groups("read:resource_state")
     * @groups("read:resource_states")
     */
    private $isFavorite;

    /**
     * @ORM\Column(type="boolean")
     * @groups("read:resource_state")
     * @groups("read:resource_states")
     */
    private $isExploited;

    /**
     * @ORM\Column(type="boolean")
     * @groups("read:resource_state")
     * @groups("read:resource_states")
     */
    private $isAside;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $userEntity;

    /**
     * @ORM\ManyToOne(targetEntity=Resource::class)
     * @ORM\JoinColumn(nullable=false)
     * @groups("read:resource_state")
     * @groups("read:resource_states")
     */
    private $resource;

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

    public function getUserEntity(): ?User
    {
        return $this->userEntity;
    }

    public function setUserEntity(?User $userEntity): self
    {
        $this->userEntity = $userEntity;

        return $this;
    }

    public function getResource(): ?Resource
    {
        return $this->resource;
    }

    public function setResource(?Resource $resource): self
    {
        $this->resource = $resource;

        return $this;
    }
}
