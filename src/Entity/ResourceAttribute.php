<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ResourceAttributeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ResourceAttributeRepository::class)
 * @ApiResource
 */
class ResourceAttribute
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"resource:read", "resource:create"})
     */
    private $label;

    /**
     * @ORM\ManyToOne(targetEntity=ResourceType::class, inversedBy="attribute")
     * @Groups({"resource:read", "resource:create"})
     */
    private $resourceType;

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

    public function getResourceType(): ?ResourceType
    {
        return $this->resourceType;
    }

    public function setResourceType(?ResourceType $resourceType): self
    {
        $this->resourceType = $resourceType;

        return $this;
    }
}
