<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210117173043 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE adress_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE citizen_relationship_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE comment_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE resource_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE resource_attribute_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE resource_content_value_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE resource_type_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE resource_user_state_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE type_of_relationship_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE adress (id INT NOT NULL, street VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, cp INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE category (id INT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE citizen_relationship (id INT NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE comment (id INT NOT NULL, parent_comment_id INT DEFAULT NULL, resource_id INT DEFAULT NULL, content TEXT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, is_validated BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9474526CBF2AF943 ON comment (parent_comment_id)');
        $this->addSql('CREATE INDEX IDX_9474526C89329D25 ON comment (resource_id)');
        $this->addSql('CREATE TABLE resource (id INT NOT NULL, type_id INT DEFAULT NULL, author_id INT DEFAULT NULL, category_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, number_views INT NOT NULL, is_validated BOOLEAN NOT NULL, is_public BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_BC91F416C54C8C93 ON resource (type_id)');
        $this->addSql('CREATE INDEX IDX_BC91F416F675F31B ON resource (author_id)');
        $this->addSql('CREATE INDEX IDX_BC91F41612469DE2 ON resource (category_id)');
        $this->addSql('CREATE TABLE resource_type_of_relationship (resource_id INT NOT NULL, type_of_relationship_id INT NOT NULL, PRIMARY KEY(resource_id, type_of_relationship_id))');
        $this->addSql('CREATE INDEX IDX_4265C40A89329D25 ON resource_type_of_relationship (resource_id)');
        $this->addSql('CREATE INDEX IDX_4265C40A783E4272 ON resource_type_of_relationship (type_of_relationship_id)');
        $this->addSql('CREATE TABLE resource_attribute (id INT NOT NULL, resource_type_id INT DEFAULT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_52B3BC6498EC6B7B ON resource_attribute (resource_type_id)');
        $this->addSql('CREATE TABLE resource_content_value (id INT NOT NULL, resource_id INT DEFAULT NULL, string_value VARCHAR(255) DEFAULT NULL, text_value TEXT DEFAULT NULL, image_value TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_BF582A2089329D25 ON resource_content_value (resource_id)');
        $this->addSql('CREATE TABLE resource_type (id INT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE resource_user_state (id INT NOT NULL, is_favorite BOOLEAN NOT NULL, is_exploited BOOLEAN NOT NULL, is_aside BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE type_of_relationship (id INT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CBF2AF943 FOREIGN KEY (parent_comment_id) REFERENCES comment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C89329D25 FOREIGN KEY (resource_id) REFERENCES resource (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F416C54C8C93 FOREIGN KEY (type_id) REFERENCES resource_type (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F416F675F31B FOREIGN KEY (author_id) REFERENCES fos_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F41612469DE2 FOREIGN KEY (category_id) REFERENCES category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE resource_type_of_relationship ADD CONSTRAINT FK_4265C40A89329D25 FOREIGN KEY (resource_id) REFERENCES resource (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE resource_type_of_relationship ADD CONSTRAINT FK_4265C40A783E4272 FOREIGN KEY (type_of_relationship_id) REFERENCES type_of_relationship (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE resource_attribute ADD CONSTRAINT FK_52B3BC6498EC6B7B FOREIGN KEY (resource_type_id) REFERENCES resource_type (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE resource_content_value ADD CONSTRAINT FK_BF582A2089329D25 FOREIGN KEY (resource_id) REFERENCES resource (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE resource DROP CONSTRAINT FK_BC91F41612469DE2');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526CBF2AF943');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526C89329D25');
        $this->addSql('ALTER TABLE resource_type_of_relationship DROP CONSTRAINT FK_4265C40A89329D25');
        $this->addSql('ALTER TABLE resource_content_value DROP CONSTRAINT FK_BF582A2089329D25');
        $this->addSql('ALTER TABLE resource DROP CONSTRAINT FK_BC91F416C54C8C93');
        $this->addSql('ALTER TABLE resource_attribute DROP CONSTRAINT FK_52B3BC6498EC6B7B');
        $this->addSql('ALTER TABLE resource_type_of_relationship DROP CONSTRAINT FK_4265C40A783E4272');
        $this->addSql('DROP SEQUENCE adress_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE citizen_relationship_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE comment_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE resource_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE resource_attribute_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE resource_content_value_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE resource_type_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE resource_user_state_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE type_of_relationship_id_seq CASCADE');
        $this->addSql('DROP TABLE adress');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE citizen_relationship');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE resource');
        $this->addSql('DROP TABLE resource_type_of_relationship');
        $this->addSql('DROP TABLE resource_attribute');
        $this->addSql('DROP TABLE resource_content_value');
        $this->addSql('DROP TABLE resource_type');
        $this->addSql('DROP TABLE resource_user_state');
        $this->addSql('DROP TABLE type_of_relationship');
    }
}
