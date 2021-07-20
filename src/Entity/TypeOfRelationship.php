<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TypeOfRelationshipRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TypeOfRelationshipRepository::class)
 * @ApiResource(
 *     collectionOperations={
 *         "get",
 *         "post"={"security"="is_granted('IS_AUTHENTICATED_FULLY')"}
 *     },
 *     itemOperations={
 *         "get",
 *         "get"={"security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"},
 *     }
 * )
 */
class TypeOfRelationship
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @groups("read:resources")
     * @groups("app:read:relations")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups("read:resources")
     * @groups("app:read:relations")
     */
    private $label;

    /**
     * @ORM\ManyToMany(targetEntity=Resource::class, mappedBy="typeofrelationship")
     */
    private $resources;

    public function __construct()
    {
        $this->resources = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    /**
     * @return Collection|Resource[]
     */
    public function getResources(): Collection
    {
        return $this->resources;
    }

    public function addResource(Resource $resource): self
    {
        if (!$this->resources->contains($resource)) {
            $this->resources[] = $resource;
            $resource->addTypeofrelationship($this);
        }

        return $this;
    }

    public function removeResource(Resource $resource): self
    {
        if ($this->resources->removeElement($resource)) {
            $resource->removeTypeofrelationship($this);
        }

        return $this;
    }
}
