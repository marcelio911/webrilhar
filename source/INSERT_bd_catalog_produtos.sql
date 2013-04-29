-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: Abr 25, 2013 as 08:08 PM
-- Versão do Servidor: 5.5.8
-- Versão do PHP: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `bd_catalog_produtos`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usuario_` varchar(30) DEFAULT NULL,
  `sennha_` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Extraindo dados da tabela `admin`
--

INSERT INTO `admin` (`id_admin`, `usuario_`, `sennha_`) VALUES
(5, 'admin', 'c2c232e32bae50b4bfde0e9b4734780f'),
(6, 'Allyson Rodrigues', '87924e0b2f15d19980c4a8efb9a8b458');

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE IF NOT EXISTS `categoria` (
  `cd_categoria` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nm_categoria` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`cd_categoria`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`cd_categoria`, `nm_categoria`) VALUES
(1, 'Brincos'),
(2, 'Colar'),
(3, 'Anel'),
(4, 'Tornozeleira'),
(5, 'Pulseira'),
(6, 'Corrente'),
(7, 'KIT - Conjunto'),
(8, 'Gargantilha'),
(9, 'Religioso');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente`
--

CREATE TABLE IF NOT EXISTS `cliente` (
  `cd_cliente` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nm_cliente` varchar(70) DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `email` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`cd_cliente`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `cliente`
--

