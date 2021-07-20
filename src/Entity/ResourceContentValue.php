<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\ResourceContentValueRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ResourceContentValueRepository::class)
 * @ApiResource(
 * )
 */
class ResourceContentValue
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"resource:read", "contents:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @Groups({"resource:read", "resource:create", "contents:read"})
     */
    private $stringValue;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"resource:read", "resource:create", "contents:read"})
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
     * @Groups({"resource:create", "contents:read", "resource:read"})
     */
    private $attribute;

    /**
     * @var MediaObject|null
     *
     * @ORM\OneToOne(targetEntity=MediaObject::class, mappedBy="resourceContentValue", cascade={"persist", "remove"})
     * @Groups({"resource:read", "contents:read"})
     * @ApiProperty(iri="http://localhost:8002/mediaObject")
     */
    private $mediaObject;

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

    public function getMediaObject(): ?MediaObject
    {
        return $this->mediaObject;
    }

    public function setMediaObject(?MediaObject $mediaObject): self
    {
        // unset the owning side of the relation if necessary
        if ($mediaObject === null && $this->mediaObject !== null) {
            $this->mediaObject->setResourceContentValue(null);
        }

        // set the owning side of the relation if necessary
        if ($mediaObject !== null && $mediaObject->getResourceContentValue() !== $this) {
            $mediaObject->setResourceContentValue($this);
        }

        $this->mediaObject = $mediaObject;

        return $this;
    }
}
