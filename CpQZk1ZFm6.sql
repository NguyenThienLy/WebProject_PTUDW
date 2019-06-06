-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th5 28, 2019 lúc 10:41 PM
-- Phiên bản máy phục vụ: 8.0.13-4
-- Phiên bản PHP: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `CpQZk1ZFm6`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `admin`
--

INSERT INTO `admin` (`ID`, `USERNAME`, `PASSWORD`) VALUES
(1, 'qui', '$2y$12$y9AnR.WFmuj78ueuGKUDgOiyUoAPR/zHiR.wBUjYPj.3IELo.ZYfW'),
(2, 'linhtk', '$2b$10$fjpxPzYIgweARiFqDOYyN.6zLb93kOKdHsqgkC47tcbaGzZd/aarS'),
(3, 'ly', '$2b$10$NHuYYIbLjbfJjE4Up5xKXONCUzFDBUZqrQKVpLfdDGypucooBEKvS');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brand`
--

CREATE TABLE `brand` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `INTRODUCTION` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `brand`
--

INSERT INTO `brand` (`ID`, `NAME`, `INTRODUCTION`) VALUES
(1, 'Bio Bio Baby', 'Xuất sứ: Bulgaria\r\nchứng nhận hữu cơ: USDA, Nature'),
(2, 'Bio Lady và Bio Mama', 'Thương hiệu nổi tiếng tại Australia'),
(3, 'Tanamera\r\n', 'Công ty phân phối sản phẩm tại Việt nam '),
(4, 'Apple Monkey\r\n', 'Công ty phân phối sản phẩm oganic'),
(5, 'Bentley Organic', 'Công ty organic đến từ Hà Lan'),
(6, 'Zao organic make up', 'Công ty organic đến từ Mỹ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `CUSTOMERID` int(11) NOT NULL,
  `PRODUCTID` int(11) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `TOTALMONEY` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`ID`, `NAME`) VALUES
(1, 'Rau củ'),
(2, 'Hoa quả'),
(3, 'Hải sản'),
(4, 'Các loại hạt'),
(5, 'Thịt');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `ID` int(11) NOT NULL,
  `CUSTOMERID` int(11) NOT NULL,
  `PRODUCTID` int(11) NOT NULL,
  `CREATED` date NOT NULL,
  `TITLE` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `COMMENT` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `STARS` int(11) NOT NULL,
  `LIKES` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`ID`, `CUSTOMERID`, `PRODUCTID`, `CREATED`, `TITLE`, `COMMENT`, `STARS`, `LIKES`) VALUES
(1, 1, 1, '2019-05-01', 'Hài lòng', 'Sản phẩm rất tốt', 5, 2),
(2, 2, 5, '2019-05-02', 'Giá mắc', 'Sản phẩm này rất tệ, không phù hợp với mình, giá cả thì mắc', 1, 1),
(3, 3, 7, '2019-05-30', 'OK', 'Tuyệt vời', 3, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment_reaction`
--

