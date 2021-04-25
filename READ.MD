#Models
../node_modules/.bin/sequelize model:generate --name User --attributes user_name:string,password:string

../node_modules/.bin/sequelize model:generate --name MdrType --attributes mdr_name:string

../node_modules/.bin/sequelize model:generate --name Category --attributes category_name:string,mdr_type_id:integer

../node_modules/.bin/sequelize model:generate --name Type --attributes type_name:string,type_image:text,category_id:integer,mdr_type_id:integer

../node_modules/.bin/sequelize model:generate --name Mdr --attributes title:string,short_desc:string,long_desc:text,type_id:integer,category_id:integer;mdr_type_id:integer

../node_modules/.bin/sequelize model:generate --name Page --attributes content:text,mdr_type_id:integer

../node_modules/.bin/sequelize model:generate --name Faq --attributes question:string,answer:text,mdr_type_id:integer

../node_modules/.bin/sequelize model:generate --name Icon --attributes title:text,icon_url:text,mdr_type_id:integer

#Migration
../node_modules/.bin/sequelize db:migrate


#FK
      category_type_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Category_Types", key: "id" },
        onDelete: "cascade",
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Categories", key: "id" },
        onDelete: "cascade",
        allowNull: false
      }


ALTER TABLE paladion_mdr.page ADD COLUMN title VARCHAR(255) AFTER content;

ALTER TABLE paladion_mdr.faq ADD `order` INT NOT NULL AFTER mdr_type_id