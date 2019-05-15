-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 10, 2019 lúc 12:51 PM
-- Phiên bản máy phục vụ: 10.1.35-MariaDB
-- Phiên bản PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `organic`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `ID` int(11) NOT NULL,
  `CUSTOMERID` int(11) NOT NULL,
  `PRODUCTID` int(11) NOT NULL,
  `CREATED` date NOT NULL,
  `COMMENT` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `STARS` int(11) NOT NULL,
  `LIKES` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`ID`, `CUSTOMERID`, `PRODUCTID`, `CREATED`, `COMMENT`, `STARS`, `LIKES`) VALUES
(1, 1, 1, '2019-05-01', 'Sản phẩm rất tốt', 5, 0),
(2, 2, 5, '2019-05-02', 'Sản phẩm này rất tệ, không phù hợp với mình, giá cả thì mắc', 1, 0),
(3, 3, 7, '2019-05-30', 'Tuyệt vời', 3, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment_reaction`
--

CREATE TABLE `comment_reaction` (
  `CUSTOMERID` int(11) NOT NULL,
  `COMMENTID` int(11) NOT NULL,
  `CREATED` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer_type`
--

CREATE TABLE `customer_type` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customer`
--

INSERT INTO `customer_type` (`ID`, `NAME`) VALUES
(1, 'Khách V.I.P'),
(2, 'Khách thường');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer`
--

CREATE TABLE `customer` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `FULLNAME` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `PHONE` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `EMAIL` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `BIRTHDATE` date NOT NULL,
  `CASH` double NOT NULL,
  `CUSTOMERTYPEID` int(11) NOT NULL,
  `CREATED` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customer`
--

INSERT INTO `customer` (`ID`, `USERNAME`, `PASSWORD`, FULLNAME, `PHONE`, `EMAIL`, `BIRTHDATE`, `CASH`, `CUSTOMERTYPEID`, `CREATED`) VALUES
(1, '123456', 'qui.lt', 'Lê Tường Qui', '0987012635', 'qui021098@gmail.com', '1998-12-25', 200000, 1, '2019-05-01'),
(2, '123456', 'ly.nt', 'Nguyễn Thiên Lý', '0922123123', 'thienly@gmail.com', '1998-12-22', 3000000, 2, '2019-05-09'),
(3, '123456', 'linh.tk','Trần Khánh Linh', '0922333444', 'khanhlinh@gmail.com', '1998-10-16', 1300000, 1, '2019-05-01');

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
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `ID` int(11) NOT NULL,
  `IMAGE` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `TITLE` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `SHORTCONENT` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `CONTENT` varchar(5000) COLLATE utf8_unicode_ci NOT NULL,
  `CREATED` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news_image`
--

CREATE TABLE `news_image` (
  `ID` int(11) NOT NULL,
  `LINK` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `NOTE` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `NEWSID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(200) COLLATE utf8_unicode_ci NOT NULL
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
-- Cấu trúc bảng cho bảng `sub_category`
--

CREATE TABLE `sub_category` (
  `ID` int(11) NOT NULL,
  `CATEGORYID` int(11) NOT NULL,
  `NAME` varchar(100) COLLATE utf8_unicode_ci NOT NULL
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
-- Cấu trúc bảng cho bảng `brand`
--

CREATE TABLE `brand` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `INTRODUCTION` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `brand`
--

INSERT INTO `brand` (`ID`, `NAME`, `INTRODUCTION`) VALUES
(1, 'Alteya Organics', 'Xuất sứ: Bulgaria\r\nchứng nhận hữu cơ: USDA, Nature'),
(2, 'Bellamy', 'Thương hiệu nổi tiếng tại Australia'),
(3, 'Công ty TNHH Natural Food Group', 'Công ty phân phối sản phẩm tại Việt nam '),
(4, 'Organica', 'Công ty phân phối sản phẩm oganic');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `ID` int(11) NOT NULL,
  `IMAGE` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `CATEGORYID` int(11) NOT NULL,
  `SUBCATEGORYID` int(11) NOT NULL,
  `NAME` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `BRANDID` int(11) NOT NULL,
  `STATUS` tinyint(1) NOT NULL,
  `RATE` int(11) NOT NULL,
  `PRICE` double NOT NULL,
  `ORIGIN` varchar(40) NOT NULL,
  `KILOGRAM` int(11) NOT NULL,
  `SALE` double NOT NULL,
  `VIPSALE` double NOT NULL,
  `DESCRIPTION` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `INVENTORY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`ID`, `IMAGE`, `CATEGORYID`, `SUBCATEGORYID`, `NAME`, `BRANDID`, `STATUS`, `RATE`, `PRICE`, `ORIGIN`, `KILOGRAM`, `SALE`, `VIPSALE`, `DESCRIPTION`, `INVENTORY`) VALUES
(1, 'https://image.thanhnien.vn/1080/uploaded/trandong/2016_10_09/ca-chua1_suze.jpg', 1, 8, 'Cà chua sạch', 3, 1, 4, 36000, 'Việt Nam', 1, 10, 5, 'Sản phẩm cà chua an toàn, và đầy đủ chất dinh dưỡng', 50),
(2, 'https://image.thanhnien.vn/1080/uploaded/trandong/2016_10_09/ca-chua1_suze.jpg', 5, 1, 'Thăn nội bò úc - 500g', 3, 1, 5, 210000, 'Úc', 1, 0, 5, 'Thăn nội bò úc được xem là phần lý tưởng nhất để làm món bít tết, vì nó có độ mềm và hương vị đặc sắc nhất. Khi chế biến dưới bất kỳ hình thức nào, bạn không nên cho nhiều gia vị, chỉ cần một ít hạt tiêu và muối là đủ. Nếu cần, có thể thêm một chút dầu ô liu để thêm món ăn thêm phần hấp dẫn .', 10),
(3, 'https://image.thanhnien.vn/1080/uploaded/trandong/2016_10_09/ca-chua1_suze.jpg', 5, 1, 'Thịt đùi gọ bò úc', 3, 1, 3, 295000, 'Úc', 1, 12, 5, 'Thịt đùi gọ bò Úc hay còn gọi là Thick Flank là phần thịt nằm ở đùi bò, có lớp mỡ mỏng bao quanh bên ngoài, có ít gân, đây là phần thịt hoạt động khá nhiều nên chắc thịt hơn các phần khác. Thịt đùi gọ bò Úc thích hợp làm các món thái mỏng như nhúng lẩu, xào, lagu... Thịt đùi gọ bò Úc cung cấp bởi hệ thống cửa hàng và website Organicfood.vn được nhập nguyên con còn sống và giết mổ tại Việt Nam theo đúng tiêu chuẩn ESCAS, vệ sinh an toàn thực phẩm, kiểm dịch. Thịt được đóng gói và hút chân không tiệt trùng , bảo quản bằng tủ mát, vì vậy đảm bảo thịt vẫn giữ hương vị, mùi vị mà không cần bất cứ chất bảo quản nào. Hệ thống cửa hàng của Organicfood.vn được giám sát chặt chẽ và trang bị tủ đông, tủ mát vệ sinh và hoàn toàn đảm bảo về chất lượng. Không như phần lớn thịt bò Úc trên thị trường là bò đông lạnh, khi rã đông sẽ mất đi vị của thịt. Chỉ có tại Organicfood.vn chúng tôi cung cấp thịt tươi ngay sau khi giết mổ từ 1 tới 2 giờ đảm bảo vị ngon nhất của thịt bò vẫn còn nguyên. Organicfood.vn đảm bảo: Không có chất bảo quản, không thức ăn tăng trưởng, không thịt bò bệnh.', 20),
(4, 'https://image.thanhnien.vn/1080/uploaded/trandong/2016_10_09/ca-chua1_suze.jpg', 3, 5, 'Cá bẹ lão phú quốc - 500g', 3, 1, 4, 155000, 'Phú Quốc - Việt Nam', 1, 30, 5, 'Đặc điểm nhận dạng: Thân tương đối cao, dài, dẹp bên, đầu nhô cao, vây ngực cong dài, dọc theo phía trên lưng màu ánh xanh, màu bạc và trắng bạc ở phía dưới hông và bụng. Tên thương mại là Diamond Trevally nên có thể thấy cơ thể cá hơi giồng hình kim cương. Đặc tính:  Thịt mềm, ngọt, béo. Các cách chế biến: Canh chua, chiên áp chảo, nấu ngót, hấp, nấu cháo, nấu lẩu.', 10),
(5, 'https://image.thanhnien.vn/1080/uploaded/trandong/2016_10_09/ca-chua1_suze.jpg', 3, 5, 'Cá róc hồng phú quốc', 3, 1, 1, 120000, 'Phú Quốc - Việt Nam', 1, 0, 5, 'Cá Róc hồng của Organicfood mỗi con tầm 1-2kg. Thuộc dòng cá hồng biển. Rất đẹp. Màu hồng nhẹ nhàng. Thịt trắng và thơm. Thích hợp các món nướng, rán, nấu lẩu chua', 10),
(6, 'https://image.thanhnien.vn/1080/uploaded/trandong/2016_10_09/ca-chua1_suze.jpg', 2, 11, 'Bơ sáp Đắk Lắk - 1KG', 3, 1, 2, 120000, 'Đắk Lắk - Việt Nam', 1, 8, 5, 'Bơ DakLak tại Organic được chọn lựa kỹ càng từ chính nông trại của Organic, đảm bảo sạch, không hóa chất, không thuốc tăng trưởng, các chất làm biến đổi gen. Có nhiều size theo cân nặng, đáp ứng đủ các nhu cầu của khách hàng,… Bơ trái to, thịt bơ béo ngậy, ruột vàng hấp dẫn,…', 20),
(7, 'https://image.thanhnien.vn/1080/uploaded/trandong/2016_10_09/ca-chua1_suze.jpg', 2, 12, 'Cam vàng hữu cơ úc - 1KG', 4, 1, 5, 145000, 'Úc', 1, 10, 5, 'Tăng cường thể lực sau khi tập luyện thể thao, uống một cốc nước cam bỏ thêm chút muối là cách hữu hiệu để bạn lấy lại thể lực nhanh chóng. Bởi lượng đường và lượng nước có trong cam sẽ nhanh chóng được cơ thể hấp thụ, có tác dụng giải khát và bồi bổ thể lực. Ngay sau khi ép lấy nước hoặc đã gọt vỏ nên uống hoặc ăn ngay, không nên để quá 30 phút để tránh lượng vitamin C sẽ bị bay mất khi phản ứng với oxy ngoài môi trường.   Tăng cường miễn dịch   Ăn cam sẽ có tác dụng bổ sung chất dinh dưỡng, tăng cường hệ miễn dịch cho cơ thể, giúp người bệnh nhanh phục hồi sức khỏe, nhanh lành vết thương. Đặc biệt là bổ sung chất xơ, có lợi cho tiêu hóa. Đặc biệt, đối với những người hút thuốc nên ăn nhiều cam, những bệnh nhân mắc viêm ruột, viêm túi mật nên thận trọng khi ăn cam.   Ngăn ngừa xơ cứng động mạch   Nếu thường xuyên ăn cam, tiêu thụ vitamin C sẽ giúp phát triển chậm bệnh xơ cứng động mạch.   Phòng chống ung thư   Trong quả cam có chứa hợp chất liminoid giúp cơ thể chống lại ung thư miệng, da, phổi, núi đôi, dạ dày và ruột kết. Ngoài ra, các vitamin C cao có trong cam cũng như là một chất chống oxy hóa tốt để bảo vệ các tế bào cơ thể.   Giảm cholesterol Cam vàng hữu cơ là loại quả phổ biến nhất và là nguồn tuyệt vời cung cấp vitamin C, đồng thời cam cũng chứa các hợp chất khác có thể giúp giảm sản xuất cholesterol ở gan. Cam có đầy đủ các chất được gọi là phytosterols (sterol thực vật), một loại chất béo được tìm thấy trong các loại hạt, trái cây và rau quả. Những sterol này chặn cholesterol không cho các tế bào trong ruột hấp thụ. Ngăn ngừa táo bón   Quả cam có có vị chua ngọt nên nó thực sự có tác dụng trong hệ thống tiêu hóa, giúp kích thích tiêu hóa, làm giảm táo bón.   Tăng cường “sức mạnh” đàn ông   Mỗi ngày một trái cam là đủ cho một nam giới có thể để giữ tinh trùng của mình khỏe mạnh. Ngoài ra, vitamin C, một chất chống oxy hóa trong trái cam giúp bảo vệ tinh trùng khỏi sự thiệt hại do yếu tố di truyền hoặc dị tật bẩm sinh gây nên.   Tốt cho tim mạch   Một l', 13),
(8, 'https://image.thanhnien.vn/1080/uploaded/trandong/2016_10_09/ca-chua1_suze.jpg', 2, 12, 'Cherry đỏ mỹ - 500gram', 4, 1, 3, 325000, 'Mỹ', 1, 0, 5, '1.Xuất sứ : -Quả Cherry Mỹ được canh tác chủ yếu ở vùng Bakerfield, Arvin, Lodi, Stockton và Linden nơi khí hậu ấm áp,khô nóng , thích hợp để cây cherry phát triển ,quả cherry ở đây được tắm no nắng nên ngọt đậm đà,hương quyến rũ. -Trái Cherry căng mọng đẹp mắt là loại hoa quả nhập khẩu đắt tiền nên thường được sử dụng làm quà biếu.   2.Đặc điểm :   -Cherry là một chủng loài cây rụng lá,thân gỗ ,cây lùn ,tán rậm.Nó được trồng chủ yếu ở vùng ôn đới,cần khoảng 200-1500 giờ ngủ đông,tuy nhiên quả cherry lại rất cần tắm no nắng để đạt được màu sắc ,cũng như hương vị hoàn hảo.   -Trái cherry được đánh giá là khó trồng,giá cũng vì thế mà chẳng hề dễ chịu.Theo nhiều chuyên gia thì quả cherry Mỹ cho chất lượng tốt nhất từ màu sắc,hương vị tới giá trị dinh dưỡng.   -Thông thường mùa thu hoạch cherry là từ tháng 5-> 8 .Do thân cây thấp nên nhiều nơi ở Mỹ mở dịch vụ cho trải nghiệm hái và ăn cherry tại vườn.Những trái cherry Mỹ tươi ngon,an toàn quả thực quá hấp dẫn.   -Quả cherry Mỹ da láng bóng,thịt chắc,màu vàng đỏ tươi,khi chín ngả màu tím tía rất đẹp.Thịt cherry mọng,óng ả như ngọc bích ,ăn giòn ngọt, đậm đà,hương thơm dịu nhẹ thư thái,hạt róc không dính.   3.Công Dụng:   -Quả cherry rất nhiều năng lượng lấy từ calo tự nhiên giúp tâm trạng vui vẻ,hưng phấn.   -Ăn cherry thường xuyên cải thiện tình trạng mất ngủ. Cherry chứa melatonin làm cho giấc ngủ sâu và ngon hơn lại không hại sức khỏe như nhiều loại thuốc.   -Hàm lượng vitamin A có trong trái cherry được tính toán là cao gấp 20 lần so với dâu tây hay việt quất.Không chỉ tốt cho mắt ăn quả cherry Mỹ hàng ngày còn làm làn da sáng mịn,căng tràn nhựa sống   -Cherry rất giàu chất chống oxi hóa mạnh anthocyanins không cải thiện tình trạng mất trí nhớ,còn ngăn ngừa ung thư , làm chậm lão hóa,nếp nhăn vì thế mà lâu xuất hiện   -Trái cherry còn vô cùng tốt cho tim mạch, giảm viêm nhiễm xương khớp, đau nhức cơ nên được nhiều vận động viên ưa chuộng.Lượng chất sơ dồi dào trong cherry hỗ trợ tốt cho tiêu hóa.   4.Sử dụng:   -Quả ', 20),
(9, 'https://image.thanhnien.vn/1080/uploaded/trandong/2016_10_09/ca-chua1_suze.jpg', 2, 12, 'cherry new zealand - 500g', 4, 1, 4, 325000, 'New Zealand', 1, 50, 5, '1. Cherry New Zealand Cherry New Zealand vỏ màu đỏ sẫm, quả căng mọng, chắc, bóng, vị ngọt. Những quả Cherry New Zealand căng bóng luôn là mặt hàng được khách hàng Việt Nam đặc biệt ưa chuộng, một đặc sản đắt tiền và thường dùng để làm quà biếu. 2. Mùa vụ  Cherry New Zealand chỉ có vào dịp cuối năm, từ  tháng 12 – tháng 2 năm sau. 3. Giá trị dinh dưỡng Cherry là nguồn vitamin A tuyệt vời, là loại trái cây giàu chất sắt, chất xơ cao, không cholesterol và Natri, tốt cho hệ miễn dịch, tiêu hóa và làm đẹp da. Cherry chống oxy hóa rất tốt cho tim mạch, giúp bảo vệ cơ thể chống lại bệnh ung thư và nó hoạt động như một loại thuốc giảm đau và giảm viêm cho các bệnh nhân gút và khớp. Cherry chứa melatonin – một chất giúp điều hòa giấc ngủ nên nó có thể giúp ngủ ngon. Cherry cũng là một món ăn nhẹ tốt cho sức khỏe mà trẻ em yêu thích. Cherry được ví là “Kim cương của hoa quả”, chính là một thực phẩm quý khách cần bổ sung vào thực đơn của mình. 4. Quá trình chăm sóc cherry Tại New Zealand nhiệt độ giữa mùa đông và mùa hè chênh lệch khá cao nên đã tạo điều kiện tốt cho cây Cherry phát triển và cho những trái Cherry ngon nhất thế giới. Vào mùa xuân, tất cả các giống Cherry đang nhanh chóng nở hoa rực rỡ, cả vườn Cherry trông như một bức tranh với những bông hoa khoe sắc thật ấn tượng.', 10),
(10, 'https://image.thanhnien.vn/1080/uploaded/trandong/2016_10_09/ca-chua1_suze.jpg', 2, 12, 'Nho xanh không hạt mỹ', 1, 1, 5, 295000, 'Mỹ', 1, 15, 5, '1. Giống và chủng loại Các chủng Nho Xanh Mỹ phổ biến gồm có: Thompson (T6 - T1) , Princess có hạt (T6 - T11), Pristine , Autumn King. Nho xanh không hạt Mỹ quả dài, màu xanh hổ phách, vị ngọt mát, rất giòn và đặc biệt là không có hạt.   2.  Xuất xứ và mùa vụ Xuất xứ: Mỹ Mùa vụ: Nho Xanh Mỹ từ tháng 5 đến tháng 1 năm sau. 3. Thông tin dinh dưỡng Nho tươi với tất cả các màu như đỏ, xanh và đen đều chứa hợp chất chống oxi hóa tự nhiên giúp cho tim khỏe mạnh, nho còn có khả năng chống ung thư và duy trì sức khỏe của não. Nho xanh cũng có chứa chất chống oxy hóa. Một nghiên cứu mới đây khi nhìn vào tổng khả năng chống oxy hóa (theo như cách đo của ORAC) đã tìm thấy mức độ chênh lệch đáng kể của nho xanh và nho đỏ: khả năng chống oxy hóa của nho đỏ là 2016 trong khi của nho xanh là 1789. Ngoài ra nho xanh còn có một loại enzim hỗ trợ đường tiêu hóa, việc ăn nho thường xuyên cũng giúp cho phụ nữ có làn da sáng và săn chắc. 4.  Lưu ý bảo quản và sử dụng Nho xanh khó bảo quản hơn so với nho đen và nho đỏ. Nho xanh không hạt Mỹ rất nhạy cảm, khi vận chuyển đi xa nên để vào hộp cẩn thận để nho không bị rụng. Khi đã rụng, nho rất dễ bị xâm nhập từ cuống bởi vi khuẩn dẫn đến quả nho bị mềm và hỏng. Luôn luôn để nho chưa rửa trong hộp kín vào tủ lạnh với nhiệt độ khoảng 0 - 4 độ C. Chỉ nên rửa trước khi ăn hoặc chế biến để không làm đi lớp phấn phủ tự nhiên của quả Nho. Nho thường dùng để ăn tươi hoặc ép nước.   5.  Quá trình chăm sóc Tại Mỹ, các trang trại trồng nho có diện tích từ hàng trăm đến hàng ngàn hecta. Những trang trại này thường được chăm sóc rất cẩn thận. Người ta thường bảo vệ vườn bằng những hàng rào và lớp lưới để tránh sự phá hoại của chim chóc cũng như các loài côn trùng có hại. Nho được trồng tại các vùng thung lũng màu mỡ có khí hậu ôn đới với đặc điểm ngày nóng, đêm lạnh. Sau khi ngủ đông 3 tháng trong thời tiết lạnh, nho sẽ chồi lộc, ra hoa kết trái vào mùa xuân. ', 30);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_combo`
--

CREATE TABLE `product_combo` (
  `ID` int(11) NOT NULL,
  `PRODUCTID1` int(11) NOT NULL,
  `PRODUCTID2` int(11) NOT NULL,
  `PRODUCTID3` int(11) NOT NULL,
  `CATEGORYID` int(11) NOT NULL,
  `SUBCATEGORYID` int(11),
  `NAME` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `STATUS` tinyint(1) NOT NULL,
  `RATE` int(11) NOT NULL,
  `PRICE` double NOT NULL,
  `KILOGRAM` int(11) NOT NULL,
  `SALE` double NOT NULL,
  `VIPSALE` double NOT NULL,
  `DESCRIPTION` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `INVENTORY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_combo`
--

INSERT INTO `product_combo` (`ID`, `PRODUCTID1`, `PRODUCTID2`, `PRODUCTID3`, `CATEGORYID`, `SUBCATEGORYID`, `NAME`, `STATUS`, `RATE`, `PRICE`, `KILOGRAM`, `SALE`, `VIPSALE`, `DESCRIPTION`, `INVENTORY`) VALUES
(1, 8, 9, 10, 2, 12, 'Cherry đỏ mỹ - 500gram', 1, 3, 325000, 1, 0, 5, '1.Xuất sứ : -Quả Cherry Mỹ được canh tác chủ yếu ở vùng Bakerfield, Arvin, Lodi, Stockton và Linden nơi khí hậu ấm áp,khô nóng , thích hợp để cây cherry phát triển ,quả cherry ở đây được tắm no nắng nên ngọt đậm đà,hương quyến rũ. -Trái Cherry căng mọng đẹp mắt là loại hoa quả nhập khẩu đắt tiền nên thường được sử dụng làm quà biếu.   2.Đặc điểm :   -Cherry là một chủng loài cây rụng lá,thân gỗ ,cây lùn ,tán rậm.Nó được trồng chủ yếu ở vùng ôn đới,cần khoảng 200-1500 giờ ngủ đông,tuy nhiên quả cherry lại rất cần tắm no nắng để đạt được màu sắc ,cũng như hương vị hoàn hảo.   -Trái cherry được đánh giá là khó trồng,giá cũng vì thế mà chẳng hề dễ chịu.Theo nhiều chuyên gia thì quả cherry Mỹ cho chất lượng tốt nhất từ màu sắc,hương vị tới giá trị dinh dưỡng.   -Thông thường mùa thu hoạch cherry là từ tháng 5-> 8 .Do thân cây thấp nên nhiều nơi ở Mỹ mở dịch vụ cho trải nghiệm hái và ăn cherry tại vườn.Những trái cherry Mỹ tươi ngon,an toàn quả thực quá hấp dẫn.   -Quả cherry Mỹ da láng bóng,thịt chắc,màu vàng đỏ tươi,khi chín ngả màu tím tía rất đẹp.Thịt cherry mọng,óng ả như ngọc bích ,ăn giòn ngọt, đậm đà,hương thơm dịu nhẹ thư thái,hạt róc không dính.   3.Công Dụng:   -Quả cherry rất nhiều năng lượng lấy từ calo tự nhiên giúp tâm trạng vui vẻ,hưng phấn.   -Ăn cherry thường xuyên cải thiện tình trạng mất ngủ. Cherry chứa melatonin làm cho giấc ngủ sâu và ngon hơn lại không hại sức khỏe như nhiều loại thuốc.   -Hàm lượng vitamin A có trong trái cherry được tính toán là cao gấp 20 lần so với dâu tây hay việt quất.Không chỉ tốt cho mắt ăn quả cherry Mỹ hàng ngày còn làm làn da sáng mịn,căng tràn nhựa sống   -Cherry rất giàu chất chống oxi hóa mạnh anthocyanins không cải thiện tình trạng mất trí nhớ,còn ngăn ngừa ung thư , làm chậm lão hóa,nếp nhăn vì thế mà lâu xuất hiện   -Trái cherry còn vô cùng tốt cho tim mạch, giảm viêm nhiễm xương khớp, đau nhức cơ nên được nhiều vận động viên ưa chuộng.Lượng chất sơ dồi dào trong cherry hỗ trợ tốt cho tiêu hóa.   4.Sử dụng:   -Quả ', 20);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feature`
--

CREATE TABLE `feature` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
-- Cấu trúc bảng cho bảng `tag`
--

CREATE TABLE `tag` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tag`
--

INSERT INTO `tag` (`ID`, `NAME`) VALUES
(1, 'Các món từ bơ'),
(2, 'Cơn sốt rau sạch'),
(3, 'Rau organic'),
(4, 'Vietgap');

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
(6, 1),
(1, 2),
(1, 3),
(1, 4);

-- --------------------------------------------------------


--
-- Cấu trúc bảng cho bảng `product_image`
--

CREATE TABLE `product_image` (
  `ID` int(11) NOT NULL,
  `LINK` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
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
(10, 'https://organicfood.vn/image/cache/catalog/Trai-cay-huu-co/Trai-cay-NK/ororganicfood.vn-500x500.png', 10);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_info_history`
--

CREATE TABLE `product_info_history` (
  `ID` int(11) NOT NULL,
  `PRODUCTID` int(11) NOT NULL,
  `CREATED` date NOT NULL,
  `ACTION` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `DETAIL` varchar(500) COLLATE utf8_unicode_ci NOT NULL
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
-- Cấu trúc bảng cho bảng `product_combo_info_history`
--

CREATE TABLE `product_combo_info_history` (
  `ID` int(11) NOT NULL,
  `PRODUCTCOMBOID` int(11) NOT NULL,
  `CREATED` date NOT NULL,
  `ACTION` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `DETAIL` varchar(500) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_combo_info_history`
--

INSERT INTO `product_combo_info_history` (`ID`, `PRODUCTCOMBOID`, `CREATED`, `ACTION`, `DETAIL`) VALUES
(1, 1, '2019-05-01', 'Tạo', 'Tạo mới');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news_info_history`
--

CREATE TABLE `news_info_history` (
  `ID` int(11) NOT NULL,
  `NEWSID` int(11) NOT NULL,
  `CREATED` date NOT NULL,
  `ACTION` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `DETAIL` varchar(500) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------


--
-- Cấu trúc bảng cho bảng `search_history`
--

CREATE TABLE `search_history` (
  `ID` int(11) NOT NULL,
  `ABOUT` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `CREATED` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admin`
--
ALTER TABLE `admin`
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
  ADD PRIMARY KEY (`CUSTOMERID`, `COMMENTID`),
  ADD KEY `FK_comment_reaction_customer` (`CUSTOMERID`),
  ADD KEY `FK_comment_reaction_comment` (`COMMENTID`);


--
-- Chỉ mục cho bảng `customer_type`
--
ALTER TABLE `customer_type`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_customer_customer_type` (`CUSTOMERTYPEID`);


--
-- Chỉ mục cho bảng `customer_view`
--
ALTER TABLE `customer_view`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_customer_view_customer` (`CUSTOMERID`);


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
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`CUSTOMERID`, `PRODUCTID`),
  ADD KEY `FK_cart_customer` (`CUSTOMERID`),
  ADD KEY `FK_cart_product` (`PRODUCTID`);


--
-- Chỉ mục cho bảng `order_info`
--
ALTER TABLE `order_info`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_order_info_customer` (`CUSTOMERID`);

--
-- Chỉ mục cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`ORDERINFOID`, `PRODUCTID`),
  ADD KEY `FK_order_detail_order_info` (`ORDERINFOID`),
  ADD KEY `FK_order_detail_product` (`PRODUCTID`);


--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_sub_category_category` (`CATEGORYID`);


--
-- Chỉ mục cho bảng `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`ID`);


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
  ADD KEY `FK_product_combo_category` (`CATEGORYID`),
  ADD KEY `FK_product_combo_sub_category` (`SUBCATEGORYID`);


--
-- Chỉ mục cho bảng `feature`
--
ALTER TABLE `feature`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `product_feature`
--
ALTER TABLE `product_feature`
  ADD PRIMARY KEY (`PRODUCTID`, `FEATUREID`),
  ADD KEY `FK_product_feature_product` (`PRODUCTID`),
  ADD KEY `FK_product_feature_feature` (`FEATUREID`);


--
-- Chỉ mục cho bảng `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `product_tag`
--
ALTER TABLE `product_tag`
  ADD PRIMARY KEY (`PRODUCTID`, `TAGID`),
  ADD KEY `FK_product_tag_product` (`PRODUCTID`),
  ADD KEY `FK_product_tag_tag` (`TAGID`);


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
-- Chỉ mục cho bảng `product_combo_info_history`
--
ALTER TABLE `product_combo_info_history`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_product_combo_info_history_product_combo` (`PRODUCTCOMBOID`);

--
-- Chỉ mục cho bảng `news_info_history`
--
ALTER TABLE `news_info_history`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_news_info_history_news` (`NEWSID`);


--
-- Chỉ mục cho bảng `search_history`
--
ALTER TABLE `search_history`
  ADD PRIMARY KEY (`ID`);


--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;


--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


--
-- AUTO_INCREMENT cho bảng `customer_type`
--
ALTER TABLE `customer_type`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `customer`
--
ALTER TABLE `customer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


--
-- AUTO_INCREMENT cho bảng `customer_view`
--
ALTER TABLE `customer_view`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `news_image`
--
ALTER TABLE `news_image`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;


--
-- AUTO_INCREMENT cho bảng `order_info`
--
ALTER TABLE `order_info`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;


--
-- AUTO_INCREMENT cho bảng `brand`
--
ALTER TABLE `brand`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `product_combo`
--
ALTER TABLE `product_combo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


--
-- AUTO_INCREMENT cho bảng `feature`
--
ALTER TABLE `feature`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;


--
-- AUTO_INCREMENT cho bảng `tag`
--
ALTER TABLE `tag`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


--
-- AUTO_INCREMENT cho bảng `product_image`
--
ALTER TABLE `product_image`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;


--
-- AUTO_INCREMENT cho bảng `product_info_history`
--
ALTER TABLE `product_info_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `product_combo_info_history`
--
ALTER TABLE `product_combo_info_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `news_info_history`
--
ALTER TABLE `news_info_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;


--
-- AUTO_INCREMENT cho bảng `search_history`
--
ALTER TABLE `search_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;


--
-- Các ràng buộc cho các bảng đã đổ
--


--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_comment_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_comment_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `comment_reaction`
--
ALTER TABLE `comment_reaction`
  ADD CONSTRAINT `FK_comment_reaction_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_comment_reaction_comment` FOREIGN KEY (`COMMENTID`) REFERENCES `comment` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;


--
-- Các ràng buộc cho bảng `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `FK_customer_customer_type` FOREIGN KEY (`CUSTOMERTYPEID`) REFERENCES `customer_type` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;


--
-- Các ràng buộc cho bảng `customer_view`
--
ALTER TABLE `customer_view`
  ADD CONSTRAINT `FK_customer_view_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;


--
-- Các ràng buộc cho bảng `news_image`
--
ALTER TABLE `news_image`
  ADD CONSTRAINT `FK_news_image_news` FOREIGN KEY (`NEWSID`) REFERENCES `news` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;


--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `FK_cart_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_cart_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;


--
-- Các ràng buộc cho bảng `order_info`
--
ALTER TABLE `order_info`
  ADD CONSTRAINT `FK_order_info_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;


--
-- Các ràng buộc cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `FK_order_detail_order_info` FOREIGN KEY (`ORDERINFOID`) REFERENCES `order_info` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_order_detail_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;


--
-- Các ràng buộc cho bảng `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `FK_sub_category_category` FOREIGN KEY (`CATEGORYID`) REFERENCES `category` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;


--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_product_category` FOREIGN KEY (`CATEGORYID`) REFERENCES `category` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_sub_category` FOREIGN KEY (`SUBCATEGORYID`) REFERENCES `sub_category` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_brand` FOREIGN KEY (`BRANDID`) REFERENCES `brand` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_combo`
--
ALTER TABLE `product_combo`
  ADD CONSTRAINT `FK_product_combo_category` FOREIGN KEY (`CATEGORYID`) REFERENCES `category` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_combo_sub_category` FOREIGN KEY (`SUBCATEGORYID`) REFERENCES `sub_category` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;
  

--
-- Các ràng buộc cho bảng `product_feature`
--
ALTER TABLE `product_feature`
  ADD CONSTRAINT `FK_product_feature_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_feature_feature` FOREIGN KEY (`FEATUREID`) REFERENCES `feature` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;


--
-- Các ràng buộc cho bảng `product_tag`
--
ALTER TABLE `product_tag`
  ADD CONSTRAINT `FK_product_tag_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_tag_tag` FOREIGN KEY (`TAGID`) REFERENCES `tag` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;
  

--
-- Các ràng buộc cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `FK_product_image_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;


--
-- Các ràng buộc cho bảng `product_info_history`
--
ALTER TABLE `product_info_history`
  ADD CONSTRAINT `FK_product_info_history_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_combo_info_history`
--
ALTER TABLE `product_combo_info_history`
  ADD CONSTRAINT `FK_product_combo_info_history_product_combo` FOREIGN KEY (`PRODUCTCOMBOID`) REFERENCES `product_combo` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `news_info_history`
--
ALTER TABLE `news_info_history`
  ADD CONSTRAINT `FK_news_info_history_news` FOREIGN KEY (`NEWSID`) REFERENCES `news` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