CREATE TABLE `comment_reaction` (
  `CUSTOMERID` int(11) NOT NULL,
  `COMMENTID` int(11) NOT NULL,
  `CREATED` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comment_reaction`
--

INSERT INTO `comment_reaction` (`CUSTOMERID`, `COMMENTID`, `CREATED`) VALUES
(1, 1, '2019-05-15'),
(2, 1, '2019-05-13'),
(3, 2, '2019-05-09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer`
--

CREATE TABLE `customer` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `IMAGE` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `FULLNAME` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `PHONE` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `EMAIL` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `BIRTHDATE` date NOT NULL,
  `CASH` double NOT NULL,
  `CUSTOMERTYPEID` int(11) NOT NULL,
  `CREATED` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customer`
--

INSERT INTO `customer` (`ID`, `USERNAME`, `PASSWORD`, `IMAGE`, `FULLNAME`, `PHONE`, `EMAIL`, `BIRTHDATE`, `CASH`, `CUSTOMERTYPEID`, `CREATED`) VALUES
(1, 'qui.lt', '123456', 'http://thuthuat123.com/uploads/2018/01/27/Avatar-dep-nhat-83_112148.jpg', 'Lê Tường Qui', '0987012635', 'qui021098@gmail.com', '1998-12-25', 200000, 1, '2019-05-01'),
(2, 'ly.nt', '123456', 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png', 'Nguyễn Thiên Lý', '0922123123', 'thienly@gmail.com', '1998-12-22', 3000000, 2, '2019-05-09'),
(3, 'linh.tk', '123456', 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png', 'Trần Khánh Linh', '0922333444', 'khanhlinh@gmail.com', '1998-10-16', 1300000, 1, '2019-05-01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer_type`
--

CREATE TABLE `customer_type` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customer_type`
--

INSERT INTO `customer_type` (`ID`, `NAME`) VALUES
(1, 'Khách V.I.P'),
(2, 'Khách thường');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer_view`
--

CREATE TABLE `customer_view` (
  `ID` int(11) NOT NULL,
  `CUSTOMERID` int(11) NOT NULL,
  `CREATED` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customer_view`
--

INSERT INTO `customer_view` (`ID`, `CUSTOMERID`, `CREATED`) VALUES
(1, 1, '2019-05-01'),
(2, 1, '2019-05-01'),
(3, 2, '2019-05-01'),
(4, 2, '2019-05-01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feature`
--

CREATE TABLE `feature` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `ID` int(11) NOT NULL,
  `IMAGE` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TITLE` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `SHORTCONTENT` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `CONTENT` varchar(5000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `CREATED` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`ID`, `IMAGE`, `TITLE`, `SHORTCONTENT`, `CONTENT`, `CREATED`) VALUES
(1, '//bizweb.dktcdn.net/thumb/large/100/350/980/articles/49997669-476326726231228-9092403644171095934-n.jpg?v=1553650991913', 'Cà chua giảm giá mạnh vì hiện tượng được mùa mất giá ở Lâm Đồng, nông dân lao đao tìm hướng ra của sản phẩm\r\n', 'Cà chua thuộc họ cây Bạch anh, các loại cây trong họ này thường phát triển từ 1 đến 3 mét chiều cao, có những cây thân mềm bò trên mặt đất hoặc dây leo trên thân cây khác ví dụ nho.', 'Hiện có khoảng 7.500 giống cà chua trồng cho các mục đích khác nhau. Cà chua thuần chủng đang ngày càng trở lên phổ biến, đặc biệt giữa các người vườn và nhà sản xuất khi học có xu hướng sản xuất các loại cây trồng có hương vị thú vị hơn, tăng khả năng kháng bệnh và năng suất.\r\n\r\nCây lai vẫn còn phổ biến, kể từ khi có mục đích sản xuất lớn, người ta kết hợp các đặc điểm tốt của các loại cà chua thuần chủng với độ ổn định của các loại cà chua thương mại thông thường.\r\n\r\n\r\nCác giống cà chua thuần chủng khác nhau\r\nGiống cà chua được chia thành nhiều loại, chủ yếu dựa vào hình dạng và kích thước.\r\n\r\nLoại cà chua Slicing hay globe là cà chua thương mại thông thường, dùng được cho nhiều cách chế biến và ăn tươi.\r\nLoại cà chua Beefsteak là cà chua lớn thường dùng cho bánh mì. Thời gian bảo quản ngắn khiến ít được sử dụng trong thương mại.\r\nLoại cà chua Oxheart có hình dạng giống như loại dâu tây lớn.\r\nCà chua mận được lai tại để sử dụng trong sản xuất nước sốt cà chua.\r\nCà chua lê hình quả lê.\r\nCà chua anh đào nhỏ và tròn, vị ngọt ăn trong món salad.\r\nCà chua nho được giới thiệu gần đây, một biến thể của cà chua mận nhưng nhỏ hơn, được dùng trong món salad\r\nCà chua Campari ngọt, lớn hơn cà chua anh đào nhưng nhỏ hơn cà chua mận.\r\nHầu hết các giống cà chua hiện đại đều mịn bề mặt, nhưng một số giống cà chua hiện đại như beefsteak thường có khía rõ rệt. Hầu hết các giống trái cây thương mại màu đỏ, nhưng nhiều giống cà chua thuần chủng có màu sắc đa dạng. Có một sự khác biệt giữa cà chua trồng cho thương mại so với cà chua do những người làm vườn sản xuất tại gia. Giống sản xuất do người làm vườn thường được chú trọng đến hương vị, còn giống do các cơ sở sản xuất thương mại hướng đến hình dạng, kích thước, kháng sâu bệnh, phù hợp cho việc cơ giới hóa thu hái và vận chuyển.\r\n\r\nCà chua phát triển tốt với 7 giờ chiếu sáng mỗi ngày từ ánh sáng mặt trời. Một phân bón NPK với tỷ lệ 5-10-10 thường được bán làm phân bón cà chua hoặc phân bón rau, cả phân hữu cơ cũng được sử dụng.', '2019-05-21'),
(2, '//bizweb.dktcdn.net/thumb/large/100/350/980/articles/8.jpg?v=1553634487280', 'Bí quyết ăn ngò gai cùng với cháo ngon hơn trong mua đông', 'Ngò gai là cây cỏ thấp, có thân đơn độc, chia cành ở ngọn, hoa quả mọc ở cành. Lá mọc ở gốc, xoè ra hình hoa thị. Lá hình mác thuôn dài, bìa có răng cưa nhỏ. Hoa tự, hình đầu, hình bầu dục, hoặc hình trụ. Khi trưởng thành, hạt rụng và phát tán, Ăn ngò gai vào mùa đông rất tuyêt và ngon cùng với tô cháo thịt ngon tuyệt vời nếu ai chưa biết\r\n', 'Mùi tàu là tên gọi của miền Bắc, ngò gai là tên gọi của người miền Nam với loại rau thân thảo, cây đơn lẻ, lá mọc ở gốc xòe ra hình hoa thị, lá hình thuôn có răng cưa, cành chia ở ngọn chứa hoa.\r\n\r\nHoa hình trụ hoặc hình bầu. Có tác dụng làm rau thơm, chữa bệnh rất tốt.\r\n\r\nTheo Đông Y mùi tàu tình ấm, vị đắng, mùi thơm hắc, có tác dụng tiện kỳ, sơ phong thanh nhiệt, giảm đau, hành khí tiêu thũng, thông khí, giải độc, giải nhiệt, kiện tỳ, kích thích tiêu hoá, khử mùi hôi hiệu quả.\r\n\r\nDo đó, mùi tàu không chỉ dùng làm rau gia vị mà nó còn được dùng như 1 vị thuốc chữa bệnh hữu hiệu trong Đông Y.\r\n\r\nLá mùi tàu có chứa tới 0,02 – 0,04% tinh dầu bay hơi, rễ chứa saponin…, được dùng ở dạng tươi hoặc khô trong các bài thuốc giảm đau, chữa cảm cúm, cảm lạnh, hôi miệng,…\r\n', '2019-04-10'),
(3, '//bizweb.dktcdn.net/thumb/large/100/350/980/articles/41968416-280694729439890-8459559393178510661-n.jpg?v=1553650945157', 'Chắc bạn chưa biết số lượng vitamin A mà cây dền đỏ có thể mang lại\r\n', 'Dền đỏ, dền tía, dền canh hay rau dền, rau giền (danh pháp: Amaranthus tricolor) là loài thực vật có hoa thuộc họ Dền. Loài này được L. mô tả khoa học đầu tiên năm 1753', 'Giàu dinh dưỡng\r\n\r\nNhư mình đã kể ở trên, rau dền có rất nhiều dưỡng chất. Vì mang đặc tính chung của các họ rau củ màu đỏ, rau dền đỏ chứa hàm lượng vitamin A rất cao, chưa kể đến các vitamin khác như B1, B6, B12.\r\n\r\nTuy hàm lượng sắt và canxi trong rau dền đỏ khá cao, nhưng rau dền lại không chứa acid oxalic, nên hai chất này được cơ thể hấp thụ và tận dụng dễ dàng, đặc biệt tốt cho các mẹ bầu thiếu chất.\r\n\r\nĐiều trị thiếu máu\r\n\r\nNhư các bạn đã biết sắt là một trong những nguyên tố vi lượng cần thiết cho cơ thể chúng ta, chất sắt giúp tạo máu để duy trì hoạt động của cơ thể, thiếu sắt đồng nghĩa với tình trạng thiếu máu.\r\n\r\nRau dền đặc biệt là rau dền đỏ có hàm lượng chất sắt khá cao vì vậy đây chính là nguồn bổ sung chất sắt dồi dào cho cơ thể, rất tốt cho những bệnh nhân thiếu máu do không đủ chất sắt, người bệnh mới ốm dậy, người xanh xao.\r\n\r\nGiải nhiệt\r\n\r\nVào mùa hè, thời tiết chuyển sang oi bức, người dễ bốc hỏa và nóng trong, nhiệt độ ngoài trời cộng thêm ăn uống không lành mạnh dễ làm cơ thể mệt mỏi. Rau dền là một gợi ý tuyệt vời cho cả gia đình trong những ngày này.\r\n\r\nChẳng ít thì nhiều, mỗi tuần, chúng mình nên bổ sung từ 2-3 bữa canh rau dền vào thực đơn, để đề phòng nắng nóng ảnh hưởng xấu đến sức khỏe cơ thể.\r\n\r\nĐiều trị táo bón\r\n\r\nTáo bón là chứng bệnh mang lại cực kì nhiều khó chịu, nếu không điều trị kịp thời sẽ gây ra những căn bệnh phiền toái hơn. Ấy vậy mà nó lại cực kì dễ xử lý, nếu như chúng ta ăn rau dền luộc hàng ngày.', '2019-05-16'),
(6, '/uploads/IMAGE-1558240804761.jpg', 'Bài viết mới', 'Cà chua thuộc họ cây Bạch anh, các loại cây trong họ này thường phát triển từ 1 đến 3 mét chiều cao, có những cây thân mềm bò trên mặt đất hoặc dây leo trên thân cây khác ví dụ nho.', '<blockquote><p>Hiện có khoảng 7.500 giống cà chua trồng cho các mục đích khác nhau. Cà chua thuần chủng đang ngày càng trở lên phổ biến, đặc biệt giữa các người vườn và nhà sản xuất khi học có xu hướng sản xuất các loại cây trồng có hương vị thú vị hơn, tăng khả năng kháng bệnh và năng suất.&nbsp;</p></blockquote><figure class=\"image image-style-align-left\"><img src=\"https://cksource.com/weuy2g4ryt278ywiue/core/connector/php/connector.php?command=Proxy&amp;type=Files&amp;currentFolder=%2F&amp;fileName=heart%284%29.jpg\"><figcaption>hình trái tim</figcaption></figure><p><br><mark class=\"marker-green\">Cây lai vẫn còn phổ biến, kể từ khi có mục đích sản xuất lớn, người ta kết hợp các đặc điểm tốt của các loại cà chua thuần chủng với độ ổn định của các loại cà chua thương mại thông thường.&nbsp;</mark></p><p><br>Các giống cà chua thuần chủng khác nhau&nbsp;<br>Giống cà chua được chia thành nhiều loại, chủ yếu dựa vào hình dạng và kích thước.&nbsp;<br><br>Loại cà chua Slicing hay globe là cà chua thương mại thông thường, dùng được cho nhiều cách chế biến và ăn tươi.&nbsp;<br>Loại cà chua Beefsteak là cà chua lớn thường dùng cho bánh mì. Thời gian bảo quản ngắn khiến ít được sử dụng trong thương mại.&nbsp;<br>Loại cà chua Oxheart có hình dạng giống như loại dâu tây lớn.&nbsp;<br>Cà chua mận được lai tại để sử dụng trong sản xuất nước sốt cà chua.&nbsp;<br>Cà chua lê hình quả lê.&nbsp;<br>Cà chua anh đào nhỏ và tròn, vị ngọt ăn trong món salad.&nbsp;<br>Cà chua nho được giới thiệu gần đây, một biến thể của cà chua mận nhưng nhỏ hơn, được dùng trong món salad&nbsp;<br>Cà chua Campari ngọt, lớn hơn cà chua anh đào nhưng nhỏ hơn cà chua mận.&nbsp;<br>Hầu hết các giống cà chua hiện đại đều mịn bề mặt, nhưng một số giống cà chua hiện đại như beefsteak thường có khía rõ rệt. Hầu hết các giống trái cây thương mại màu đỏ, nhưng nhiều giống cà chua thuần chủng có màu sắc đa dạng. Có một sự khác biệt giữa cà chua trồng cho thương mại so với cà chua do những người làm vườn sản xuất tại gia. Giống sản xuất do người làm vườn thường được chú trọng đến hương vị, còn giống do các cơ sở sản xuất thương mại hướng đến hình dạng, kích thước, kháng sâu bệnh, phù hợp cho việc cơ giới hóa thu hái và vận chuyển.&nbsp;<br>&nbsp;</p><figure class=\"media\"><oembed url=\"https://www.youtube.com/watch?v=6cpIuOJ7jXc\"></oembed></figure><p><br>Cà chua phát triển tốt với 7 giờ chiếu sáng mỗi ngày từ ánh sáng mặt trời. Một phân bón NPK với tỷ lệ 5-10-10 thường được bán làm phân bón cà chua hoặc phân bón rau, cả phân hữu cơ cũng được sử dụng.</p>', '2019-05-19'),
(7, '/uploads/IMAGE-1558257401749.jpg', 'Bài viết mới 2', 'Ngò gai là cây cỏ thấp, có thân đơn độc, chia cành ở ngọn, hoa quả mọc ở cành. Lá mọc ở gốc, xoè ra hình hoa thị. Lá hình mác thuôn dài, bìa có răng cưa nhỏ. Hoa tự, hình đầu, hình bầu dục, hoặc hình trụ. Khi trưởng thành, hạt rụng và phát tán, Ăn ngò gai vào mùa đông rất tuyêt và ngon cùng với tô cháo thịt ngon tuyệt vời nếu ai chưa biết\r\n', '<figure class=\"media\"><oembed url=\"https://www.youtube.com/watch?v=stBpQw3Ybmo\"></oembed></figure><p>Mùi tàu là tên gọi của miền Bắc, ngò gai là tên gọi của người miền Nam với loại rau thân thảo, cây đơn lẻ, lá mọc ở gốc xòe ra hình hoa thị, lá hình thuôn có răng cưa, cành chia ở ngọn chứa hoa.&nbsp;<br><br>Hoa hình trụ hoặc hình bầu. Có tác dụng làm rau thơm, chữa bệnh rất tốt.&nbsp;<br><br>Theo Đông Y mùi tàu tình ấm, vị đắng, mùi thơm hắc, có tác dụng tiện kỳ, sơ phong thanh nhiệt, giảm đau, hành khí tiêu thũng, thông khí, giải độc, giải nhiệt, kiện tỳ, kích thích tiêu hoá, khử mùi hôi hiệu quả.&nbsp;<br><br>Do đó, mùi tàu không chỉ dùng làm rau gia vị mà nó còn được dùng như 1 vị thuốc chữa bệnh hữu hiệu trong Đông Y.&nbsp;<br><br>Lá mùi tàu có chứa tới 0,02 – 0,04% tinh dầu bay hơi, rễ chứa saponin…, được dùng ở dạng tươi hoặc khô trong các bài thuốc giảm đau, chữa cảm cúm, cảm lạnh, hôi miệng,…&nbsp;<br><br>&nbsp;</p>', '2019-05-19'),
(9, '/uploads/IMAGE-1558257870525.jpg', '123', ' 123', '<p>123</p>', '2019-05-19'),
(10, '/uploads/image_info-1558423239394.jpg', 'Bài viết mới 3', 'Dền đỏ, dền tía, dền canh hay rau dền, rau giền (danh pháp: Amaranthus tricolor) là loài thực vật có hoa thuộc họ Dền. Loài này được L. mô tả khoa học đầu tiên năm 1753', '<p>Giàu dinh dưỡng&nbsp;<br><br>Như mình đã kể ở trên, rau dền có rất nhiều dưỡng chất. Vì mang đặc tính chung của các họ rau củ màu đỏ, rau dền đỏ chứa hàm lượng vitamin A rất cao, chưa kể đến các vitamin khác như B1, B6, B12.&nbsp;<br><br>Tuy hàm lượng sắt và canxi trong rau dền đỏ khá cao, nhưng rau dền lại không chứa acid oxalic, nên hai chất này được cơ thể hấp thụ và tận dụng dễ dàng, đặc biệt tốt cho các mẹ bầu thiếu chất.&nbsp;<br><br>Điều trị thiếu máu&nbsp;<br><br>Như các bạn đã biết sắt là một trong những nguyên tố vi lượng cần thiết cho cơ thể chúng ta, chất sắt giúp tạo máu để duy trì hoạt động của cơ thể, thiếu sắt đồng nghĩa với tình trạng thiếu máu.&nbsp;<br><br>Rau dền đặc biệt là rau dền đỏ có hàm lượng chất sắt khá cao vì vậy đây chính là nguồn bổ sung chất sắt dồi dào cho cơ thể, rất tốt cho những bệnh nhân thiếu máu do không đủ chất sắt, người bệnh mới ốm dậy, người xanh xao.&nbsp;<br><br>Giải nhiệt&nbsp;<br><br>Vào mùa hè, thời tiết chuyển sang oi bức, người dễ bốc hỏa và nóng trong, nhiệt độ ngoài trời cộng thêm ăn uống không lành mạnh dễ làm cơ thể mệt mỏi. Rau dền là một gợi ý tuyệt vời cho cả gia đình trong những ngày này.&nbsp;<br><br>Chẳng ít thì nhiều, mỗi tuần, chúng mình nên bổ sung từ 2-3 bữa canh rau dền vào thực đơn, để đề phòng nắng nóng ảnh hưởng xấu đến sức khỏe cơ thể.&nbsp;<br><br>Điều trị táo bón&nbsp;<br><br>Táo bón là chứng bệnh mang lại cực kì nhiều khó chịu, nếu không điều trị kịp thời sẽ gây ra những căn bệnh phiền toái hơn. Ấy vậy mà nó lại cực kì dễ xử lý, nếu như chúng ta ăn rau dền luộc hàng ngày.</p>', '2019-05-21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news_image`
--

CREATE TABLE `news_image` (
  `ID` int(11) NOT NULL,
  `LINK` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `NOTE` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `NEWSID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news_info_history`
--

CREATE TABLE `news_info_history` (
  `ID` int(11) NOT NULL,
  `NEWSID` int(11) NOT NULL,
  `CREATED` date NOT NULL,
  `ACTION` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `DETAIL` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `news_info_history`
--

INSERT INTO `news_info_history` (`ID`, `NEWSID`, `CREATED`, `ACTION`, `DETAIL`) VALUES
(1, 6, '2019-05-19', 'Thêm', 'Thêm mới'),
(2, 7, '2019-05-19', 'Thêm', 'Thêm mới'),
(3, 9, '2019-05-19', 'Thêm', 'Thêm mới'),
(4, 10, '2019-05-21', 'Thêm', 'Thêm mới');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news_tag`
--

CREATE TABLE `news_tag` (
  `NEWSID` int(11) NOT NULL,
  `TAGID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `news_tag`
--

INSERT INTO `news_tag` (`NEWSID`, `TAGID`) VALUES
(6, 3),
(6, 4),
(7, 2),
(7, 4),
(9, 2),
(10, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_detail`
--

CREATE TABLE `order_detail` (
  `ORDERINFOID` int(11) NOT NULL,
  `PRODUCTID` int(11) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `TOTALMONEY` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_detail`
--

INSERT INTO `order_detail` (`ORDERINFOID`, `PRODUCTID`, `QUANTITY`, `TOTALMONEY`) VALUES
(1, 1, 1, 230000),
(1, 2, 2, 230000),
(2, 4, 1, 230500),
(2, 5, 1, 200000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_info`
--

CREATE TABLE `order_info` (
  `ID` int(11) NOT NULL,
  `CUSTOMERID` int(11) NOT NULL,
  `CREATED` date NOT NULL,
  `TOTALMONEY` double NOT NULL,
  `STATUS` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_info`
--

INSERT INTO `order_info` (`ID`, `CUSTOMERID`, `CREATED`, `TOTALMONEY`, `STATUS`) VALUES
(1, 1, '2019-05-01', 230000, 1),
(2, 2, '2019-05-01', 230000, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `ID` int(11) NOT NULL,
  `IMAGE` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `CATEGORYID` int(11) NOT NULL,
  `SUBCATEGORYID` int(11) NOT NULL,
  `NAME` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `BRANDID` int(11) NOT NULL,
  `STATUS` tinyint(1) NOT NULL,
  `RATE` int(11) NOT NULL,
  `PRICE` double NOT NULL,
  `ORIGIN` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `KILOGRAM` int(11) NOT NULL,
  `SALE` double NOT NULL,
  `VIPSALE` double NOT NULL,
  `DESCRIPTION` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `INVENTORY` int(11) NOT NULL,
  `CREATED` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`ID`, `IMAGE`, `CATEGORYID`, `SUBCATEGORYID`, `NAME`, `BRANDID`, `STATUS`, `RATE`, `PRICE`, `ORIGIN`, `KILOGRAM`, `SALE`, `VIPSALE`, `DESCRIPTION`, `INVENTORY`, `CREATED`) VALUES
(1, 'https://organicfood.vn/image/cache/catalog/Rau-cu-qua-huu-co/cu-qua-huu-co/ca-chua-organic-195x195.png', 1, 8, 'Cà chua sạch', 3, 1, 4, 36000, 'Việt Nam', 1, 10, 5, 'Sản phẩm cà chua an toàn, và đầy đủ chất dinh dưỡng', 50, '2019-05-21'),
(2, 'https://organicfood.vn/image/cache/catalog/Thit-Trung/Thit-bo/than-noi-bo-uc-195x195.png', 5, 1, 'Thăn nội bò úc - 500g', 3, 1, 5, 210000, 'Úc', 1, 0, 5, 'Thăn nội bò úc được xem là phần lý tưởng nhất để làm món bít tết, vì nó có độ mềm và hương vị đặc sắc nhất. Khi chế biến dưới bất kỳ hình thức nào, bạn không nên cho nhiều gia vị, chỉ cần một ít hạt tiêu và muối là đủ. Nếu cần, có thể thêm một chút dầu ô liu để thêm món ăn thêm phần hấp dẫn .', 10, '2019-05-01'),
(3, 'https://organicfood.vn/image/cache/catalog/Thit-Trung/Thit-bo/thit-dui-bo-uc-195x195.png', 5, 1, 'Thịt đùi gọ bò úc', 3, 1, 3, 295000, 'Úc', 1, 12, 5, 'Thịt đùi gọ bò Úc hay còn gọi là Thick Flank là phần thịt nằm ở đùi bò, có lớp mỡ mỏng bao quanh bên ngoài, có ít gân, đây là phần thịt hoạt động khá nhiều nên chắc thịt hơn các phần khác. Thịt đùi gọ bò Úc thích hợp làm các món thái mỏng như nhúng lẩu, xào, lagu... Thịt đùi gọ bò Úc cung cấp bởi hệ thống cửa hàng và website Organicfood.vn được nhập nguyên con còn sống và giết mổ tại Việt Nam theo đúng tiêu chuẩn ESCAS, vệ sinh an toàn thực phẩm, kiểm dịch. Thịt được đóng gói và hút chân không tiệt trùng , bảo quản bằng tủ mát, vì vậy đảm bảo thịt vẫn giữ hương vị, mùi vị mà không cần bất cứ chất bảo quản nào. Hệ thống cửa hàng của Organicfood.vn được giám sát chặt chẽ và trang bị tủ đông, tủ mát vệ sinh và hoàn toàn đảm bảo về chất lượng. Không như phần lớn thịt bò Úc trên thị trường là bò đông lạnh, khi rã đông sẽ mất đi vị của thịt. Chỉ có tại Organicfood.vn chúng tôi cung cấp thịt tươi ngay sau khi giết mổ từ 1 tới 2 giờ đảm bảo vị ngon nhất của thịt bò vẫn còn nguyên. Organicfood.vn đảm bảo: Không có chất bảo quản, không thức ăn tăng trưởng, không thịt bò bệnh.', 20, '2019-05-05'),
(4, 'https://organicfood.vn/image/cache/catalog/Thuy-Hai-san/ca-tuoi/ca-be-lao-huu-co-phu-quoc-195x195.png', 3, 5, 'Cá bẹ lão phú quốc (kiên giang) - 500g ', 3, 1, 4, 155000, 'Phú Quốc - Việt Nam', 1, 30, 5, 'Đặc điểm nhận dạng: Thân tương đối cao, dài, dẹp bên, đầu nhô cao, vây ngực cong dài, dọc theo phía trên lưng màu ánh xanh, màu bạc và trắng bạc ở phía dưới hông và bụng. Tên thương mại là Diamond Trevally nên có thể thấy cơ thể cá hơi giồng hình kim cương. Đặc tính:  Thịt mềm, ngọt, béo. Các cách chế biến: Canh chua, chiên áp chảo, nấu ngót, hấp, nấu cháo, nấu lẩu.', 10, '2019-05-02'),
(5, 'https://organicfood.vn/image/cache/catalog/Thuy-Hai-san/ca-tuoi/ca-roc-hong-phu-quoc-195x195.png', 3, 5, 'Cá róc hồng phú quốc', 3, 1, 1, 120000, 'Phú Quốc - Việt Nam', 1, 0, 5, 'Cá Róc hồng của Organicfood mỗi con tầm 1-2kg. Thuộc dòng cá hồng biển. Rất đẹp. Màu hồng nhẹ nhàng. Thịt trắng và thơm. Thích hợp các món nướng, rán, nấu lẩu chua', 10, '2019-04-21'),
(6, 'https://organicfood.vn/image/cache/catalog/Trai-cay-huu-co/trai-cay-Viet-Nam/bo-huu-co-195x195.png', 2, 11, 'Bơ sáp Đắk Lắk - 1KG', 3, 1, 2, 120000, 'Đắk Lắk - Việt Nam', 1, 8, 5, 'Bơ DakLak tại Organic được chọn lựa kỹ càng từ chính nông trại của Organic, đảm bảo sạch, không hóa chất, không thuốc tăng trưởng, các chất làm biến đổi gen. Có nhiều size theo cân nặng, đáp ứng đủ các nhu cầu của khách hàng,… Bơ trái to, thịt bơ béo ngậy, ruột vàng hấp dẫn,…', 20, '2019-03-23'),
(7, 'https://organicfood.vn/image/cache/catalog/Trai-cay-huu-co/Trai-cay-NK/cam-vang-uc-195x195.png', 2, 12, 'Cam vàng hữu cơ úc - 1KG', 4, 1, 5, 145000, 'Úc', 1, 10, 5, 'Tăng cường thể lực sau khi tập luyện thể thao, uống một cốc nước cam bỏ thêm chút muối là cách hữu hiệu để bạn lấy lại thể lực nhanh chóng. Bởi lượng đường và lượng nước có trong cam sẽ nhanh chóng được cơ thể hấp thụ, có tác dụng giải khát và bồi bổ thể lực. Ngay sau khi ép lấy nước hoặc đã gọt vỏ nên uống hoặc ăn ngay, không nên để quá 30 phút để tránh lượng vitamin C sẽ bị bay mất khi phản ứng với oxy ngoài môi trường.   Tăng cường miễn dịch   Ăn cam sẽ có tác dụng bổ sung chất dinh dưỡng, tăng cường hệ miễn dịch cho cơ thể, giúp người bệnh nhanh phục hồi sức khỏe, nhanh lành vết thương. Đặc biệt là bổ sung chất xơ, có lợi cho tiêu hóa. Đặc biệt, đối với những người hút thuốc nên ăn nhiều cam, những bệnh nhân mắc viêm ruột, viêm túi mật nên thận trọng khi ăn cam.   Ngăn ngừa xơ cứng động mạch   Nếu thường xuyên ăn cam, tiêu thụ vitamin C sẽ giúp phát triển chậm bệnh xơ cứng động mạch.   Phòng chống ung thư   Trong quả cam có chứa hợp chất liminoid giúp cơ thể chống lại ung thư miệng, da, phổi, núi đôi, dạ dày và ruột kết. Ngoài ra, các vitamin C cao có trong cam cũng như là một chất chống oxy hóa tốt để bảo vệ các tế bào cơ thể.   Giảm cholesterol Cam vàng hữu cơ là loại quả phổ biến nhất và là nguồn tuyệt vời cung cấp vitamin C, đồng thời cam cũng chứa các hợp chất khác có thể giúp giảm sản xuất cholesterol ở gan. Cam có đầy đủ các chất được gọi là phytosterols (sterol thực vật), một loại chất béo được tìm thấy trong các loại hạt, trái cây và rau quả. Những sterol này chặn cholesterol không cho các tế bào trong ruột hấp thụ. Ngăn ngừa táo bón   Quả cam có có vị chua ngọt nên nó thực sự có tác dụng trong hệ thống tiêu hóa, giúp kích thích tiêu hóa, làm giảm táo bón.   Tăng cường “sức mạnh” đàn ông   Mỗi ngày một trái cam là đủ cho một nam giới có thể để giữ tinh trùng của mình khỏe mạnh. Ngoài ra, vitamin C, một chất chống oxy hóa trong trái cam giúp bảo vệ tinh trùng khỏi sự thiệt hại do yếu tố di truyền hoặc dị tật bẩm sinh gây nên.   Tốt cho tim mạch   Một l', 13, '2019-05-24'),
(8, 'https://organicfood.vn/image/cache/catalog/Trai-cay-huu-co/Trai-cay-NK/cherry-uc-195x195.png', 2, 12, 'Cherry đỏ mỹ - 500gram', 4, 1, 3, 325000, 'Mỹ', 1, 0, 5, '1.Xuất sứ : -Quả Cherry Mỹ được canh tác chủ yếu ở vùng Bakerfield, Arvin, Lodi, Stockton và Linden nơi khí hậu ấm áp,khô nóng , thích hợp để cây cherry phát triển ,quả cherry ở đây được tắm no nắng nên ngọt đậm đà,hương quyến rũ. -Trái Cherry căng mọng đẹp mắt là loại hoa quả nhập khẩu đắt tiền nên thường được sử dụng làm quà biếu.   2.Đặc điểm :   -Cherry là một chủng loài cây rụng lá,thân gỗ ,cây lùn ,tán rậm.Nó được trồng chủ yếu ở vùng ôn đới,cần khoảng 200-1500 giờ ngủ đông,tuy nhiên quả cherry lại rất cần tắm no nắng để đạt được màu sắc ,cũng như hương vị hoàn hảo.   -Trái cherry được đánh giá là khó trồng,giá cũng vì thế mà chẳng hề dễ chịu.Theo nhiều chuyên gia thì quả cherry Mỹ cho chất lượng tốt nhất từ màu sắc,hương vị tới giá trị dinh dưỡng.   -Thông thường mùa thu hoạch cherry là từ tháng 5-> 8 .Do thân cây thấp nên nhiều nơi ở Mỹ mở dịch vụ cho trải nghiệm hái và ăn cherry tại vườn.Những trái cherry Mỹ tươi ngon,an toàn quả thực quá hấp dẫn.   -Quả cherry Mỹ da láng bóng,thịt chắc,màu vàng đỏ tươi,khi chín ngả màu tím tía rất đẹp.Thịt cherry mọng,óng ả như ngọc bích ,ăn giòn ngọt, đậm đà,hương thơm dịu nhẹ thư thái,hạt róc không dính.   3.Công Dụng:   -Quả cherry rất nhiều năng lượng lấy từ calo tự nhiên giúp tâm trạng vui vẻ,hưng phấn.   -Ăn cherry thường xuyên cải thiện tình trạng mất ngủ. Cherry chứa melatonin làm cho giấc ngủ sâu và ngon hơn lại không hại sức khỏe như nhiều loại thuốc.   -Hàm lượng vitamin A có trong trái cherry được tính toán là cao gấp 20 lần so với dâu tây hay việt quất.Không chỉ tốt cho mắt ăn quả cherry Mỹ hàng ngày còn làm làn da sáng mịn,căng tràn nhựa sống   -Cherry rất giàu chất chống oxi hóa mạnh anthocyanins không cải thiện tình trạng mất trí nhớ,còn ngăn ngừa ung thư , làm chậm lão hóa,nếp nhăn vì thế mà lâu xuất hiện   -Trái cherry còn vô cùng tốt cho tim mạch, giảm viêm nhiễm xương khớp, đau nhức cơ nên được nhiều vận động viên ưa chuộng.Lượng chất sơ dồi dào trong cherry hỗ trợ tốt cho tiêu hóa.   4.Sử dụng:   -Quả ', 20, '2019-05-05'),
(9, 'https://organicfood.vn/image/cache/catalog/Trai-cay-huu-co/Trai-cay-NK/cherry-new-zealand-195x195.png', 2, 12, 'cherry new zealand - 500g', 4, 1, 4, 325000, 'New Zealand', 1, 50, 5, '1. Cherry New Zealand Cherry New Zealand vỏ màu đỏ sẫm, quả căng mọng, chắc, bóng, vị ngọt. Những quả Cherry New Zealand căng bóng luôn là mặt hàng được khách hàng Việt Nam đặc biệt ưa chuộng, một đặc sản đắt tiền và thường dùng để làm quà biếu. 2. Mùa vụ  Cherry New Zealand chỉ có vào dịp cuối năm, từ  tháng 12 – tháng 2 năm sau. 3. Giá trị dinh dưỡng Cherry là nguồn vitamin A tuyệt vời, là loại trái cây giàu chất sắt, chất xơ cao, không cholesterol và Natri, tốt cho hệ miễn dịch, tiêu hóa và làm đẹp da. Cherry chống oxy hóa rất tốt cho tim mạch, giúp bảo vệ cơ thể chống lại bệnh ung thư và nó hoạt động như một loại thuốc giảm đau và giảm viêm cho các bệnh nhân gút và khớp. Cherry chứa melatonin – một chất giúp điều hòa giấc ngủ nên nó có thể giúp ngủ ngon. Cherry cũng là một món ăn nhẹ tốt cho sức khỏe mà trẻ em yêu thích. Cherry được ví là “Kim cương của hoa quả”, chính là một thực phẩm quý khách cần bổ sung vào thực đơn của mình. 4. Quá trình chăm sóc cherry Tại New Zealand nhiệt độ giữa mùa đông và mùa hè chênh lệch khá cao nên đã tạo điều kiện tốt cho cây Cherry phát triển và cho những trái Cherry ngon nhất thế giới. Vào mùa xuân, tất cả các giống Cherry đang nhanh chóng nở hoa rực rỡ, cả vườn Cherry trông như một bức tranh với những bông hoa khoe sắc thật ấn tượng.', 10, '2019-02-15'),
(10, 'https://organicfood.vn/image/cache/catalog/Trai-cay-huu-co/trai-cay-Viet-Nam/chanh-day-huu-co-195x195.png', 2, 12, 'Chanh dây Gia Lai', 1, 1, 5, 295000, 'Mỹ', 1, 15, 5, '1. Giống và chủng loại Các chủng Nho Xanh Mỹ phổ biến gồm có: Thompson (T6 - T1) , Princess có hạt (T6 - T11), Pristine , Autumn King. Nho xanh không hạt Mỹ quả dài, màu xanh hổ phách, vị ngọt mát, rất giòn và đặc biệt là không có hạt.   2.  Xuất xứ và mùa vụ Xuất xứ: Mỹ Mùa vụ: Nho Xanh Mỹ từ tháng 5 đến tháng 1 năm sau. 3. Thông tin dinh dưỡng Nho tươi với tất cả các màu như đỏ, xanh và đen đều chứa hợp chất chống oxi hóa tự nhiên giúp cho tim khỏe mạnh, nho còn có khả năng chống ung thư và duy trì sức khỏe của não. Nho xanh cũng có chứa chất chống oxy hóa. Một nghiên cứu mới đây khi nhìn vào tổng khả năng chống oxy hóa (theo như cách đo của ORAC) đã tìm thấy mức độ chênh lệch đáng kể của nho xanh và nho đỏ: khả năng chống oxy hóa của nho đỏ là 2016 trong khi của nho xanh là 1789. Ngoài ra nho xanh còn có một loại enzim hỗ trợ đường tiêu hóa, việc ăn nho thường xuyên cũng giúp cho phụ nữ có làn da sáng và săn chắc. 4.  Lưu ý bảo quản và sử dụng Nho xanh khó bảo quản hơn so với nho đen và nho đỏ. Nho xanh không hạt Mỹ rất nhạy cảm, khi vận chuyển đi xa nên để vào hộp cẩn thận để nho không bị rụng. Khi đã rụng, nho rất dễ bị xâm nhập từ cuống bởi vi khuẩn dẫn đến quả nho bị mềm và hỏng. Luôn luôn để nho chưa rửa trong hộp kín vào tủ lạnh với nhiệt độ khoảng 0 - 4 độ C. Chỉ nên rửa trước khi ăn hoặc chế biến để không làm đi lớp phấn phủ tự nhiên của quả Nho. Nho thường dùng để ăn tươi hoặc ép nước.   5.  Quá trình chăm sóc Tại Mỹ, các trang trại trồng nho có diện tích từ hàng trăm đến hàng ngàn hecta. Những trang trại này thường được chăm sóc rất cẩn thận. Người ta thường bảo vệ vườn bằng những hàng rào và lớp lưới để tránh sự phá hoại của chim chóc cũng như các loài côn trùng có hại. Nho được trồng tại các vùng thung lũng màu mỡ có khí hậu ôn đới với đặc điểm ngày nóng, đêm lạnh. Sau khi ngủ đông 3 tháng trong thời tiết lạnh, nho sẽ chồi lộc, ra hoa kết trái vào mùa xuân. ', 30, '2019-05-11'),
(11, '\\uploads\\img_1-1558156368947.png', 1, 8, 'qui test', 1, 1, 0, 1, 'Việt Nam', 1, 1, 0, '<p>uhuhuhuhuhuhu</p>\r\n', 1, '2019-05-12'),
(12, '\\uploads\\img_1-1558354294184.png', 2, 11, '33', 2, 1, 0, 3, 'Trung Quốc', 3, 3, 0, '<p>333</p>\r\n', 3, '2019-05-14'),
(13, '\\uploads\\img_1-1558358270579.jpg', 1, 8, 'qui', 1, 1, 0, 3333, 'Việt Nam', 3, 1, 0, '<p>rr</p>\r\n', 3, '2019-05-03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_combo`
--

CREATE TABLE `product_combo` (
  `ID` int(11) NOT NULL,
  `PRODUCTID1` int(11) NOT NULL,
  `PRODUCTID2` int(11) NOT NULL,
  `PRODUCTID3` int(11) NOT NULL,
  `NAME` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `STATUS` tinyint(1) NOT NULL,
  `RATE` int(11) NOT NULL,
  `PRICE` double NOT NULL,
  `KILOGRAM` int(11) NOT NULL,
  `SALE` double NOT NULL,
  `VIPSALE` double NOT NULL,
  `DESCRIPTION` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `INVENTORY` int(11) NOT NULL,
  `CREATED` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_combo`
--

INSERT INTO `product_combo` (`ID`, `PRODUCTID1`, `PRODUCTID2`, `PRODUCTID3`, `NAME`, `STATUS`, `RATE`, `PRICE`, `KILOGRAM`, `SALE`, `VIPSALE`, `DESCRIPTION`, `INVENTORY`, `CREATED`) VALUES
(1, 8, 9, 10, 'Combo trái cây mùa hè', 1, 3, 325000, 1, 0, 5, '1.Xuất sứ : -Quả Cherry Mỹ được canh tác chủ yếu ở vùng Bakerfield, Arvin, Lodi, Stockton và Linden nơi khí hậu ấm áp,khô nóng , thích hợp để cây cherry phát triển ,quả cherry ở đây được tắm no nắng nên ngọt đậm đà,hương quyến rũ. -Trái Cherry căng mọng đẹp mắt là loại hoa quả nhập khẩu đắt tiền nên thường được sử dụng làm quà biếu.   2.Đặc điểm :   -Cherry là một chủng loài cây rụng lá,thân gỗ ,cây lùn ,tán rậm.Nó được trồng chủ yếu ở vùng ôn đới,cần khoảng 200-1500 giờ ngủ đông,tuy nhiên quả cherry lại rất cần tắm no nắng để đạt được màu sắc ,cũng như hương vị hoàn hảo.   -Trái cherry được đánh giá là khó trồng,giá cũng vì thế mà chẳng hề dễ chịu.Theo nhiều chuyên gia thì quả cherry Mỹ cho chất lượng tốt nhất từ màu sắc,hương vị tới giá trị dinh dưỡng.   -Thông thường mùa thu hoạch cherry là từ tháng 5-> 8 .Do thân cây thấp nên nhiều nơi ở Mỹ mở dịch vụ cho trải nghiệm hái và ăn cherry tại vườn.Những trái cherry Mỹ tươi ngon,an toàn quả thực quá hấp dẫn.   -Quả cherry Mỹ da láng bóng,thịt chắc,màu vàng đỏ tươi,khi chín ngả màu tím tía rất đẹp.Thịt cherry mọng,óng ả như ngọc bích ,ăn giòn ngọt, đậm đà,hương thơm dịu nhẹ thư thái,hạt róc không dính.   3.Công Dụng:   -Quả cherry rất nhiều năng lượng lấy từ calo tự nhiên giúp tâm trạng vui vẻ,hưng phấn.   -Ăn cherry thường xuyên cải thiện tình trạng mất ngủ. Cherry chứa melatonin làm cho giấc ngủ sâu và ngon hơn lại không hại sức khỏe như nhiều loại thuốc.   -Hàm lượng vitamin A có trong trái cherry được tính toán là cao gấp 20 lần so với dâu tây hay việt quất.Không chỉ tốt cho mắt ăn quả cherry Mỹ hàng ngày còn làm làn da sáng mịn,căng tràn nhựa sống   -Cherry rất giàu chất chống oxi hóa mạnh anthocyanins không cải thiện tình trạng mất trí nhớ,còn ngăn ngừa ung thư , làm chậm lão hóa,nếp nhăn vì thế mà lâu xuất hiện   -Trái cherry còn vô cùng tốt cho tim mạch, giảm viêm nhiễm xương khớp, đau nhức cơ nên được nhiều vận động viên ưa chuộng.Lượng chất sơ dồi dào trong cherry hỗ trợ tốt cho tiêu hóa.   4.Sử dụng:   -Quả ', 20, '2019-05-11'),
(2, 5, 2, 3, 'Combo giải nhiệt mùa hè cho 5 người', 1, 3, 325000, 1, 6, 5, '1.Xuất sứ : -Quả Cherry Mỹ được canh tác chủ yếu ở vùng Bakerfield, Arvin, Lodi, Stockton và Linden nơi khí hậu ấm áp,khô nóng , thích hợp để cây cherry phát triển ,quả cherry ở đây được tắm no nắng nên ngọt đậm đà,hương quyến rũ. -Trái Cherry căng mọng đẹp mắt là loại hoa quả nhập khẩu đắt tiền nên thường được sử dụng làm quà biếu. 2.Đặc điểm : -Cherry là một chủng loài cây rụng lá,thân gỗ ,cây lùn ,tán rậm.Nó được trồng chủ yếu ở vùng ôn đới,cần khoảng 200-1500 giờ ngủ đông,tuy nhiên quả cherry lại rất cần tắm no nắng để đạt được màu sắc ,cũng như hương vị hoàn hảo. -Trái cherry được đánh giá là khó trồng,giá cũng vì thế mà chẳng hề dễ chịu.Theo nhiều chuyên gia thì quả cherry Mỹ cho chất lượng tốt nhất từ màu sắc,hương vị tới giá trị dinh dưỡng. -Thông thường mùa thu hoạch cherry là từ tháng 5-> 8 .Do thân cây thấp nên nhiều nơi ở Mỹ mở dịch vụ cho trải nghiệm hái và ăn cherry tại vườn.Những trái cherry Mỹ tươi ngon,an toàn quả thực quá hấp dẫn. -Quả cherry Mỹ da láng bóng,thịt chắc,màu vàng đỏ tươi,khi chín ngả màu tím tía rất đẹp.Thịt cherry mọng,óng ả như ngọc bích ,ăn giòn ngọt, đậm đà,hương thơm dịu nhẹ thư thái,hạt róc không dính. 3.Công Dụng: -Quả cherry rất nhiều năng lượng lấy từ calo tự nhiên giúp tâm trạng vui vẻ,hưng phấn. -Ăn cherry thường xuyên cải thiện tình trạng mất ngủ. Cherry chứa melatonin làm cho giấc ngủ sâu và ngon hơn lại không hại sức khỏe như nhiều loại thuốc. -Hàm lượng vitamin A có trong trái cherry được tính toán là cao gấp 20 lần so với dâu tây hay việt quất.Không chỉ tốt cho mắt ăn quả cherry Mỹ hàng ngày còn làm làn da sáng mịn,căng tràn nhựa sống -Cherry rất giàu chất chống oxi hóa mạnh anthocyanins không cải thiện tình trạng mất trí nhớ,còn ngăn ngừa ung thư , làm chậm lão hóa,nếp nhăn vì thế mà lâu xuất hiện -Trái cherry còn vô cùng tốt cho tim mạch, giảm viêm nhiễm xương khớp, đau nhức cơ nên được nhiều vận động viên ưa chuộng.Lượng chất sơ dồi dào trong cherry hỗ trợ tốt cho tiêu hóa. 4.Sử dụng: -Quả ', 20, '2019-04-20'),
(3, 2, 3, 4, 'Combo rau củ quả dành cho dành cho gia đình\r\n4 người cực đã\r\n', 1, 3, 350000, 5, 12, 15, '1.Xuất sứ : -Quả Cherry Mỹ được canh tác chủ yếu ở vùng Bakerfield, Arvin, Lodi, Stockton và Linden nơi khí hậu ấm áp,khô nóng , thích hợp để cây cherry phát triển ,quả cherry ở đây được tắm no nắng nên ngọt đậm đà,hương quyến rũ. -Trái Cherry căng mọng đẹp mắt là loại hoa quả nhập khẩu đắt tiền nên thường được sử dụng làm quà biếu. 2.Đặc điểm : -Cherry là một chủng loài cây rụng lá,thân gỗ ,cây lùn ,tán rậm.Nó được trồng chủ yếu ở vùng ôn đới,cần khoảng 200-1500 giờ ngủ đông,tuy nhiên quả cherry lại rất cần tắm no nắng để đạt được màu sắc ,cũng như hương vị hoàn hảo. -Trái cherry được đánh giá là khó trồng,giá cũng vì thế mà chẳng hề dễ chịu.Theo nhiều chuyên gia thì quả cherry Mỹ cho chất lượng tốt nhất từ màu sắc,hương vị tới giá trị dinh dưỡng. -Thông thường mùa thu hoạch cherry là từ tháng 5-> 8 .Do thân cây thấp nên nhiều nơi ở Mỹ mở dịch vụ cho trải nghiệm hái và ăn cherry tại vườn.Những trái cherry Mỹ tươi ngon,an toàn quả thực quá hấp dẫn. -Quả cherry Mỹ da láng bóng,thịt chắc,màu vàng đỏ tươi,khi chín ngả màu tím tía rất đẹp.Thịt cherry mọng,óng ả như ngọc bích ,ăn giòn ngọt, đậm đà,hương thơm dịu nhẹ thư thái,hạt róc không dính. 3.Công Dụng: -Quả cherry rất nhiều năng lượng lấy từ calo tự nhiên giúp tâm trạng vui vẻ,hưng phấn. -Ăn cherry thường xuyên cải thiện tình trạng mất ngủ. Cherry chứa melatonin làm cho giấc ngủ sâu và ngon hơn lại không hại sức khỏe như nhiều loại thuốc. -Hàm lượng vitamin A có trong trái cherry được tính toán là cao gấp 20 lần so với dâu tây hay việt quất.Không chỉ tốt cho mắt ăn quả cherry Mỹ hàng ngày còn làm làn da sáng mịn,căng tràn nhựa sống -Cherry rất giàu chất chống oxi hóa mạnh anthocyanins không cải thiện tình trạng mất trí nhớ,còn ngăn ngừa ung thư , làm chậm lão hóa,nếp nhăn vì thế mà lâu xuất hiện -Trái cherry còn vô cùng tốt cho tim mạch, giảm viêm nhiễm xương khớp, đau nhức cơ nên được nhiều vận động viên ưa chuộng.Lượng chất sơ dồi dào trong cherry hỗ trợ tốt cho tiêu hóa. 4.Sử dụng: -Quả ', 23, '2019-03-11'),
(4, 5, 2, 1, 'Combo 5 người cho người sành ăn hải sản', 1, 4, 750000, 12, 6, 14, '1.Xuất sứ : -Quả Cherry Mỹ được canh tác chủ yếu ở vùng Bakerfield, Arvin, Lodi, Stockton và Linden nơi khí hậu ấm áp,khô nóng , thích hợp để cây cherry phát triển ,quả cherry ở đây được tắm no nắng nên ngọt đậm đà,hương quyến rũ. -Trái Cherry căng mọng đẹp mắt là loại hoa quả nhập khẩu đắt tiền nên thường được sử dụng làm quà biếu. 2.Đặc điểm : -Cherry là một chủng loài cây rụng lá,thân gỗ ,cây lùn ,tán rậm.Nó được trồng chủ yếu ở vùng ôn đới,cần khoảng 200-1500 giờ ngủ đông,tuy nhiên quả cherry lại rất cần tắm no nắng để đạt được màu sắc ,cũng như hương vị hoàn hảo. -Trái cherry được đánh giá là khó trồng,giá cũng vì thế mà chẳng hề dễ chịu.Theo nhiều chuyên gia thì quả cherry Mỹ cho chất lượng tốt nhất từ màu sắc,hương vị tới giá trị dinh dưỡng. -Thông thường mùa thu hoạch cherry là từ tháng 5-> 8 .Do thân cây thấp nên nhiều nơi ở Mỹ mở dịch vụ cho trải nghiệm hái và ăn cherry tại vườn.Những trái cherry Mỹ tươi ngon,an toàn quả thực quá hấp dẫn. -Quả cherry Mỹ da láng bóng,thịt chắc,màu vàng đỏ tươi,khi chín ngả màu tím tía rất đẹp.Thịt cherry mọng,óng ả như ngọc bích ,ăn giòn ngọt, đậm đà,hương thơm dịu nhẹ thư thái,hạt róc không dính. 3.Công Dụng: -Quả cherry rất nhiều năng lượng lấy từ calo tự nhiên giúp tâm trạng vui vẻ,hưng phấn. -Ăn cherry thường xuyên cải thiện tình trạng mất ngủ. Cherry chứa melatonin làm cho giấc ngủ sâu và ngon hơn lại không hại sức khỏe như nhiều loại thuốc. -Hàm lượng vitamin A có trong trái cherry được tính toán là cao gấp 20 lần so với dâu tây hay việt quất.Không chỉ tốt cho mắt ăn quả cherry Mỹ hàng ngày còn làm làn da sáng mịn,căng tràn nhựa sống -Cherry rất giàu chất chống oxi hóa mạnh anthocyanins không cải thiện tình trạng mất trí nhớ,còn ngăn ngừa ung thư , làm chậm lão hóa,nếp nhăn vì thế mà lâu xuất hiện -Trái cherry còn vô cùng tốt cho tim mạch, giảm viêm nhiễm xương khớp, đau nhức cơ nên được nhiều vận động viên ưa chuộng.Lượng chất sơ dồi dào trong cherry hỗ trợ tốt cho tiêu hóa. 4.Sử dụng: -Quả ', 8, '2019-04-12'),
(5, 1, 2, 6, 'combo thịt cho gia đình 8 người ăn', 1, 6, 360000, 14, 0, 6, '1.Xuất sứ : -Quả Cherry Mỹ được canh tác chủ yếu ở vùng Bakerfield, Arvin, Lodi, Stockton và Linden nơi khí hậu ấm áp,khô nóng , thích hợp để cây cherry phát triển ,quả cherry ở đây được tắm no nắng nên ngọt đậm đà,hương quyến rũ. -Trái Cherry căng mọng đẹp mắt là loại hoa quả nhập khẩu đắt tiền nên thường được sử dụng làm quà biếu. 2.Đặc điểm : -Cherry là một chủng loài cây rụng lá,thân gỗ ,cây lùn ,tán rậm.Nó được trồng chủ yếu ở vùng ôn đới,cần khoảng 200-1500 giờ ngủ đông,tuy nhiên quả cherry lại rất cần tắm no nắng để đạt được màu sắc ,cũng như hương vị hoàn hảo. -Trái cherry được đánh giá là khó trồng,giá cũng vì thế mà chẳng hề dễ chịu.Theo nhiều chuyên gia thì quả cherry Mỹ cho chất lượng tốt nhất từ màu sắc,hương vị tới giá trị dinh dưỡng. -Thông thường mùa thu hoạch cherry là từ tháng 5-> 8 .Do thân cây thấp nên nhiều nơi ở Mỹ mở dịch vụ cho trải nghiệm hái và ăn cherry tại vườn.Những trái cherry Mỹ tươi ngon,an toàn quả thực quá hấp dẫn. -Quả cherry Mỹ da láng bóng,thịt chắc,màu vàng đỏ tươi,khi chín ngả màu tím tía rất đẹp.Thịt cherry mọng,óng ả như ngọc bích ,ăn giòn ngọt, đậm đà,hương thơm dịu nhẹ thư thái,hạt róc không dính. 3.Công Dụng: -Quả cherry rất nhiều năng lượng lấy từ calo tự nhiên giúp tâm trạng vui vẻ,hưng phấn. -Ăn cherry thường xuyên cải thiện tình trạng mất ngủ. Cherry chứa melatonin làm cho giấc ngủ sâu và ngon hơn lại không hại sức khỏe như nhiều loại thuốc. -Hàm lượng vitamin A có trong trái cherry được tính toán là cao gấp 20 lần so với dâu tây hay việt quất.Không chỉ tốt cho mắt ăn quả cherry Mỹ hàng ngày còn làm làn da sáng mịn,căng tràn nhựa sống -Cherry rất giàu chất chống oxi hóa mạnh anthocyanins không cải thiện tình trạng mất trí nhớ,còn ngăn ngừa ung thư , làm chậm lão hóa,nếp nhăn vì thế mà lâu xuất hiện -Trái cherry còn vô cùng tốt cho tim mạch, giảm viêm nhiễm xương khớp, đau nhức cơ nên được nhiều vận động viên ưa chuộng.Lượng chất sơ dồi dào trong cherry hỗ trợ tốt cho tiêu hóa. 4.Sử dụng: -Quả ', 12, '2019-02-22'),
(6, 1, 2, 4, 'combo rau xanh cho cả gia đình mùa hè', 1, 6, 632000, 7, 0, 14, '1.Xuất sứ : -Quả Cherry Mỹ được canh tác chủ yếu ở vùng Bakerfield, Arvin, Lodi, Stockton và Linden nơi khí hậu ấm áp,khô nóng , thích hợp để cây cherry phát triển ,quả cherry ở đây được tắm no nắng nên ngọt đậm đà,hương quyến rũ. -Trái Cherry căng mọng đẹp mắt là loại hoa quả nhập khẩu đắt tiền nên thường được sử dụng làm quà biếu. 2.Đặc điểm : -Cherry là một chủng loài cây rụng lá,thân gỗ ,cây lùn ,tán rậm.Nó được trồng chủ yếu ở vùng ôn đới,cần khoảng 200-1500 giờ ngủ đông,tuy nhiên quả cherry lại rất cần tắm no nắng để đạt được màu sắc ,cũng như hương vị hoàn hảo. -Trái cherry được đánh giá là khó trồng,giá cũng vì thế mà chẳng hề dễ chịu.Theo nhiều chuyên gia thì quả cherry Mỹ cho chất lượng tốt nhất từ màu sắc,hương vị tới giá trị dinh dưỡng. -Thông thường mùa thu hoạch cherry là từ tháng 5-> 8 .Do thân cây thấp nên nhiều nơi ở Mỹ mở dịch vụ cho trải nghiệm hái và ăn cherry tại vườn.Những trái cherry Mỹ tươi ngon,an toàn quả thực quá hấp dẫn. -Quả cherry Mỹ da láng bóng,thịt chắc,màu vàng đỏ tươi,khi chín ngả màu tím tía rất đẹp.Thịt cherry mọng,óng ả như ngọc bích ,ăn giòn ngọt, đậm đà,hương thơm dịu nhẹ thư thái,hạt róc không dính. 3.Công Dụng: -Quả cherry rất nhiều năng lượng lấy từ calo tự nhiên giúp tâm trạng vui vẻ,hưng phấn. -Ăn cherry thường xuyên cải thiện tình trạng mất ngủ. Cherry chứa melatonin làm cho giấc ngủ sâu và ngon hơn lại không hại sức khỏe như nhiều loại thuốc. -Hàm lượng vitamin A có trong trái cherry được tính toán là cao gấp 20 lần so với dâu tây hay việt quất.Không chỉ tốt cho mắt ăn quả cherry Mỹ hàng ngày còn làm làn da sáng mịn,căng tràn nhựa sống -Cherry rất giàu chất chống oxi hóa mạnh anthocyanins không cải thiện tình trạng mất trí nhớ,còn ngăn ngừa ung thư , làm chậm lão hóa,nếp nhăn vì thế mà lâu xuất hiện -Trái cherry còn vô cùng tốt cho tim mạch, giảm viêm nhiễm xương khớp, đau nhức cơ nên được nhiều vận động viên ưa chuộng.Lượng chất sơ dồi dào trong cherry hỗ trợ tốt cho tiêu hóa. 4.Sử dụng: -Quả ', 12, '2019-01-11'),
(7, 3, 5, 7, 'combo trái cây mùa hè', 1, 6, 360000, 10, 3, 9, '1.Xuất sứ : -Quả Cherry Mỹ được canh tác chủ yếu ở vùng Bakerfield, Arvin, Lodi, Stockton và Linden nơi khí hậu ấm áp,khô nóng , thích hợp để cây cherry phát triển ,quả cherry ở đây được tắm no nắng nên ngọt đậm đà,hương quyến rũ. -Trái Cherry căng mọng đẹp mắt là loại hoa quả nhập khẩu đắt tiền nên thường được sử dụng làm quà biếu. 2.Đặc điểm : -Cherry là một chủng loài cây rụng lá,thân gỗ ,cây lùn ,tán rậm.Nó được trồng chủ yếu ở vùng ôn đới,cần khoảng 200-1500 giờ ngủ đông,tuy nhiên quả cherry lại rất cần tắm no nắng để đạt được màu sắc ,cũng như hương vị hoàn hảo. -Trái cherry được đánh giá là khó trồng,giá cũng vì thế mà chẳng hề dễ chịu.Theo nhiều chuyên gia thì quả cherry Mỹ cho chất lượng tốt nhất từ màu sắc,hương vị tới giá trị dinh dưỡng. -Thông thường mùa thu hoạch cherry là từ tháng 5-> 8 .Do thân cây thấp nên nhiều nơi ở Mỹ mở dịch vụ cho trải nghiệm hái và ăn cherry tại vườn.Những trái cherry Mỹ tươi ngon,an toàn quả thực quá hấp dẫn. -Quả cherry Mỹ da láng bóng,thịt chắc,màu vàng đỏ tươi,khi chín ngả màu tím tía rất đẹp.Thịt cherry mọng,óng ả như ngọc bích ,ăn giòn ngọt, đậm đà,hương thơm dịu nhẹ thư thái,hạt róc không dính. 3.Công Dụng: -Quả cherry rất nhiều năng lượng lấy từ calo tự nhiên giúp tâm trạng vui vẻ,hưng phấn. -Ăn cherry thường xuyên cải thiện tình trạng mất ngủ. Cherry chứa melatonin làm cho giấc ngủ sâu và ngon hơn lại không hại sức khỏe như nhiều loại thuốc. -Hàm lượng vitamin A có trong trái cherry được tính toán là cao gấp 20 lần so với dâu tây hay việt quất.Không chỉ tốt cho mắt ăn quả cherry Mỹ hàng ngày còn làm làn da sáng mịn,căng tràn nhựa sống -Cherry rất giàu chất chống oxi hóa mạnh anthocyanins không cải thiện tình trạng mất trí nhớ,còn ngăn ngừa ung thư , làm chậm lão hóa,nếp nhăn vì thế mà lâu xuất hiện -Trái cherry còn vô cùng tốt cho tim mạch, giảm viêm nhiễm xương khớp, đau nhức cơ nên được nhiều vận động viên ưa chuộng.Lượng chất sơ dồi dào trong cherry hỗ trợ tốt cho tiêu hóa. 4.Sử dụng: -Quả ', 2, '2018-12-22'),
(8, 2, 4, 6, 'combo hải sản cho 8 người', 1, 6, 890000, 20, 6, 12, '1.Xuất sứ : -Quả Cherry Mỹ được canh tác chủ yếu ở vùng Bakerfield, Arvin, Lodi, Stockton và Linden nơi khí hậu ấm áp,khô nóng , thích hợp để cây cherry phát triển ,quả cherry ở đây được tắm no nắng nên ngọt đậm đà,hương quyến rũ. -Trái Cherry căng mọng đẹp mắt là loại hoa quả nhập khẩu đắt tiền nên thường được sử dụng làm quà biếu. 2.Đặc điểm : -Cherry là một chủng loài cây rụng lá,thân gỗ ,cây lùn ,tán rậm.Nó được trồng chủ yếu ở vùng ôn đới,cần khoảng 200-1500 giờ ngủ đông,tuy nhiên quả cherry lại rất cần tắm no nắng để đạt được màu sắc ,cũng như hương vị hoàn hảo. -Trái cherry được đánh giá là khó trồng,giá cũng vì thế mà chẳng hề dễ chịu.Theo nhiều chuyên gia thì quả cherry Mỹ cho chất lượng tốt nhất từ màu sắc,hương vị tới giá trị dinh dưỡng. -Thông thường mùa thu hoạch cherry là từ tháng 5-> 8 .Do thân cây thấp nên nhiều nơi ở Mỹ mở dịch vụ cho trải nghiệm hái và ăn cherry tại vườn.Những trái cherry Mỹ tươi ngon,an toàn quả thực quá hấp dẫn. -Quả cherry Mỹ da láng bóng,thịt chắc,màu vàng đỏ tươi,khi chín ngả màu tím tía rất đẹp.Thịt cherry mọng,óng ả như ngọc bích ,ăn giòn ngọt, đậm đà,hương thơm dịu nhẹ thư thái,hạt róc không dính. 3.Công Dụng: -Quả cherry rất nhiều năng lượng lấy từ calo tự nhiên giúp tâm trạng vui vẻ,hưng phấn. -Ăn cherry thường xuyên cải thiện tình trạng mất ngủ. Cherry chứa melatonin làm cho giấc ngủ sâu và ngon hơn lại không hại sức khỏe như nhiều loại thuốc. -Hàm lượng vitamin A có trong trái cherry được tính toán là cao gấp 20 lần so với dâu tây hay việt quất.Không chỉ tốt cho mắt ăn quả cherry Mỹ hàng ngày còn làm làn da sáng mịn,căng tràn nhựa sống -Cherry rất giàu chất chống oxi hóa mạnh anthocyanins không cải thiện tình trạng mất trí nhớ,còn ngăn ngừa ung thư , làm chậm lão hóa,nếp nhăn vì thế mà lâu xuất hiện -Trái cherry còn vô cùng tốt cho tim mạch, giảm viêm nhiễm xương khớp, đau nhức cơ nên được nhiều vận động viên ưa chuộng.Lượng chất sơ dồi dào trong cherry hỗ trợ tốt cho tiêu hóa. 4.Sử dụng: -Quả ', 3, '2019-05-15');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_combo_info_history`
--

CREATE TABLE `product_combo_info_history` (
  `ID` int(11) NOT NULL,
  `PRODUCTCOMBOID` int(11) NOT NULL,
  `CREATED` date NOT NULL,
  `ACTION` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `DETAIL` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_combo_info_history`
--

INSERT INTO `product_combo_info_history` (`ID`, `PRODUCTCOMBOID`, `CREATED`, `ACTION`, `DETAIL`) VALUES
(1, 1, '2019-05-01', 'Tạo', 'Tạo mới');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_feature`
--

CREATE TABLE `product_feature` (
  `PRODUCTID` int(11) NOT NULL,
  `FEATUREID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_image`
--

CREATE TABLE `product_image` (
  `ID` int(11) NOT NULL,
  `LINK` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `PRODUCTID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_image`
--

INSERT INTO `product_image` (`ID`, `LINK`, `PRODUCTID`) VALUES
(1, 'https://image.thanhnien.vn/1080/uploaded/trandong/2016_10_09/ca-chua1_suze.jpg', 1),
(2, 'https://organicfood.vn/image/cache/catalog/Thit-Trung/Thit-bo/than-noi-bo-uc-500x500.png', 2),
(3, 'https://organicfood.vn/image/cache/catalog/Thit-Trung/Thit-bo/thit-dui-go-bo-uc-500x500.png', 3),
(4, 'https://organicfood.vn/image/cache/catalog/Thuy-Hai-san/ca-tuoi/ca-be-lao-huu-co-phu-quoc-500x500.png', 4),
(5, 'https://organicfood.vn/image/cache/catalog/Thuy-Hai-san/ca-tuoi/ca-roc-hong-phu-quoc-500x500.png', 5),
(6, 'https://organicfood.vn/image/cache/catalog/Trai-cay-huu-co/trai-cay-Viet-Nam/bo-huu-co-500x500.png', 6),
(7, 'https://organicfood.vn/image/cache/catalog/Trai-cay-huu-co/Trai-cay-NK/cam-vang-uc-500x500.png', 7),
(8, 'https://organicfood.vn/image/cache/catalog/Trai-cay-huu-co/Trai-cay-NK/cherry-do-My-1-500x500.png', 8),
(9, 'https://organicfood.vn/image/cache/catalog/Trai-cay-huu-co/Trai-cay-NK/cherry-new-zealand-500x500.png', 9),
(10, 'https://organicfood.vn/image/cache/catalog/Trai-cay-huu-co/Trai-cay-NK/ororganicfood.vn-500x500.png', 10),
(11, '\\uploads\\img_4-1558156368971.png', 11),
(12, '\\uploads\\img_1-1558156368947.png', 11),
(13, '\\uploads\\img_5-1558156368973.png', 11),
(14, '\\uploads\\img_3-1558156368970.png', 11),
(15, '\\uploads\\img_2-1558156368960.png', 11),
(16, '\\uploads\\img_4-1558354294198.png', 12),
(17, '\\uploads\\img_3-1558354294197.png', 12),
(18, '\\uploads\\img_2-1558354294186.png', 12),
(19, '\\uploads\\img_5-1558354294200.jpg', 12),
(20, '\\uploads\\img_1-1558354294184.png', 12),
(21, '\\uploads\\img_5-1558358270583.jpg', 13),
(22, '\\uploads\\img_1-1558358270579.jpg', 13),
(23, '\\uploads\\img_3-1558358270582.jpg', 13),
(24, '\\uploads\\img_4-1558358270583.png', 13),
(25, '\\uploads\\img_2-1558358270580.png', 13);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_info_history`
--

CREATE TABLE `product_info_history` (
  `ID` int(11) NOT NULL,
  `PRODUCTID` int(11) NOT NULL,
  `CREATED` date NOT NULL,
  `ACTION` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `DETAIL` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_info_history`
--

INSERT INTO `product_info_history` (`ID`, `PRODUCTID`, `CREATED`, `ACTION`, `DETAIL`) VALUES
(1, 1, '2019-05-01', 'Tạo', 'Tạo mới'),
(2, 2, '2019-05-01', 'Tạo', 'Tạo mới'),
(3, 3, '2019-05-01', 'Tạo', 'Tạo mới'),
(4, 4, '2019-05-01', 'Tạo', 'Tạo mới'),
(5, 5, '2019-05-01', 'Tạo', 'Tạo mới'),
(6, 6, '2019-05-01', 'Tạo', 'Tạo mới'),
(7, 7, '2019-05-01', 'Tạo', 'Tạo mới'),
(8, 8, '2019-05-01', 'Tạo', 'Tạo mới'),
(9, 9, '2019-05-01', 'Tạo', 'tạo mới'),
(10, 10, '2019-05-01', 'Tạo', 'tạo mới');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_tag`
--

CREATE TABLE `product_tag` (
  `PRODUCTID` int(11) NOT NULL,
  `TAGID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_tag`
--

INSERT INTO `product_tag` (`PRODUCTID`, `TAGID`) VALUES
(1, 2),
(1, 3),
(1, 4),
(6, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `search_history`
--

CREATE TABLE `search_history` (
  `ID` int(11) NOT NULL,
  `ABOUT` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `CREATED` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `session_cart`
--

CREATE TABLE `session_cart` (
  `ID` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `PRODUCT_ID` int(11) NOT NULL,
  `PRODUCT_COMBO_ID` int(11) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `IS_LOGIN` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `session_cart`
--

INSERT INTO `session_cart` (`ID`, `PRODUCT_ID`, `PRODUCT_COMBO_ID`, `QUANTITY`, `IS_LOGIN`) VALUES
('bef2RQBJ_', 0, 7, 4, 0),
('bef2RQBJ_', 6, 0, 1, 0),
('CWPNs-7z7', 0, 3, 1, 0),
('CWPNs-7z7', 9, 0, 1, 0),
('eU-cPcqpc', 0, 1, 2, 0),
('eU-cPcqpc', 0, 3, 2, 0),
('eU-cPcqpc', 0, 7, 2, 0),
('eU-cPcqpc', 9, 0, 1, 0),
('kM3a8qdZ8', 3, 0, 1, 0),
('kM3a8qdZ8', 4, 0, 2, 0),
('kM3a8qdZ8', 6, 0, 3, 0),
('kM3a8qdZ8', 7, 0, 1, 0),
('kM3a8qdZ8', 10, 0, 1, 0),
('kM3a8qdZ8', 12, 0, 3, 0),
('l_IyR6cYlS', 0, 2, 1, 0),
('l_IyR6cYlS', 0, 3, 1, 0),
('l_IyR6cYlS', 1, 0, 1, 0),
('l_IyR6cYlS', 4, 0, 1, 0),
('l_IyR6cYlS', 6, 0, 1, 0),
('l_IyR6cYlS', 9, 0, 5, 0),
('o7105nJKO', 9, 0, 1, 0),
('RBom8hvZ4', 0, 7, 1, 0),
('RBom8hvZ4', 9, 0, 1, 0),
('z8u7W_LAU', 6, 0, 3, 0),
('z8u7W_LAU', 8, 0, 1, 0),
('z8u7W_LAU', 9, 0, 5, 0),
('z8u7W_LAU', 10, 0, 2, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sub_category`
--

CREATE TABLE `sub_category` (
  `ID` int(11) NOT NULL,
  `CATEGORYID` int(11) NOT NULL,
  `NAME` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sub_category`
--

INSERT INTO `sub_category` (`ID`, `CATEGORYID`, `NAME`) VALUES
(1, 5, 'Thịt bò'),
(2, 5, 'Thịt heo'),
(3, 5, 'Thịt gia cầm'),
(4, 3, 'Mực'),
(5, 3, 'Cá'),
(6, 3, 'Tôm'),
(7, 3, 'Cua'),
(8, 1, 'Rau hữu cơ'),
(9, 1, 'Rau gia vị'),
(10, 1, 'Nấm - Rau mầm'),
(11, 2, 'Trái cây việt'),
(12, 2, 'Trái cây nhập'),
(13, 2, 'Trái cây khô');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tag`
--

CREATE TABLE `tag` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tag`
--

INSERT INTO `tag` (`ID`, `NAME`) VALUES
(1, 'Các món từ bơ'),
(2, 'Cơn sốt rau sạch'),
(3, 'Rau organic'),
(4, 'Vietgap');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`CUSTOMERID`,`PRODUCTID`),
  ADD KEY `FK_cart_customer` (`CUSTOMERID`),
  ADD KEY `FK_cart_product` (`PRODUCTID`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_comment_customer` (`CUSTOMERID`),
  ADD KEY `FK_comment_product` (`PRODUCTID`);

--
-- Chỉ mục cho bảng `comment_reaction`
--
ALTER TABLE `comment_reaction`
  ADD PRIMARY KEY (`CUSTOMERID`,`COMMENTID`),
  ADD KEY `FK_comment_reaction_customer` (`CUSTOMERID`),
  ADD KEY `FK_comment_reaction_comment` (`COMMENTID`);

--
-- Chỉ mục cho bảng `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_customer_customer_type` (`CUSTOMERTYPEID`);

--
-- Chỉ mục cho bảng `customer_type`
--
ALTER TABLE `customer_type`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `customer_view`
--
ALTER TABLE `customer_view`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_customer_view_customer` (`CUSTOMERID`);

--
-- Chỉ mục cho bảng `feature`
--
ALTER TABLE `feature`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `news_image`
--
ALTER TABLE `news_image`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_news_image_news` (`NEWSID`);

--
-- Chỉ mục cho bảng `news_info_history`
--
ALTER TABLE `news_info_history`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_news_info_history_news` (`NEWSID`);

--
-- Chỉ mục cho bảng `news_tag`
--
ALTER TABLE `news_tag`
  ADD PRIMARY KEY (`NEWSID`,`TAGID`);

--
-- Chỉ mục cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`ORDERINFOID`,`PRODUCTID`),
  ADD KEY `FK_order_detail_order_info` (`ORDERINFOID`),
  ADD KEY `FK_order_detail_product` (`PRODUCTID`);

--
-- Chỉ mục cho bảng `order_info`
--
ALTER TABLE `order_info`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_order_info_customer` (`CUSTOMERID`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_product_category` (`CATEGORYID`),
  ADD KEY `FK_product_sub_category` (`SUBCATEGORYID`),
  ADD KEY `FK_product_brand` (`BRANDID`);

--
-- Chỉ mục cho bảng `product_combo`
--
ALTER TABLE `product_combo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_product_combo_product1` (`PRODUCTID1`),
  ADD KEY `FK_product_combo_product2` (`PRODUCTID2`),
  ADD KEY `FK_product_combo_product3` (`PRODUCTID3`);

--
-- Chỉ mục cho bảng `product_combo_info_history`
--
ALTER TABLE `product_combo_info_history`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_product_combo_info_history_product_combo` (`PRODUCTCOMBOID`);

--
-- Chỉ mục cho bảng `product_feature`
--
ALTER TABLE `product_feature`
  ADD PRIMARY KEY (`PRODUCTID`,`FEATUREID`),
  ADD KEY `FK_product_feature_product` (`PRODUCTID`),
  ADD KEY `FK_product_feature_feature` (`FEATUREID`);

--
-- Chỉ mục cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_product_image_product` (`PRODUCTID`);

--
-- Chỉ mục cho bảng `product_info_history`
--
ALTER TABLE `product_info_history`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_product_info_history_product` (`PRODUCTID`);

--
-- Chỉ mục cho bảng `product_tag`
--
ALTER TABLE `product_tag`
  ADD PRIMARY KEY (`PRODUCTID`,`TAGID`),
  ADD KEY `FK_product_tag_product` (`PRODUCTID`),
  ADD KEY `FK_product_tag_tag` (`TAGID`);

--
-- Chỉ mục cho bảng `search_history`
--
ALTER TABLE `search_history`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `session_cart`
--
ALTER TABLE `session_cart`
  ADD PRIMARY KEY (`ID`,`PRODUCT_ID`,`PRODUCT_COMBO_ID`);

--
-- Chỉ mục cho bảng `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_sub_category_category` (`CATEGORYID`);

--
-- Chỉ mục cho bảng `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `brand`
--
ALTER TABLE `brand`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `customer`
--
ALTER TABLE `customer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `customer_type`
--
ALTER TABLE `customer_type`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `customer_view`
--
ALTER TABLE `customer_view`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `feature`
--
ALTER TABLE `feature`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `news_image`
--
ALTER TABLE `news_image`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `news_info_history`
--
ALTER TABLE `news_info_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `order_info`
--
ALTER TABLE `order_info`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `product_combo`
--
ALTER TABLE `product_combo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `product_combo_info_history`
--
ALTER TABLE `product_combo_info_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `product_image`
--
ALTER TABLE `product_image`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT cho bảng `product_info_history`
--
ALTER TABLE `product_info_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `search_history`
--
ALTER TABLE `search_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `tag`
--
ALTER TABLE `tag`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `FK_cart_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_cart_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_comment_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_comment_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `comment_reaction`
--
ALTER TABLE `comment_reaction`
  ADD CONSTRAINT `FK_comment_reaction_comment` FOREIGN KEY (`COMMENTID`) REFERENCES `comment` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_comment_reaction_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `FK_customer_customer_type` FOREIGN KEY (`CUSTOMERTYPEID`) REFERENCES `customer_type` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `customer_view`
--
ALTER TABLE `customer_view`
  ADD CONSTRAINT `FK_customer_view_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `news_image`
--
ALTER TABLE `news_image`
  ADD CONSTRAINT `FK_news_image_news` FOREIGN KEY (`NEWSID`) REFERENCES `news` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `news_info_history`
--
ALTER TABLE `news_info_history`
  ADD CONSTRAINT `FK_news_info_history_news` FOREIGN KEY (`NEWSID`) REFERENCES `news` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `FK_order_detail_order_info` FOREIGN KEY (`ORDERINFOID`) REFERENCES `order_info` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_order_detail_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `order_info`
--
ALTER TABLE `order_info`
  ADD CONSTRAINT `FK_order_info_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_product_brand` FOREIGN KEY (`BRANDID`) REFERENCES `brand` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_category` FOREIGN KEY (`CATEGORYID`) REFERENCES `category` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_sub_category` FOREIGN KEY (`SUBCATEGORYID`) REFERENCES `sub_category` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_combo`
--
ALTER TABLE `product_combo`
  ADD CONSTRAINT `FK_product_combo_product1` FOREIGN KEY (`PRODUCTID1`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_combo_product2` FOREIGN KEY (`PRODUCTID2`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_combo_product3` FOREIGN KEY (`PRODUCTID3`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_combo_info_history`
--
ALTER TABLE `product_combo_info_history`
  ADD CONSTRAINT `FK_product_combo_info_history_product_combo` FOREIGN KEY (`PRODUCTCOMBOID`) REFERENCES `product_combo` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_feature`
--
ALTER TABLE `product_feature`
  ADD CONSTRAINT `FK_product_feature_feature` FOREIGN KEY (`FEATUREID`) REFERENCES `feature` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_feature_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `FK_product_image_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_info_history`
--
ALTER TABLE `product_info_history`
  ADD CONSTRAINT `FK_product_info_history_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_tag`
--
ALTER TABLE `product_tag`
  ADD CONSTRAINT `FK_product_tag_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_tag_tag` FOREIGN KEY (`TAGID`) REFERENCES `tag` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `FK_sub_category_category` FOREIGN KEY (`CATEGORYID`) REFERENCES `category` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
