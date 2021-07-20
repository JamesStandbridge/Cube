<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\ResourceTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ResourceTypeRepository::class)
 * @ApiResource( normalizationContext={"groups"="type:read"})
 */
class ResourceType
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"resource:read", "type:read"})
     * @groups("read:resources")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"resource:read", "type:read"})
     * @groups("read:resources")
     */
    private $label;

    /**
     * @ORM\OneToMany(targetEntity=Resource::class, mappedBy="type")
     */
    private $resources;

    /**
     * @ORM\ManyToMany(targetEntity=ResourceAttribute::class)
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"type:read"})
     */
    private $attributes;

    public function __construct()
    {
        $this->resources = new ArrayCollection();
        $this->attributes = new ArrayCollection();
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
            $resource->setType($this);
        }

        return $this;
    }

    public function removeResource(Resource $resource): self
    {
        if ($this->resources->removeElement($resource)) {
            // set the owning side to null (unless already changed)
            if ($resource->getType() === $this) {
                $resource->setType(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ResourceAttribute[]
     */
    public function getAttributes(): Collection
    {
        return $this->attributes;
    }

    public function addAttribute(ResourceAttribute $attribute): self
    {
        if (!$this->attributes->contains($attribute)) {
            $this->attributes[] = $attribute;
        }

        return $this;
    }

    public function removeAttribute(ResourceAttribute $attribute): self
    {
        $this->attributes->removeElement($attribute);

        return $this;
    }
}