INSERT INTO `cliente` (`cd_cliente`, `nm_cliente`, `telefone`, `email`) VALUES
(1, 'Allyson', '(79)9817-9894', NULL),
(2, 'Sheron', '(79)9817-9894', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `estoque`
--

CREATE TABLE IF NOT EXISTS `estoque` (
  `cd_estoque` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Fornecedor_cd_fornecedor` int(10) unsigned NOT NULL,
  `dt_inserido` date DEFAULT NULL,
  `qt_estoque` int(10) unsigned DEFAULT NULL,
  `pr_compra` double DEFAULT NULL,
  `pr_venda` double DEFAULT NULL,
  PRIMARY KEY (`cd_estoque`),
  KEY `Estoque_FKIndex1` (`Fornecedor_cd_fornecedor`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Extraindo dados da tabela `estoque`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedor`
--

CREATE TABLE IF NOT EXISTS `fornecedor` (
  `cd_fornecedor` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nm_fornecedor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cd_fornecedor`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `fornecedor`
--

INSERT INTO `fornecedor` (`cd_fornecedor`, `nm_fornecedor`) VALUES
(1, 'Cintilla Jóias'),
(2, 'Kamilla Jóias');

-- --------------------------------------------------------

--
-- Estrutura da tabela `imagens`
--

CREATE TABLE IF NOT EXISTS `imagens` (
  `cd_imagem` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Produtos_cd_produto` int(10) unsigned NOT NULL,
  `nm_imagem` varchar(70) DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `thumb` varchar(1000) DEFAULT NULL,
  `tipo` varchar(10) DEFAULT NULL,
  `imagem` blob,
  PRIMARY KEY (`cd_imagem`,`Produtos_cd_produto`),
  KEY `Imagens_FKIndex1` (`Produtos_cd_produto`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `imagens`
--

INSERT INTO `imagens` (`cd_imagem`, `Produtos_cd_produto`, `nm_imagem`, `url`, `thumb`, `tipo`, `imagem`) VALUES
(1, 1, 'Brinco dourado', NULL, NULL, 'jpg', 0xffd8ffe000104a46494600010100000100010000ffdb008400090606121211151413131515141317191616151818181515171c1916181715181b191c1c261e181c231a18191f2f2024272a2c2f2c1a1f3135302a35262b2c2901090a0a0e0c0e1a0f0f1a2c1c1f242929292c2c292c292c292929292c2c2c2c292c292929292c29292929292929292c292929292c29292c2c292c29292c292c29ffc000110800e100e103012200021101031101ffc4001b00010003010101010000000000000000000004050603020107ffc4003b10000202010303020404040405050100000102001103041221053141225106133261718191b14252a1c11423d1f0627282e1f1071516334324ffc400190101000301010000000000000000000000000102040305ffc4002811010100020200060103050000000000000001021103210412223132418113335123617191a1ffda000c03010002110311003f00fdc622202222022220222202222022220222202222022220222202222022220222202222022220222202222022243ea3a82a28773fa8103e6afaaa27de8d1ae6a726eb2010185582c49b155dfc7b1b9499b51cb33823650b200b37c50e775f1e655e7cdb327ac3044f58dc45d776041b04fd877004aed6d379a7d4ab8b5fcfdc4eb305f0cf5ccbf3e9c7a1db6a2f9009241af03d87b4dd87064619cc91669ea2225d04444044440444f19726d524f880cb9828b27fd6431d671d58362c0f1dcca8d66acb3856bdcdda835d7900f03d877957afd49002ab12ade8340ed520f7fbd9ef5daa5769d36b8752add8f23b89d67e7bff00c81f16645c6a58017918f86e775df9354403e3ed37ba7d4075561d98023f317231ce5e93669d62225d522220222202222022220222202526b70ee724e4da0d2d5735de96bbd8ef2e9bb4cdbb942327d4c77528fa896ee6ff008687bf895a988fafccc36aed16cc7ea068281c1efcdf8129b578dc8446567b700fa412548e0fbfbf32e3a9e66cdbb180555115890006249e141fe10255e4d5e54c9baaf6627506ea9ab6dd5726c8fd0ca67758dab4eec675fa865c5a81971504c24a202bb95890771af1438bf79fa4fc3bd6bfc569c650bb5ad948bba653479f6b984eb3d03583069d74ea8f8d81dea4aab6fbef648344593524fc2dd4574784e07ca37fcc6240f57a98ded422cb0fbd4f370cf2c32dd76ca4b1fa4e9f30650c3cff00b2274953f0d6afe661ba23d4783de89b96d3d5c72f34db3d9aa4444b208888095fd50336d55af720d8ddf607c4b0949d5959d980341401cb6d517c924fe02bf3915310f539762b6f21b6a9624702cff0af8bed2973e521581550a10954e5a8d59162bbd932ef53d5719401501391c22ab0205f8623c2d7eb28755972a63d86dbd62d8001aaeb807c5d0bf6954a83aa64d98d570fd5946f24dd28ab73f6f1375f097c4ebaa07194d8f8d41a1ca91c0041ef339d531e671abd461c3f3586dc6b8f9b083d24803f887278ef207c1472e1d4b66caa708c98b62a64057753062c3d80af353cbfd4ca67e6fa68b258fd5b065bb1e54d7f7067599fe89d5972e7601837a0591c8b07dc71fa4d04f538f3f3e3b66b344444ba088880888808888088881cf50f4ac7d8199e39863c81b2d12e8aa02f2c3b9362bb5773f94d06aaf6350b35dbb4cbe6c855b7e507d4c0506b1616a803c8f72048a98e3d4f5033b64084a2e3205a0f531ae79a3e91ed52a33e1c832306ecc31aadf0479aaf07824c9a32642cea8171d3fa81b62c687e5c7bf79070e6c8f9d8357ff62f20d8fa4d01f6a9c79be0be1eee5a1f8abfc4be5c7874fb72e95580734598292adb7f94fda8f122f4fc848b64d8ddf69fa873cdf024effd4ed0b69d11b4c4e319199b284f497200a624513da889034794294c67707c9895c06e4f0a0b59fc4cf1bc46394e4936d586ae1b6dfe076bc07dc3107f227fb4d24ce7c14b58dffe79a39ecf87bbe38c9c9f2a4444eea111101287a8966636b48b906f6b03d217d57cf23de5f4ccf5466662bb58282c4f0a4358e2c77144937db891531f3a86b71918c632acf9371563602d004bf1fb4cfea7265071d9f983e67a980da781614f7e3bb5ff00493b53a851914e252ce50ec26953ee4fb8feb720f51ea194363565a055cd03609a37dfb5094cbe3569eee58fe25c18b6e95fe61c9a8a2bb49552092002c0f93c57ed20eaf54336a1d7263e53d0430a03ec05f6af32efab7404ff0006358a8a753850ec2458adc3b03c58ab06b8bfbccb749ead93263f9ba8c8588cbb096007f0582280e6cff49e2f8999c98f7a6ae3d5db5ff083d6a0af601450f1e411fb4dccc2fc2e95aa1ff29173753d2f077fa7f967e5f722226c722222022220222202222047d7e42b8d881640b03c4cf1c78f2105882dc31bb5ab164af8b2684beeaa7fc97be411543bf3c4cd955cee57738450a400369de7c9be6800071c732b568a9d669c86618ac73eadede917e011c93577f948da0cd7a9fa76aef52077dbc52807daaa77d78c989f2282323311900ba22c512c6a88e3f79055df1ea86f1b7b1a23b0155c8347f8a72e6f854e1eedbfc53d186a3e586215109663e48aedf6fb9997cfa446d4be6fe45d98ff00976b5115fa4f3ffa95f191c7b31e16e4a967146e8fd03f3a32a93e2ac484e3cdb93222e3536a7d676dd8ae00a33ccf13eae5b7168e3971c775bef843ff00adbeedfdc897f33df0673849f7a3faf3fde6867a7e1ff6e33e7f2a4444eea111101337accbf34b2b7a40dc856f6b30abf23b135349325aacea4ed465def90f71656f92c070780281f73f84ad4c41ea7a438ca6d66b55da1080dcf7a07b0fb994dacd41dc9b94ef21f78241fab81447b281c7de5bf51d3e4c4d8db707c6159771a56f57635fc47c54a2d76a5e91b6320dc7b8209ecbc783c735f695cfe3538fbb78da6393a79451659280fce64baafc36ab8b0e9b7776f999180e0b02ad5f6142a5eea7e234d3f4df980a9702956fb927fd998ee95f1623ed3998233e562ac7853b529cb37fd4bc7da795e2756e3aeeea3471cb375aef87ebfc4f1e07efff0089b1987f84752b933ee421940ab1dbb127f19b89b7c1fedfe5cb97e44444d8e44444044440444404444089d556f0bffca4fe9ccc8e4d692e8158a865f5f1640aa1b477f577f69b865b041f3c4c8750cea00414322e4080b7804d1afc0735f795a98aed7e9ca3316a2722a80070dc1a036df3c73c194baf2df33131be7bdad5d93bb9baa002feb2ef55a161b326e460848afa6f7704dfbf6fd7ed2a7a98764dc536046dcd544f7a1f973cca67f1abe1eef5ace878f366df96d89db42ebe91c0fbf6ed1d6311d43616dc10e3bfa400589ae58fe000a9639708f964d857d851588240ddf51e39fa6ea43e9d807a556e81a17c9aec2cf9e278bbb32ebedaaf7a6efe1bc55801fe624cb49c74987622afb002769ee618f971918adddd91112e822220262f5fa9d9bea99f1b9a5f27900007baf3f94da4cf755d36219183814e378be39aabdde3b1fd656a629b598f264f964d32ab86f4dd5d10383c1dbf63293a9e766c4402283700df9b24f6af15f9d4b6cd83365c340001d410bb8da8ef55efc485aac96ac831b5951c1ed7f91ae3bc8becb4f742d5e80ea30625dd4a0963c73656bf6b8d4f48c434674ca8a59394c8fc952e41c86bb6ea0a078933a3e9c64c2159b8ba2dc8aa3cce4431c8e588f51b0a0ee541c85506b9f4aadfdccf173cae39ee35eb734bef80341b051ab506e8051c9ef5369297e15d36dc45bf98fed2ea7abe1b1f2f1c64e4bea222268508888088880888808888099cf883a700c737145769047a6ef827daf8e7ec3b4d1cf19710652ac2c1144454c7e71ac2ed8d9722b12cdb48000fbdd8efef5c48df318bed2294d03f73f8789acd7fc3793b21b5f0380c3ed7e44a5d574f75cb8d197e9e47144df1c9f3da79bcfcdcb8f5a68e3c71af487b71dc4b5f873a48dfbeb81cdf8bf69db45f0f39e5f81fd668306008a1545012fc1c167ab2573cfea3a4444dee044440444404a8f88ba6fcd4047743cfdd6c6e1c73e25bc40fcfdf5451ca801540241e4861df820d1fc0f15c4a9c7aa28abb771f512091d813747dabed367d4ba03292710054ddaf362fbd51edf699eea1a27446debf5700d1057debdfccc3cfcf9f1f5a77c319957cd2a855fc4ee3f9f32469fa607c82bcf892341d2ddc00aa76d0e7b4d374ce943173dd8f73fda71e1e2cb3be6c96cf393a897a7c211428ec054e9113d4662222022220222202222022220222202663af6b4e3d5633dc0d8bf86e27bff49a1d66a8634676eca2f8ee7ed313d4fa5eb33665609c330637e90001c2ddf040ae7dee64f139ea4c64dd75e39deeb7912bba36bd9c32b8ac98ced6fbfb196334e394ca6e39d9a22225904444044440444404a6f8ab25611c7f103dafb027fb4b998ff8b3a8e47046152cb8f70b17f5551f1d876bfb999fc4e731e3bb5f8e6f2693a3ea03e0c6c3b15e3f6932673e16d63a2a60ca851b6da83fa95fbf7b0668e74e2cbcd844653548889d1522220222202222022220270d46a76f6167bfb01f89fedde7576a172974b97eb3915aaf857ae49ee687e83f091531270753decebeadd8eae945511628d9fd3bfda7ccbd58070a1c591b8060458068907fed20697a8a23b263435df2e4a34ad5dabbf6e647e9ee993d6c4024b0048b6f6da2f9aaf6f7339dc6d9d5d54cd2d3519867c6f89e91eac0b07701d987b8b9d3a7eaf27cbff3147a40f50279e3bd57fe65094399ad07f948a40bfac9ec4a9f6ee25bf4cd415c03712d77b696cd0e0035edda709fa932effe7dad75a48d329467761eac954077a51e7c091f2f5acb5698d08f17914dfbf6e38e7f49ef16a4bab12c57696ec00fc37037cfda55f4c55462a45be5f591db7837c9e2a81e3daa7698e5ad4ba57fca52fc4b901a6c4ad5c9d991491f977969d3fac62cdf49e7f94f07fef3329a019183862acbb9456d0abcd1160723eff695faccff002f300080e17782a478340f1e7894cb2cf8fbbdc5b52ff67e87120f47ea3f3b1863f50e187dfdff00393a6896653714b344f3932002c9a9ea54ea75979c20634073e9e00ee4eeed7e3ed150eefd5406553e82e485dc09b239ae3807ed773d65d7edfe24bbaa36bcfb7e32af579f0e2c832125883b1101dc6dab7100fef38eb72a67c871b515a562b7e7c135c9dbfb994b32bf6b74bac5d48160854a92383c153f6b1e7ed2174a77c4cd899091b890c3efcf367f295bd4dbff00c93fcc76604a024051df76ef15fbc99d1b338770cc0a8e493f503dbf31533ef92653cdfee76b6a6ba4ccfebcd8daa9711625af81c555ceb9fab01f4e377fb814bfa99c575e1d8aa6daafabb806ff0097c9ee655eab1fff00d259d870367f2ab1a246e174de40fbced8ccb5d7daa9ff00fc8cf9d3e503f0b3fa499a2eb58b29a56a6fe56e1bf499cea7a3191b6afa09dae1883b8fdd79e05ffe244ea984e31b9c790038be6fb035d8d0eff8cadbc98777b8b6b1ade44a4f873ac1c80a3fd6be7f987fa89773b6394ca6e29668888964111101111021f53d43a28d8a5893d876ede7d84a67d2fce720b3104ae43560061f481ec56aabfbcb6eabaf18b6120b59ada0593c7894fa6d11ccc5b79da8ce02f606f96f1639e3f2322a63de935ab8494636d91dceebbedc7aabb5f338683a7abb7cd2e772ef18ceeeca0900578f79f7a6e7c78f2b2b95b7b60a4d94504fa49aef766a7cc380e4ceeeaf4402a156957d3d89ef6791cf121287d2750e836210f896ef373566cb823b9ab155e4499d235f44815b480c281ac7cd6c6ff8a85d0f2673d3f504c4834cb6d9002781e01b63c763cf6bee675e9b9863251976ae20766e65e57baffd40559fde34397cb670d997f97846036d720f02acfde71e9b81114e3661f30292e4f2fc9b3609b0a05af1e0dc236e53937838ca0ac6836906b81b8f8e7f59f3a7e11f29d4ed5c8c18305ba6a1b40f25783cd50f681e5f164c672b228552978d10ee6dc470d7e2c5dffde7cd3a2bab165504aaf6faacf0dc91c72381f79df4f979641b8ae2dabb8559aaf3c722ebfd995fd3d43176caa7e739208e7803f97ee7b59f6e24eb7d525ed37e0fd6d381e1c11fb95ff7f79b59f9df460132d2f6560147b00c38fcbb4fd1266f0d6eae37eaafc93bdb9ea32ed566f604fbca1d46b9b2052be9049400f7248ef5e3d3c8f697babc9b518fb0bf6ed33dabd41cef58580de9deb95da6cf3e39e2fccd35ce3c62d3fc8756cac593162a0e545aee6ab3ee7eff0069e75fa2f9d94aa36c465562540bbb600123f84d5d798d5e1acabf33d48b41cb915b8fd2179baefc4f7d5b4beb45c3b719e18b7249038db4383cd79e2425135391f0676269f7ec408bcb2ed1cb151e3fd677ff00dc76e5dc400accab906eb20916be9fb0ef5eff0069ef194c19b265cc55770555622b80381dfb9fb7791f0645196c2b5e5e036dbda54d150dc78a24fb9ef1a12f5b95b264031b0575adc4726883e9b0685f372bf0e22f95fe6584dca063dc480c3ea73fcc7c0f693758cc72118768da543ee6a35b451007b5fe7720e2c432663bec8c649467fa49242b1287b0079041fde07bd5e271911941625ab23eef46df00026ec0e7f59c03aea1c875dc06522fe95a1f436dee4f71f9c93bca39563b8e5c8c578b028006803dbc890b3e4dfa80ac59571a862c294e43c7a6ebc1a166fcd49887cd267f93a83b7b2907f006f8fd26fd5ac5fbcfce751876e614490d5767b500a00fb6dafcc4de7497bc284fb7edc4cbc37cb9e587e5d392752a5c444d6e4444404444089d4b850dc00a6c926801d89946dabc991c1c446352493b810cc36f27b76bafd4cd266c4194a916181047d8f0665f58f9536e35af9a97458820ad8a26fdeafec4191531d347d3063cee736c6dcaaa3b05a20f147b924727cc89aa7db94ae10ab8d581737469bd2d43b7e938e9ba636a3296caeaff002c6d07690afb8eef503cd0e058f6962a7169f01c593964fa885258f23d5e689e2ae20f5aad1ec40e08010b7db822989626c9a039fcbc8957aec8da81f2f845640431a2db6c820007d375d8cf1a947665f998c955cb6168966014d1207a7683dfcf7923a93a3622e8155ee8102ac937428531bf07efed03c67c834ebc1364a634f164fd5546ebcd4edaed2fcbdcd8cb2f36c49b2e2bea049ef46848ba564cadb5d37322adddf1bbea60a7cdf1c4fbad676271e005a8fadceddaaa186d41cf1479a1cf784bdf4e3f2936b82b4c76bbf2298d8dc05d1bff007c54838b1fcd21d9c8e4aa01e90a03f6ff008b9e7913eeafae304f49a75702d94f36dcedf7a02e8f6b13d3e8d71236c6f57ab963e7b5edf07ede637a3edf3a2e99bfc415277539f50fe2b7bb9fa1cc8fc15d308f59ecbc0fc7fdf3f9cd74e1c13ab97f356e4bf4e5a9c5b9197dc11fd267f59ac0b5f2d07ce553e9b0bb78b009edf97de696673a860188e5047a727ad4d0e1ac58fb9ddcfe04cef54889afe9f972be239546d2c0920ddd2d85aed57cdf79d7abe9f1e260d8d59b2382152fc9e41e7b723c7b483abd46a736cc440c458d82ac4b2d1258b2f7a61c0fc64fe9fd34627273515a1f2f739603b6e3cf6b6aaf6903c7f8139d373852cc967773b0d8b0078208e799cf51d42d76b2163b806b040524700b571dbf69c355af2372e16250a64a60db4291e0b1e091fa933a6874d81b1a01774beadc43330e49366ac932447e9dd39b1fa9d86e6766622cd002fb8ed553b62c432a26553c90db176aeda0de401c93c1fb48783541c1c590b7ad8a529e4802c8e7c9ed638e0c9991970635da4953f462a66b6b0156fbd0f684a3e9721f9c5b2126d76f0bc63653ca5f907bdcf9d45ce47d8a55540562c0ee3cdd053c8e41e7b4f9a5ea4554264015c824213b4f24b1e7c1a0783fde47d0e9fe67f9b61772d7cb400a800d7aafc922f8f31b4396ab0bae54dc430641b5b8be1acdd7e93f40e92958507dbf7e661ba6e95f2ea08aa1ba80ee028e3fd499fa1a2d00078e267e39be4cb2fc3a677a91f622269722222022220257759d0175dc82dd470381b87b1fdc4b18818cc598b33b8602811e90033b0e09b23951e05789d3369b1e34f984ed60cbf31ac92d5fc445d37d87dfc4b8ea7d279f9b8c7abf897cb71563c6efc7833269a41903163901bb604ee666bff88715e05891a5bdd3ba8f533986355df8ed80becdb7b93638e791facfbd4ba762c23130c840f50a662c2996ed57dfbd0feb1ffba364424ee4dade9b0031f7da458e3dff0019cf578f19a258a10ca40666e769fe76f6be02f10871d7ea9733635b09bd183b053b828e56ac79aaefe24a4cab8159810c321054528a2285ed15fa81c48dafea4aea9b105ab06b6dca0df70071cf3ef3d9e9cdc3fcc57da0aee2028a3deb9e2bb76b84a13635cd99cbee745f56207d200ee78bf7fcf99ebfc0366cc889da85f7ef7609249b20713de2197540226eaaa63dbcd8b3dfc779b3e93d1d302d0e58fd4de4ce77d7e99ec9de92345a418d028f1e7dcfbcef113a49aea2848dd434432a6d3dc1b53de88ec64989231b90b6f550817206e2c9040ba2e403eafb03c7992060398db3bde324e3fe05e051254d826eff00d3896fd5fa38ca3700038157db70f627fbf8998d56476cc543b6361c6d2a028245b33720b571d8d71c48d2dee94bd53126138ed4b2af81c023922fb16fef38e3e9795f03e53988764e69540a1fc37e38f6fce78e9d9d107c8f4b37364a95f360963c79a9d569d369c957e08518fb6d1c0f5378f3f94211b57a9c4b84fa50b6121d006028df0a2883c71dbd8ceda4d1b2bae467572bbb795b2698d85167803d801e6734185309c6e017da001e90dbaac1fc68f7fbce49a6cb971500a03016bb89725783b881c82410381de12f3d5f5232b22a950af6aec0167001e289f7fcae71d569fe5630885ad5b68dc6c8e497a15ff833be6d40425362efb5655a0c45f3fa7e372e7e1ef875b8c998927b853fb994cafd44cebdd2be16e8ff002b1866fa88e2fb81f7fb997d112d8e3319a8adbb22225904444044440444404afea5d1d728344a3ff3ad5f6ae41e0f12c22063f53a5cba54360b2d56f55dc4900ed27ca7f512b3fc323e224bf70aedbdac6e16411c71c93c4fd0e44c9d2b0b1b38d6ff000eff0088f322efe93b63b1e56cc2910bfa813b8100d7028f7a967a0f8632b03f3dc531b2aa289e7b5f8134d8f12a8a5000fb0a9ee449fca76e3a4d1a625da8a009da225952222022220244d774c4cbc9e1aa830eff00f792e20643374dcd84b3385c8bdec0212aabd4a2c8fea2404c832b31571b01a0800d8e36f93ef66feff94df481a8e8785cdedda7dd78bfc7c19096334a1310f9468b28200e0936480491fb1325f4bd06a188d98f620502d8f73cdf6ee3d87b4d4e93a261c7f4a0bf73c993a4497ed3b5474af86f1e13b8fadcff0011f1f8096f1126493d952222484444044440444404444044440444404444044440444404444044440444404444044440444404444044440444404444044440444404444044440444404444044440444404444044440444404444044440ffd9);

-- --------------------------------------------------------

--
-- Estrutura da tabela `interesses_visita`
--

CREATE TABLE IF NOT EXISTS `interesses_visita` (
  `cd_visita` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Produtos_cd_produto` int(10) unsigned NOT NULL,
  `Cliente_cd_cliente` int(10) unsigned NOT NULL,
  `dt_visita` date DEFAULT NULL,
  `hr_visita` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`cd_visita`),
  KEY `Visita_FKIndex1` (`Cliente_cd_cliente`),
  KEY `Visita_FKIndex2` (`Produtos_cd_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Extraindo dados da tabela `interesses_visita`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `itens_no_estoque`
--

CREATE TABLE IF NOT EXISTS `itens_no_estoque` (
  `Produtos_cd_produto` int(10) unsigned NOT NULL,
  `Estoque_cd_estoque` int(10) unsigned NOT NULL,
  PRIMARY KEY (`Produtos_cd_produto`,`Estoque_cd_estoque`),
  KEY `Produtos_has_Estoque_FKIndex1` (`Produtos_cd_produto`),
  KEY `Produtos_has_Estoque_FKIndex2` (`Estoque_cd_estoque`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `itens_no_estoque`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `lista_de_desejos`
--

CREATE TABLE IF NOT EXISTS `lista_de_desejos` (
  `cd_lista` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Cliente_cd_cliente` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cd_lista`),
  KEY `Lista_de_desejos_FKIndex1` (`Cliente_cd_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Extraindo dados da tabela `lista_de_desejos`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `lista_de_desejos_has_produtos`
--

CREATE TABLE IF NOT EXISTS `lista_de_desejos_has_produtos` (
  `Lista_de_desejos_cd_lista` int(10) unsigned NOT NULL,
  `Produtos_cd_produto` int(10) unsigned NOT NULL,
  PRIMARY KEY (`Lista_de_desejos_cd_lista`,`Produtos_cd_produto`),
  KEY `Lista_de_desejos_has_Produtos_FKIndex1` (`Lista_de_desejos_cd_lista`),
  KEY `Lista_de_desejos_has_Produtos_FKIndex2` (`Produtos_cd_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `lista_de_desejos_has_produtos`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `cd_log` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Cliente_cd_cliente` int(10) unsigned NOT NULL,
  `user_2` varchar(15) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cd_log`,`Cliente_cd_cliente`),
  KEY `Login_FKIndex1` (`Cliente_cd_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Extraindo dados da tabela `login`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE IF NOT EXISTS `produtos` (
  `cd_produto` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Categoria_cd_categoria` int(10) unsigned NOT NULL,
  `nm_produto` varchar(50) DEFAULT NULL,
  `ds_produto` varchar(150) DEFAULT NULL,
  `vl_produto` double DEFAULT NULL,
  `promocao` int(11) DEFAULT NULL,
  `lancamento` int(11) DEFAULT NULL,
  `sexo` tinyint(1) NOT NULL,
  PRIMARY KEY (`cd_produto`),
  KEY `Produtos_FKIndex1` (`Categoria_cd_categoria`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`cd_produto`, `Categoria_cd_categoria`, `nm_produto`, `ds_produto`, `vl_produto`, `promocao`, `lancamento`, `sexo`) VALUES
(1, 1, 'Brinco dourado', 'Brinco dourado com pedras strass formando um coração', 18.99, 1, 1, 1),
(2, 1, 'Brinco aço', 'Brinco aço com pedras strass formando um coração', 10.99, 0, 1, 0);
