<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ResourceContentValueRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ResourceContentValueRepository::class)
 * @ApiResource
 */
class ResourceContentValue
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @Groups({"resource:read", "resource:create"})
     */
    private $stringValue;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"resource:read", "resource:create"})
     */
    private $textValue;

    /**
     * @ORM\ManyToOne(targetEntity=Resource::class, inversedBy="content")
     * @ORM\JoinColumn(nullable=false)
     */
    private $resource;

    /**
     * @ORM\ManyToOne(targetEntity=ResourceAttribute::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $attribute;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStringValue(): ?string
    {
        return $this->stringValue;
    }

    public function setStringValue(string $stringValue): self
    {
        $this->stringValue = $stringValue;

        return $this;
    }

    public function getTextValue(): ?string
    {
        return $this->textValue;
    }

    public function setTextValue(?string $textValue): self
    {
        $this->textValue = $textValue;

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

    public function getAttribute(): ?ResourceAttribute
    {
        return $this->attribute;
    }

    public function setAttribute(?ResourceAttribute $attribute): self
    {
        $this->attribute = $attribute;

        return $this;
    }
}
