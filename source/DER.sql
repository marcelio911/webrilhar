CREATE TABLE Categoria (
  cd_categoria INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  nm_categoria VARCHAR(40) NULL,
  PRIMARY KEY(cd_categoria)
);

CREATE TABLE Cliente (
  cd_cliente INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  nm_cliente VARCHAR(70) NULL,
  telefone VARCHAR(15) NULL,
  email VARCHAR(70) NULL,
  PRIMARY KEY(cd_cliente)
);

CREATE TABLE Estoque (
  cd_estoque INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Fornecedor_cd_fornecedor INTEGER UNSIGNED NOT NULL,
  dt_inserido DATE NULL,
  qt_estoque INTEGER UNSIGNED NULL,
  pr_compra DOUBLE NULL,
  pr_venda DOUBLE NULL,
  PRIMARY KEY(cd_estoque),
  INDEX Estoque_FKIndex1(Fornecedor_cd_fornecedor)
);

CREATE TABLE Fornecedor (
  cd_fornecedor INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  nm_fornecedor VARCHAR(50) NULL,
  PRIMARY KEY(cd_fornecedor)
);

CREATE TABLE Produtos (
  cd_produto INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Categoria_cd_categoria INTEGER UNSIGNED NOT NULL,
  nm_produto VARCHAR(50) NULL,
  ds_produto VARCHAR(150) NULL,
  vl_produto DOUBLE NULL,
  promocao INT NULL,
  lancamento INT NULL,
  PRIMARY KEY(cd_produto),
  INDEX Produtos_FKIndex1(Categoria_cd_categoria)
);

CREATE TABLE Imagens (
  cd_imagem INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Produtos_cd_produto INTEGER UNSIGNED NOT NULL,
  nm_imagem VARCHAR(70) NULL,
  url VARCHAR(1000) NULL,
  thumb VARCHAR(1000) NULL,
  tipo VARCHAR(10) NULL,
  imagem BLOB NULL,
  PRIMARY KEY(cd_imagem, Produtos_cd_produto),
  INDEX Imagens_FKIndex1(Produtos_cd_produto)
);

CREATE TABLE Interesses_visita (
  cd_visita INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Produtos_cd_produto INTEGER UNSIGNED NOT NULL,
  Cliente_cd_cliente INTEGER UNSIGNED NOT NULL,
  dt_visita DATE NULL,
  hr_visita TIMESTAMP NULL,
  PRIMARY KEY(cd_visita),
  INDEX Visita_FKIndex1(Cliente_cd_cliente),
  INDEX Visita_FKIndex2(Produtos_cd_produto)
);

CREATE TABLE Itens_no_estoque (
  Produtos_cd_produto INTEGER UNSIGNED NOT NULL,
  Estoque_cd_estoque INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(Produtos_cd_produto, Estoque_cd_estoque),
  INDEX Produtos_has_Estoque_FKIndex1(Produtos_cd_produto),
  INDEX Produtos_has_Estoque_FKIndex2(Estoque_cd_estoque)
);

CREATE TABLE Lista_de_desejos (
  cd_lista INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Cliente_cd_cliente INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(cd_lista),
  INDEX Lista_de_desejos_FKIndex1(Cliente_cd_cliente)
);

CREATE TABLE Lista_de_desejos_has_Produtos (
  Lista_de_desejos_cd_lista INTEGER UNSIGNED NOT NULL,
  Produtos_cd_produto INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(Lista_de_desejos_cd_lista, Produtos_cd_produto),
  INDEX Lista_de_desejos_has_Produtos_FKIndex1(Lista_de_desejos_cd_lista),
  INDEX Lista_de_desejos_has_Produtos_FKIndex2(Produtos_cd_produto)
);

CREATE TABLE Login (
  cd_log INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Cliente_cd_cliente INTEGER UNSIGNED NOT NULL,
  user_2 VARCHAR(15) NULL,
  senha VARCHAR(50) NULL,
  PRIMARY KEY(cd_log, Cliente_cd_cliente),
  INDEX Login_FKIndex1(Cliente_cd_cliente)
);




