<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210327151423 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE comment ALTER updated_at DROP NOT NULL');
        $this->addSql('ALTER TABLE comment ALTER is_validated DROP NOT NULL');
        $this->addSql('ALTER TABLE resource ALTER updated_at DROP NOT NULL');
        $this->addSql('ALTER TABLE resource ALTER number_views DROP NOT NULL');
        $this->addSql('ALTER TABLE resource ALTER is_validated DROP NOT NULL');
        $this->addSql('ALTER TABLE resource ALTER is_public DROP NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE resource ALTER updated_at SET NOT NULL');
        $this->addSql('ALTER TABLE resource ALTER number_views SET NOT NULL');
        $this->addSql('ALTER TABLE resource ALTER is_validated SET NOT NULL');
        $this->addSql('ALTER TABLE resource ALTER is_public SET NOT NULL');
        $this->addSql('ALTER TABLE comment ALTER updated_at SET NOT NULL');
        $this->addSql('ALTER TABLE comment ALTER is_validated SET NOT NULL');
    }
}
