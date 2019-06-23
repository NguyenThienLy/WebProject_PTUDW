-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 23, 2019 lúc 05:23 AM
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
-- Cơ sở dữ liệu: `cpqzk1zfm6`
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

--
-- Đang đổ dữ liệu cho bảng `admin`
--

INSERT INTO `admin` (`ID`, `USERNAME`, `PASSWORD`) VALUES
(1, '103953466800405191414', 'Google'),
(2, 'admin', '$2b$10$wUmZs4ZoPkMONLFGdpaIu.vQiy3immvrpwXD0aGktmBGiPUz4OKmu');

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
(1, 'Natura', ''),
(2, 'Bragg', ''),
(3, 'The Green Kingdom', ''),
(4, 'Đà Lạt Food', ''),
(5, 'Organicfood.vn ', ''),
(6, 'Dak Lak Food', ''),
(7, 'Phú Quốc Food', ''),
(8, 'Organic Vikenco', '');

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
  `NAME` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`ID`, `NAME`) VALUES
(1, 'Thịt - Trứng'),
(2, 'Gia vị và phụ liệu'),
(3, 'Thủy - Hải sản'),
(4, 'Trái cây'),
(5, 'Rau củ quả'),
(6, 'Đồ khô');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `ID` int(11) NOT NULL,
  `CUSTOMERID` int(11) NOT NULL,
  `PRODUCTID` int(11) NOT NULL,
  `CREATED` date NOT NULL,
  `TITLE` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `COMMENT` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `STARS` int(11) NOT NULL,
  `LIKES` int(11) NOT NULL,
  `VERIFYCATION` tinyint(1) NOT NULL,
  `ISSIMPLE` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`ID`, `CUSTOMERID`, `PRODUCTID`, `CREATED`, `TITLE`, `COMMENT`, `STARS`, `LIKES`, `VERIFYCATION`, `ISSIMPLE`) VALUES
(1, 1, 6, '2019-06-19', 'Mình yêu sản phẩm này', 'Sản phẩm này rất tuyệt vời mọi người nên mua, mình dùng cảm thấy rất tốt', 4, 0, 0, 1),
(2, 3, 4, '2019-06-19', 'Mình thích combo này', 'Mình thích bơ vì vậy mình rất thích mua sản phẩm này', 1, 0, 1, 0),
(3, 4, 6, '2019-06-19', 'Sản phẩm này ăn rất ngon', 'Mình mua cái này về nấu canh ăn lắm nha mọi người, mọi người nên mua', 5, 0, 0, 1),
(4, 4, 4, '2019-06-19', 'Cái này không ngon', 'Sản phẩm không như quảng cáo đâu nha mọi người, không bằng xoài nhà mình nữa', 1, 0, 0, 1),
(5, 4, 2, '2019-06-19', 'Combo này phù hợp với mình', 'Combo này vừa ngon vừa rẻ nha mọi người, mọi người nên mua nó', 1, 0, 0, 0),
(6, 3, 10, '2019-06-19', 'toi thich san pham nay', 'toi thich san pham nay rat phu hop vai toi, moi nguoi', 5, 0, 0, 1),
(7, 2, 6, '2019-06-19', 'Linh o do qua di ma', 'la lalalalalalalalallalalalallalalallllllllllllllllllllllalalallalalallalalallalalalallala', 1, 0, 0, 1),
(9, 5, 22, '2019-06-19', 'sản phẩm này ngon', 'Sản phẩm ngày rất ngon, mình rát thích, các bạn nên mua', 4, 0, 0, 1);

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
-- Cấu trúc bảng cho bảng `customer`
--

CREATE TABLE `customer` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `IMAGE` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `FULLNAME` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `EMAIL` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `BIRTHDATE` date DEFAULT NULL,
  `CASH` double NOT NULL,
  `CUSTOMERTYPEID` int(11) NOT NULL,
  `CREATED` date NOT NULL,
  `PHONE` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `RESETPASSWORDTOKEN` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `RESETPASSWORDEXPIRES` datetime NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customer`
--

INSERT INTO `customer` (`ID`, `USERNAME`, `PASSWORD`, `IMAGE`, `FULLNAME`, `EMAIL`, `BIRTHDATE`, `CASH`, `CUSTOMERTYPEID`, `CREATED`, `PHONE`, `RESETPASSWORDTOKEN`, `RESETPASSWORDEXPIRES`, `STATUS`) VALUES
(1, 'letuongqui', '$2b$10$wAk/llpjiLaUjI8YGDtssO2.WrOEIcANcQJ.jRe4eW7O2aKCcfjuC', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/UserImages%2F1%2F1560900796965-9eff42b583de9434ac04d4cbc049a8d4--bird-gif-camera-lens.jpg?alt=media&token=40fbd087-9cc4-41fb-be21-efe36ec49ad5', ' Lê Tường Qui', 'qui021033398@gmail.com', '1998-06-02', 0, 2, '2019-06-18', '0987012635', '', '1998-02-01 12:00:00', 1),
(2, 'nguyenthienLy', '$2b$10$/g7fBpsCbithO1ZiCZMgrumOFDbj8Lo6fmkQKdUSrrTYKnzu.74U.', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/UserImages%2F2%2F1560902358672-20496958-cartoon-sleepy-baby-cow-thinking-in-a-blue-background-icon.jpg?alt=media&token=1f62e30b-bafe-47ad-a83f-540f3758567f', 'Nguyễn Thiên Lý', 'nguyenmit2012@gmail.com', '1998-06-09', 387000, 1, '2019-06-19', '0344370834', '88fe57c29eaf9a5a1e22a4d7f5a834f4609f8ae0', '2019-06-19 03:46:51', 1),
(3, 'trankhanhlinh', '$2b$10$0La5xhBS04pcEsiRrD0BKOG7UjpzeQ4rr8ujiX4fy7O.RJ1sXaQ7K', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/UserImages%2F3%2F1560902541386-_Ninja-2-512.png?alt=media&token=02229fb4-0786-4b06-bd18-bae259c333db', 'Trần Khánh Linh', 'linhkhanhtran@gmail.com', '1999-06-07', 0, 1, '2019-06-19', '0987012654', '', '0000-00-00 00:00:00', 1),
(4, 'trinhnhatsinh', '$2b$10$y1uKYuKEFQoUq0Yvw5j8cu2YiyqPn0XnjiIdH/bD8L/P56cuHDb3O', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/UserImages%2F4%2F1560904884173-35832757615_7ec581fe21.jpg?alt=media&token=0e09e91d-a8ab-4f66-a425-386bd4c98f9c', 'Trịnh Nhất Sinh', 'trinhnhatsinh123@gmail.com', '1999-01-06', 0, 2, '2019-06-19', '0987033225', '', '0000-00-00 00:00:00', 1),
(5, '103953466800405191414', 'Google', 'https://lh4.googleusercontent.com/-y_PMOeBRm1k/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rczJfPsM5Xaq1j02t96Lf6OWBURKA/mo/photo.jpg', 'Tường Qui Lê', 'qui021098@gmail.com', NULL, 0, 2, '2019-06-19', '', '435f1503b8ca83999d8b8acc34b5299f8255a31c', '2019-06-19 02:52:09', 1),
(6, 'nguyenvanphuoc', '$2b$10$W.q/IZjIutTItlpqMfrx9uAeQFPr7YX5k.Ev420KxxH7A.o6ZM0PK', 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png', 'Nguyễn Văn Phước', 'phuoc@gmail.com', '2002-06-05', 0, 2, '2019-06-19', '0987012445', '', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer_type`
--

CREATE TABLE `customer_type` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customer_type`
--

INSERT INTO `customer_type` (`ID`, `NAME`) VALUES
(1, 'Khách -VIP'),
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
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `ID` int(11) NOT NULL,
  `IMAGE` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `RESIZEDIMAGE` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `TITLE` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `SHORTCONTENT` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `CONTENT` longtext COLLATE utf8_unicode_ci NOT NULL,
  `CREATED` date NOT NULL,
  `STATUS` int(11) NOT NULL,
  `VIEWS` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`ID`, `IMAGE`, `RESIZEDIMAGE`, `TITLE`, `SHORTCONTENT`, `CONTENT`, `CREATED`, `STATUS`, `VIEWS`) VALUES
(1, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F1%2F1560867786819-buoi-nam-roi-ngon-1.jpg?alt=media&token=f88583e7-1598-4c86-8c0f-70cf8953f937', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F1%2Fresized-1560867786819-buoi-nam-roi-ngon-1.jpg?alt=media&token=0ad30b4c-5163-466b-91ee-884788a155b4', 'BƯỞI NĂM ROI VĨNH LONG NGON GIÁ TỪ 5OOO Đ - 09.6161.4240', 'Theo như trao đổi với ông Nguyễn Văn Đức, chủ vườn Bưởi Năm Roi cho biết, giá bưởi năm roi hiện nay khá tốt, người tiêu dùng có thể mua để ăn hoặc mua buôn đều có lời cao.', '<h1 class=\"title\">BƯỞI NĂM ROI VĨNH LONG NGON GI&Aacute; TỪ 5OOO Đ - 09.6161.4240</h1>\r\n<div class=\"description\">\r\n<p>BẢO MINH chuy&ecirc;n cung cấp Bưởi Năm Roi Vĩnh Long chuần 100%. Cam kết chất lượng, gi&aacute; rẻ. ĐT: 09 6161 4240</p>\r\n</div>\r\n<div class=\"content\">\r\n<h2><em><strong>GI&Aacute; BƯỞI NĂM ROI HIỆN NAY</strong></em></h2>\r\n<p>Theo như trao đổi với &ocirc;ng Nguy&ecirc;̃n Văn Đức, chủ vườn Bưởi Năm Roi&nbsp;cho bi&ecirc;́t, gi&aacute; bưởi năm roi hi&ecirc;̣n nay kh&aacute; tốt, người ti&ecirc;u d&ugrave;ng c&oacute; thể mua để ăn hoặc mua bu&ocirc;n đều c&oacute; lời cao.</p>\r\n<blockquote>\r\n<p><strong>ĐẶT MUA BƯỞI NĂM ROI VĨNH LONG GI&Aacute; RẺ: 09 6161 4240</strong></p>\r\n</blockquote>\r\n<p>Cụ th&ecirc;̉, gi&aacute; bưởi loại đặc biệt (từ 1,2kg trở l&ecirc;n, c&agrave;nh l&aacute; đẹp) được c&aacute;c thương l&aacute;i mua tại nh&agrave; vườn với gi&aacute; kh&aacute; tốt. C&ograve;n bưởi loại I, loại II v&agrave; c&aacute;c loại kh&aacute;c gi&aacute; ch&ecirc;nh l&ecirc;̣ch kh&ocirc;ng nhi&ecirc;̀u, chỉ thấp hơn từ 2.000 - 4.000 đồng/kg.</p>\r\n<p><img src=\"http://buoidienbaominh.com/uploads/images/buoi-nam-roi-ngon-1.jpg\" alt=\"Bưởi Năm roi ngon gi&aacute; rẻ\" /></p>\r\n<h3><em>Bưởi Năm Roi ngon gi&aacute; rẻ tại vườn</em></h3>\r\n<p>&ldquo;Hi&ecirc;̣n nay, do nghịch m&ugrave;a n&ecirc;n nh&agrave; vườn n&agrave;o c&ograve;n bưởi đ&ecirc;̉ b&aacute;n l&agrave; m&ocirc;̣t ni&ecirc;̀m vui lớn&rdquo;, &ocirc;ng Nguy&ecirc;̃n Văn B&eacute; (69 tu&ocirc;̉i, ngụ &acirc;́p Mỹ An, x&atilde; Mỹ Ho&agrave;, thị x&atilde; B&igrave;nh Minh, tỉnh Vĩnh Long), người c&oacute; 0,7 ha bưởi năm roi đang được thu hoạch, ph&acirc;́n khởi n&oacute;i.</p>\r\n<blockquote>\r\n<p>Tham khảo th&ecirc;m địa chỉ nh&agrave; ph&acirc;n phối Bưởi Năm Roi uy t&iacute;n gi&aacute; rẻ tại: Bưởi Diễn Bảo Minh</p>\r\n</blockquote>\r\n<p>Theo m&ocirc;̣t s&ocirc;́ thương l&aacute;i cho hay, gi&aacute; bưởi năm roi cho đ&ecirc;́n thời đi&ecirc;̉m n&agrave;y tăng g&acirc;́p rưỡi so với c&ugrave;ng kỳ năm ngo&aacute;i nhưng đa s&ocirc;́ nh&agrave; vườn đ&ecirc;̀u kh&ocirc;ng c&ograve;n s&ocirc;́ lượng nhi&ecirc;̀u đ&ecirc;̉ b&aacute;n.</p>\r\n<p>To&agrave;n thị x&atilde; B&igrave;nh Minh của tỉnh Vĩnh Long&nbsp;c&oacute; 1.931 ha chuy&ecirc;n canh bưởi năm roi đang thu hoạch tr&aacute;i. Trong đ&oacute;, x&atilde; Mỹ Ho&agrave; chi&ecirc;́m hơn 90% sản lượng tr&aacute;i h&agrave;ng năm.</p>\r\n<p>Cũng theo &ocirc;ng Đức, gi&aacute; bưởi cao như vậy l&agrave; do sau T&ecirc;́t, bưởi tr&aacute;i m&ugrave;a kh&ocirc;ng c&ograve;n nhi&ecirc;̀u, thời ti&ecirc;́t qu&aacute; oi bức cũng ảnh hưởng kh&ocirc;ng nhỏ đ&ecirc;́n qu&aacute; tr&igrave;nh ph&aacute;t tri&ecirc;̉n của quả bưởi. V&igrave; v&acirc;̣y c&aacute;c vựa thu mua phải đ&oacute;ng cửa tạm ngưng l&agrave; chuy&ecirc;̣n kh&ocirc;ng tr&aacute;nh khỏi.<br />Theo &ocirc;ng &Yacute;, bưởi Năm Roi được gi&aacute; l&agrave; do sản lượng giảm mạnh, nhiều diện t&iacute;ch bưởi gi&agrave; cỗi đang được b&agrave; con cải tạo trồng lại cam s&agrave;nh hoặc c&acirc;y ăn tr&aacute;i kh&aacute;c. Ngo&agrave;i ra, s&acirc;u đầu đỏ tấn c&ocirc;ng cũng l&agrave;m nhiều vườn bưởi giảm sản lượng từ 30-50%. Với t&igrave;nh h&igrave;nh n&agrave;y, nhiều khả năng bưởi Tết sẽ thiếu nguồn cung v&agrave; sốt gi&aacute;.</p>\r\n<p>&Ocirc;ng Nguyễn Văn Ph&uacute;c ở x&atilde; Ph&uacute; Hữu cho hay: &ldquo;Gần 5.000m2 bưởi của gia đ&igrave;nh (khoảng 5,5 tấn tr&aacute;i) đ&atilde; được thương l&aacute;i thu mua cả vườn từ hơn 1 th&aacute;ng trước, gi&aacute; 55 triệu đồng, b&igrave;nh qu&acirc;n 10.000 đồng/kg. Tưởng mức gi&aacute; đ&oacute; đ&atilde; l&agrave; kh&aacute; nhưng l&uacute;c n&agrave;y gi&aacute; bưởi ng&agrave;y một tăng, khiến gia đ&igrave;nh bị hố lớn&rdquo;.</p>\r\n<p>C&ograve;n &ocirc;ng Nguyễn Văn Nu&ocirc;i ở ấp H&ograve;a Th&agrave;nh, x&atilde; Xu&acirc;n H&ograve;a (Kế S&aacute;ch - S&oacute;c Trăng) th&igrave; phấn khởi hơn v&igrave; c&aacute;ch đ&acirc;y 1 th&aacute;ng, thương l&aacute;i đến ng&atilde; gi&aacute; mua cả vườn khoảng 5 tấn tr&aacute;i với gi&aacute; 40 triệu đồng, &ocirc;ng đ&ograve;i 42 triệu đồng thương l&aacute;i kh&ocirc;ng đồng &yacute;, nhưng mấy h&ocirc;m trước, thương l&aacute;i đến ng&atilde; gi&aacute; 44 triệu đồng v&agrave; đặt cọc 10 triệu đồng, hẹn đến ng&agrave;y h&aacute;i tr&aacute;i sẽ trả nốt.</p>\r\n<h2><strong><em>BƯỞI NĂM ROI MUA Ở Đ&Acirc;U?</em></strong></h2>\r\n<p>Kh&aacute;c với&nbsp;<strong>Bưởi Diễn</strong>, Bưởi năm roi l&agrave; loại bưởi rất được ưa th&iacute;ch v&igrave; c&oacute; vị ngọt dịu đặc trưng, m&uacute;i bưởi lu&ocirc;n căng mọng nước. Bưởi l&agrave; loại tr&aacute;i c&acirc;y c&oacute; nhiều lợi &iacute;ch đối với sức khỏe con người. Bưởi năm roi được ph&acirc;n phối bởi Auchan được trồng theo phương ph&aacute;p hữu cơ, lu&ocirc;n đảm bảo chất lượng, thơm ngon v&agrave; an to&agrave;n tuyệt đối cho người ti&ecirc;u d&ugrave;ng.<br />Đi tour du lịch miền T&acirc;y, du kh&aacute;ch n&agrave;o cũng bị đặc sản tr&aacute;i c&acirc;y l&agrave;m m&ecirc; hoặc. Cứ v&agrave;o th&aacute;ng Chạp v&agrave; th&aacute;ng 8 &acirc;m lịch h&agrave;ng năm, một m&ugrave;i hương sảng kho&aacute;i lạ l&ugrave;ng lại xuất hiện đầy hấp dẫn tr&ecirc;n nhiều v&ugrave;ng đất của mảnh đất Đồng bằng S&ocirc;ng Cửu Long. Nhưng, nơi m&agrave; m&ugrave;i hương đặc biệt ấy xuất hiện nổi bật nhất, khiến nhiều người t&igrave;m đến nhất ch&iacute;nh l&agrave; v&ugrave;ng đất Vĩnh Long. V&agrave; m&ugrave;i hương m&agrave; ch&uacute;ng ta đề cập đến kh&ocirc;ng g&igrave; kh&aacute;c ngo&agrave;i m&ugrave;i thơm độc đ&aacute;o của những m&ugrave;a bưởi ch&iacute;n. Hơn hết, đ&oacute; c&ograve;n l&agrave; những m&ugrave;a bưởi 5 roi. Ai đi ngang Vĩnh Long đ&uacute;ng m&ugrave;a, dường như đều kh&ocirc;ng qu&ecirc;n mua v&agrave;i tr&aacute;i bưởi 5 roi đặc sản Vĩnh Long l&agrave;m qu&agrave;.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://buoidienbaominh.com/uploads/images/buoi-nam-roi-21.jpg\" alt=\"Gi&aacute; bưởi Năm Roi lu&ocirc;n ở mức kh&aacute; trong những năm gần đ&acirc;y\" width=\"300\" height=\"300\" /></p>\r\n<h3><em>Gi&aacute; bưởi Năm Roi tại vườn rất tốt</em></h3>\r\n<p>Bưởi 5 roi l&agrave; một giống bưởi ngon nổi tiếng ở nước ta, được ph&aacute;t hiện v&agrave; nh&acirc;n rộng bởi &ocirc;ng Trần Văn Bưởi (qu&ecirc; x&atilde; Ph&uacute; Hữu A, huyện Ch&acirc;u Th&agrave;nh, tỉnh Hậu Giang). Tuy c&oacute; nguồn gốc từ Hậu Giang, song, Vĩnh Long lại trở th&agrave;nh v&ugrave;ng đất m&agrave;u mỡ nhất cho giống bưởi n&agrave;y.<br />Bưởi l&agrave; một loại quả gi&agrave;u vitamin, tốt cho cơ thể, rất phổ biến ở nước ta. Bưởi c&oacute; nhiều loại kh&aacute;c nhau trong đ&oacute; nổi tiếng c&oacute; loại bưởi năm roi Bến Tre mang nhiều n&eacute;t đặc trưng ri&ecirc;ng khi thưởng thức. Bưởi Năm roi đặc biệt trọng lượng từ 0.8 đến tr&ecirc;n 1.2kg Tr&aacute;i bưởi c&oacute; những t&eacute;p Bưởi to-đều + Cuống tr&aacute;i c&ograve;n tươi, da căng v&agrave; ửng v&agrave;ng.</p>\r\n<ul>\r\n<li>Bưởi Năm Roi c&oacute; vỏ mỏng&nbsp;&ndash; bạn chỉ cần d&ugrave;ng tay vỗ&nbsp;vừa phải v&agrave;o tr&aacute;i bưởi sẽ nghe &acirc;m thanh lạch cạch v&agrave; ngược lại, ở tr&aacute;i vỏ d&agrave;y sẽ ph&aacute;t ra tiếng &ldquo;bụp bụp&rdquo;. C&ograve;n c&aacute;ch kh&aacute;c đơn giản hơn l&agrave; bạn d&ugrave;ng ng&oacute;n tay thuận bấm vừa phải v&agrave;o tr&aacute;i bưởi. Nếu bạn cảm thấy cứng tay l&agrave; được.</li>\r\n<li>Ngọt &ndash; Với lượng b&oacute;n c&acirc;n đối lượng ph&acirc;n (đạm, l&acirc;n, kali) cho c&acirc;y n&ecirc;n cơm bưởi ngọt thanh, nhiều nước, thơm phảng phất.</li>\r\n<li>&nbsp;Đều đặn, nặng hơn nhiều tr&aacute;i kh&aacute;c c&ugrave;ng cỡ &ndash; bạn d&ugrave;ng tay &ldquo;c&acirc;n&rdquo; tr&aacute;i bưởi sẽ cảm nhận được điều n&agrave;y.</li>\r\n</ul>\r\n<h2><strong><em>&nbsp;HƯỚNG DẪN C&Aacute;CH CHỌN BƯỞI NĂM ROI NGON</em></strong></h2>\r\n<p>Khi chọn bưởi Năm Roi, bạn n&ecirc;n chọn những quả c&oacute; tr&ecirc;n 1kg (bưởi Năm Roi nếu được chăm s&oacute;c kỹ khi ch&iacute;n c&oacute; thể đạt trọng lượng gần 2kg), cầm nặng tay. Giống bưởi Năm Roi ăn ngon nhất l&agrave; sau khi h&aacute;i từ 1-2 tuần.</p>\r\n<p>V&igrave; thế theo kinh nghiệm của nhiều b&agrave; nội trợ, nếu chọn bưởi Năm Roi để ăn, n&ecirc;n chọn những quả v&agrave;ng, hơi h&eacute;o mới l&agrave; quả ngọt, lại vừa được lợi về c&acirc;n nặng.</p>\r\n<p>Bưởi 5 roi sở dĩ c&oacute; c&aacute;i t&ecirc;n th&uacute; vị như thế bắt nguồn từ c&acirc;u chuyện: &ocirc;ng Bưởi muốn tr&acirc;n qu&yacute; giống bưởi thơm ngon n&ecirc;n cứ dọa mấy đứa ch&aacute;u trong nh&agrave; rằng, đứa n&agrave;o h&aacute;i mất tr&aacute;i sẽ bị phạt 5 roi. Cho đến nay, bưởi 5 roi đ&atilde; trở th&agrave;nh một loại tr&aacute;i c&acirc;y quen thuộc, ưa th&iacute;ch của nhiều người. Bưởi 5 roi c&oacute; đặc điểm m&agrave;u vỏ xanh mượt, d&aacute;ng như quả l&ecirc;, đường k&iacute;nh tầm 20cm, bề mặt vỏ mỏng, nổi c&aacute;c hột nhỏ hơi nh&aacute;m đều quanh vỏ. Khi ăn bưởi 5 roi, thực kh&aacute;ch sẽ cảm nhận được vị ngọt ngọt, chua chua, thanh m&aacute;t, gi&ograve;n, mọng nước m&agrave; kh&ocirc;ng một giống bưởi n&agrave;o kh&aacute;c c&oacute; thể c&oacute; được.</p>\r\n<h3><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://buoidienbaominh.com/uploads/images/buoi-nam-roi-vinh-long-1.jpg\" alt=\"Gi&aacute; bưởi Năm Roi Vĩnh Long lu&ocirc;n ở mức dẫn đầu cả nước\" /></h3>\r\n<h3>Chất lượng&nbsp;bưởi Năm Roi Vĩnh Long lu&ocirc;n ở mức dẫn đầu cả nước</h3>\r\n<p>Bưởi 5 roi ngo&agrave;i việc d&ugrave;ng để ăn tươi, tốt cho sức khỏe th&igrave; bưởi 5 roi c&ograve;n được d&ugrave;ng để chế biến nhiều m&oacute;n ăn kh&aacute;c như: gỏi bưởi, gỏi ăn k&egrave;m trong lẩu mắm, lẩu c&aacute;&hellip;</p>\r\n<p>Ở Vĩnh Long, bưởi 5 roi ngo&agrave;i việc l&agrave; một thực phẩm được ưa chuộng th&igrave; bưởi 5 roi c&ograve;n trở th&agrave;nh &ldquo;t&uacute;i v&agrave;ng&rdquo; cho nh&agrave; n&ocirc;ng. Hiện, huyện B&igrave;nh Minh của tỉnh Vĩnh Long l&agrave; nơi c&oacute; diện t&iacute;ch gieo trồng bưởi 5 roi lớn nhất tỉnh, với gần 2.000 ha, v&agrave; năng suất h&agrave;ng năm đạt đến gần 80.000 tấn. Kh&ocirc;ng chỉ lớn mạnh về số lượng, bưởi 5 roi ở Vĩnh Long c&ograve;n ghi điểm bằng độ chất lượng tốt, độ an to&agrave;n cao. Hầu hết người trồng bưởi ở đ&acirc;y đều tiến h&agrave;nh trồng theo ti&ecirc;u chuẩn VietGap, c&oacute; chứng nhận Global GAP, sản phẩm đều đ&atilde; để lại dấu ấn tr&ecirc;n thị trường xuất khẩu thế giới như: Mỹ, Ch&acirc;u &Acirc;u, Trung Đ&ocirc;ng.</p>\r\n<blockquote>\r\n<p>Qu&yacute; kh&aacute;ch c&oacute; thể đặt mua Bưởi Năm Roi tại website Buoidienbaominh.com</p>\r\n</blockquote>\r\n<p>C&oacute; thể n&oacute;i, quả bưởi đ&atilde; trở th&agrave;nh một h&igrave;nh ảnh đại diện cho nền n&ocirc;ng sản ở v&ugrave;ng đất Vĩnh Long, g&oacute;p phần th&uacute;c đẩy kinh tế v&ugrave;ng, mang lại thương hiệu n&ocirc;ng sản uy t&iacute;n cho tr&aacute;i c&acirc;y Việt Nam.<br />C&oacute; một điểm lưu &yacute; khi chọn bưởi Năm Roi l&agrave; c&ugrave;ng một giống bưởi nhưng nếu được trồng ở v&ugrave;ng đất kh&aacute;c nhau sẽ cho chất lượng kh&aacute;c nhau. Ở H&agrave; Nội, tại một số cửa h&agrave;ng tr&aacute;i c&acirc;y, người b&aacute;n h&agrave;ng vẫn giới thiệu l&agrave; bưởi Năm Roi song đ&acirc;y l&agrave; những tr&aacute;i bưởi được trồng ở miền Bắc hoặc l&agrave; giống bưởi d&acirc;y, quả nhỏ hơn bưởi Năm Roi Hậu Giang, Bến Tre hay Vĩnh Long, c&oacute; vị nhạt, chua, t&eacute;p bưởi kh&ocirc; v&agrave; kh&oacute; tr&oacute;c vỏ.<br />L&aacute; c&oacute; h&igrave;nh từ oval tới h&igrave;nh elip k&iacute;ch thước trung b&igrave;nh từ 5-10 x 2-5cm, c&oacute; khi tới 20 x12cm; đế gần tr&ograve;n hoặc gần h&igrave;nh tim, l&aacute; thuộc kiểu l&aacute; k&eacute;p biến dạng (đơn c&oacute; th&ugrave;y), th&ugrave;y ở phiến l&aacute; s&aacute;t v&agrave;o g&acirc;n ch&iacute;nh, l&aacute; phụ (eo l&aacute;, c&aacute;nh l&aacute;) c&oacute; k&iacute;ch thước trung b&igrave;nh 4-4,5 x 2,5-3cm; b&igrave;a l&aacute; kh&iacute;a tr&ograve;n, tr&ecirc;n 2 mặt l&aacute; c&oacute; nhiều tuyến dầu nằm rải r&aacute;c, phiến l&aacute; rộng c&oacute; thể tới 5cm hinh tim ngược.<br />Ph&aacute;t hoa mọc th&agrave;nh ch&ugrave;m ở n&aacute;ch l&aacute; c&oacute; thể nhiều hoặc chỉ một hoa. Ch&ugrave;m hoa ngắn, trục c&oacute; l&ocirc;ng. Hoa lớn chồi d&agrave;i 2-3cm, khi nở rộng 3-5cm, thuộc hoa ngũ ph&acirc;n. Bầu noăn c&oacute; đường k&iacute;nh trung b&igrave;nh 5mm, chiều d&agrave;i của bộ nhụy c&aacute;i (bầu noăn v&agrave; nướm) l&agrave; 8mm tiểu nhụy nhiều v&agrave; d&iacute;nh nhau. C&aacute;nh hoa m&agrave;u trắng ng&agrave; c&oacute; m&ugrave;i thơm d&agrave;i 2,5-3cm, số c&aacute;nh l&agrave; năm, xếp theo kiểu lu&acirc;n xen; số tiểu nhị từ 25-30 c&oacute; khi tới 35 c&aacute;i, bầu noăn từ 11 -17 buồng d&iacute;nh k&iacute;n.<br />Tất cả c&aacute;c hoa đều được thụ phấn h&igrave;nh th&agrave;nh quả nhưng khi ph&aacute;t triển thường mỗi c&agrave;nh chỉ c&ograve;n 1-2 quả. Quả c&oacute; dạng từ gần tr&ograve;n tới dạng quả l&ecirc;, đường k&iacute;nh trung b&igrave;nh 15- 20cm c&oacute; khi đạt 30cm, vỏ ngo&agrave;i dầy 2- 2,5cm m&agrave;u xanh hơi v&agrave;ng, khi ch&iacute;n c&oacute; m&agrave;u v&agrave;ng t&acirc;m quả rỗng, tr&ecirc;n vỏ nổi nhiều tuyến dầu, bề mặt vỏ nh&aacute;m v&agrave; vỏ trở n&ecirc;n mỏng hơn. M&uacute;i lớn, t&eacute;p c&oacute; m&agrave;u hơi v&agrave;ng trong mọng đầy nước. Hương vị ngọt kh&ocirc;ng the đắng, độ ngọt Brix từ 9.3- 10.5.** Độ chua pH~4.12.<br />Hột thường kh&ocirc;ng c&oacute; hoặc chỉ l&agrave; dạng l&eacute;p, đ&ocirc;i khi c&oacute; v&agrave;i hột c&oacute; nhiều cạnh m&agrave;u hơi v&agrave;ng; thường đơn ph&ocirc;i.<br />Ngo&agrave;i nhu cầu ở Nam Bộ v&agrave; Miền trung, bưởi Năm Roi c&ograve;n được ti&ecirc;u thụ nhiều ở miền Bắc nước ta.</p>\r\n<h2><strong><em>BƯỞI NĂM ROI - ĐẶC SẢN CỦA TỈNH&nbsp;VĨNH LONG</em></strong></h2>\r\n<p>Bưởi Năm Roi c&oacute; h&igrave;nh quả l&ecirc;, lột tr&oacute;c được vỏ lụa, c&oacute; nhiều m&uacute;i mọng nước, vị ngọt, kh&ocirc;ng c&oacute; hạt. Ch&iacute;nh v&igrave; vậy, muốn trồng giống bưởi n&agrave;y, n&ocirc;ng d&acirc;n phải nh&acirc;n giống. Bưởi Năm Roi, ngo&agrave;i việc ăn tươi giảm được cholesterol, c&ograve;n được d&ugrave;ng l&agrave;m ch&egrave; bưởi, chiết suất tinh dầu cho mỹ phẩm. Ri&ecirc;ng vỏ bưởi c&ograve;n được d&ugrave;ng l&agrave;m nem chay v&agrave; mới đ&acirc;y, theo Viện Y dược học d&acirc;n tộc TP.HCM, vỏ buởi nấu lấy nước uống sẽ l&agrave;m ti&ecirc;u mỡ, giảm b&eacute;o ph&igrave;<br />Thị x&atilde; B&igrave;nh Minh được thi&ecirc;n nhi&ecirc;n ban tặng điều kiện thuận lợi để ph&aacute;t triển n&ocirc;ng nghiệp, v&ugrave;ng đất n&agrave;y được ph&ugrave; sa bồ đắp từ 3 con s&ocirc;ng: s&ocirc;ng Hậu, s&ocirc;ng Măng Th&iacute;t v&agrave; song Tr&agrave; Von. C&agrave;ng thuận lợi hợn cho c&acirc;y bưởi năm roi khi m&agrave; những th&aacute;ng c&oacute; &iacute;t mưa như th&aacute;ng 2, th&aacute;ng 3 hay th&aacute;ng 9 đến th&aacute;ng 12 đều l&agrave; thời điểm c&acirc;y ra hoa v&agrave; thu hoạch của c&acirc;y bưởi.</p>\r\n<p>Tr&aacute;i bưởi Năm Roi đ&atilde; nổi tiếng nhưng để n&acirc;ng cao chất lượng, cũng như gi&aacute; trị của tr&aacute;i bưởi, hầu hết c&aacute;c hộ gia đ&igrave;nh trồng bưởi Năm Roi ở thị x&atilde; B&igrave;nh Minh đ&atilde; tập hợp lại th&agrave;nh c&aacute;c hợp t&aacute;c x&atilde; trồng bưởi theo ti&ecirc;u chuẩn của VietGAP v&agrave; GlobalGAP. Theo đ&oacute; những chủ vườn phải thực hiện nghi&ecirc;m ngặt về kỹ thuật chăm s&oacute;c, phương thức bảo quản v&agrave; thu hoạch bưởi.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://buoidienbaominh.com/uploads/images/buoi-nam-roi-ngon-1.jpg\" alt=\"Bưởi Năm Roi Vĩnh Long tại H&agrave; Nội c&oacute; gi&aacute; rẻ\" /></p>\r\n<h3><em>Bưởi Năm Roi Vĩnh Long tại H&agrave; Nội c&oacute; gi&aacute; rẻ</em></h3>\r\n<p>Kh&acirc;u chăm s&oacute;c bưởi rất được tr&uacute; trọng khi m&agrave; mỗi c&acirc;y bưởi trong vườn đề c&oacute; cắm biển đ&aacute;nh dấu ri&ecirc;ng để tiện theo d&otilde;i. Tr&ecirc;n mỗi tấm biển ấy ghi đầy đủ qu&aacute; tr&igrave;nh chăm s&oacute;c, ng&agrave;y b&oacute;n ph&acirc;n cũng như phun thuốc&hellip;</p>\r\n<p>Bưởi Năm Roi l&agrave; sự kết hợp vừa phải của hai vị chua v&agrave; ngọt, bưởi để c&agrave;ng l&acirc;u ăn c&agrave;ng ngon, thưởng thức tr&aacute;i bưởi thấy được vị ngọt thanh m&agrave; lại chua d&ocirc;n dốt dễ d&agrave;ng chinh phục được thực kh&aacute;ch gần xa đến với nơi đ&acirc;y.</p>\r\n<p>Bưởi năm roi thuần chủng l&agrave; loại kh&ocirc;ng c&oacute; hạt, vỏ tr&aacute;i bưởi mỏng, mỗi m&uacute;i bọng nước v&agrave; rất dễ b&oacute;c vỏ, ăn kh&ocirc;ng c&oacute; vị đắng như đa số c&aacute;c loại bưởi kh&aacute;c.<br />Tỉnh Vĩnh Long hiện trồng gần 8.000 ha bưởi Năm Roi với sản lượng khoảng 55.000 tấn/năm.</p>\r\n<p>Hiện nay kh&ocirc;ng chỉ tại thị x&atilde; B&igrave;nh Minh của Vĩnh Long m&agrave; c&ograve;n c&oacute; nhiều địa phương kh&aacute;c ven s&ocirc;ng Hậu cũng trồng giống c&acirc;y cho tr&aacute;i ngon, ngọt n&agrave;y như huyện Ch&acirc;u Th&agrave;nh, Hậu Giang.</p>\r\n<p>Mỗi tr&aacute;i bưởi khi thu hoạch kh&ocirc;ng chỉ c&oacute; hương vị thơm ngon m&agrave; c&ograve;n cho h&igrave;nh d&aacute;ng đẹp mắt, m&agrave;u sắc tươi đẹp n&ecirc;n rất được ưa chuộng d&ugrave;ng để trưng b&agrave;y trong dịp lễ tết.</p>\r\n<p>Trong những năm gần đ&acirc;y, dưới b&agrave;n tay t&agrave;i hoa của những người n&ocirc;ng d&acirc;n Nam Bộ nhiều &yacute; tưởng độc đ&aacute;o đ&atilde; được h&igrave;nh th&agrave;nh từ tr&aacute;i bưởi Năm Roi tạo n&ecirc;n. Những cặp bưởi hồ l&ocirc;, bưởi h&igrave;nh b&agrave;n tay phật&hellip; l&agrave; những sản phẩm c&oacute; được sức h&uacute;t rất mạnh trong dịp tết đến, xu&acirc;n về mang lại thu nhập cao cho những người d&acirc;n miệt vườn nơi đ&acirc;y.<br />Bưởi Năm Roi đ&atilde; được Cục sở hữu tr&iacute; tuệ cấp giấy chứng nhận đăng k&yacute; chỉ dẫn địa l&yacute; qua đ&oacute; khẳng định thương hiệu v&agrave; mục ti&ecirc;u vươn đến nhiều thị trường trong cũng như như ngo&agrave;i nước. Bưởi Năm Roi đang trong qu&aacute; tr&igrave;nh quảng b&aacute; thương hiệu mạnh mẽ với sự c&oacute; mặt trong c&aacute;c cuộc triển l&atilde;m n&ocirc;ng nghiệp, Hội chợ, được b&aacute;n trong c&aacute;c cửa h&agrave;ng, si&ecirc;u thị v&agrave; cả đem xuất khẩu&hellip;</p>\r\n</div>', '2019-06-18', 1, 5),
(2, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F2%2F1560869122305-hatdauga.jpg?alt=media&token=b5b83077-98b3-439f-a428-e5d7be7b9482', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F2%2Fresized-1560869122305-hatdauga.jpg?alt=media&token=23188532-7172-4060-a7ca-2466f4ee7322', 'Tác Dụng Của Hạt Đậu Gà Và 7 Cách Chế Biến Hạt Đậu Gà', 'Đậu gà – tên gọi Tiếng Anh là Chickpea, là một giống cây thuộc họ đậu, được trồng rộng rãi vì giá trị dinh dưỡng của hạt. Đậu gà là thực phẩm phổ biến và đóng vai trò quan trọng trong ẩm thực của nhiều nước: Ấn Độ, Châu Phi, ', '<p>Đậu g&agrave; &ndash; t&ecirc;n gọi Tiếng Anh l&agrave; Chickpea, l&agrave; một giống c&acirc;y thuộc họ đậu, được trồng rộng r&atilde;i v&igrave; gi&aacute; trị dinh dưỡng của hạt. Đậu g&agrave; l&agrave; thực phẩm phổ biến v&agrave; đ&oacute;ng vai tr&ograve; quan trọng trong ẩm thực của nhiều nước: Ấn Độ, Ch&acirc;u Phi, Trung &Aacute; hay Trung v&agrave; Nam Mỹ. Đậu g&agrave; được đ&aacute;nh gi&aacute; cao về protein v&agrave; chất xơ cao nội dung của họ, v&agrave; cũng chứa nhiều loại vitamin v&agrave; kho&aacute;ng chất c&oacute; lợi cho sức khỏe con người quan trọng. Trong b&agrave;i viết Bếp xin chia sẻ với người thương th&ocirc;ng tin tổng hợp về&nbsp;<em><strong>&ldquo;T&aacute;c Dụng Của Hạt Đậu G&agrave; V&agrave; 7 C&aacute;ch Chế Biến Hạt Đậu G&agrave;&rdquo;</strong></em>&nbsp;.</p>\r\n<div id=\"attachment_2818\" class=\"wp-caption aligncenter\"><img class=\"wp-image-2818\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://thucduongbaoan.com/wp-content/uploads/2018/11/%C4%91%E1%BA%ADu-g%C3%A0.jpg\" sizes=\"(max-width: 600px) 100vw, 600px\" srcset=\"https://thucduongbaoan.com/wp-content/uploads/2018/11/đậu-g&agrave;.jpg 800w, https://thucduongbaoan.com/wp-content/uploads/2018/11/đậu-g&agrave;-257x300.jpg 257w, https://thucduongbaoan.com/wp-content/uploads/2018/11/đậu-g&agrave;-768x897.jpg 768w\" alt=\"C&acirc;y đậu g&agrave; được trồng ơ nhiều nơi\" width=\"600\" height=\"701\" />\r\n<p class=\"wp-caption-text\"><em>C&acirc;y đậu g&agrave; được trồng ở nhiều nơi</em></p>\r\n</div>\r\n<h2><strong>GI&Aacute; TRỊ DINH DƯỠNG CỦA ĐẬU G&Agrave;</strong></h2>\r\n<p>Đậu g&agrave; được biết đến với gi&aacute; trị dinh dưỡng cao, đặc biệt l&agrave; h&agrave;m lượng chất đạm, protein v&agrave; chất xơ. Nếu so với c&aacute;c loại hạt v&agrave; đậu kh&aacute;c, lượng đạm trong đậu g&agrave; ở mức cao. Đồng thời trong đậu c&ograve;n c&oacute; một số vi chất như sắt, kẽm, kali, vitamin K, C, B6, etc. Trong 100g (kh&ocirc;, chưa chế biến) c&oacute;:</p>\r\n<ul>\r\n<li>Cung cấp 370 calo</li>\r\n<li>Protein: 20g</li>\r\n<li>Chất xơ: 18g</li>\r\n<li>Chất b&eacute;o: 6g</li>\r\n<li>Muối: 24mg</li>\r\n<li>Sắt: 5.4 mg</li>\r\n<li>Canxi: 120mg</li>\r\n<li>Vitamin C: 4.8mg</li>\r\n<li>Vitamin B6: 0.5mg</li>\r\n<li>Magie: 90mg</li>\r\n<li>V&agrave; một số dưỡng chất kh&aacute;c</li>\r\n</ul>\r\n<p>Đậu g&agrave; l&agrave; thực phẩm gi&agrave;u chất xơ: Chất xơ l&agrave; một trong những l&yacute; do n&ecirc;n th&ecirc;m loại đậu n&agrave;y v&agrave;o thực đơn của bạn. Hầu hết, chế độ ăn uống h&agrave;ng ng&agrave;y của mọi người đều thiếu chất xơ. T&ugrave;y thuộc v&agrave;o độ tuổi, giới t&iacute;nh nhu cầu chất xơ l&agrave; 21 đến 38 gam mỗi ng&agrave;y. 100 gam đậu đ&aacute;p ứng 1/3 nhu cầu về chất xơ của một ng&agrave;y.</p>\r\n<p><img class=\"aligncenter wp-image-2532\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://thucduongbaoan.com/wp-content/uploads/2017/09/hatdauga-YTC.png\" sizes=\"(max-width: 600px) 100vw, 600px\" srcset=\"https://thucduongbaoan.com/wp-content/uploads/2017/09/hatdauga-YTC.png 467w, https://thucduongbaoan.com/wp-content/uploads/2017/09/hatdauga-YTC-300x296.png 300w, https://thucduongbaoan.com/wp-content/uploads/2017/09/hatdauga-YTC-85x85.png 85w, https://thucduongbaoan.com/wp-content/uploads/2017/09/hatdauga-YTC-50x50.png 50w, https://thucduongbaoan.com/wp-content/uploads/2017/09/hatdauga-YTC-100x100.png 100w\" alt=\"Hạt đậu g&agrave; nấu c&aacute;c m&oacute;n thực dưỡng\" width=\"600\" height=\"592\" /><br />Chất xơ trong thực phẩm như đậu g&agrave; gi&uacute;p bạn cảm thấy năng lượng tr&agrave;n đầy, ăn &iacute;t hơn, giảm v&ograve;ng eo. Đậu n&agrave;y chứa chất xơ h&ograve;a tan, gi&uacute;p hạ thấp lipoprotein, cholesterol xấu, giữ đường trong m&aacute;u ổn định, mang lại nhiều lợi &iacute;ch cho người mắc bệnh tiểu. Ăn nhiều thực phẩm chứa chất xơ sẽ gi&uacute;p bạn giảm nguy cơ mắc một số loại ung thư, bệnh li&ecirc;n quan tới ti&ecirc;u h&oacute;a, dạ d&agrave;y, trực tr&agrave;ng</p>\r\n<p>Đậu g&agrave; gi&agrave;u folate. Folate đ&oacute;ng vai tr&ograve; quan trọng cho sức khỏe, đặc biệt l&agrave; phụ nữ trong độ tuổi sinh đẻ. N&oacute; đ&oacute;ng vai tr&ograve; quan trọng trong sự tăng trưởng của tế b&agrave;o, sự ph&aacute;t triển của b&agrave;o thai. Lượng folate thấp trước v&agrave; trong khi mang thai c&oacute; li&ecirc;n quan đến c&aacute;c khiếm khuyết ống thần kinh hoặc c&aacute;i dị tật bẩm sinh của cột sống hoặc n&atilde;o, dẫn đến c&aacute;c bệnh như spina bifida. Folate cũng đ&oacute;ng vai tr&ograve; quan trọng trong sự h&igrave;nh th&agrave;nh hồng cầu v&agrave; DNA.</p>\r\n<p>100g đậu g&agrave; đ&aacute;p ứng hơn 70% nhu cầu folate h&agrave;ng ng&agrave;y của phụ nữ n&oacute;i chung v&agrave; khoảng 50% nhu cầu của phụ nữ mang thai v&agrave; cho con b&uacute;.</p>\r\n<p>Đậu g&agrave; l&agrave; thực phẩm gi&agrave;u sắt cho người ăn chay. Trẻ em, phụ nữ, những người ăn chay cần bổ sung nhiều sắt từ thực vật. Sắt gi&uacute;p tạo ra c&aacute;c tế b&agrave;o hồng cầu v&agrave; c&aacute;c hoocmon nhất định, n&oacute; rất quan trọng đối với chức năng v&agrave; sự tăng trưởng của tế b&agrave;o. Do chu kỳ kinh nguyệt, phụ nữ c&oacute; nhu cầu sắt cao hơn nam giới, 18 miligam so với 8 miligam mỗi ng&agrave;y. Sau m&atilde;n kinh, nhu cầu của phụ nữ cũng giảm xuống c&ograve;n 8 miligam mỗi ng&agrave;y. 100 gam đậu g&agrave; đ&aacute;p ứng hơn 25 phần trăm nhu cầu sắt của phụ nữ v&agrave; hơn 50 phần trăm nhu cầu của một người đ&agrave;n &ocirc;ng h&agrave;ng ng&agrave;y.</p>\r\n<p>Đậu g&agrave; l&agrave; nguồn protein tuyệt vời. 100g đậu g&agrave; gi&agrave;u protein hơn 2 quả trứng. Bạn c&oacute; thể ăn đậu n&agrave;y c&ugrave;ng với một số loại ngũ cốc kh&aacute;c, hoặc salat. N&oacute; thay thế protein từ động vật cho những người ăn chay, ăn ki&ecirc;ng, ăn thực dưỡng.</p>\r\n<p>Đậu g&agrave; l&agrave; một loại ngũ cốc Dương cho những người ăn theo thực dưỡng Ohsawa. V&igrave; n&oacute; kh&ocirc; cứng, v&agrave; nấu l&acirc;u ch&iacute;n hơn c&aacute;c loại đậu kh&aacute;c.</p>\r\n<ul>\r\n<li>7 C&Aacute;CH CHẾ BIẾN ĐẬU G&Agrave;</li>\r\n</ul>\r\n<h3>1. CƠM GẠO LỨT VỚI ĐẬU G&Agrave;</h3>\r\n<p><strong>Nguy&ecirc;n liệu chuẩn bị:</strong><br />&ndash; Gạo lứt đỏ, hoặc gạo lứt trắng<br />&ndash; Đậu g&agrave; 100 gram<br />&ndash; Phổ tai 1 miếng nhỏ bằng cỡ bao di&ecirc;m<br />&ndash; Muối hầm</p>\r\n<p><strong>C&aacute;ch nấu:<br /></strong>&ndash; Nếu nấu gạo lứt đỏ, phải ng&acirc;m trước &iacute;t nhất 2 giờ đồng hồ, v&igrave; gạo lứt đỏ rất cứng. C&aacute;c loại gạo lứt kh&aacute;c chỉ cần vo để r&aacute; r&aacute;o nước.<br />&ndash; Đậu g&agrave; l&agrave; loại đậu kh&ocirc;, ng&acirc;m đậu &iacute;t nhất 2 giờ, c&oacute; người ng&acirc;m qua đ&ecirc;m<br />&ndash; Cho gạo lứt, đậu g&agrave;, ch&uacute;t muối hầm v&agrave;o nồi. Rửa sạch miếng phổ tai rồi đặt l&ecirc;n tr&ecirc;n. Đổ nước v&agrave;o nồi.<br />&ndash; C&aacute;ch nấu như nấu cơm gạo lứt đỏ b&igrave;nh thường. Người thương c&oacute; thể tham khảo th&ecirc;m c&aacute;ch nấu cơm gạo lứt&nbsp;<a href=\"https://thucduongbaoan.com/nau-com-gao-lut-do-nhu-the-nao-cho-ngon/\">Tại đ&acirc;y</a>.<br />Nấu cơm như n&agrave;y c&oacute; đầy đủ dưỡng chất, nguồn cung cấp protein lớn từ đậu g&agrave;, kho&aacute;ng chất từ phổ tai, v&agrave; vị ngọt dịu của gạo lứt.</p>\r\n<h3>2. ĐẬU G&Agrave; KHO SỮA DỪA</h3>\r\n<p><strong>Nguy&ecirc;n liệu:</strong><br />&ndash; Đậu g&agrave;<br />&ndash; Nấm hương<br />&ndash; H&agrave;nh kh&ocirc;/ n&eacute;n<br />&ndash; Ti&ecirc;u, nước tương tamari, sữa dừa (nước cốt dừa vắt từ dừa gi&agrave;, hạn chế d&ugrave;ng nước cốt dừa đ&oacute;ng lọ), mật m&iacute;a</p>\r\n<p><strong>C&aacute;ch nấu:</strong><br />&ndash; Đậu g&agrave; ng&acirc;m qua đ&ecirc;m<br />&ndash; Nấm hương rửa sạch, ng&acirc;m nước ấm khoảng 20 ph&uacute;t<br />&ndash; H&agrave;nh kh&ocirc; b&oacute;c vỏ, băm nhỏ, phi thơm với ch&uacute;t dầu. Cho nấm hương v&agrave;o x&agrave;o với h&agrave;nh kh&ocirc; cho x&eacute;m cạnh với nước tương. Cho đậu g&agrave; v&agrave;o đảo đều, cho th&ecirc;m nước ng&acirc;m nấm hương s&acirc;m sấp v&agrave; ninh khoảng 10 ph&uacute;t.<br />&ndash; Th&ecirc;m ti&ecirc;u, mật m&iacute;a, sữa dừa v&agrave;o nồi v&agrave; ninh tiếp 15 ph&uacute;t cho đậu g&agrave; ch&iacute;n bở, ngấm gia vị. N&ecirc;m nếm th&ecirc;m nước tương cho m&oacute;n ăn vừa miệng.<br />&ndash; M&oacute;n n&agrave;y ăn c&ugrave;ng cơm lứt đỏ, hoặc n&ecirc;m đậm vị thưởng thước c&ugrave;ng b&aacute;nh m&igrave; lứt&hellip;</p>\r\n<h3>3. CHẢ ĐẬU G&Agrave;</h3>\r\n<p><strong>Nguy&ecirc;n liệu:</strong><br />&ndash; Đậu g&agrave; ng&acirc;m qua đ&ecirc;m trong tủ lạnh<br />&ndash; Củ h&agrave;nh t&acirc;y<br />&ndash; Tỏi, m&ugrave;i ta<br />&ndash; Bột mỳ lứt<br />&ndash; Ti&ecirc;u đen, muối<br />&ndash; Nước tương tamari, hoặc nước mắm thực dưỡng để n&ecirc;m nếm<br />&ndash; C&oacute; thể c&oacute; th&ecirc;m ch&uacute;t rong bi&ecirc;n ăn liền nữa th&igrave; ngon hơn<br />&ndash; Dầu hướng dương</p>\r\n<p><strong>C&aacute;ch nấu:</strong><br />&ndash; Đậu g&agrave; ng&acirc; qua đ&ecirc;m để r&aacute;o nước. H&agrave;nh tấy th&aacute;i hạt lựu. Rau m&ugrave;i cắt kh&uacute;c.<br />&ndash; Cho c&aacute;c nguy&ecirc;n liệu v&agrave;o m&aacute;y xay với ti&ecirc;u, muối, nước tương, nước mắm, t&ugrave;y theo khẩu vị của từng người.<br />&ndash; Chảo dầu hướng dương đun n&oacute;ng. Nặn vi&ecirc;n v&agrave; chi&ecirc;n v&agrave;ng đều 2 mặt. Sau đ&oacute; vớt ra để cho r&aacute;o dầu.<br />&ndash; Chả c&oacute; thể n&ecirc;m đậm vị, ăn c&ugrave;ng với cơm lứt, kh&aacute; l&agrave; bắt cơm. Hoặc n&ecirc;m nhạt để chấm với nước mắm chua ngọt hoặc sốt bơ đậu phụng với tương tamari.</p>\r\n<h3>4. ĐẬU G&Agrave; KHO TI&Ecirc;U</h3>\r\n<p>M&oacute;n n&agrave;y cũng kh&aacute; tương tự m&oacute;n &ldquo;Đậu g&agrave; kho sữa dừa&rdquo;</p>\r\n<p><strong>Nguy&ecirc;n liệu:</strong><br />&ndash; Đậu g&agrave;<br />&ndash; Ti&ecirc;u xanh, nếu kh&ocirc;ng c&oacute; ti&ecirc;u xanh c&oacute; thể d&ugrave;ng hạt ti&ecirc;u đen<br />&ndash; H&agrave;nh t&acirc;y<br />&ndash; C&agrave; rốt<br />&ndash; Phổ tai (rong biển l&aacute; d&agrave;i) 1 miếng nhỏ cỡ bao di&ecirc;m<br />&ndash; Bột sắn d&acirc;y nguy&ecirc;n chất<br />&ndash; Muối hầm, tương tamari, dầu dừa hoặc dầu m&egrave;</p>\r\n<p><strong>C&aacute;ch nấu:<br /></strong>&ndash; Đậu g&agrave; ng&acirc;m qua đ&ecirc;m cho nở, mềm. Ninh đậu g&agrave; nhừ c&ugrave;ng với muối v&agrave; phổ tai. Duy tr&igrave; mực nước xấp xấp hạt đậu. Ninh tầm 1 tiếng, hoặc c&oacute; thể thử nếu hạt đậu mềm nhừ l&agrave; được<br />&ndash; Th&aacute;i h&agrave;nh t&acirc;y, c&agrave; rốt th&agrave;nh hạt lựu 1cm<br />&ndash; Cho dầu v&agrave;o chảo, phi h&agrave;nh t&acirc;y cho thơm, v&agrave; x&agrave;o sơ qua c&agrave; rốt ( l&uacute;c c&agrave; rốt ch&iacute;n tới 1/3 rắc một ch&uacute;t muối để c&agrave; rốt được ngọt). Tr&uacute;t v&agrave;o nồi đậu đ&atilde; hấp, cho ti&ecirc;u xanh v&agrave;o nồi. Th&ecirc;m nước tương, muối hầm cho vừa miệng<br />&ndash; Đun tiếp khoảng 15 ph&uacute;t nhỏ lửa để gia vị thấm đều v&agrave;o thức ăn, pha 1 muỗng bột sắn ra b&aacute;t nước lọc nguội, rồi đổ v&agrave;o nồi đun sền sệt<br />&ndash; Th&ecirc;m c&aacute;c loại rau thơm v&agrave; thưởng thức với cơm gạo lứt đỏ dẻo</p>\r\n<h3>5. ĐẬU HŨ NON TỪ ĐẬU G&Agrave;</h3>\r\n<p><strong>Nguy&ecirc;n liệu:<br /></strong>&ndash; Đậu g&agrave;<br />&ndash; Nước lọc</p>\r\n<p><strong>C&aacute;ch nấu:</strong><br />&ndash; Ng&acirc;m đậu g&agrave; qua đ&ecirc;m, s&aacute;ng rửa 2-3 lần dưới v&ograve;i nước<br />&ndash; Tiếp theo cho v&agrave;o m&aacute;y xay đổ 1500ml nước<br />&ndash; Xay nhuyễn, lọc b&atilde;, thu được hỗn hợp cho l&ecirc;n bếp đun nhỏ lửa tới khi hỗn hợp sền sệt lại, tắt bếp cho ra khu&ocirc;n<br />&ndash; Bỏ v&agrave;o ngăn m&aacute;t tủ lạnh 1 giờ ,sẽ đ&ocirc;ng th&agrave;nh phẩm</p>\r\n<h3>6. SỮA ĐẬU G&Agrave; V&Agrave; C&Aacute;C LOẠI HẠT (CỦ)</h3>\r\n<p><strong>Nguy&ecirc;n liệu:<br /></strong>&ndash; Đậu g&agrave; :30gr<br />&ndash; Đậu xanh, đậu<br />&ndash; C&aacute;c loại củ như: B&iacute; đỏ, khoai lang, c&agrave; rốt,&hellip;</p>\r\n<p><strong>C&aacute;ch nấu:<br /></strong>&ndash; Ng&acirc;m đậu qua đ&ecirc;m, s&aacute;ng rửa sạch lại với nước. Đối với đậu xanh c&aacute;c mẹ loại bỏ hạt hư, đen<br />&ndash; Luộc đậu g&agrave;, đậu xanh trong 30 ph&uacute;t<br />&ndash; Cho tất cả v&agrave;o m&aacute;y xay c&ugrave;ng với 200ml nước<br />&ndash; Xay nhuyễn, lọc b&atilde; lần 1, lấy hỗn hợp lần 1 cho v&agrave;o m&aacute;y xay, xay nhuyễn, lọc b&atilde; lần 2<br />&ndash; Thu được hỗn hợp cho l&ecirc;n bếp đun s&ocirc;i lăn tăn l&agrave; được.</p>\r\n<h3>7. CƠM TRỘN KIM CHI (HOẶC SALAD C&Aacute;C KIỂU)</h3>\r\n<p><strong>Nguy&ecirc;n liệu:<br /></strong>&ndash; Đậu g&agrave;<br />&ndash; Cơm lứt đỏ<br />&ndash; Kim chi<br />&ndash; Nấm hương, đậu khu&ocirc;n chi&ecirc;n<br />&ndash; Dưa leo, rong biển<br />&ndash; Dầu m&egrave;, m&egrave; đen, ng&ograve;</p>\r\n<p><strong>C&aacute;ch nấu:</strong><br />&ndash; Đậu g&agrave; ng&acirc;m 2-3 tiếng hoặc qua đ&ecirc;m, hầm ch&iacute;n<br />&ndash; Cơm lứt đỏ nấu ch&iacute;n (th&ecirc;m muối hoặc phổ tai trong l&uacute;c nấu cơm)<br />&ndash; Th&aacute;i sợi dưa leo, đậu khu&ocirc;n, nấm<br />&ndash; L&agrave;m n&oacute;ng thố đất, cho th&ecirc;m v&agrave;o một th&igrave;a d&agrave;u m&egrave;, tr&aacute;ng đều quanh nồi<br />&ndash; Cho cơm lứt đỏ v&agrave;o. Th&ecirc;m c&aacute;c th&agrave;nh phần kh&aacute;c v&agrave;o ( đậu khu&ocirc;n, nấm, dưa leo, kim chi, đậu g&agrave;&hellip;)<br />&ndash; Để lửa vừa phải cho c&aacute;c th&agrave;nh phần n&oacute;ng l&ecirc;n, sau đ&oacute; bỏ rong biển, rắc m&egrave; v&agrave; ng&ograve; thơm v&agrave;o.<br />&ndash; Trộn đều v&agrave; thưởng thức.</p>\r\n<p><em>B&agrave;i chia sẻ về&nbsp;&ldquo;T&aacute;c Dụng Của Hạt Đậu G&agrave; V&agrave; 7 C&aacute;ch Chế Biến Hạt Đậu G&agrave;&rdquo;&nbsp; của Bếp Thực Dưỡng Bảo An hy vọng gi&uacute;p người thương c&oacute; th&ecirc;m nhiều th&ocirc;ng tin về loại đậu g&agrave; gi&agrave;u chất dinh dưỡng v&agrave; chế t&aacute;c được nhiều m&oacute;n ngon với c&aacute;c c&ocirc;ng thức hướng dẫn ở tr&ecirc;n.&nbsp;</em><br /><em>Ch&uacute;c người thương lu&ocirc;n c&oacute; những bữa cơm an l&agrave;nh th&acirc;n t&acirc;m!</em></p>', '2019-06-18', 1, 10),
(3, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F3%2F1560873022884-0822nuoi-ga-globalgap.jpg?alt=media&token=c7c95cfd-de1c-4a97-a0f0-0dea1d51b60c', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F3%2Fresized-1560873022884-0822nuoi-ga-globalgap.jpg?alt=media&token=f60f6798-ac22-46af-b7c8-d66f00e13760', 'Nuôi gà công nghệ, một bước ra thế giới', 'Nuôi gà công nghệ, một bước ra thế giới', '<div id=\"block-faa0099d67159f7dceae\" class=\"sqs-block html-block sqs-block-html\" data-block-type=\"2\">\r\n<div class=\"sqs-block-content\">\r\n<p>Ph&acirc;n kh&uacute;c thịt g&agrave; trắng c&ocirc;ng nghiệp trị gi&aacute; hơn nửa tỷ đ&ocirc;la đang c&oacute; chuyển biến đ&aacute;ng kể khi n&ocirc;ng d&acirc;n &aacute;p dụng KH-CN để c&oacute; thể cạnh tranh với thịt ngoại v&agrave; lần đầu ti&ecirc;n sản phẩm thịt g&agrave; của Việt Nam kh&ocirc;ng chỉ đ&aacute;p ứng nhu cầu nội địa m&agrave; c&ograve;n xuất khẩu th&agrave;nh c&ocirc;ng&hellip;</p>\r\n</div>\r\n</div>\r\n<div id=\"block-yui_3_17_2_1_1519875385529_70145\" class=\"sqs-block image-block sqs-block-image sqs-text-ready\" data-block-type=\"5\">\r\n<div id=\"yui_3_17_2_1_1560872872367_66\" class=\"sqs-block-content\">\r\n<div id=\"yui_3_17_2_1_1560872872367_65\" class=\"image-block-outer-wrapper layout-caption-below design-layout-inline   \">\r\n<div id=\"yui_3_17_2_1_1560872872367_64\" class=\"intrinsic\">\r\n<div id=\"yui_3_17_2_1_1560872872367_63\" class=\"image-block-wrapper   has-aspect-ratio\" data-description=\"\"><img class=\"thumb-image loaded\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://static1.squarespace.com/static/5930dc9237c5817c00b10842/t/5a9776a153450aaaab0d19d7/1519875747786/0822nuoi-ga-globalgap.jpg?format=1500w\" alt=\"0822nuoi-ga-globalgap.jpg\" data-src=\"https://static1.squarespace.com/static/5930dc9237c5817c00b10842/t/5a9776a153450aaaab0d19d7/1519875747786/0822nuoi-ga-globalgap.jpg\" data-image=\"https://static1.squarespace.com/static/5930dc9237c5817c00b10842/t/5a9776a153450aaaab0d19d7/1519875747786/0822nuoi-ga-globalgap.jpg\" data-image-dimensions=\"1018x764\" data-image-focal-point=\"0.5,0.5\" data-load=\"false\" data-image-id=\"5a9776a153450aaaab0d19d7\" data-type=\"image\" data-image-resolution=\"1500w\" /></div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n<div id=\"block-yui_3_17_2_1_1519875385529_70425\" class=\"sqs-block html-block sqs-block-html\" data-block-type=\"2\">\r\n<div class=\"sqs-block-content\">\r\n<p><strong>Trại g&agrave; Global GAP</strong></p>\r\n<p>Trại g&agrave; c&ocirc;ng nghiệp hơn 200.000 con của &ocirc;ng Nguyễn Văn Ngọc (huyện Vĩnh Cửu, Đồng Nai) l&agrave; một trong số ba khu trại duy nhất ở Việt Nam đang &aacute;p dụng quy tr&igrave;nh chăn nu&ocirc;i chuẩn Global GAP. Để c&oacute; được khu trại đạt chuẩn, hồi cuối năm ngo&aacute;i, &ocirc;ng Ngọc phải chấp nhận bỏ ra th&ecirc;m 20% chi ph&iacute;, tương đương 400 triệu đồng/trại c&ocirc;ng suất 10.000 con, mua sắm thiết bị, thiết kế, x&acirc;y dựng lại to&agrave;n bộ khu trại...</p>\r\n<p>So với trước đ&acirc;y nu&ocirc;i g&agrave; &ldquo;tự s&aacute;ng t&aacute;c, nghĩ g&igrave; l&agrave;m đ&oacute;&rdquo;, nay &aacute;p dụng chuẩn Global GAP, mọi thứ ho&agrave;n to&agrave;n mới với những n&ocirc;ng d&acirc;n đ&atilde; c&oacute; kinh nghiệm hơn 20 năm như &ocirc;ng Ngọc.</p>\r\n<p>Đầu ti&ecirc;n, c&aacute;c chủ trại phải tu&acirc;n thủ nghi&ecirc;m ngặt hướng dẫn của nh&oacute;m nh&acirc;n vi&ecirc;n quốc tế về Global GAP, họ phải thiết kế lại hệ thống nước thải theo hướng an to&agrave;n sinh học, giảm triệt để g&acirc;y &ocirc; nhiễm m&ocirc;i trường.</p>\r\n<p>Chung quanh trại, thay v&igrave; để cỏ dại mọc như trước, nay phải đổ b&ecirc; t&ocirc;ng, tr&aacute;ng nhựa, trồng c&acirc;y cho h&agrave;i ho&agrave; với kh&ocirc;ng gian xanh. Mỗi trang trại, thay v&igrave; c&ocirc;ng nh&acirc;n cho g&agrave; ăn, nay chủ trại được khuyến nghị đầu tư silo (bồn chứa thức ăn), g&agrave; ăn bằng hệ thống tự động, giảm tối đa tiếp x&uacute;c của con người. Để giảm nguy cơ l&acirc;y bệnh, thức ăn sản xuất từ nh&agrave; m&aacute;y chở bằng xe bồn tr&uacute;t thẳng v&agrave;o c&aacute;c silo, chứ kh&ocirc;ng đ&oacute;ng v&agrave;o từng bao tải vận chuyển như trước.</p>\r\n<p>Một sự kh&aacute;c biệt lớn nhất nữa đ&oacute; l&agrave; nh&agrave; ăn c&ocirc;ng nh&acirc;n, nếu trước đ&acirc;y c&ocirc;ng nh&acirc;n ăn chung, ngủ chung với g&agrave;, th&igrave; Global GAP y&ecirc;u cầu phải t&aacute;ch biệt họ với khu trại. Đặc biệt, mỗi khu trại phải c&oacute; một l&ograve; thi&ecirc;u, vốn đầu tư tr&ograve;n 1 tỷ đồng ti&ecirc;u huỷ x&aacute;c g&agrave;, động vật; chứ kh&ocirc;ng l&agrave;m theo c&aacute;ch truyền thống ch&ocirc;n hoặc cho c&aacute; ăn, dễ ph&aacute;t sinh mầm bệnh&hellip;</p>\r\n<p>Kỹ thuật chăn nu&ocirc;i g&agrave; theo ti&ecirc;u chuẩn Global GAP tuy kh&ocirc;ng kh&aacute;c biệt nhiều so với phương thức chăn nu&ocirc;i c&ocirc;ng nghiệp m&agrave; c&aacute;c trang trại vẫn đang &aacute;p dụng, nhưng đ&ograve;i hỏi mọi kh&acirc;u phải tỉ mỉ, ch&iacute;nh x&aacute;c.</p>\r\n<p>Mỗi c&ocirc;ng nh&acirc;n chỉ đảm nhận một c&ocirc;ng việc, họ l&agrave;m thuần thục giống như những cỗ m&aacute;y, c&oacute; kế hoạch l&agrave;m việc r&otilde; r&agrave;ng chứ kh&ocirc;ng phải thức khuya, dậy sớm theo lối &ldquo;ng&agrave;y kh&ocirc;ng c&oacute; giờ, tuần kh&ocirc;ng c&oacute; thứ&rdquo;, ăn chung, ngủ chung với&hellip; g&agrave;.</p>\r\n<p>&ldquo;Một trại trước đ&acirc;y c&oacute; 30 c&ocirc;ng nh&acirc;n, nay nhờ tự động ho&aacute;, cũng phần việc như vậy, nhưng r&uacute;t ngắn c&ograve;n 3. Họ thức dậy giờ n&agrave;o, cho g&agrave; ăn giờ n&agrave;o, cho ăn bao nhi&ecirc;u c&aacute;m, thời điểm n&agrave;o vệ sinh chuồng trại, ch&iacute;ch vắc xin ng&agrave;y n&agrave;o trong tuần&hellip; được l&ecirc;n lịch cụ thể.</p>\r\n<p>Mỗi người một phần việc chứ kh&ocirc;ng chồng ch&eacute;o, lẫn lộn, tư chế v&agrave; c&ocirc;ng việc được ghi nhật k&yacute; ng&agrave;y, nhật k&yacute; tuần, nhật k&yacute; th&aacute;ng để theo d&otilde;i. Sau n&agrave;y l&agrave;m tư liệu truy xuất nguồn gốc&rdquo;, &ocirc;ng Ngọc giới thiệu.</p>\r\n<p>Một trại g&agrave; kh&aacute;c đang &aacute;p dụng chuẩn Global GAP của &ocirc;ng Nguyễn Minh Kha ở huyện T&acirc;n Ph&uacute;, Đồng Nai. Trang trại sử dụng ho&agrave;n to&agrave;n bằng c&ocirc;ng nghệ tự động của Đức; được kiểm so&aacute;t rất nghi&ecirc;m ngặt, nước uống, thức ăn được r&oacute;t v&agrave;o c&aacute;c silo ở đầu trại, chuyển tự động đến từng con g&agrave;. Mỗi trại 20.000 con chỉ cần hai c&ocirc;ng nh&acirc;n quản l&yacute;.</p>\r\n<p>C&ocirc;ng việc của họ l&agrave; kiểm tra c&aacute;c dữ liệu đầu v&agrave;o, kiểm tra sức khoẻ con g&agrave;, sau đ&oacute; thu nhập, ph&acirc;n t&iacute;ch, đ&aacute;nh gi&aacute; hiệu quả trong ng&agrave;y, cũng như c&aacute;c biến động bất thường của khu trại để điều chỉnh. To&agrave;n bộ th&ocirc;ng tin được cập nhật v&agrave;o hệ thống phần mềm, hệ thống n&agrave;y được chuyển về điện thoại của chủ trại v&agrave; c&ocirc;ng ty để họ biết t&igrave;nh h&igrave;nh, lập kế hoạch.</p>\r\n<p>Theo &ocirc;ng Kha, ngo&agrave;i c&ocirc;ng nghệ tự động ho&aacute;, yếu tố th&agrave;nh c&ocirc;ng vượt trội nu&ocirc;i g&agrave; Global GAP l&agrave; việc kiểm so&aacute;t nghi&ecirc;m ngặt nguy cơ l&acirc;y bệnh, c&aacute;c khu nu&ocirc;i g&agrave; kh&ocirc;ng bao giờ cho người ngo&agrave;i v&agrave;o.</p>\r\n<p>C&ograve;n c&ocirc;ng nh&acirc;n ở trại n&agrave;o chỉ được ở khu đ&oacute;, đến giờ ăn c&oacute; người đem cơm tới tận nơi cho ăn, muốn ra ngo&agrave;i phải được chấp thuận v&agrave; khi trở lại trại họ phải c&oacute; ba bốn ng&agrave;y c&aacute;ch ly ở khu an to&agrave;n.</p>\r\n<p>&ldquo;Con g&agrave; nu&ocirc;i trong m&ocirc;i trường nhốt, khai th&aacute;c thịt trong v&ograve;ng năm s&aacute;u tuần n&ecirc;n mẫn cảm với dịch bệnh, chỉ c&oacute; c&aacute;ch ly ho&agrave;n to&agrave;n mới gi&uacute;p ch&uacute;ng khoẻ mạnh, ăn, lớn nhanh&rdquo;, &ocirc;ng Kha bảo.</p>\r\n<p>Trong khi đ&oacute;, theo &ocirc;ng Ngọc, một điểm quan trọng của Global GAP khi &aacute;p dụng v&agrave;o con g&agrave; đ&oacute; l&agrave; phải hướng đến ph&uacute;c lợi, sức khoẻ cho c&aacute;c b&ecirc;n, trong đ&oacute; đối tượng ưu ti&ecirc;n ch&iacute;nh l&agrave;&hellip; con g&agrave;.</p>\r\n<p>L&acirc;u nay, những người nu&ocirc;i g&agrave; như &ocirc;ng Ngọc, &ocirc;ng Kha thường ch&uacute; trọng đến n&acirc;ng c&ocirc;ng suất cao nhất cho trại g&agrave;, n&ecirc;n thường thả mật độ trung b&igrave;nh 15 con/m2, nay, ti&ecirc;u chuẩn Global GAP nghi&ecirc;m cấm, y&ecirc;u cầu giảm xuống 10 con/m2, gi&uacute;p con g&agrave; c&oacute; s&acirc;n chơi, c&oacute; kh&ocirc;ng gian thoải m&aacute;i trong sinh hoạt.</p>\r\n<p>B&ecirc;n cạnh đ&oacute;, mỗi chuồng nu&ocirc;i, phải bố tr&iacute; c&aacute;c cục rơm tr&ograve;n, căng d&acirc;y c&aacute;ch mặt s&agrave;n 40cm từ đầu n&agrave;y sang đầu kia lấy chỗ cho con g&agrave; bới, bay nhảy, đậu l&ecirc;n c&aacute;c d&acirc;y.</p>\r\n<p>&ldquo;N&oacute;i chung l&agrave; phải thiết kế l&agrave;m sao để con g&agrave; sinh sống giống như tập t&iacute;nh, sở th&iacute;ch tự nhi&ecirc;n vốn c&oacute; của n&oacute;&rdquo;, &ocirc;ng Ngọc n&oacute;i.</p>\r\n<p><strong>Cạnh tranh s&ograve;ng phẳng</strong></p>\r\n<p>&Ocirc;ng Nguyễn Minh Kha khẳng định nu&ocirc;i g&agrave; Global GAP ưu việt, từ con giống, lịch thả g&agrave;, bắt g&agrave;, số lứa nu&ocirc;i trong năm&hellip; đều l&ecirc;n kế hoạch trước. Nghĩa l&agrave;, người chăn nu&ocirc;i &ldquo;khoẻ&rdquo; hơn trước rất nhiều, ngay cả đầu ra cũng đ&atilde; c&oacute; c&aacute;c c&ocirc;ng ty trong chuỗi hỗ trợ. &ldquo;Tuy mới tham gia chuỗi, nhưng ch&uacute;ng t&ocirc;i đ&atilde; tăng từ 4 l&ecirc;n 5 lứa g&agrave;/năm (tăng 20% sản lượng v&agrave; 20% lợi nhuận&rdquo;, &ocirc;ng tiết lộ.</p>\r\n<p>Hiệu quả lớn nhất trong việc &aacute;p dụng Global GAP v&agrave;o c&aacute;c trại g&agrave; c&ocirc;ng nghiệp, như giới thiệu của một số người chăn nu&ocirc;i, đ&oacute; l&agrave; nhờ quy tr&igrave;nh kiểm so&aacute;t chặt chẽ n&ecirc;n giảm nguy cơ dịch bệnh tối đa cho đ&agrave;n g&agrave;. Trước đ&acirc;y, do chưa c&oacute; kiểm so&aacute;t, đ&agrave;n g&agrave; thường xuy&ecirc;n bị bệnh, chủ trại phải tốn tiền d&ugrave;ng kh&aacute;ng sinh, vắc xin.</p>\r\n<p>G&agrave; bị bệnh th&igrave; tỷ lệ chết, năng suất, lứa nu&ocirc;i giảm đ&aacute;ng kể. &Ocirc;ng Nguyễn Văn Ngọc nhẩm t&iacute;nh việc kiểm so&aacute;t tốt dịch bệnh đ&atilde; gi&uacute;p trại g&agrave; của m&igrave;nh quay v&ograve;ng th&ecirc;m một lứa, l&ecirc;n năm lứa trong năm. Ngo&agrave;i ra, việc đầu tư thiết bị tự động ho&aacute; c&ograve;n gi&uacute;p cắt giảm tối đa nh&acirc;n c&ocirc;ng, giảm chi ph&iacute; vận chuyển con giống, c&aacute;m&hellip;</p>\r\n<p>&ldquo;Hơn một năm trước, ng&agrave;nh g&agrave; trắng của Việt Nam lu&ocirc;n đi sau Th&aacute;i Lan về c&ocirc;ng nghệ, chất lượng, gi&aacute; th&agrave;nh, nhưng nay, ch&uacute;ng t&ocirc;i khẳng định m&igrave;nh đ&atilde; ngang, thậm ch&iacute; vượt họ&rdquo;, &ocirc;ng Ngọc bảo, đồng thời cho hay gi&aacute; th&agrave;nh chăn nu&ocirc;i ở c&aacute;c trang trại &aacute;p dụng Global GAP giảm từ 26.000 đồng/kg xuống c&ograve;n 23.000 đồng, n&ecirc;n ho&agrave;n to&agrave;n c&oacute; thể cạnh tranh xuất khẩu được với c&aacute;c nước tr&ecirc;n thế giới.</p>\r\n<p>Li&ecirc;n doanh Koyu &amp; Unitek, hơn một năm trước chỉ c&oacute; thể t&igrave;m được nguồn nhập khẩu g&agrave; từ Th&aacute;i Lan, nay, nhận thấy lợi thế, họ đ&atilde; &ldquo;chia phần&rdquo; cho Việt Nam v&agrave; đang c&oacute; định hướng đẩy mạnh hợp t&aacute;c chăn nu&ocirc;i với n&ocirc;ng d&acirc;n để gia tăng xuất khẩu.</p>\r\n<p>Một doanh nghiệp kh&aacute;c l&agrave; c&ocirc;ng ty chăn nu&ocirc;i C.P Việt Nam cũng vừa c&ocirc;ng bố đang chuẩn bị ho&agrave;n thiện quy tr&igrave;nh chăn nu&ocirc;i g&agrave; to&agrave;n cầu, để chuẩn bị đến năm 2019 sẽ xuất khẩu.</p>\r\n<p>Một li&ecirc;n doanh kh&aacute;c l&agrave; BELGA, De Heus, nhờ &aacute;p dụng quy tr&igrave;nh c&ocirc;ng nghệ nu&ocirc;i g&agrave; hiện đại, họ đ&atilde; th&agrave;nh c&ocirc;ng khi sản xuất được con g&agrave; c&oacute; chất lượng đạt chuẩn thế giới, đồng thời đưa gi&aacute; th&agrave;nh nu&ocirc;i g&agrave; trắng về ngang, thậm ch&iacute; thấp hơn nhiều nước kh&aacute;c.</p>\r\n</div>\r\n</div>', '2019-06-18', 1, 3);
INSERT INTO `news` (`ID`, `IMAGE`, `RESIZEDIMAGE`, `TITLE`, `SHORTCONTENT`, `CONTENT`, `CREATED`, `STATUS`, `VIEWS`) VALUES
(4, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F4%2F1560905377645-meo-hay-voi-vo-buoi.jpg?alt=media&token=21fc5b68-e729-40b3-b35d-654fb36f6c28', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F4%2Fresized-1560905377645-meo-hay-voi-vo-buoi.jpg?alt=media&token=d213495c-9324-4d14-9c8a-2f380301542b', '20 mẹo hay với vỏ bưởi chị em nên biết', 'Vỏ bưởi có rất nhiều công dụng hữu ích. Dưới đây là những mẹo nhỏ sử dụng vỏ bưởi hiệu quả.', '<div id=\"articleTop-252935\">\r\n<p>1.&nbsp;<a href=\"https://www.phunuvagiadinh.vn/vo-buoi.topic\" target=\"_blank\" rel=\"noopener\">Vỏ bưởi</a>&nbsp;c&oacute; chứa chất kiềm, nếu chấm &iacute;t muối rồi ch&agrave; x&aacute;t l&ecirc;n c&aacute;c vết bẩn tr&ecirc;n đồ sơn m&agrave;i, sẽ sạch b&oacute;ng.</p>\r\n<p>2. Vỏ bưởi c&oacute; thể tẩy vết bẩn tr&ecirc;n mặt da nh&acirc;n tạo ở gi&agrave;y da, d&acirc;y nịt lưng...</p>\r\n<p>3. Vỏ bưởi 1 - 2 quả, th&ecirc;m 2 ly nước để nấu, sau đ&oacute; lấy nước để ch&agrave; rửa c&aacute;c vật dụng trong nh&agrave;, sẽ gi&uacute;p tẩy sạch c&aacute;c vết bẩn.</p>\r\n<p>4. Vỏ bưởi cắt hạt lựu, d&ugrave;ng mật ong hay đường c&aacute;t trắng ng&acirc;m cho thấm, nửa th&aacute;ng sau c&oacute; thể l&agrave;m nh&acirc;n b&aacute;nh bao ngọt, thơm ngon kho&aacute;i khấu.</p>\r\n</div>\r\n<div id=\"articleCenter-252935\">\r\n<div>&nbsp;</div>\r\n</div>\r\n<div id=\"GaxVideoInreadPlayerWrapper\">\r\n<div id=\"gaxInread\">&nbsp;</div>\r\n</div>\r\n<div id=\"articleBottom-252935\">\r\n<figure class=\"image\"><img src=\"https://cdn.phunuvagiadinh.vn/baongoc/meo-hay-voi-vo-buoi.jpg\" alt=\"\" width=\"500\" height=\"325\" />\r\n<figcaption>Vỏ bưởi rửa sạch xắt nhuyễn, th&ecirc;m đường c&aacute;t trắng, chế th&agrave;nh tương sốt bưởi ăn như tương sốt c&agrave;.</figcaption>\r\n</figure>\r\n<p>5. Vỏ bưởi rửa sạch xắt nhuyễn, th&ecirc;m đường c&aacute;t trắng, chế th&agrave;nh tương sốt bưởi ăn như tương sốt c&agrave;, với vị ngon kh&aacute;c thường.</p>\r\n<p>6. Khi chế biến c&aacute;c m&oacute;n thịt d&ecirc;, c&aacute;,... nếu th&ecirc;m v&agrave;o một &iacute;t vỏ bưởi, c&oacute; thể tẩy đi m&ugrave;i tanh đặc trưng của những thức ăn n&agrave;y.</p>\r\n<p>7. Khi nướng thịt hay sườn, th&ecirc;m v&agrave;o v&agrave;i l&aacute;t vỏ bưởi, m&ugrave;i vị sẽ tươi tắn m&agrave; kh&ocirc;ng thấy qu&aacute; b&eacute;o ngậy.</p>\r\n<p>8. Khi nấu ch&aacute;o, th&ecirc;m v&agrave;i l&aacute;t vỏ bưởi, ăn sẽ c&oacute; m&ugrave;i thơm, th&ecirc;m t&aacute;c dụng gi&uacute;p khai vị.</p>\r\n<p>9. S&aacute;t cạnh bếp l&ograve; nếu c&oacute; đặt v&agrave;i l&aacute;t vỏ bưởi, dưới t&aacute;c dụng ph&aacute;t t&aacute;n, tinh dầu trong vỏ bưởi sẽ l&agrave;m cả nh&agrave; thơm tho.</p>\r\n<p>10. Trong vỏ bưởi chứa nhiều vitamin C v&agrave; tinh dầu thơm, sau khi phơi kh&ocirc; đem bỏ chung với tr&agrave;, m&ugrave;i vị thơm phức, sẽ c&oacute; t&aacute;c dụng th&ocirc;ng mũi, miệng, đường ti&ecirc;u h&oacute;a, g&acirc;y sảng kho&aacute;i.</p>\r\n<p>11. Vỏ bưởi nấu nước hay vắt ra nước để uống, gi&uacute;p tỉnh rượu.</p>\r\n<figure class=\"image\"><img src=\"https://cdn.phunuvagiadinh.vn/baongoc/meo-hay-voi-vo-buoi2.jpg\" alt=\"\" width=\"450\" height=\"336\" />\r\n<figcaption>Vỏ bưởi nấu nước hay vắt ra nước để uống, gi&uacute;p tỉnh rượu.</figcaption>\r\n</figure>\r\n<p>12. Vỏ bưởi c&oacute; c&ocirc;ng năng h&oacute;a đ&agrave;m, trừ phong thấp, giảm huyết &aacute;p, l&agrave; 1 loại dược thảo rất tốt. Sau khi rửa sạch phơi kh&ocirc;, d&ugrave;ng ng&acirc;m trong rượu trắng, sau 2 - 3 tuần c&oacute; thể d&ugrave;ng, gi&uacute;p thanh phế, ti&ecirc;u đ&agrave;m, thời gian ng&acirc;m c&agrave;ng l&acirc;u, tửu vị c&agrave;ng thơm nồng.</p>\r\n<p>13. Vỏ bưởi c&ugrave;ng gừng tươi xắt l&aacute;t, th&ecirc;m nước nấu chung, d&ugrave;ng trị n&ocirc;n &oacute;i do dạ d&agrave;y h&agrave;n lạnh.</p>\r\n<p>14. Vỏ bưởi tươi 12g (hay vỏ kh&ocirc; 6g) nấu nước uống, gi&uacute;p trị t&aacute;o b&oacute;n.</p>\r\n<p>15. Vỏ bưởi nấu nước uống, gi&uacute;p giải độc từ c&aacute;, cua.</p>\r\n<p>16. Vỏ bưởi tươi 30g, cam thảo 6g, c&ugrave;ng nấu nước uống, gi&uacute;p trị vi&ecirc;m tuyến v&uacute;.</p>\r\n<p>17. Vỏ bưởi tươi ph&ograve;ng trị h&ocirc;i miệng.</p>\r\n<p>18. Vỏ bưởi sau khi phơi kh&ocirc;, bỏ v&agrave;o t&uacute;i vải kh&acirc;u k&iacute;n, d&ugrave;ng nấu nước để tắm, bảo vệ l&agrave;n da mịn m&agrave;ng, s&aacute;ng đẹp.</p>\r\n<p>19. Muốn t&oacute;c mượt m&agrave;, giảm rụng v&agrave; g&agrave;u. H&atilde;y đun s&ocirc;i một &iacute;t vỏ bưởi kh&ocirc; c&ugrave;ng 2 quả bồ kết bẻ nhỏ trong 1,5 l&iacute;t-2 l&iacute;t nước, để s&ocirc;i khoảng 5-10 ph&uacute;t, chờ nước nguội rồi d&ugrave;ng gội đầu.</p>\r\n<figure class=\"image align-center\"><img src=\"https://cdn.phunuvagiadinh.vn/baongoc/meo-hay-voi-vo-buoi3.jpg\" alt=\"\" width=\"500\" height=\"374\" />\r\n<figcaption>Muốn t&oacute;c mượt m&agrave;, giảm rụng v&agrave; g&agrave;u. H&atilde;y đun s&ocirc;i một &iacute;t vỏ bưởi kh&ocirc; c&ugrave;ng 2 quả bồ kết bẻ&nbsp;nhỏ trong 1,5 l&iacute;t-2 l&iacute;t nước, để s&ocirc;i khoảng 5-10 ph&uacute;t, chờ nước nguội rồi d&ugrave;ng gội đầu.</figcaption>\r\n</figure>\r\n<p>20. Nếu bạn c&ograve;n trẻ m&agrave; đ&atilde; c&oacute; dấu hiệu bị h&oacute;i th&igrave; h&atilde;y d&ugrave;ng vỏ bưởi tươi xịt l&ecirc;n t&oacute;c, tinh dầu trong vỏ bưởi c&oacute; t&aacute;c dụng k&iacute;ch th&iacute;ch t&oacute;c mọc ra. Nếu thể trạng bạn ph&ugrave; hợp th&igrave; sẽ c&oacute; cảm gi&aacute;c t&oacute;c d&agrave;y l&ecirc;n r&otilde; sau một thời gian. Mẹo n&agrave;y c&oacute; thể gi&uacute;p trị rụng t&oacute;c v&agrave; thưa t&oacute;c, tr&aacute;nh bị h&oacute;i.</p>\r\n</div>', '2019-06-19', 1, 32),
(5, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F5%2F1560905722196-red-pepper-tomato-relish-164718659.jpg?alt=media&token=0265710a-efee-4b31-9a20-fb7882318a69', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F5%2Fresized-1560905722196-red-pepper-tomato-relish-164718659.jpg?alt=media&token=015df676-2e4b-4e91-89a8-17daf330a483', 'Những món ngon từ cá hồi hợp khẩu vị người Việt', 'Cách làm cá hồi sốt cà chua: Cá hồi rửa sạch, để ráo. Ướp cá hồi với hạt tiêu và chút bột canh. Bắc chảo lên bếp, cho dầu ăn, đặt da cá hồi áp xuống chảo,', '<p><em>H&ocirc;m nay, bếp Emdep.vn sẽ gợi &yacute; cho c&aacute;c bạn danh s&aacute;ch những m&oacute;n ngon được chế biến từ nguy&ecirc;n liệu c&aacute; hồi, khiến bạn chỉ nh&igrave;n th&ocirc;i cũng muốn lao v&agrave;o bếp v&agrave; chế biến ngay!&nbsp;</em></p>\r\n<p><strong>1. C&aacute; hồi sốt c&agrave; chua</strong></p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://thumb.connect360.vn/unsafe/700x0/imgs.emdep.vn/Share/Image/2016/09/30/red-pepper-tomato-relish-164718659.jpg\" alt=\"M&oacute;n ngon từ c&aacute; hồi ph&ugrave; hợp với khẩu vị người Việt \" width=\"600\" /></p>\r\n<p><em>Nguy&ecirc;n liệu:&nbsp;</em>C&aacute; hồi, sốt c&agrave; chua, c&agrave; chua, hạt n&ecirc;m, bột canh, hạt ti&ecirc;u, tỏi, gừng, ớt, h&agrave;nh t&acirc;y, rau m&ugrave;i</p>\r\n<p><em>C&aacute;ch l&agrave;m c&aacute; hồi sốt c&agrave; chua:&nbsp;</em>C&aacute; hồi rửa sạch, để r&aacute;o. Ướp c&aacute; hồi với hạt ti&ecirc;u v&agrave; ch&uacute;t bột canh. Bắc chảo l&ecirc;n bếp, cho dầu ăn, đặt da c&aacute; hồi &aacute;p xuống chảo, chi&ecirc;n cho c&aacute; v&agrave;ng đều c&aacute;c mặt th&igrave; vớt c&aacute; ra. Cắt nhỏ c&agrave; chua, th&ecirc;m hạt n&ecirc;m, đem đảo mềm c&agrave; chua, sau đ&oacute; cho h&agrave;nh t&acirc;y xắt nhỏ v&agrave;o đảo c&ugrave;ng, tiếp theo đến c&aacute; hồi, th&ecirc;m &iacute;t tỏi v&agrave; gừng băm v&agrave;o. Om nồi c&aacute; đến khi nước sốt sền sệt th&igrave; tắt bếp.&nbsp;</p>\r\n<p><strong>2. C&aacute; hồi sốt ti&ecirc;u chanh</strong></p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://thumb.connect360.vn/unsafe/600x0/imgs.emdep.vn/Share/Image/2016/09/30/download-165313264.jpg\" alt=\"M&oacute;n ngon từ c&aacute; hồi ph&ugrave; hợp với khẩu vị người Việt \" /></p>\r\n<p><em>Nguy&ecirc;n liệu:</em>&nbsp;C&aacute; hồi, chanh, gừng, hạt ti&ecirc;u, x&igrave; dầu, dầu h&agrave;o, hạt n&ecirc;m, muối, đường, dầu ăn.&nbsp;</p>\r\n<p><em>C&aacute;ch l&agrave;m c&aacute; hồi sốt ti&ecirc;u chanh:&nbsp;</em>C&aacute; hồi rửa sạch, để r&aacute;o. Ướp c&aacute; với hạt n&ecirc;m, hạt ti&ecirc;u, đường, dầu ăn. Cho dầu v&agrave;o chảo, chi&ecirc;n c&aacute; hồi v&agrave;ng c&aacute;c mặt. Chuẩn bị nước sốt gồm: Nước chanh + hạt&nbsp;ti&ecirc;u + đường + hạt n&ecirc;m + x&igrave; dầu +&nbsp;dầu h&agrave;o, trộn đều&nbsp;c&aacute;c nguy&ecirc;n liệu cho tan v&agrave;o nhau. Chanh b&agrave;o lấy vỏ, chỉ lấy vỏ đừng lấy phần c&ugrave;i kẻo đắng. Gừng xắt sợi nhỏ. Bắc chảo l&ecirc;n bếp, x&agrave;o gừng v&agrave; vỏ chanh với nhau, sau đ&oacute; cho nước sốt v&agrave;o đảo c&ugrave;ng th&agrave;nh hỗn hợp sền sệt. Cho c&aacute; hồi ra đĩa, rưới nước sốt l&ecirc;n tr&ecirc;n v&agrave; thưởng thức n&oacute;ng.&nbsp;</p>\r\n<p><strong>3. Salad c&aacute; hồi trộn rau củ</strong></p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://thumb.connect360.vn/unsafe/600x0/imgs.emdep.vn/Share/Image/2016/09/30/salad-ca-hoi143797791770582499877525593676754382536314o-173323091-170037459.jpg\" alt=\"M&oacute;n ngon từ c&aacute; hồi ph&ugrave; hợp với khẩu vị người Việt \" /></p>\r\n<p><em>Nguy&ecirc;n liệu:&nbsp;</em>C&aacute; hồi, hạt ti&ecirc;u, muối, bột chi&ecirc;n gi&ograve;n, xo&agrave;i, bơ, h&agrave;nh t&acirc;y, ớt chu&ocirc;ng, dưa leo, h&agrave;nh l&aacute;, nước cốt chanh, đường.</p>\r\n<p><em>C&aacute;ch l&agrave;m salad c&aacute; hồi trộn rau củ:</em>&nbsp;Rau củ rửa sạch, xắt miếng vu&ocirc;ng, ướp rau củ với muối, nước cốt chanh, đường. C&aacute; hồi rửa sạch, để r&aacute;o, ướp c&aacute; với hạt ti&ecirc;u, bột canh, phủ bột chi&ecirc;n gi&ograve;n rồi đem chi&ecirc;n c&aacute; v&agrave;ng đều c&aacute;c mặt. Cho c&aacute; hồi ra đĩa, sau đ&oacute; cho rau củ v&agrave;o c&ugrave;ng, ăn k&egrave;m.&nbsp;</p>\r\n<p><strong>4. C&aacute; hồi nướng mật ong&nbsp;</strong></p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://thumb.connect360.vn/unsafe/500x0/imgs.emdep.vn/Share/Image/2016/09/30/cach-lam-ca-hoi-nuong-mat-ong-thom-ngon-bo-va-cuc-don-gian-170654745.jpg\" alt=\"M&oacute;n ngon từ c&aacute; hồi ph&ugrave; hợp với khẩu vị người Việt \" width=\"600\" /></p>\r\n<p><em>Nguy&ecirc;n liệu:</em>&nbsp;C&aacute; hồi, mật ong, muối, hạt ti&ecirc;u, tỏi băm, nước cốt chanh, vỏ chanh, dầu &ocirc; liu, bột m&igrave;.</p>\r\n<p><em>C&aacute;ch l&agrave;m c&aacute; hồi nướng mật ong:</em>&nbsp;C&aacute; hồi rửa sạch, để r&aacute;o. Ướp c&aacute; với bột canh, hạt ti&ecirc;u khoảng 30 ph&uacute;t. Chuẩn bị sốt mật ong: Đun chảy bơ, cho mật ong + muối + ti&ecirc;u khuấy đều, vắt th&ecirc;m &iacute;t nước cốt chanh cho thơm rồi tắt bếp. Cho bột m&igrave; ra đĩa, cho c&aacute; v&agrave;o phủ đều bột, sau đ&oacute; rũ sạch bột, đem chi&ecirc;n c&aacute; v&agrave;ng đều, sau đ&oacute; cho c&aacute; v&agrave;o l&ograve; nướng, rưới nước sốt l&ecirc;n tr&ecirc;n v&agrave; nướng khoảng 7-8 ph&uacute;t ở 200 độ C.&nbsp;</p>\r\n<p><strong>5. C&aacute; hồi kho ti&ecirc;u</strong></p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://thumb.connect360.vn/unsafe/500x0/imgs.emdep.vn/Share/Image/2016/09/30/50898706ca-hoi-kho-tieu-1-172825507.jpg\" alt=\"M&oacute;n ngon từ c&aacute; hồi ph&ugrave; hợp với khẩu vị người Việt \" width=\"600\" /></p>\r\n<p><em>Nguy&ecirc;n liệu:</em>&nbsp;C&aacute; hồi, hạt ti&ecirc;u xanh, ớt, nước m&agrave;u, đường, muối, nước mắm.</p>\r\n<p><em>C&aacute;ch l&agrave;m c&aacute; hồi kho ti&ecirc;u:&nbsp;</em>C&aacute; hồi rửa sạch, để r&aacute;o. Cho c&aacute; hồi v&agrave;o nồi đất, ướp c&aacute; hồi với muối, hạt ti&ecirc;u xanh, đường, mắm, ớt cắt l&aacute;t, dầu ăn cho ngấm gia vị khoảng 1-2 tiếng (tốt nhất n&ecirc;n để tủ lạnh). Khi c&aacute; ngấm, cho c&aacute; l&ecirc;n bếp, om lửa nhỏ, cho th&ecirc;m ch&uacute;t nước cho c&aacute; kh&ocirc;ng bị ch&aacute;y. Khi c&aacute; hơi ch&iacute;n, lật lại mặt c&aacute; cho ngấm đều nước sốt. Tiếp tục om lửa nhỏ đến khi nước sốt sền sệt l&agrave; ho&agrave;n th&agrave;nh.&nbsp;</p>\r\n<p><strong>6. Đầu c&aacute; hồi nấu canh&nbsp;</strong></p>\r\n<p>Đầu c&aacute; hồi cũng l&agrave; một phần rất ngon được nhiều gia đ&igrave;nh y&ecirc;u th&iacute;ch v&agrave; chế biến th&agrave;nh c&aacute;c m&oacute;n canh.&nbsp;</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://thumb.connect360.vn/unsafe/700x0/imgs.emdep.vn/Share/Image/2016/09/30/2014-11-21-124840-173524072.jpg\" alt=\"M&oacute;n ngon từ c&aacute; hồi ph&ugrave; hợp với khẩu vị người Việt \" width=\"600\" /></p>\r\n<p><em>C&aacute;ch l&agrave;m đầu c&aacute; hồi nấu chua:</em>&nbsp;Đầu c&aacute; rửa sạch, ướp với ch&uacute;t gia vị cho ngấm khoảng 30 ph&uacute;t. C&agrave; chua bổ m&uacute;i cau, dọc m&ugrave;ng sơ chế v&agrave; th&aacute;i l&aacute;t, dứa th&aacute;i l&aacute;t, đậu bắp th&aacute;i l&aacute;t, gi&aacute; đỗ rửa sạch. Cho đầu c&aacute; hồi r&aacute;n sơ qua. Bắc chảo l&ecirc;n bếp, cho c&agrave; chua v&agrave;o đảo ch&iacute;n với h&agrave;nh t&iacute;m băm, sau đ&oacute; cho nước v&agrave;o đun s&ocirc;i, khi nước s&ocirc;i th&igrave; thả đầu c&aacute; v&agrave;o, lần s&ocirc;i tiếp theo th&igrave; thả tất cả nguy&ecirc;n liệu c&ograve;n lại v&agrave;o nồi, n&ecirc;m nếm cho vừa miệng rồi tắt bếp.&nbsp;</p>\r\n<p><a href=\"http://emdep.vn/an-ngon/nhung-mon-ngon-tu-ca-hoi-hop-khau-vi-nguoi-viet-20160930163415756.htm\" target=\"_blank\" rel=\"noopener\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://thumb.connect360.vn/unsafe/500x0/imgs.emdep.vn/Share/Image/2016/09/30/nhung-mon-canh-ngon-bo-duong-21-173853611.jpg\" alt=\"Những m&oacute;n ngon từ c&aacute; hồi hợp khẩu vị người Việt\" width=\"600\" /></a></p>\r\n<p><em>C&aacute;ch l&agrave;m đầu c&aacute; hồi nấu me chua:</em>&nbsp;C&aacute; hồi rửa sạch, để r&aacute;o, ướp đầu c&aacute; với ch&uacute;t gia vị, đem chi&ecirc;n sơ tr&ecirc;n chảo dầu. Bắc nồi&nbsp;l&ecirc;n bếp, cho me chua v&agrave;o đảo sơ với dầu ăn sau đ&oacute; nước lạnh v&agrave;o đun s&ocirc;i, khi s&ocirc;i ta cho c&aacute; v&agrave;o đun, trước khi tắt bếp nếm lại gia vị, cho ớt tươi, th&igrave;a l&agrave; v&agrave;o l&agrave; ho&agrave;n th&agrave;nh.&nbsp;</p>\r\n<p>Ch&uacute;c c&aacute;c bạn th&agrave;nh c&ocirc;ng v&agrave; ngon miệng với những gợi &yacute; m&oacute;n ngon của ch&uacute;ng t&ocirc;i nh&eacute;!</p>', '2019-06-19', 1, 2),
(6, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F6%2F1560905860203-salo.jpg?alt=media&token=49ada392-c661-4755-a494-c9827a02bda6', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F6%2Fresized-1560905860203-salo.jpg?alt=media&token=2cb44174-aac9-4424-9258-6eadf1da90ce', '10 MÓN NGON VỚI CÁ HỒI', 'Chế biến các món ăn ngon từ cá hồi, một cảm giác tuyệt vời', '<p><strong>1. Salad c&aacute; hồi &ndash; lạ, ngon, đẹp mắt</strong></p>\r\n<div>Nguy&ecirc;n liệu &ndash; cho 8 phần ăn:</div>\r\n<p>&ndash; 400g c&aacute; hồi tươi ngon (bạn c&oacute; thể d&ugrave;ng c&aacute; ngừ nếu th&iacute;ch)<br />&ndash; 1 củ h&agrave;nh kh&ocirc;<br />&ndash; 1 nắm h&agrave;nh l&aacute;<br />&ndash; 3 th&igrave;a canh (45ml) nước tương (soy sauce)<br />&ndash; 1 th&igrave;a c&agrave; ph&ecirc; (5ml) dầu vừng<br />&ndash; 15g vừng rang<br />&ndash; 1 th&igrave;a c&agrave; ph&ecirc; ớt tươi xay tỏi hoặc &iacute;t hơn nếu bạn kh&ocirc;ng ăn được cay.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://dep.com.vn/Uploaded/phuongnth/2012_07_06/Salad%20ca%20hoi%202.jpg\" alt=\"\" /></p>\r\n<p>&nbsp;</p>\r\n<div>C&aacute;ch l&agrave;m:</div>\r\n<p>&nbsp;</p>\r\n<div>&ndash; C&aacute; thấm kh&ocirc; bằng khăn sạch hoặc giấy ăn, cắt th&agrave;nh c&aacute;c khối vu&ocirc;ng nhỏ vừa ăn, cất v&agrave;o ngăn m&aacute;t tủ lạnh trong khi bạn chế biến c&aacute;c nguy&ecirc;n liệu kh&aacute;c.</div>\r\n<p>&nbsp;</p>\r\n<div>&ndash; H&agrave;nh kh&ocirc; xắt l&aacute;t mỏng. H&agrave;nh l&aacute; th&aacute;i nhỏ.</div>\r\n<p>&nbsp;</p>\r\n<div>&ndash; Trộn đều h&agrave;nh kh&ocirc;, h&agrave;nh l&aacute;, ớt xay, vừng rang, dầu vừng v&agrave; tương đậu n&agrave;nh trong một b&aacute;t nhỏ &ndash; bạn c&oacute; hỗn hợp A.</div>\r\n<p>&nbsp;</p>\r\n<div>&ndash; Lấy c&aacute; ra, tr&uacute;t v&agrave;o t&ocirc; đựng hỗn hợp A hoặc ngược lại, tr&uacute;t hỗn hợp A v&agrave;o t&ocirc; đựng c&aacute; d&ugrave;ng th&igrave;a nhẹ nh&agrave;ng trộn đều cho c&aacute; ngấm gia vị.</div>\r\n<p>&ndash; Chia ra th&agrave;nh 8 phần bằng nhau, d&ugrave;ng ngay.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://dep.com.vn/Uploaded/phuongnth/2012_07_06/Salad%20ca%20hoi.jpg\" alt=\"\" /></p>\r\n<p><strong>2. C&aacute; hồi cuộn rau nướng</strong></p>\r\n<p>Nguy&ecirc;n liệu:</p>\r\n<p>&ndash; 1 khay c&aacute; hồi<br />&ndash; V&agrave;i c&acirc;y nấm to<br />&ndash; 1 quả dưa chuột<br />&ndash; 1 quả ớt chu&ocirc;ng đỏ, xanh, v&agrave;ng<br />&ndash; Hạt ti&ecirc;u đen, muối, dầu &ocirc; liu<br />&ndash; 1 ch&eacute;n vừng rang</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://dep.com.vn/Uploaded/phuongnth/2012_07_06/Ca%20hoi%20cuon%20rau%20nuong.jpg\" alt=\"\" width=\"542\" height=\"367\" /></p>\r\n<p>C&aacute;ch l&agrave;m:</p>\r\n<p>&ndash; Rửa sạch to&agrave;n bộ rau củ quả v&agrave; c&aacute; dưới v&ograve;i nước. Sau đ&oacute; th&aacute;i nhỏ nấm, rau, củ ra v&agrave; cho v&agrave;o b&aacute;t trộn với hạt ti&ecirc;u, gia vị, muối ăn để chuẩn bị cuộn.</p>\r\n<p>Lưu &yacute;: Bạn c&oacute; thể thay thế c&aacute;c loại rau củ theo sở th&iacute;ch v&agrave; khẩu vị của từng người.</p>\r\n<p>&ndash; C&aacute; hồi c&aacute;c ấy trải rộng ra, phết dầu ăn l&ecirc;n cả 2 mặt.</p>\r\n<p>&ndash; Sau đ&oacute; xếp c&aacute;c loại rau củ đ&atilde; th&aacute;i nhỏ v&agrave;o một đầu rồi nhẹ nh&agrave;ng cuộn lại. Cuộn chặt tay.</p>\r\n<p>&ndash; Cuộn xong sẽ được 1 miếng c&aacute; cuộn rau tr&ocirc;ng rất xinh. Tiếp tục l&agrave;m với những miếng c&aacute; c&ograve;n lại.</p>\r\n<p>&ndash; Cuối c&ugrave;ng cuộn xong r&ugrave;i th&igrave; mang đi nướng. Nếu c&oacute; l&ograve; th&igrave; cho v&agrave;o l&ograve; nướng. Bật l&ograve; ở 200 độ C cho n&oacute;ng trước, sau đ&oacute; mới cho c&aacute; v&agrave;o nướng, giảm bớt lửa rồi nướng trong v&ograve;ng 15 ph&uacute;t.</p>\r\n<p>Nếu kh&ocirc;ng c&oacute; l&ograve; th&igrave; vẫn c&oacute; thể cho c&aacute; l&ecirc;n vỉ nướng hoặc khay nướng, nướng như b&igrave;nh thường.</p>\r\n<p>&ndash; Khi c&aacute; ch&iacute;n th&igrave; mang ra đĩa, rắc th&ecirc;m một &iacute;t vừng rang l&ecirc;n. M&oacute;n n&agrave;y chấm với m&ugrave; tạt xanh v&agrave; nước x&igrave; dầu ớt tươi!</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://dep.com.vn/Uploaded/phuongnth/2012_07_06/ca-hoi-nuong-4.jpg\" alt=\"\" /></p>\r\n<p><strong>3. Lẩu đầu c&aacute; hồi nấu măng</strong></p>\r\n<p>Nguy&ecirc;n liệu (cho 4 người ăn):</p>\r\n<p>&ndash; 2 c&aacute;i đầu c&aacute; hồi (tổng cộng khoảng 1 kg)<br />&ndash; 1/4 tr&aacute;i thơm<br />&ndash; 2 tr&aacute;i c&agrave; chua<br />&ndash; 100 gr măng chua<br />&ndash; Một &iacute;t h&agrave;nh l&aacute;, th&igrave; l&agrave;, h&agrave;nh t&iacute;m, ớt sừng<br />&ndash; 2 tr&aacute;i me xanh (hoặc một muỗng canh đầy me ch&iacute;n)<br />&ndash; 1 muỗng c&agrave; ph&ecirc; bột nghệ<br />&ndash; Muối, nước mắm, hạt n&ecirc;m, đường</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://dep.com.vn/Uploaded/phuongnth/2012_07_06/Laucahoi2.jpg;pv6cdb453a47fba385.jpg\" alt=\"\" /></p>\r\n<p>C&aacute;ch l&agrave;m:</p>\r\n<p>&ndash; Đầu c&aacute; hồi l&agrave;m sạch, chặt l&agrave;m 4, để r&aacute;o.</p>\r\n<p>&ndash; C&agrave; chua th&aacute;i m&uacute;i; thơm xắt l&aacute;t; h&agrave;nh l&aacute;, th&igrave; l&agrave; cắt kh&uacute;c (5 cm); măng chua để r&aacute;o; me tr&aacute;i cạo vỏ, rửa sạch; h&agrave;nh t&iacute;m bằm nhỏ.</p>\r\n<p>&ndash; Đầu c&aacute; hồi ướp với muối, đường, hạt n&ecirc;m, h&agrave;nh t&iacute;m, bột nghệ.</p>\r\n<p>&ndash; Bắc chảo l&ecirc;n bếp cho n&oacute;ng, phi h&agrave;nh t&iacute;m, cho c&aacute; v&agrave;o x&agrave;o sơ, gắp ra đĩa.</p>\r\n<p>&ndash; X&agrave;o sơ thơm, c&agrave; chua, măng chua.</p>\r\n<p>&ndash; Nấu me xanh cho ch&iacute;n, dầm lấy nước (bỏ x&aacute;c).</p>\r\n<p>&ndash; Cho tất cả thơm, c&agrave; chua, măng, me v&agrave;o nồi nước (cho 4 người ăn) nấu s&ocirc;i. Cho đầu c&aacute; hồi v&agrave;o, n&ecirc;m nếm vừa ăn.</p>\r\n<p>&ndash; D&ugrave;ng chung với b&uacute;n tươi. Ăn tới đ&acirc;u, cho th&igrave; l&agrave;, h&agrave;nh l&aacute; v&agrave;o trụng tới đ&oacute;.</p>\r\n<p>&ndash; C&oacute; thể d&ugrave;ng với một &iacute;t nước mắm nguy&ecirc;n chất v&agrave; ớt sừng xắt l&aacute;t.</p>\r\n<p><strong>4. C&aacute; hồi kho tộ</strong></p>\r\n<p>Nguy&ecirc;n liệu:</p>\r\n<p>&ndash; 2 &ndash; 3 khoanh nhỏ c&aacute; hồi<br />&ndash; Đường, nước mắm, dầu ăn, muối, ti&ecirc;u<br />&ndash; H&agrave;nh hương</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://dep.com.vn/Uploaded/phuongnth/2012_07_06/Ca%20hoi%20kho%20to.jpg\" alt=\"\" /></p>\r\n<p>C&aacute;ch l&agrave;m:</p>\r\n<p>&ndash; C&aacute; mua về rửa sạch, d&ugrave;ng tay ch&agrave; v&agrave;o th&acirc;n c&aacute; khoảng một th&igrave;a nhỏ muối, để y&ecirc;n trong v&ograve;ng 30 ph&uacute;t.</p>\r\n<p>&ndash; Đun n&oacute;ng ba th&igrave;a nhỏ đường, với ba th&igrave;a s&uacute;p nước lạnh, đun s&ocirc;i lửa lớn đến khi đường chuyển m&agrave;u v&agrave;ng c&aacute;nh gi&aacute;n th&igrave; tắt bếp. Xếp từng kh&uacute;c c&aacute; v&agrave;o nồi, th&ecirc;m v&agrave;o nồi hai th&igrave;a nhỏ nước mắm, hai th&igrave;a nhỏ đường, &iacute;t hạt ti&ecirc;u. Th&ecirc;m h&agrave;nh hương đ&atilde; th&aacute;i nhỏ.</p>\r\n<p>&ndash; Đặt nồi lại l&ecirc;n bếp, đun s&ocirc;i, lửa nhỏ, kh&ocirc;ng đậy nắp nồi. N&ecirc;m nếm lại t&ugrave;y theo khẩu vị của bạn.<br />&ndash; Đun đến khi nước kho c&aacute; dẻo qu&aacute;nh lại, tắt bếp, m&uacute;c ra đĩa d&ugrave;ng n&oacute;ng với cơm.</p>\r\n<p><strong>5.&nbsp; X&agrave; l&aacute;ch c&aacute; hồi hun kh&oacute;i</strong></p>\r\n<p>Nguy&ecirc;n liệu:</p>\r\n<p>4 miếng c&aacute; hồi hun kh&oacute;i<br />1 tr&aacute;i dưa leo xắt ra từng khoanh tr&ograve;n, vừa, dừng mỏng qu&aacute; sẻ mất gi&ograve;n<br />5 củ khoai t&acirc;y luộc ch&iacute;n, xắt khoang tr&ograve;n<br />1 hũ c&acirc;pes (loại bạch hoa th&aacute;i) hơi chua nếu kh&ocirc;ng c&oacute; th&igrave; thay bằng chanh<br />2 trứng g&agrave; luộc ch&iacute;n cắt ra l&agrave;m tư<br />Ti&ecirc;u, muối, dấm đỏ, dầu<br />1 ch&uacute;t l&aacute; th&igrave; l&agrave;, 1 tr&aacute;i chanh</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://dep.com.vn/Uploaded/phuongnth/2012_07_06/Ca%20hoi%20xa%20lach%20hun%20khoi.jpg\" alt=\"\" /></p>\r\n<p>C&aacute;ch l&agrave;m:</p>\r\n<p>&ndash; C&aacute; hồi xắt l&aacute;t ra hơi to bảng.</p>\r\n<p>&ndash; Dưa leo, khoai t&acirc;y, trộn chung v&agrave;o , trộn 1 muỗng cafe hột C&acirc;pes (Bạch hoa Th&aacute;i) để v&agrave;o dĩa, trải l&aacute;c c&aacute; hồi hun kh&oacute;i tr&ecirc;n mặt, để trứng g&agrave; chung quanh dĩa cho đẹp.</p>\r\n<p>&ndash; L&aacute; th&igrave; l&agrave; xắt nhỏ rải l&ecirc;n mặt.</p>\r\n<p>&ndash; Chanh xắt ra từng khoanh hơi dầy, để chung quanh dĩa để vắt v&agrave;o c&aacute; hồi.</p>\r\n<p>L&agrave;m sốt dầu giấm:</p>\r\n<p>&ndash; Ti&ecirc;u, muối xem vừa ăn, để 1 phần giấm, th&igrave; l&agrave; ba phần dầu<br />Đ&aacute;nh cho tan muối, ti&ecirc;u<br />Khi ăn, để dầu giấm v&agrave;o.</p>\r\n<p><strong>6. S&uacute;p b&iacute; đỏ c&aacute; hồi</strong></p>\r\n<p>Nguy&ecirc;n liệu:</p>\r\n<p>&ndash; 1 t&aacute;ch nước cốt g&agrave;<br />1 tr&aacute;i b&iacute; đỏ nhỏ<br />300g c&aacute; hồi<br />2 muỗng bơ đ&atilde; l&agrave;m mềm<br />Ti&ecirc;u, gừng, muối, đường, h&agrave;nh t&acirc;y.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://dep.com.vn/Uploaded/phuongnth/2012_07_06/supbidocahoi.jpg\" alt=\"\" /></p>\r\n<p>C&aacute;ch l&agrave;m:</p>\r\n<p>&ndash; Cắt tr&aacute;i b&iacute; l&agrave;m đ&ocirc;i, cho v&agrave;o l&ograve; nướng đến khi b&iacute; ch&iacute;n mềm. Lấy muỗng x&uacute;c b&iacute; ra cho v&agrave;o m&aacute;y xay sinh tố hoặc m&aacute;y xay thịt xay sơ một lần cho nhuyễn, để ra t&ocirc;.&nbsp; Trong trường hợp kh&ocirc;ng c&oacute; l&ograve; nướng, c&oacute; thể xắt b&iacute; đỏ ra th&agrave;nh từng miếng nhỏ, luộc ch&iacute;n, sau đ&oacute; cho v&agrave;o m&aacute;y xay sinh tố, nhưng b&iacute; sẽ kh&ocirc;ng ngọt v&agrave; b&ugrave;i bằng nướng.</p>\r\n<p>&ndash; Cho h&agrave;nh t&acirc;y v&agrave;o x&agrave;o với bơ đến khi h&agrave;nh ch&iacute;n th&igrave; đổ nước cốt g&agrave; v&agrave;o trộn đều.</p>\r\n<p>&ndash; C&aacute; hồi hấp ch&iacute;n. Lưu &yacute;: n&ecirc;n hấp c&aacute;ch thủy để giữ lại được chất dinh dưỡng cũng như m&ugrave;i vị của c&aacute;, sau đ&oacute; x&eacute; c&aacute; ra th&agrave;nh từng miếng nhỏ, tơi.</p>\r\n<p>&ndash; Trộn hỗn hợp nước cốt g&agrave; v&agrave; c&aacute; hồi, cho v&agrave;o m&aacute;y xay nhuyễn.</p>\r\n<p>&ndash;&nbsp; Bắc nồi l&ecirc;n bếp, cho tất cả trộn chung v&agrave;o nấu đến khi s&ocirc;i, n&ecirc;m nếm vừa ăn. Nhấc xuống, d&ugrave;ng n&oacute;ng.</p>\r\n<p><strong>7. C&aacute; hồi xốt cam tươi</strong></p>\r\n<p>Nguy&ecirc;n liệu:</p>\r\n<p>C&aacute; hồi 1 miếng<br />Đậu H&agrave; Lan 100g<br />C&agrave; rốt 1 củ<br />Cam tươi 1 quả<br />Hạt n&ecirc;m, đường, vừng rang, rượu vang trắng, l&aacute; h&uacute;ng, l&aacute; thyme kh&ocirc;, dầu ăn</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://dep.com.vn/Uploaded/phuongnth/2012_07_06/Ca%20hoi%20xot%20cam%20tuoi.jpg\" alt=\"\" /></p>\r\n<p>C&aacute;ch l&agrave;m:</p>\r\n<p>&ndash; C&aacute; hồi cắt th&agrave;nh miếng vu&ocirc;ng hoặc chữ nhật d&agrave;y, cho v&agrave;o b&aacute;t ướp với ch&uacute;t rượu, hạt n&ecirc;m.</p>\r\n<p>&ndash; C&agrave; rốt th&aacute;i miếng cỡ ng&oacute;n tay &uacute;t. Cam tươi vắt lấy nước ra 1 c&aacute;i b&aacute;t ri&ecirc;ng, nếu cam hơi chua th&igrave; h&ograve;a th&ecirc;m ch&uacute;t đường.</p>\r\n<p>&ndash; Đun nước s&ocirc;i, cho nh&uacute;m muối v&agrave;o. Chần đậu H&agrave; Lan v&agrave; c&agrave; rốt cho ch&iacute;n tới.</p>\r\n<p>&ndash; Đặt chảo l&ecirc;n bếp, đun n&oacute;ng ch&uacute;t dầu ăn. Cho c&aacute; hồi v&agrave;o chi&ecirc;n ch&iacute;n 2 mặt, rắc 1 &iacute;t l&aacute; thyme l&ecirc;n tr&ecirc;n. Gắp ra đĩa. C&aacute; hồi rất mau ch&iacute;n n&ecirc;n bạn kh&ocirc;ng cần chi&ecirc;n qu&aacute; l&acirc;u.</p>\r\n<p>&ndash; Đặt chảo trở lại bếp. Cho t&iacute; x&iacute;u dầu ăn rồi đổ c&agrave; rốt v&agrave; đậu H&agrave; Lan v&agrave;o, n&ecirc;m ch&uacute;t hạt n&ecirc;m. Tiếp đ&oacute; đổ nước cam tươi v&agrave;o, n&ecirc;m nếm lại muối cho vừa ăn. Kh&ocirc;ng n&ecirc;n cho nhiều đường, sẽ bị lợ, kh&oacute; ăn. Đảo 1 l&uacute;c cho ngấm. Nhẹ nh&agrave;ng xếp c&aacute;c miếng c&aacute; v&agrave;o chảo xốt, đun lửa vừa cho r&uacute;t bớt nước, c&aacute; ngấm xốt l&agrave; được.</p>\r\n<p>&ndash; Sắp c&aacute; ra đĩa, rưới xốt v&agrave; rắc &iacute;t vừng l&ecirc;n tr&ecirc;n. D&ugrave;ng n&oacute;ng.</p>', '2019-06-19', 1, 2),
(7, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F7%2F1560906277721-337a9664317ceb3ca85e6c04c319f029-15603027447241885186858-crop-15605633472631190320749.jpeg?alt=media&token=17653996-bf1b-4c79-bb1f-3bbe01b20d5c', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F7%2Fresized-1560906277721-337a9664317ceb3ca85e6c04c319f029-15603027447241885186858-crop-15605633472631190320749.jpeg?alt=media&token=3d59eabb-73ee-4a25-8732-1a01154b0e27', 'Thị trường ngày 15/6: Giá ngô, lúa mì và đường tăng mạnh, dầu thô cũng tăng tiếp', 'Chốt phiên giao dịch đêm qua 14/6, giá dầu tăng tiếp, khí tự nhiên rời khỏi mức thấp nhất gần 3 năm, quặng sắt cao nhất 6 năm, ngô cao nhất 5 năm,', '<p><strong>Dầu tăng tiếp</strong></p>\r\n<p>Gi&aacute; dầu tăng khoảng 1% sau c&aacute;c cuộc tấn c&ocirc;ng 2 t&agrave;u chở dầu tại vịnh Oman trong tuần n&agrave;y, dấy l&ecirc;n mối lo ngại về khả năng gi&aacute;n đoạn nguồn cung, song gi&aacute; dầu vẫn c&oacute; tuần giảm do lo ngại tranh chấp thương mại sẽ khiến nhu cầu dầu to&agrave;n cầu suy giảm.</p>\r\n<p>Chốt phi&ecirc;n giao dịch đ&ecirc;m qua 14/6, dầu th&ocirc; Brent tăng 70 US cent tương đương 1,1% l&ecirc;n 62,01 USD/th&ugrave;ng v&agrave; dầu th&ocirc; T&acirc;y Texas WTI tăng 23 US cent tương đương 0,4% l&ecirc;n 52,51 USD/th&ugrave;ng. Tuy nhi&ecirc;n, gi&aacute; dầu Brent vẫn c&oacute; tuần giảm khoảng 2%, tuần giảm thứ 4 li&ecirc;n tiếp, trong khi gi&aacute; dầu th&ocirc; Mỹ giảm gần 3%.</p>\r\n<p>Gi&aacute; dầu c&oacute; tuần giảm do Cơ quan Năng lượng Quốc tế (IEA) cắt giảm dự b&aacute;o tăng trưởng nhu cầu dầu năm 2019 th&ecirc;m 100.000 th&ugrave;ng/ng&agrave;y (bpd) xuống 1,2 triệu bpd. Th&ecirc;m v&agrave;o đ&oacute; l&agrave; Tổ chức C&aacute;c nước Xuất khẩu Dầu mỏ (OPEC) cắt giảm dự b&aacute;o tăng trưởng nhu cầu dầu to&agrave;n cầu năm 2019 thậm ch&iacute; thấp hơn so với IEA xuống 1,14 triệu bpd.</p>\r\n<p><strong>Kh&iacute; tự nhi&ecirc;n rời khỏi mức thấp nhất gần 3 năm</strong></p>\r\n<p>Gi&aacute; kh&iacute; tự nhi&ecirc;n tại Mỹ tăng từ mức thấp nhất gần 3 năm, do dự b&aacute;o nhiệt độ v&agrave; nhu cầu tăng khi c&aacute;c nh&agrave; m&aacute;y ph&aacute;t điện đốt nhiều kh&iacute; hơn để đ&aacute;p ứng việc sử dụng điều h&ograve;a kh&ocirc;ng kh&iacute; tăng cao v&agrave; xuất khẩu tăng.</p>\r\n<p>Gi&aacute; kh&iacute; tự nhi&ecirc;n kỳ hạn th&aacute;ng 7/2019 tr&ecirc;n s&agrave;n New York tăng 6,2 US cent tương đương 2,7% l&ecirc;n 2,387 USD/mBTU, ng&agrave;y tăng mạnh nhất trong 5 tuần. T&iacute;nh chung cả tuần, gi&aacute; kh&iacute; tự nhi&ecirc;n tăng khoảng 2% sau khi giảm khoảng 11% trong hơn 3 tuần qua.</p>\r\n<p><strong>V&agrave;ng giảm trở lại, palađi tăng</strong></p>\r\n<p>V&agrave;ng giảm trở lại sau khi tăng l&ecirc;n mức cao nhất 14 th&aacute;ng trong đầu phi&ecirc;n giao dịch, do lạc quan về doanh số b&aacute;n lẻ của Mỹ l&agrave;m giảm bớt lo ngại nền kinh tế đang chậm lại trong qu&yacute; 2/2019.</p>\r\n<p>V&agrave;ng giao ngay tr&ecirc;n s&agrave;n LBMA (London Bullion Market Association) giảm 0,2% xuống 1.339,49 USD/ounce, trong đầu phi&ecirc;n giao dịch đạt 1.358,04 USD/ounce, cao nhất kể từ ng&agrave;y 11/4/2018. V&agrave;ng kỳ hạn th&aacute;ng 8/2019 tr&ecirc;n s&agrave;n New York tăng 0,1% l&ecirc;n 1.344,5 USD/ounce.</p>\r\n<p>Doanh số b&aacute;n lẻ của Mỹ trong th&aacute;ng 5/2019 tăng mạnh cho thấy sự gia tăng trong chi ti&ecirc;u của người ti&ecirc;u d&ugrave;ng, c&oacute; thể l&agrave;m giảm bớt lo ngại nền kinh tế đang chậm lại trong qu&yacute; 2/2019. Số liệu n&agrave;y l&agrave;m giảm bớt kỳ vọng Fed cắt giảm l&atilde;i suất ngay lập tức.</p>\r\n<p>Trong khi đ&oacute;, palađi tăng 1,3% l&ecirc;n 1.463,52 USD/ounce, tăng phi&ecirc;n thứ 7 li&ecirc;n tiếp v&agrave; c&oacute; tuần tăng mạnh nhất kể từ th&aacute;ng 4/2018.</p>\r\n<p><strong>Đồng giảm trở lại</strong></p>\r\n<p>Đồng giảm trở lại sau số liệu sản xuất v&agrave; đầu tư từ nước ti&ecirc;u thụ h&agrave;ng đầu &ndash; Trung Quốc &ndash; suy yếu, l&agrave;m gia tăng t&aacute;c động đến tăng trưởng v&agrave; triển vọng nhu cầu từ cuộc chiến thương mại Mỹ - Trung k&eacute;o d&agrave;i.</p>\r\n<p>Gi&aacute; đồng giao sau 3 th&aacute;ng tr&ecirc;n s&agrave;n London giảm 0,6% xuống 5.822 USD/tấn. Trong th&aacute;ng n&agrave;y, gi&aacute; đồng đ&atilde; giảm xuống 5.740 USD/tấn, thấp nhất 5 th&aacute;ng.</p>\r\n<p>Tăng trưởng sản lượng c&ocirc;ng nghiệp Trung Quốc trong th&aacute;ng 5/2019 bất ngờ chậm lại xuống mức thấp nhất hơn 17 năm, với đầu tư cũng giảm trong một dấu hiệu cho thấy nhu cầu suy yếu. Trung Quốc chiếm khoảng 1/2 nhu cầu đồng to&agrave;n cầu, ước đạt 24 triệu tấn trong năm nay, trong khi Mỹ chiếm gần 10%.</p>\r\n<p><strong>Quặng sắt cao nhất 6 năm, th&eacute;p giảm</strong></p>\r\n<p>Gi&aacute; quặng sắt tại Đại Li&ecirc;n tăng l&ecirc;n mức cao đỉnh điểm v&agrave; c&oacute; tuần tăng mạnh nhất kể từ th&aacute;ng 2/2019, được th&uacute;c đẩy bởi dự kiến nguồn cung thắt chặt v&agrave; nhu cầu tăng, trong bối cảnh Trung Quốc tăng cường hỗ trợ nền kinh tế chậm lại.</p>\r\n<p>Gi&aacute; quặng sắt kỳ hạn th&aacute;ng 9/2019 tr&ecirc;n s&agrave;n Đại Li&ecirc;n tăng 2,2% l&ecirc;n 783,5 CNY/tấn, trong phi&ecirc;n c&oacute; l&uacute;c tăng mạnh 4% l&ecirc;n 797,5 CNY (115,2 USD)/tấn, cao nhất kể từ năm 2013. T&iacute;nh chung cả tuần, gi&aacute; quặng sắt tăng 11,4% v&agrave; tăng 80% trong năm nay.</p>\r\n<p>Gi&aacute; quặng sắt giao ngay cũng tăng mạnh, với quặng sắt 62% Fe sang Trung Quốc dao động l&ecirc;n mức cao nhất gần 5 năm (107,5 USD/tấn), tăng so với 104,5 USD/tấn trong phi&ecirc;n trước đ&oacute;.</p>\r\n<p>Gi&aacute; th&eacute;p c&acirc;y kỳ hạn th&aacute;ng 10/2019 tr&ecirc;n s&agrave;n Thượng Hải giảm 0,5% xuống 3.755 CNY/tấn, x&oacute;i m&ograve;n mức tăng đầu phi&ecirc;n. Gi&aacute; th&eacute;p cuộn c&aacute;n n&oacute;ng tăng 0,1% l&ecirc;n 3.628 CNY/tấn.</p>\r\n<p><strong>Cao su giảm tiếp</strong></p>\r\n<p>Gi&aacute; cao su tại Tokyo giảm theo xu hướng gi&aacute; cao su kỳ hạn tại Thượng Hải, do dự trữ tăng.</p>\r\n<p>Gi&aacute; cao su kỳ hạn th&aacute;ng 11/2019 tr&ecirc;n s&agrave;n TOCOM giảm 2,6 JPY (0,024 USD) xuống 202 JPY/kg. Gi&aacute; cao su TSR20 kỳ hạn th&aacute;ng 12/2019 tr&ecirc;n s&agrave;n TOCOM giảm 1,2%.</p>\r\n<p>Đồng thời, gi&aacute; cao su kỳ hạn th&aacute;ng 9/2019 tr&ecirc;n s&agrave;n Thượng Hải giảm 245 CNY (35,39 USD) xuống 11.970 CNY/tấn, do dự trữ cao su tại kho ngoại quan Thượng Hải tăng 0,2% so với mức h&ocirc;m 31/5/2019.</p>\r\n<p><strong>Đường thiết lập mức cao mới 1,5 th&aacute;ng, c&agrave; ph&ecirc; giảm</strong></p>\r\n<p>Gi&aacute; đường tưng l&ecirc;n mức cao mới 1,5 th&aacute;ng, do nhu cầu ethanol tăng mạnh v&agrave; sản lượng đường tại Ấn Độ suy giảm, trong khi gi&aacute; c&agrave; ph&ecirc; giảm.</p>\r\n<p>Gi&aacute; đường th&ocirc; kỳ hạn th&aacute;ng 7/2019 tr&ecirc;n s&agrave;n ICE kh&ocirc;ng thay đổi ở mức 12,75 US cent/lb, sau khi đạt mức cao mới 1,5 th&aacute;ng (12,78 US cent/lb). Gi&aacute; đường trắng kỳ hạn th&aacute;ng 8/2019 tr&ecirc;n s&agrave;n ICE giảm 70 US cent tương đương 0,2% xuống 335 USD/tấn.</p>\r\n<p>Trong khi đ&oacute;, gi&aacute; c&agrave; ph&ecirc; Arabica kỳ hạn th&aacute;ng 9/2019 tr&ecirc;n s&agrave;n ICE giảm 1,7 US cent tương đương 1,7% xuống 98,05 US cent/lb. T&iacute;nh chung cả tuần gi&aacute; c&agrave; ph&ecirc; giảm 5,3%, tuần giảm mạnh nhất trong 1,5 năm. Gi&aacute; c&agrave; ph&ecirc; robusta kỳ hạn th&aacute;ng 9/2019 giảm 22 USD tương đương 1,6% xuống 1.392 USD/tấn.</p>\r\n<p><strong>Ng&ocirc; cao nhất 5 năm, l&uacute;a m&igrave; cao nhất 6 th&aacute;ng</strong></p>\r\n<p>Gi&aacute; ng&ocirc; tại Mỹ tăng l&ecirc;n mức cao nhất 5 năm, do dự b&aacute;o nhiều mưa tại khu vực đ&ocirc;ng Trung T&acirc;y Mỹ trong tuần tới, l&agrave;m giảm triển vọng diện t&iacute;ch trồng muộn v&agrave; năng suất c&acirc;y trồng.</p>\r\n<p>Gi&aacute; ng&ocirc; kỳ hạn th&aacute;ng 7/2019 tr&ecirc;n s&agrave;n Chicago tăng 8-1/4 US cent l&ecirc;n 4,5-1/4 USD/bushel, trong phi&ecirc;n c&oacute; l&uacute;c đạt 4,57-1/4 USD/bushel, cao nhất kể từ th&aacute;ng 6/2014.</p>\r\n<p>Gi&aacute; đậu tương kỳ hạn th&aacute;ng 7/2019 tr&ecirc;n s&agrave;n Chicago tăng 5 US cent l&ecirc;n 8,93 USD/bushel. Gi&aacute; l&uacute;a m&igrave; đỏ, mềm vụ đ&ocirc;ng c&ugrave;ng kỳ hạn tr&ecirc;n s&agrave;n Chicago giảm 1/4 US cent xuống 5,35-1/4 USD/bushel, trong phi&ecirc;n c&oacute; l&uacute;c đạt 5,44 USD/bushel, cao nhất kể từ ng&agrave;y 19/12/2018.</p>', '2019-06-19', 1, 2),
(8, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F8%2F1560906394016-hinh_1_klfr.jpg?alt=media&token=33daeba2-e1e1-408c-a811-fff01bd02b66', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F8%2Fresized-1560906394016-hinh_1_klfr.jpg?alt=media&token=a01ee7b0-f483-4d6f-90df-8667ca181042', 'Lối sống organic\' đang phổ biến tại Việt Nam', 'Tại các quốc gia phát triển ở Châu Âu, Mỹ, xu hướng sống organic (hay còn gọi là hữu cơ) ngày càng trở nên phổ biến và ưa chuộng như một giải pháp để “sống sạch sống khỏe”.', '<p class=\"article-sapo cms-desc\">Tại c&aacute;c quốc gia ph&aacute;t triển ở Ch&acirc;u &Acirc;u, Mỹ, xu hướng sống organic (hay c&ograve;n gọi l&agrave; hữu cơ) ng&agrave;y c&agrave;ng trở n&ecirc;n phổ biến v&agrave; ưa chuộng như một giải ph&aacute;p để &ldquo;sống sạch sống khỏe&rdquo;. Ở Việt Nam, sử dụng thực phẩm organic cũng bắt đầu nhận được sự hưởng ứng từ những người ti&ecirc;u d&ugrave;ng hiện đại, khi nhu cầu về an to&agrave;n sức khỏe v&agrave; c&acirc;n bằng dinh dưỡng ng&agrave;y c&agrave;ng được quan t&acirc;m.</p>\r\n<div class=\"clearfix\">\r\n<div class=\"article-col-b\">\r\n<figure class=\"article-avatar cms-body\"><a class=\"photo\" href=\"https://image2.tienphong.vn/665x449/Uploaded/2019/ycivokiw/2017_04_10/hinh_1_klfr.jpg\" data-desc=\"Với nguồn gốc thuần tự nhi&ecirc;n v&agrave; kh&ocirc;ng h&oacute;a chất, organic c&ograve;n được lựa chọn như một liệu ph&aacute;p l&agrave;m đẹp mới\" data-index=\"0\"><img class=\"cms-photo\" title=\"\'Lối sống organic\' đang phổ biến tại Việt Nam \" src=\"https://image2.tienphong.vn/665x449/Uploaded/2019/ycivokiw/2017_04_10/hinh_1_klfr.jpg\" alt=\"Với nguồn gốc thuần tự nhi&ecirc;n v&agrave; kh&ocirc;ng h&oacute;a chất, organic c&ograve;n được lựa chọn như một liệu ph&aacute;p l&agrave;m đẹp mới\" data-photo-original-src=\"https://image2.tienphong.vn/Uploaded/2019/ycivokiw/2017_04_10/hinh_1_klfr.jpg\" data-desc=\"Với nguồn gốc thuần tự nhi&ecirc;n v&agrave; kh&ocirc;ng h&oacute;a chất, organic c&ograve;n được lựa chọn như một liệu ph&aacute;p l&agrave;m đẹp mới\" /></a>\r\n<figcaption class=\"fig\">Với nguồn gốc thuần tự nhi&ecirc;n v&agrave; kh&ocirc;ng h&oacute;a chất, organic c&ograve;n được lựa chọn như một liệu ph&aacute;p l&agrave;m đẹp mới</figcaption>\r\n</figure>\r\n<div id=\"article-body\" class=\"article-body cms-body AdAsia\">\r\n<p><strong>Organic - xu hướng sống xanh sống khỏe</strong></p>\r\n<p>Kh&aacute;i niệm &ldquo;lối sống organic&rdquo; bắt đầu phổ biến tại Việt Nam trong 2 năm trở lại đ&acirc;y, khi xu hướng n&agrave;y ng&agrave;y một lan rộng từ Ch&acirc;u &Acirc;u, Mỹ sang c&aacute;c nước Ch&acirc;u &Aacute; ph&aacute;t triển như Nhật Bản, H&agrave;n Quốc,&hellip; Sống organic l&agrave; lối sống c&acirc;n bằng, l&agrave;nh mạnh, hướng về thi&ecirc;n nhi&ecirc;n v&agrave; sử dụng thực phẩm hữu cơ, n&oacute;i kh&ocirc;ng với h&oacute;a chất, để cơ thể v&agrave; t&acirc;m hồn con người c&oacute; thể nhận được những g&igrave; thuần khiết nhất.</p>\r\n<p>Với những người theo đuổi xu hướng n&agrave;y, họ &aacute;p dụng lối sống organic một c&aacute;ch thật tự nhi&ecirc;n v&agrave;o cuộc sống thường ng&agrave;y. Những người bận rộn d&agrave;nh thời gian cho tập luyện thể dục, yoga mỗi ng&agrave;y để lu&ocirc;n c&acirc;n bằng, thoải m&aacute;i. Mỹ phẩm organic với những nguy&ecirc;n liệu nguồn gốc tự nhi&ecirc;n, kh&ocirc;ng chứa h&oacute;a chất cũng được tin d&ugrave;ng như một liệu ph&aacute;p l&agrave;m đẹp mới. Nhiều gia đ&igrave;nh ở th&agrave;nh thị bắt đầu với việc trồng c&acirc;y xanh, rau sạch tr&ecirc;n s&acirc;n thượng hay ban c&ocirc;ng, ti&ecirc;u d&ugrave;ng những thực phẩm hữu cơ như rau củ, sữa tươi hữu cơ&hellip; mỗi ng&agrave;y cho cơ thể khỏe mạnh v&agrave; c&acirc;n bằng dinh dưỡng</p>\r\n<div class=\"article-photo inlinephoto\"><a class=\"photo\" href=\"https://image2.tienphong.vn/w665/Uploaded/2019/ycivokiw/2017_04_10/hinh_2_aeyq.jpg\" data-desc=\"Thực phẩm organic l&agrave; nguồn nguy&ecirc;n liệu cho những bữa ăn gi&agrave;u dưỡng chất từ thi&ecirc;n nhi&ecirc;n, an to&agrave;n cho sức khỏe\" data-index=\"1\"><img class=\"cms-photo\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://image2.tienphong.vn/w665/Uploaded/2019/ycivokiw/2017_04_10/hinh_2_aeyq.jpg\" alt=\"\'Lối sống organic\' đang phổ biến tại Việt Nam  - ảnh 1\" width=\"440\" data-photo-original-src=\"https://image2.tienphong.vn/Uploaded/2019/ycivokiw/2017_04_10/hinh_2_aeyq.jpg\" data-desc=\"Thực phẩm organic l&agrave; nguồn nguy&ecirc;n liệu cho những bữa ăn gi&agrave;u dưỡng chất từ thi&ecirc;n nhi&ecirc;n, an to&agrave;n cho sức khỏe\" /></a><span class=\"fig\"><em>Thực phẩm organic l&agrave; nguồn nguy&ecirc;n liệu cho những bữa ăn gi&agrave;u dưỡng chất từ thi&ecirc;n nhi&ecirc;n, an to&agrave;n cho sức khỏe</em></span></div>\r\nVới những lợi &iacute;ch r&otilde; rệt cho sức khỏe v&agrave; t&acirc;m hồn, lối sống n&agrave;y đang ng&agrave;y c&agrave;ng phổ biến v&agrave; được nhiều người ti&ecirc;u d&ugrave;ng Việt Nam lựa chọn. Đ&acirc;y được coi như một phương ph&aacute;p gi&uacute;p tinh thần lu&ocirc;n c&acirc;n bằng, thoải m&aacute;i, tạo ra năng lượng t&iacute;ch cực cho những người theo đuổi lối sống organic.\r\n<p><strong>Bắt đầu lối sống organic từ h&ocirc;m nay!</strong></p>\r\n<div class=\"banner box\">&nbsp;</div>\r\n<p>Vơi ưu thế được nu&ocirc;i trồng, chăm s&oacute;c trong m&ocirc;i trường ho&agrave;n to&agrave;n tự nhi&ecirc;n, kh&ocirc;ng sử dụng hormone tăng trưởng, kh&ocirc;ng dư lượng thuốc kh&aacute;ng sinh v&agrave; kh&ocirc;ng sử dụng thuốc trừ s&acirc;u&hellip; thực phẩm organic lu&ocirc;n c&oacute; gi&aacute; trị v&agrave;ng trong việc bảo vệ sức khỏe, bảo vệ m&ocirc;i trường bởi chứa h&agrave;m lượng cao c&aacute;c chất chống oxy h&oacute;a, vitamin v&agrave; nhiều dưỡng chất tự nhi&ecirc;n kh&aacute;c. Đối với nhiều người ti&ecirc;u d&ugrave;ng hiện đại, lối sống organic, v&igrave; thế, c&oacute; thể bắt đầu bằng việc sử dụng thực phẩm hữu cơ, đơn giản như uống ly sữa tươi organic mỗi ng&agrave;y.&nbsp;</p>\r\n<div class=\"article-photo inlinephoto\">\r\n<div id=\"optAdIns_156__adi\" class=\"optAdIns\">&nbsp;</div>\r\n<div id=\"optAdIns_156__adipix\">&nbsp;</div>\r\n<a class=\"photo\" href=\"https://image2.tienphong.vn/w665/Uploaded/2019/ycivokiw/2017_04_10/hinh_3_qmxw.jpg\" data-desc=\"Những người bận rộn chọn lối sống organic để lu&ocirc;n c&acirc;n bằng, thoải m&aacute;i v&agrave; gi&agrave;u năng lượng\" data-index=\"2\"><img class=\"cms-photo\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://image2.tienphong.vn/w665/Uploaded/2019/ycivokiw/2017_04_10/hinh_3_qmxw.jpg\" alt=\"\'Lối sống organic\' đang phổ biến tại Việt Nam  - ảnh 2\" width=\"440\" data-photo-original-src=\"https://image2.tienphong.vn/Uploaded/2019/ycivokiw/2017_04_10/hinh_3_qmxw.jpg\" data-desc=\"Những người bận rộn chọn lối sống organic để lu&ocirc;n c&acirc;n bằng, thoải m&aacute;i v&agrave; gi&agrave;u năng lượng\" /></a></div>\r\n<div class=\"article-photo inlinephoto\"><span class=\"fig\"><em>Những người bận rộn chọn lối sống organic để lu&ocirc;n c&acirc;n bằng, thoải m&aacute;i v&agrave; gi&agrave;u năng lượng</em></span></div>\r\nVới sự đ&oacute;n đầu xu hướng ti&ecirc;u d&ugrave;ng v&agrave; theo đuổi mục đ&iacute;ch n&acirc;ng tầm ng&agrave;nh sữa Việt, Vinamilk đ&atilde; ti&ecirc;n phong mở lối cho thị trường thực phẩm organic cao cấp khi sản xuất được sữa organic đạt chuẩn Ch&acirc;u &Acirc;u ngay tại Việt Nam, do tổ chức uy t&iacute;n thế giới Control Union (H&agrave; Lan) chứng nhận. Đ&acirc;y l&agrave; tin vui cho những ai theo đuổi lối sống xanh v&igrave; lần đầu ti&ecirc;n nhu cầu sống khỏe sống sạch được đ&aacute;p ứng một c&aacute;ch thỏa đ&aacute;ng.\r\n<p>Chị Nguyễn Thị H&ograve;a Anh (nh&acirc;n vi&ecirc;n văn ph&ograve;ng, quận 7) cho biết: &ldquo;T&ocirc;i vẫn đang cố gắng x&acirc;y dựng lối sống organic cho cả gia đ&igrave;nh, đặc biệt l&agrave; cho con trai. V&igrave; vậy m&agrave; khi t&igrave;m hiểu về quy tr&igrave;nh sản xuất nghi&ecirc;m ngặt của sữa tươi Vinamilk 100% Organic, t&ocirc;i cảm thấy rất an t&acirc;m. Hương vị của sữa tươi ngon tự nhi&ecirc;n, thơm nhẹ dễ chịu n&ecirc;n cả nh&agrave; t&ocirc;i đều rất th&iacute;ch uống&rdquo;.</p>\r\n<div class=\"article-photo inlinephoto\"><a class=\"photo\" href=\"https://image2.tienphong.vn/w665/Uploaded/2019/ycivokiw/2017_04_10/hinh_4_vrnu.jpg\" data-desc=\"Trang trại Vinamilk Organic Đ&agrave; Lạt &ndash; nơi 500 c&ocirc; b&ograve; organic cho nguồn sữa 100% organic tươi ngon thuần khiết mỗi ng&agrave;y\" data-index=\"3\"><img class=\"cms-photo\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://image2.tienphong.vn/w665/Uploaded/2019/ycivokiw/2017_04_10/hinh_4_vrnu.jpg\" alt=\"\'Lối sống organic\' đang phổ biến tại Việt Nam  - ảnh 3\" width=\"440\" data-photo-original-src=\"https://image2.tienphong.vn/Uploaded/2019/ycivokiw/2017_04_10/hinh_4_vrnu.jpg\" data-desc=\"Trang trại Vinamilk Organic Đ&agrave; Lạt &ndash; nơi 500 c&ocirc; b&ograve; organic cho nguồn sữa 100% organic tươi ngon thuần khiết mỗi ng&agrave;y\" /></a><span class=\"fig\"><em>Trang trại Vinamilk Organic Đ&agrave; Lạt &ndash; nơi 500 c&ocirc; b&ograve; organic cho nguồn sữa 100% organic tươi ngon thuần khiết mỗi ng&agrave;y</em></span></div>\r\nDo sản xuất trực tiếp trong nước n&ecirc;n sữa tươi 100% organic của Vinamilk ph&ugrave; hợp với khẩu vị v&agrave; t&uacute;i tiền của người ti&ecirc;u d&ugrave;ng. Ngo&agrave;i sử dụng trực tiếp, sữa organic c&ograve;n l&agrave; nguồn nguy&ecirc;n liệu cơ bản cho nhiều m&oacute;n ăn. Với sữa tươi 100% organic, Vinamilk đ&atilde; g&oacute;p phần n&acirc;ng cao chất lượng cuộc sống người Việt, cổ vũ lối sống organic, sống sạch sống khỏe ở Việt Nam.&nbsp;</div>\r\n</div>\r\n</div>', '2019-06-19', 1, 1);
INSERT INTO `news` (`ID`, `IMAGE`, `RESIZEDIMAGE`, `TITLE`, `SHORTCONTENT`, `CONTENT`, `CREATED`, `STATUS`, `VIEWS`) VALUES
(9, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F9%2F1560906664531-5844f0e0b0a639289feba829e766b1a6.jpg?alt=media&token=90e4a3c6-7cb8-4b1b-a156-41643826d3cc', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F9%2Fresized-1560906664531-5844f0e0b0a639289feba829e766b1a6.jpg?alt=media&token=3fe9bfa0-5619-4e87-80b4-8f8d416e5d01', 'Khánh thành Trang trại bò sữa Organic tiêu chuẩn châu Âu tại Việt Nam', 'NDĐT – Sáng 13-3, tại xã Tu Tra, huyện Đơn Dương (Lâm Đồng), Công ty Cổ phần sữa Việt Nam (Vinamilk) tổ chức khánh thành trang trại bò sữa Organic tiêu chuẩn châu Âu đầu tiên tại Việt Nam.', '<div class=\"sapo\">\r\n<p>NDĐT &ndash; S&aacute;ng 13-3, tại x&atilde; Tu Tra, huyện Đơn Dương (L&acirc;m Đồng), C&ocirc;ng ty Cổ phần sữa Việt Nam (Vinamilk) tổ chức kh&aacute;nh th&agrave;nh trang trại b&ograve; sữa Organic ti&ecirc;u chuẩn ch&acirc;u &Acirc;u đầu ti&ecirc;n tại Việt Nam. C&aacute;c đồng ch&iacute; Ủy vi&ecirc;n Bộ Ch&iacute;nh trị: Trương Thị Mai, B&iacute; thư T.Ư Đảng, Trưởng Ban D&acirc;n vận T.Ư; Đinh La Thăng, B&iacute; thư Th&agrave;nh ủy TP Hồ Ch&iacute; Minh; c&ugrave;ng l&atilde;nh đạo cơ quan thuộc Quốc hội, bộ, ng&agrave;nh T.Ư, tỉnh L&acirc;m Đồng v&agrave; một số địa phương trong cả nước tham dự.</p>\r\n</div>\r\n<div class=\"media content-box mgb-0\"><img class=\"mr-3 img-responsive\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://www.nhandan.com.vn/cdn/vn/media/k2/items/src/3229/5844f0e0b0a639289feba829e766b1a6.jpg\" alt=\"Kh&aacute;nh th&agrave;nh Trang trại b&ograve; sữa Organic ti&ecirc;u chuẩn ch&acirc;u &Acirc;u tại Việt Nam\" data-pagespeed-url-hash=\"2932575463\" data-pagespeed-lsc-url=\"https://www.nhandan.com.vn/cdn/vn/media/k2/items/src/3229/5844f0e0b0a639289feba829e766b1a6.jpg\" />\r\n<p class=\"image-caption mgb-0 pbt-10\">C&aacute;c đại biểu cắt băng kh&aacute;nh th&agrave;nh trang trại b&ograve; sữa organic đầu ti&ecirc;n tại Việt Nam.</p>\r\n</div>\r\n<div class=\"item-content\">\r\n<p>Th&aacute;ng 10-2016, trang trại Vinamilk Organic Đ&agrave; Lạt, với quy m&ocirc; ban đầu l&agrave; 500 con b&ograve; sữa organic, được tổ chức Control Union (H&agrave; Lan) chứng nhận l&agrave; Trang trại b&ograve; sữa Organic ti&ecirc;u chuẩn ch&acirc;u &Acirc;u. Dựa tr&ecirc;n c&aacute;c nguy&ecirc;n tắc cơ bản v&agrave; tu&acirc;n thủ chặt chẽ hệ ti&ecirc;u chuẩn EU Organic, trang trại b&ograve; sữa Vinamilk Organic Đ&agrave; Lạt được x&acirc;y dựng v&agrave; vận h&agrave;nh với một số điểm kh&aacute;c biệt, như: tuyệt đối kh&ocirc;ng sử dụng c&aacute;c chất biến đổi gen; ho&agrave;n to&agrave;n kh&ocirc;ng sử dụng h&oacute;a chất, thuốc trừ s&acirc;u tổng hợp, phụ gia thực phẩm; b&ograve; được cho ăn bằng thực phẩm 100% hữu cơ&hellip;</p>\r\n<p>Ph&aacute;t biểu tại buổi lễ, đồng ch&iacute; Nguyễn Xu&acirc;n Tiến, Ủy vi&ecirc;n T.Ư Đảng, B&iacute; thư Tỉnh ủy L&acirc;m Đồng cho biết, trang trại Vinamilk Organic đi v&agrave;o hoạt động sẽ tạo ra những sản phẩm chất lượng, gi&aacute; trị dinh dưỡng cao, g&oacute;p phần thực hiện hiệu quả chiến lược quốc gia về dinh dưỡng. Đồng thời, tạo điều kiện cho người d&acirc;n L&acirc;m Đồng v&agrave; người ti&ecirc;u d&ugrave;ng được tiếp cận với sữa tươi hữu cơ chất lượng tương đương sản phẩm quốc tế.</p>\r\n<p>Từ năm 2006, Vinamilk bắt đầu đầu tư v&agrave;o lĩnh vực chăn nu&ocirc;i b&ograve; sữa, với những trang trại b&ograve; sữa c&ocirc;ng nghiệp c&oacute; tổng vốn hơn 500 tỷ đồng, đến năm 2015 tăng l&ecirc;n 1.670 tỷ đồng. Đến nay, Vinamilk đ&atilde; c&oacute; hệ thống 10 trang trại quy m&ocirc; lớn tr&ecirc;n cả nước, to&agrave;n bộ b&ograve; giống được nhập khẩu từ &Uacute;c, Mỹ v&agrave; New Zealand. Hai năm qua, kim ngạch xuất khẩu sữa tươi Vinamilk tăng trưởng b&igrave;nh qu&acirc;n đạt 70% mỗi năm.</p>\r\n<p>Theo Tổng Gi&aacute;m đốc Vinamilk Mai Kiều Li&ecirc;n, sự kiện kh&aacute;nh th&agrave;nh trang trại b&ograve; sữa hữu cơ, kh&ocirc;ng chỉ g&oacute;p phần ổn định nguồn cung cấp nguy&ecirc;n liệu sữa trong nước, đồng thời c&ograve;n tạo niềm tin v&agrave; chỗ đứng cho h&agrave;ng Việt Nam v&agrave; thương hiệu sữa Việt ng&agrave;y c&agrave;ng khẳng định xứng tầm thế giới.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://www.nhandan.com.vn/cdn/vn/images/nddt/a7d806458e02/2017/thang03-2017/13-03-2017/a4.jpg\" width=\"640\" height=\"423\" data-pagespeed-url-hash=\"3770441226\" data-pagespeed-lsc-url=\"https://www.nhandan.com.vn/cdn/vn/images/nddt/a7d806458e02/2017/thang03-2017/13-03-2017/a4.jpg\" /></p>\r\n<p><em>B&ograve; được nu&ocirc;i trong hệ thống chuồng trại hiện đại, bảo&nbsp;</em><em>đảm&nbsp;</em><em>vệ sinh.</em></p>\r\n</div>', '2019-06-19', 1, 0),
(10, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F10%2F1560928166489-nga-1535290672135986157198.jpg?alt=media&token=d0a7244e-5e51-4cc9-b74c-98f555c4aaa9', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/InfoImages%2F10%2Fresized-1560928166489-nga-1535290672135986157198.jpg?alt=media&token=0187cb78-5562-470b-bbfd-d373a6545f9e', 'Nga luật hóa organic để chiếm lĩnh thị trường', 'Tổng thống Nga Vladimir Putin hồi đầu tháng này vừa ký một đạo luật mới quy định về sản xuất, bảo quản và vận chuyển các sản phẩm organic tại Nga.', '<p>Đạo luật cấm c&aacute;c h&oacute;a chất n&ocirc;ng nghiệp, thuốc trừ s&acirc;u, hormone v&agrave; chất k&iacute;ch th&iacute;ch tăng trưởng kh&aacute;ng sinh.</p>\r\n<p>Đạo luật mới n&ecirc;u tr&ecirc;n - trước đ&oacute; đ&atilde; được cả hai viện của quốc hội Nga th&ocirc;ng qua - sẽ c&oacute; hiệu lực từ ng&agrave;y 1-1-2020. C&aacute;c quy định trong đạo luật cung cấp c&aacute;c tham chiếu cho \"sản phẩm hữu cơ\", \"nh&agrave; sản xuất sản phẩm hữu cơ\" v&agrave; \"n&ocirc;ng nghiệp hữu cơ\", cũng như c&aacute;c bộ quy định kiểm so&aacute;t c&aacute;c vấn đề sản xuất, bảo quản, d&aacute;n nh&atilde;n, bu&ocirc;n b&aacute;n v&agrave; vận chuyển mặt h&agrave;ng n&agrave;y. Tuy nhi&ecirc;n, đạo luật kh&ocirc;ng quy định về c&aacute;c mặt h&agrave;ng như nước hoa, mỹ phẩm v&agrave; dược phẩm, hạt c&acirc;y rừng, săn bắt, đ&aacute;nh c&aacute; tự nhi&ecirc;n t&aacute;ch bạch với nghề nu&ocirc;i trồng thủy sản.</p>\r\n<div class=\"VCSortableInPreviewMode\">\r\n<div><img id=\"img_3d875400-a935-11e8-b0e8-41f392048871\" style=\"display: block; margin-left: auto; margin-right: auto;\" title=\"Nga luật h&oacute;a organic để chiếm lĩnh thị trường - Ảnh 1.\" src=\"https://nld.mediacdn.vn/2018/8/26/nga-1535290672135986157198.jpg\" alt=\"Nga luật h&oacute;a organic để chiếm lĩnh thị trường - Ảnh 1.\" width=\"\" height=\"\" data-original=\"https://nld.mediacdn.vn/2018/8/26/nga-1535290672135986157198.jpg\" /></div>\r\n<div class=\"PhotoCMS_Caption\">\r\n<p>Đạo luật về sản phẩm organic c&oacute; thể gi&uacute;p Nga gi&agrave;nh được 25% thị trường sản xuất organic to&agrave;n cầu Ảnh: SPUTNIK</p>\r\n</div>\r\n</div>\r\n<p>Đến nay, hơn 80 quốc gia đ&atilde; th&ocirc;ng qua những quy định tương tự. Tại Nga, những nỗ lực để &aacute;p dụng c&aacute;c biện ph&aacute;p tr&ecirc;n đ&atilde; được khởi xướng từ 15 năm trước đ&acirc;y. Thủ tướng Nga Dmitry Medvedev hồi đầu năm nay từng khẳng định rằng đạo luật tr&ecirc;n c&oacute; thể gi&uacute;p nước n&agrave;y gi&agrave;nh được 25% thị trường sản xuất organic to&agrave;n cầu. Theo Chủ tịch Duma Quốc gia Nga (Hạ viện) Vyacheslav Volodin, đạo luật tr&ecirc;n, vốn bao gồm cả việc tạo ra một hệ thống đăng k&yacute; quốc gia, sẽ gi&uacute;p đ&agrave;o thải những nh&agrave; sản xuất kh&ocirc;ng trung thực ra khỏi thị trường v&agrave; sẽ c&oacute; t&aacute;c động t&iacute;ch cực tới chất lượng của c&aacute;c sản phẩm organic.</p>\r\n<p>Từ năm 2015, Tổng thống Putin đ&atilde; th&ocirc;ng b&aacute;o c&aacute;c kế hoạch để biến Nga th&agrave;nh nh&agrave; sản xuất lớn nhất c&aacute;c thực phẩm l&agrave;nh mạnh v&agrave; chất lượng cao. V&agrave;o cuối năm 2017, nh&agrave; l&atilde;nh đạo Nga tuy&ecirc;n bố tr&ecirc;n website của Điện Kremlin rằng Moscow đang tiến h&agrave;nh c&aacute;c biện ph&aacute;p cải thiện năng suất n&ocirc;ng nghiệp để đưa nước n&agrave;y th&agrave;nh nh&agrave; cung cấp h&agrave;ng đầu c&aacute;c sản phẩm organic ở khu vực ch&acirc;u &Aacute; - Th&aacute;i B&igrave;nh Dương.&nbsp;</p>\r\n<p>\"Nga l&agrave; một trong những nền kinh tế đi đầu to&agrave;n cầu về xuất khẩu ngũ cốc, dầu thực vật, c&aacute; v&agrave; một số thực phẩm kh&aacute;c. Ch&uacute;ng t&ocirc;i kỳ vọng trở th&agrave;nh nh&agrave; sản xuất h&agrave;ng đầu c&aacute;c thực phẩm sinh th&aacute;i sạch cho những nước l&aacute;ng giềng ở khu vực ch&acirc;u &Aacute; - Th&aacute;i B&igrave;nh Dương\" - &ocirc;ng chủ Điện Kremlin khẳng định, đồng thời nhấn mạnh th&ecirc;m rằng Nga đang nỗ lực thực hiện c&aacute;c biện ph&aacute;p để tăng sản lượng n&ocirc;ng nghiệp cũng như cải thiện năng suất.</p>\r\n<p>Trước khi c&oacute; đạo luật n&oacute;i tr&ecirc;n, c&aacute;c nh&agrave; sản xuất organic địa phương thường &aacute;p dụng c&aacute;c biện ph&aacute;p canh t&aacute;c để đạt được chứng nhận ch&iacute;nh thức từ b&ecirc;n thứ ba, như Mỹ hoặc Li&ecirc;n minh ch&acirc;u &Acirc;u (EU) v&agrave; c&oacute; thể xuất khẩu ra ngo&agrave;i nước Nga.</p>', '2019-06-19', 1, 0);

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
-- Cấu trúc bảng cho bảng `news_info_history`
--

CREATE TABLE `news_info_history` (
  `ID` int(11) NOT NULL,
  `NEWSID` int(11) NOT NULL,
  `CREATED` date NOT NULL,
  `ACTION` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `DETAIL` varchar(500) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `news_info_history`
--

INSERT INTO `news_info_history` (`ID`, `NEWSID`, `CREATED`, `ACTION`, `DETAIL`) VALUES
(1, 1, '2019-06-18', 'Thêm', 'Thêm mới'),
(2, 2, '2019-06-18', 'Thêm', 'Thêm mới'),
(3, 2, '2019-06-18', 'Cập nhật', 'Cập nhật thông tin'),
(4, 3, '2019-06-18', 'Thêm', 'Thêm mới'),
(5, 4, '2019-06-19', 'Thêm', 'Thêm mới'),
(6, 5, '2019-06-19', 'Thêm', 'Thêm mới'),
(7, 6, '2019-06-19', 'Thêm', 'Thêm mới'),
(8, 7, '2019-06-19', 'Thêm', 'Thêm mới'),
(9, 8, '2019-06-19', 'Thêm', 'Thêm mới'),
(10, 9, '2019-06-19', 'Thêm', 'Thêm mới'),
(11, 5, '2019-06-19', 'Cập nhật', 'Cập nhật thông tin'),
(12, 8, '2019-06-19', 'Cập nhật', 'Cập nhật thông tin'),
(13, 9, '2019-06-19', 'Cập nhật', 'Cập nhật thông tin'),
(14, 7, '2019-06-19', 'Cập nhật', 'Cập nhật thông tin'),
(15, 4, '2019-06-19', 'Cập nhật', 'Cập nhật thông tin'),
(16, 6, '2019-06-19', 'Cập nhật', 'Cập nhật thông tin'),
(17, 10, '2019-06-19', 'Thêm', 'Thêm mới');

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
(1, 1),
(1, 3),
(2, 4),
(2, 5),
(3, 6),
(3, 7),
(3, 8),
(4, 1),
(4, 11),
(4, 18),
(5, 3),
(5, 14),
(5, 15),
(6, 3),
(6, 14),
(6, 15),
(6, 18),
(7, 16),
(7, 17),
(8, 9),
(8, 16),
(9, 16),
(9, 18),
(10, 16),
(10, 18);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news_views`
--

CREATE TABLE `news_views` (
  `ID` int(11) NOT NULL,
  `IDNEWS` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `VIEWS` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `news_views`
--

INSERT INTO `news_views` (`ID`, `IDNEWS`, `DATE`, `VIEWS`) VALUES
(1, 1, '2019-06-18', 4),
(2, 2, '2019-06-18', 9),
(3, 1, '2019-06-19', 3),
(4, 2, '2019-06-19', 5),
(5, 4, '2019-06-19', 32),
(6, 3, '2019-06-19', 3),
(7, 6, '2019-06-19', 2),
(8, 5, '2019-06-19', 2),
(9, 8, '2019-06-19', 1),
(10, 7, '2019-06-19', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_detail`
--

CREATE TABLE `order_detail` (
  `ORDERINFOID` int(11) NOT NULL,
  `PRODUCTID` int(11) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `TOTALMONEY` double NOT NULL,
  `ISSIMPLE` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_detail`
--

INSERT INTO `order_detail` (`ORDERINFOID`, `PRODUCTID`, `QUANTITY`, `TOTALMONEY`, `ISSIMPLE`) VALUES
(1, 6, 1, 225000, 1),
(1, 11, 1, 270000, 1),
(2, 3, 1, 58800, 1),
(2, 20, 1, 38800, 1),
(3, 5, 1, 60000, 1),
(3, 13, 1, 780000, 1),
(4, 6, 1, 225000, 1),
(4, 17, 1, 162000, 1),
(5, 3, 1, 1214100, 0),
(6, 3, 1, 58800, 1),
(6, 4, 1, 108900, 1),
(7, 4, 2, 551000, 0),
(8, 2, 1, 836000, 0),
(9, 6, 3, 675000, 1),
(9, 9, 1, 30000, 1),
(9, 12, 1, 125000, 1),
(9, 16, 3, 144000, 1),
(10, 6, 1, 225000, 1),
(10, 11, 3, 810000, 1),
(10, 17, 1, 162000, 1),
(11, 6, 1, 225000, 1),
(12, 10, 1, 67500, 1),
(13, 10, 1, 67500, 1),
(14, 6, 1, 225000, 1),
(15, 19, 1, 60000, 1),
(16, 6, 2, 450000, 1),
(16, 10, 2, 135000, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_info`
--

CREATE TABLE `order_info` (
  `ID` int(11) NOT NULL,
  `CUSTOMERID` int(11) NOT NULL,
  `CREATED` datetime NOT NULL,
  `TOTALMONEY` double NOT NULL,
  `STATUS` tinyint(1) NOT NULL,
  `ORDERSTATUSID` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_info`
--

INSERT INTO `order_info` (`ID`, `CUSTOMERID`, `CREATED`, `TOTALMONEY`, `STATUS`, `ORDERSTATUSID`) VALUES
(1, 1, '2019-06-19 07:21:52', 495000, 1, 1),
(2, 1, '2019-06-19 07:23:00', 97600, 1, 1),
(3, 1, '2019-06-19 07:23:17', 840000, 1, 1),
(4, 2, '2019-06-19 07:23:55', 387000, 1, 3),
(5, 2, '2019-06-19 07:24:13', 1214100, 1, 1),
(6, 2, '2019-06-19 07:26:12', 167700, 1, 3),
(7, 3, '2019-06-19 07:26:45', 551000, 1, 3),
(8, 3, '2019-06-19 07:26:58', 836000, 1, 1),
(9, 3, '2019-06-19 12:48:11', 974000, 1, 1),
(10, 3, '2019-06-19 12:51:18', 1197000, 1, 1),
(11, 5, '2019-06-19 12:52:07', 225000, 1, 1),
(12, 3, '2019-06-19 13:38:04', 67500, 1, 3),
(13, 2, '2019-06-19 14:07:59', 67500, 1, 1),
(14, 2, '2019-06-19 14:25:20', 225000, 1, 3),
(15, 5, '2019-06-19 14:36:26', 60000, 1, 1),
(16, 5, '2019-06-19 14:40:27', 585000, 1, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_status`
--

CREATE TABLE `order_status` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_status`
--

INSERT INTO `order_status` (`ID`, `NAME`) VALUES
(1, 'Chờ xác nhận'),
(2, 'Đang giao'),
(3, 'Đã giao'),
(4, 'Đã hủy');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `ID` int(11) NOT NULL,
  `IMAGE` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `RESIZEDIMAGE` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `CATEGORYID` int(11) NOT NULL,
  `SUBCATEGORYID` int(11) NOT NULL,
  `NAME` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `BRANDID` int(11) NOT NULL,
  `STATUS` tinyint(1) NOT NULL,
  `RATE` int(11) NOT NULL,
  `PRICE` double NOT NULL,
  `ORIGIN` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `KILOGRAM` double DEFAULT NULL,
  `SALE` double NOT NULL,
  `VIPSALE` double NOT NULL,
  `DESCRIPTION` longtext COLLATE utf8_unicode_ci NOT NULL,
  `INVENTORY` int(11) NOT NULL,
  `CREATED` date DEFAULT NULL,
  `SHORTDESCRIPTION` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`ID`, `IMAGE`, `RESIZEDIMAGE`, `CATEGORYID`, `SUBCATEGORYID`, `NAME`, `BRANDID`, `STATUS`, `RATE`, `PRICE`, `ORIGIN`, `KILOGRAM`, `SALE`, `VIPSALE`, `DESCRIPTION`, `INVENTORY`, `CREATED`, `SHORTDESCRIPTION`) VALUES
(1, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F1%2F1560928956305-images%20(2).jpg?alt=media&token=6031ea0b-a884-4b2c-9039-2707bd87ae2c', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F1%2Fresized-1560928956305-images%20(2).jpg?alt=media&token=1685c110-19b9-4042-a01e-449efd55d93d', 4, 13, 'Bơ Sáp Đak Lak', 4, 1, 0, 80000, 'Việt Nam', 1, 0, 0, '<p><strong>Bơ s&aacute;p</strong>&nbsp;l&agrave; loại tr&aacute;i c&acirc;y nổi tiếng ở v&ugrave;ng T&acirc;y Nguy&ecirc;n, Đắk Lắk. Tr&aacute;i bơ s&aacute;p to, kh&ocirc;ng bị xơ, phần thịt bơ b&eacute;o ngậy, ruột v&agrave;ng hấp dẫn.&nbsp;Mỗi loại tr&aacute;i c&acirc;y mang lại những gi&aacute; trị dinh dưỡng kh&aacute;c nhau.&nbsp;<strong>Bơ s&aacute;p đắc lắc</strong>&nbsp;được nhiều người ưa th&iacute;ch bởi gi&aacute; trị dinh dưỡng cao, hương vị thơm ngon hấp dẫn. Kh&ocirc;ng chỉ l&agrave; m&oacute;n ăn ngon, tr&aacute;i bơ c&ograve;n c&oacute; c&ocirc;ng dụng chống lại bệnh tật v&agrave; l&atilde;o h&oacute;a.</p>\r\n<figure id=\"attachment_15781\" class=\"wp-caption aligncenter\"><img class=\"wp-image-15781\" src=\"https://nongsandungha.cdn.vccloud.vn/wp-content/uploads/2017/04/bo-sap-dak-lak.jpg\" sizes=\"(max-width: 500px) 100vw, 500px\" srcset=\"//nongsandungha.cdn.vccloud.vn/wp-content/uploads/2017/04/bo-sap-dak-lak.jpg 525w, //nongsandungha.cdn.vccloud.vn/wp-content/uploads/2017/04/bo-sap-dak-lak-400x267.jpg 400w\" alt=\"bo-sap-dak-lak\" width=\"500\" height=\"334\" />\r\n<figcaption class=\"wp-caption-text\"><em><strong>B&aacute;n bơ s&aacute;p&nbsp;Đắk Lắk</strong>&nbsp;ch&iacute;nh hiệu uy t&iacute;n gi&aacute; rẻ ở H&agrave; Nội</em></figcaption>\r\n</figure>\r\n<h3><span id=\"Nguon_goc_cua_loai_qua_nay\"><strong>Nguồn gốc của loại quả n&agrave;y</strong></span></h3>\r\n<ul>\r\n<li>Bơ s&aacute;p c&oacute; nguồn gốc từ nước Ph&aacute;p, khoảng cuối thế kỷ 16 th&igrave; du nhập v&agrave;o Việt Nam. Ng&agrave;y nay, đ&acirc;y l&agrave; loại tr&aacute;i c&acirc;y phổ biến v&agrave; cho gi&aacute; trị kinh tế cao.</li>\r\n<li>Bơ s&aacute;p được trồng ở rất nhiều nơi tr&ecirc;n nước ta nhưng n&oacute;i về chất lượng th&igrave; kh&ocirc;ng đ&acirc;u ngon bằng ở Đắk Lắk &ndash; T&acirc;y Nguy&ecirc;n</li>\r\n</ul>\r\n<table border=\"1\" width=\"1000\" cellspacing=\"2\">\r\n<tbody>\r\n<tr>\r\n<td>\r\n<h3><span id=\"Phan_Loai\"><strong>Ph&acirc;n Loại</strong></span></h3>\r\n</td>\r\n<td>&nbsp;Bơ s&aacute;p 034 v&agrave;&nbsp; Bơ s&aacute;p booth</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n<h3><span id=\"Gia_Ban\"><strong>Gi&aacute; B&aacute;n</strong></span></h3>\r\n</td>\r\n<td>&nbsp;Gi&aacute; Bơ s&aacute;p 034: 80.000đ/kg\r\n<p>&nbsp;Gi&aacute; Bơ s&aacute;p Booth: 120.000đ/kg</p>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td><strong>M&ocirc; Tả</strong></td>\r\n<td>&nbsp;Bơ s&aacute;p si&ecirc;u ngon, cơm v&agrave;ng, hạt b&eacute;, tr&aacute;i d&agrave;i từ 27 đến 32cm, độ dẻo v&agrave; độ&nbsp; b&eacute;o cao, kh&ocirc;ng bị sợi xơ, h&agrave;m\r\n<p>lượng dinh dưỡng cao</p>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n<h3><span id=\"Xuatxu\"><strong>Xuất&nbsp;</strong><strong>xứ</strong></span></h3>\r\n</td>\r\n<td>&nbsp;V&ugrave;ng t&acirc;y nguy&ecirc;n, được thu hoạch tại Đắk Lắk</td>\r\n</tr>\r\n<tr>\r\n<td><strong>Giao H&agrave;ng</strong></td>\r\n<td>&nbsp;Nội th&agrave;nh H&agrave; Nội &ndash; Giao h&agrave;ng ngoại th&agrave;nh H&agrave; Nội v&agrave; tỉnh kh&aacute;c với số lượng lớn</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<blockquote>\r\n<p>=&gt; Xem th&ecirc;m c&aacute;c sản phẩm c&oacute; sẵn tại cửa h&agrave;ng h&ocirc;m nay tại đ&acirc;y:&nbsp;<a href=\"https://goo.gl/kDxAnn\"><strong>https://goo.gl/kDxAnn</strong></a></p>\r\n</blockquote>\r\n<h2><span id=\"Phan_loai_bo_sapDak_Lak\">Ph&acirc;n loại bơ s&aacute;p&nbsp;<strong>Đắk Lắk</strong></span></h2>\r\n<h3><span id=\"Bo_sap_034giong_moi_trong_cho_nang_suat_tai_Dak_Lak\"><strong>Bơ s&aacute;p 034&nbsp;(giống mới, trồng cho năng suất tại Đắk Lắk)&nbsp;</strong></span></h3>\r\n<p>Bơ s&aacute;p 304 với h&igrave;nh dạng quả thon d&agrave;i, phần đầu quả d&agrave;i, hạt nhỏ, tỷ lệ thịt quả cao,chiếm đến 85% trọng lượng quả, thịt m&agrave;u v&agrave;ng s&aacute;ng, vị ngọt b&eacute;o v&agrave; kh&ocirc;ng c&oacute; sơ, vỏ quả l&uacute;c c&ograve;n xanh c&oacute; m&agrave;u xanh b&oacute;ng l&aacute;ng gi&uacute;p h&igrave;nh d&aacute;ng b&ecirc;n ngo&agrave;i của Bơ kh&aacute; lạ v&agrave; bắt mắt. Giống bơ 304 ng&agrave;y được rất nhiều người ưa chuộng</p>\r\n<figure id=\"attachment_10731\" class=\"wp-caption aligncenter\"><img class=\"wp-image-10731\" src=\"https://nongsandungha.cdn.vccloud.vn/wp-content/uploads/bo-sap-034-ha-noi-e1527672698732.jpg\" sizes=\"(max-width: 500px) 100vw, 500px\" srcset=\"//nongsandungha.cdn.vccloud.vn/wp-content/uploads/bo-sap-034-ha-noi-e1527672698732.jpg 500w, //nongsandungha.cdn.vccloud.vn/wp-content/uploads/bo-sap-034-ha-noi-e1527672698732-400x298.jpg 400w\" alt=\"bo sap 034 ha noi\" width=\"500\" height=\"373\" />\r\n<figcaption class=\"wp-caption-text\"><em><strong>Bơ s&aacute;p 034</strong>&nbsp;tại N&ocirc;ng Sản Dũng H&agrave;</em></figcaption>\r\n</figure>\r\n<h3><span id=\"Bo_sap_booth_giong_moi_cua_My_trong_hieu_qua_tai_Dak_Lak\"><strong>Bơ s&aacute;p booth&nbsp;( giống mới của Mỹ, trồng hiệu quả tại Đắk Lắk)</strong></span></h3>\r\n<p>Bơ Booth c&oacute; cơm kh&ocirc; v&agrave; dẻo hơn nhiều so với bơ S&aacute;p thường, khi ăn cảm nhận r&otilde; vị ngọt ngậy nổi bật, chỉ b&oacute;c ăn kh&ocirc;ng đ&atilde; thấy ngon rồi, khi ăn cần th&ecirc;m rất &iacute;t đường v&agrave; sữa.</p>\r\n<p>+&nbsp;Vỏ ngo&agrave;i x&ugrave; x&igrave;, xấu x&iacute;</p>\r\n<p>+ Quả đầm tay, size đều đặn 4-5 lạng/ quả<br />+&nbsp;S&aacute;p Bơ v&agrave;ng ươm, đặc qu&aacute;nh vị ngọt, đặc biệt khi ăn bơ n&agrave;y rất ngậy</p>\r\n<p>&nbsp;</p>\r\n<figure id=\"attachment_15782\" class=\"wp-caption aligncenter\"><img class=\"wp-image-15782\" src=\"https://nongsandungha.cdn.vccloud.vn/wp-content/uploads/2017/04/bo-booth-2019.jpg\" sizes=\"(max-width: 500px) 100vw, 500px\" srcset=\"//nongsandungha.cdn.vccloud.vn/wp-content/uploads/2017/04/bo-booth-2019.jpg 493w, //nongsandungha.cdn.vccloud.vn/wp-content/uploads/2017/04/bo-booth-2019-400x352.jpg 400w\" alt=\"bo-booth-2019\" width=\"500\" height=\"440\" />\r\n<figcaption class=\"wp-caption-text\"><em><strong>Mua Bơ s&aacute;p booth</strong>&nbsp;uy t&iacute;n gi&aacute; rẻ tại H&agrave; Nội</em></figcaption>\r\n</figure>\r\n<h3><img class=\"aligncenter size-full wp-image-15783\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://nongsandungha.cdn.vccloud.vn/wp-content/uploads/2017/04/bo-booth-20191.jpg\" sizes=\"(max-width: 482px) 100vw, 482px\" srcset=\"//nongsandungha.cdn.vccloud.vn/wp-content/uploads/2017/04/bo-booth-20191.jpg 482w, //nongsandungha.cdn.vccloud.vn/wp-content/uploads/2017/04/bo-booth-20191-400x288.jpg 400w\" alt=\"bo-booth-2019~1\" width=\"482\" height=\"347\" /></h3>\r\n<h3><span id=\"Cach_chon_bo_sap_ngon\"><strong>C&aacute;ch chọn bơ s&aacute;p ngon</strong></span></h3>\r\n<p>Kh&aacute;c với một số loại tr&aacute;i c&acirc;y, bơ l&agrave; một trong những loại quả kh&oacute; chọn nhất. Khi mua ch&uacute;ng ta nh&igrave;n bề ngo&agrave;i quả nhưng kh&oacute; đo&aacute;n được chất lượng b&ecirc;n trong của tr&aacute;i bơ. Những người s&agrave;nh ăn thường lựa chọn những quả bơ vừa thơm, ngon lại gi&agrave;u dinh dưỡng. Muốn&nbsp;<strong>mua bơ chuẩn nhất</strong>&nbsp;chỉ c&oacute; c&aacute;ch cắt ra ăn thử.</p>\r\n<p>Muốn&nbsp;<strong>chọn bơ s&aacute;p loại 1</strong>&nbsp;chuẩn, đầu ti&ecirc;n phải truy t&igrave;m gốc g&aacute;c của ch&uacute;ng. Thường th&igrave; bơ v&ugrave;ng T&acirc;y Nguy&ecirc;n, Đắk Lắk nổi tiếng thơm ngon.</p>\r\n<p><strong>Chọn quả bơ</strong>&nbsp;c&oacute; cuống tươi, lắc b&ecirc;n trong nghe thấy tiếng lăn của hạt l&agrave; bơ gi&agrave;. Về vẻ bề ngo&agrave;i, bơ s&aacute;p thường to, vỏ quả tươi. Theo kinh nghiệm của một số người vỏ bơ c&oacute; m&agrave;u n&acirc;u ngả hồng thường l&agrave; bơ kh&ocirc;ng ngon. Thường th&igrave; bơ s&aacute;p c&oacute; vỏ xanh, điểm chấm v&agrave;ng, thịt dẻo v&agrave; ăn b&eacute;o ngậy hơn bơ t&iacute;m. Mua bơ gi&agrave; thường thấy da căng b&oacute;ng, nặng tay, kh&ocirc;ng ọp.</p>\r\n<p>Chọn mua bơ thường chọn quả bơ d&agrave;i v&igrave; hột nhỏ, nhiều thịt hơn bơ tr&ograve;n. Tuy nhi&ecirc;n quả d&agrave;i hay quả tr&ograve;n kh&ocirc;ng quyết định độ ngon của tr&aacute;i bơ.</p>', 90, '2019-06-18', 'Bán bơ sáp Đắk Lắk chính hiệu uy tín giá rẻ ở Hà Nội'),
(2, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F2%2F1560866326865-eon9smmp7cqnp.jpg?alt=media&token=e7228ffb-2e06-48ac-b195-74d6d3d04524', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F2%2Fresized-1560866326865-eon9smmp7cqnp.jpg?alt=media&token=42b29e8d-88b6-40c1-96a7-40cbe5fbbba0', 3, 9, 'Mực Phú Quốc', 1, 1, 0, 600000, 'Việt Nam', 1, 0, 1, '<p>Mực l&aacute; c&oacute; v&acirc;y h&igrave;nh bầu dục khỏe mở rộng xung quanh gần như to&agrave;n bộ lớp &aacute;o. Lớp &aacute;o của mực l&aacute; c&oacute; h&igrave;nh trụ, thon dần đến một h&igrave;nh n&oacute;n c&ugrave;n ở ph&iacute;a sau. Mực l&aacute; th&iacute;ch hợp để l&agrave;m c&aacute;c m&oacute;n nướng, chi&ecirc;n, sốt,... Mực l&aacute; khi c&ograve;n tươi thường c&oacute; những đặc điểm như sau: C&oacute; m&agrave;u sắc tươi b&oacute;ng, bụng m&agrave;u trắng b&oacute;ng c&oacute; nhiều hạt sắc tố m&agrave;u đen. Phần lưng thường l&agrave; m&agrave;u đen v&agrave; c&oacute; nhiều c&aacute;c hạt sắc tố. Khi chế biến mực ra &iacute;t nước, ăn vị ngọt v&agrave; gi&ograve;n kh&aacute;c hẳn với c&aacute;c loại mực đ&atilde; bị &ocirc;i thiu... Đặc trưng của mực l&aacute; Organicfood l&agrave; bề mặt b&ecirc;n ngo&agrave;i trắng b&oacute;ng tươi ngon, thịt d&agrave;y, trắng v&agrave; gi&ograve;n ngọt đậm, khi x&agrave;o kh&ocirc;ng ra nước, mực được c&acirc;u từ Ph&uacute; Quốc v&agrave; chuyển v&agrave;o cửa h&agrave;ng bằng h&agrave;ng air.</p>', 40, '2019-06-18', 'Sản phẩm đến từ phú quốc'),
(3, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F3%2F1560866764359-5a5f620bee40df432bfac54c.png?alt=media&token=ae50588c-9291-4872-9c02-3f225278561a', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F3%2Fresized-1560866764359-5a5f620bee40df432bfac54c.png?alt=media&token=30518bf4-2ee2-4b28-8ee2-37a4e6064f03', 4, 13, 'Vải thiều Lục Ngạn', 4, 1, 0, 60000, 'Việt Nam', 1, 2, 10, '<div class=\"clearfix fon5 mgt15\">\r\n<div><strong>L&agrave; đặc sản của Bắc Giang, vải thiều Lục Ngạn đ&atilde; trở th&agrave;nh c&acirc;y trồng chủ lực, mang về những m&ugrave;a ngọt. Những quả vải thiều đỏ mọng, thơm ngon đ&atilde; c&oacute; mặt tại c&aacute;c thị trường Nga, Nhật Bản g&oacute;p phần l&agrave;m gi&agrave;u cho địa phương.</strong></div>\r\n</div>\r\n<div class=\"clearfix fon6 mgt15\">\r\n<div>Được coi l&agrave; vựa vải thiều lớn nhất cả nước, vải thiều Lục Ngạn l&agrave; một trong những nh&oacute;m h&agrave;ng n&ocirc;ng sản xuất khẩu chủ lực của ng&agrave;nh N&ocirc;ng nghiệp Bắc Giang. Những vườn vải thiều bạt ng&agrave;n dọc hai b&ecirc;n đường ở x&atilde; Hồng Giang, huyện Lục Ngạn&nbsp;\r\n<table cellspacing=\"10\" cellpadding=\"1\" align=\"right\">\r\n<tbody>\r\n<tr>\r\n<td>Theo Trung t&acirc;m X&uacute;c tiến thương mại (Sở C&ocirc;ng Thương Bắc Giang), t&iacute;nh đến ng&agrave;y 25/6 vải thiều Lục Ngạn đ&atilde; xuất khẩu sang thị trường Li&ecirc;n bang Nga khoảng 40 tấn v&agrave; Nhật Bản 20 tấn.</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\nkhiến ai đi qua đ&acirc;y cũng phải trầm trồ. Đang v&agrave;o vụ thu hoạch,&nbsp; vườn vải nh&agrave; &ocirc;ng Nguyễn Thanh To&agrave;n ở th&ocirc;n k&eacute;p 1 rực một m&agrave;u đỏ. &Ocirc;ng To&agrave;n chia sẻ: &ldquo;Năm nay thời tiết, kh&iacute; hậu thuận lợi, vải cho năng suất, chất lượng cao hơn mọi năm. Với 0,8ha vải thiều trồng theo ti&ecirc;u chuẩn VietGAP, vườn vải nh&agrave; t&ocirc;i cho năng suất khoảng 8 tấn&rdquo;.</div>\r\n<div><br />Ở vườn kế b&ecirc;n, anh Nguyễn Hữu Tạo cho biết, vải thiều Bắc Giang c&oacute; đặc t&iacute;nh rất ri&ecirc;ng do thổ nhưỡng đồng đất Lục Ngạn đ&atilde; tạo cho vải độ ngọt vừa, nhiều nước, m&ugrave;i thơm đặc trưng, hạt nhỏ đen b&oacute;ng, c&ugrave;i d&agrave;y, vỏ mịn&hellip;<br /><br />&ldquo;C&ugrave;ng giống vải thiều, nhưng trồng tại địa phương kh&aacute;c, chất lượng quả sẽ thay đổi. Người Bắc Giang n&oacute;i chung v&agrave; n&ocirc;ng d&acirc;n huyện Lục Ngạn n&oacute;i ri&ecirc;ng vẫn v&iacute; c&acirc;y vải thiều l&agrave; &ldquo;c&acirc;y của đất&rdquo; bởi c&acirc;y hội tụ được tinh hoa của đất - trời Bắc Giang&rdquo; - anh Tạo tự h&agrave;o chia sẻ v&agrave; cho biết th&ecirc;m. Với 0,5ha trồng vải thiều theo ti&ecirc;u chuẩn VietGAP, năm nay vườn vải nh&agrave; anh Tạo cho sản lượng hơn 7 tấn.<br /><br />\r\n<table cellspacing=\"1\" cellpadding=\"1\" align=\"center\">\r\n<tbody>\r\n<tr>\r\n<td><img src=\"https://cmsbaoanh.vnanet.vn/Upload/2018/7/2/02072018110449334-2_resize.JPG\" border=\"0\" hspace=\"3\" vspace=\"3\" /><br /><em>Bắc Giang được cho l&agrave; thủ phủ của vải bởi quả c&oacute; m&agrave;u đỏ tươi,<br />to, mọng nước hơn c&aacute;c tỉnh th&agrave;nh kh&aacute;c tr&ecirc;n cả nước.<br /><br /><img src=\"https://cmsbaoanh.vnanet.vn/Upload/2018/7/2/02072018110450676-38_resize.JPG\" border=\"0\" hspace=\"3\" vspace=\"3\" /><br />Những nụ cười của người n&ocirc;ng d&acirc;n khi vải nh&agrave; năm nay được m&ugrave;a.<br /><br /><img src=\"https://cmsbaoanh.vnanet.vn/Upload/2018/7/2/02072018110449568-19_resize.JPG\" border=\"0\" hspace=\"3\" vspace=\"3\" /><br />Những quả vải tươi ngon được c&aacute;c thương l&aacute;i chọn lựa sẽ được đem đ&oacute;ng th&ugrave;ng để xuất khẩu.<br /><br /><img src=\"https://cmsbaoanh.vnanet.vn/Upload/2018/7/2/02072018110450364-22_resize.JPG\" border=\"0\" hspace=\"3\" vspace=\"3\" /><br />Số lượng vải thu mua sẽ được cắt cuống bỏ v&agrave;o th&ugrave;ng bảo quản để đem xuất khẩu.<br /><br /><img src=\"https://cmsbaoanh.vnanet.vn/Upload/2018/7/2/02072018110449849-20_resize.JPG\" border=\"0\" hspace=\"3\" vspace=\"3\" /><br />Để bảo quản vải c&oacute; thể tươi ngon khi vận chuyển xuất khẩu<br />người d&acirc;n huyện Lục Ngạn ứng dụng bằng đ&aacute; lạnh để giữ cho quả vải c&oacute; thể tươi từ 4-6 tuần.<br /><br /><img src=\"https://cmsbaoanh.vnanet.vn/Upload/2018/7/2/02072018110450910-IMG_7568_resize.JPG\" border=\"0\" hspace=\"3\" vspace=\"3\" /><br />Tỉnh Bắc Giang tổ chức Hội chợ giới thiệu vải thiều Lục Ngạn tại Trung t&acirc;m thương mại Big C (H&agrave; Nội).</em></td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<br />Năm 2018, tổng sản lượng vải thiều Lục Ngạn ước đạt hơn 90 ngh&igrave;n tấn, trong đ&oacute; vải sớm khoảng 13 ngh&igrave;n tấn, vải ch&iacute;nh vụ khoảng 75 ngh&igrave;n tấn. Đầu th&aacute;ng 6/2018 đ&atilde; thu hoạch vải sớm, từ ng&agrave;y 15-6 đến 30-7 sẽ thu hoạch vải ch&iacute;nh vụ. Với sức ti&ecirc;u thụ v&agrave; thị trường ng&agrave;y c&agrave;ng mở rộng, vải thiều g&oacute;p phần n&acirc;ng vị thế của huyện Lục Ngạn v&agrave; tỉnh Bắc Giang trong tiến tr&igrave;nh hội nhập kinh tế quốc tế.<br /><br />\r\n<table cellspacing=\"10\" cellpadding=\"1\" align=\"right\">\r\n<tbody>\r\n<tr>\r\n<td>Vietnam Airlines đang phục vụ m&oacute;n tr&aacute;ng miệng vải thiều đối với c&aacute;c bữa ăn tr&ecirc;n khay cho h&agrave;nh kh&aacute;ch hạng Thương gia v&agrave; hạng phổ th&ocirc;ng đặc biệt tr&ecirc;n c&aacute;c chặng bay nội địa v&agrave; quốc tế xuất ph&aacute;t từ H&agrave; Nội.</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\nĐặc biệt, nguồn lực từ quả vải đ&atilde; g&oacute;p phần quan trọng th&uacute;c đẩy c&aacute;c ng&agrave;nh sản xuất, kinh doanh, dịch vụ của Bắc Giang ph&aacute;t triển. Chị Nguyễn Thị Lan, một trong những hộ chuy&ecirc;n đ&oacute;ng g&oacute;i vải thiều cho thương l&aacute;i xuất b&aacute;n đi c&aacute;c nước cho biết, nhờ c&acirc;y vải, đời sống của người d&acirc;n địa phương ng&agrave;y c&agrave;ng ổn định v&agrave; được n&acirc;ng l&ecirc;n. Hiện l&agrave; thời điểm đầu vụ, trung b&igrave;nh mỗi ng&agrave;y, cửa h&agrave;ng của chị Lan đ&oacute;ng khoảng 300 th&ugrave;ng xốp, mỗi th&ugrave;ng khoảng 10kg vải cho c&aacute;c thương l&aacute;i...<br /><br />\"Ngo&agrave;i gi&aacute; trị kinh tế từ quả vải, tổng doanh thu từ những dịch vụ kh&aacute;c đi k&egrave;m ước đạt hơn 1 ngh&igrave;n tỷ đồng mỗi năm. Bởi vậy, với người d&acirc;n Bắc Giang, c&acirc;y vải đ&atilde;, đang v&agrave; tiếp tục gắn liền với truyền thống sản xuất, sự ph&aacute;t triển kinh tế của địa phương...\", Ph&oacute; Chủ tịch UBND huyện Lục Ngạn Cao Văn Ho&agrave;n khẳng định./.</div>\r\n</div>', 28, '2019-06-18', 'Là đặc sản của Bắc Giang, vải thiều Lục Ngạn đã trở thành cây trồng chủ lực, mang về những mùa ngọt. Những quả vải thiều đỏ mọng, thơm ngon đã có mặt tại các thị trường Nga, Nhật Bản góp phần làm giàu'),
(4, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F4%2F1560867181673-images.jpg?alt=media&token=db544b6a-ca70-4c13-a188-7d63fdd4878a', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F4%2Fresized-1560867181673-images.jpg?alt=media&token=5e5412fd-5d07-438b-a38c-d2d7423018c4', 4, 13, 'Xoài Cát Lộc', 4, 1, 1, 110000, 'Việt Nam', 1, 1, 5, '<p>Mỗi tr&aacute;i&nbsp;<strong>xo&agrave;i H&ograve;a Lộc</strong>&nbsp;đều mang trong m&igrave;nh hương vị Tuyệt Hảo m&agrave; chẳng nơi đ&acirc;u c&oacute; được. M&ugrave;i thơm đậm đ&agrave;, dễ chịu, thịt quả v&agrave;ng ươm, kh&ocirc;ng hề c&oacute; sơ, vị ngọt s&acirc;u lắng, hậu vị tốt ăn xong rồi m&agrave; miệng c&ograve;n phảng phất hương thơm cả tiếng đồng hồ.</p>\r\n<p><img src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2016/t5/xoai_hoa_loc.jpg?20\" alt=\"Xo&agrave;i H&ograve;a Lộc\" /></p>\r\n<h3>Xo&agrave;i c&aacute;t H&ograve;a Lộc trồng ở đ&acirc;u?</h3>\r\n<div class=\"text_exposed_show\">\r\n<p>Xo&agrave;i C&aacute;t&nbsp;H&ograve;a Lộc được trồng lần đầu tại x&atilde; H&ograve;a Lộc - Huyện C&aacute;i B&egrave; - Tỉnh Tiềng Giang, nơi miền c&aacute;t trắng nắng v&agrave;ng như rang, gi&oacute; biển lồng lộng cả năm. Cũng như nhiều loại&nbsp;<a href=\"http://cleverfood.com.vn/hoa-qua-sach-b1566494.html\" target=\"_blank\" rel=\"noopener\"><strong>tr&aacute;i c&acirc;y</strong></a>&nbsp;ở đ&acirc;y th&igrave; những tr&aacute;i xo&agrave;i H&ograve;a Lộc&nbsp;được t&ocirc;i luyện trở n&ecirc;n rắn rỏi, đậm đ&agrave; đến bất ngờ.</p>\r\n<p><img src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2016/t5/14447222662379_03052012400.jpg?20\" alt=\"Xo&agrave;i c&aacute;t H&ograve;a Lộc trồng ở đ&acirc;u?\" /></p>\r\n<h3>Đặc điểm của xo&agrave;i H&ograve;a Lộc</h3>\r\n<p>Ngay từ khi ra l&ograve; l&ocirc; sản phẩm đầu ti&ecirc;n, th&igrave; xo&agrave;i c&aacute;t H&ograve;a Lộc đ&atilde; tỏ ra vượt trội ho&agrave;n to&agrave;n về chất lượng v&agrave; mẫu m&atilde; so với c&aacute;c giống xo&agrave;i rất nổi tiếng l&uacute;c bấy giờ. Dần theo năm th&aacute;ng th&igrave; xo&agrave;i H&ograve;a Lộc nghiễm nhi&ecirc;n trở th&agrave;nh sự lựa chọn số 1 cho định hướng xuất khẩu Nhật, Mỹ, EU của sở n&ocirc;ng nghiệp tỉnh Tiền Giang.</p>\r\n<p>V&agrave; ngay ở thị trường trong nước, xo&agrave;i H&ograve;a Lộc dường như cũng kh&ocirc;ng c&oacute; đối thủ. Mức gi&aacute; gần gấp rưỡi c&aacute;c loại xo&agrave;i c&aacute;t kh&aacute;c nhưng vẫn được người ti&ecirc;u d&ugrave;ng săn l&ugrave;ng r&aacute;o riết.</p>\r\n<p><img src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2016/t5/13250339_1326196594058954_1506803936_n.jpg?20\" alt=\"Xo&agrave;i c&aacute;t h&ograve;a lộc\" /></p>\r\n<p>-------------------</p>\r\n<p>✪ Hiện n&agrave;y&nbsp;<strong>Xo&agrave;i C&aacute;t H&ograve;a Lộc</strong>&nbsp;đ&atilde; c&oacute; nhiều chuẩn h&oacute;a về quy tr&igrave;nh canh t&aacute;c, phục vụ cho định hướng ph&aacute;t triển ổn định, l&acirc;u d&agrave;i:</p>\r\n<p>✔Xo&agrave;i ch&iacute;n c&acirc;y 100%, kh&ocirc;ng hề ng&acirc;m, dấm h&oacute;a chất<br />✔100% xo&agrave;i được bao tr&aacute;i<br />✔Size v&agrave; chất lượng đều tăm tắp, trăm quả như một<br />✔Đạt ti&ecirc;u chuẩn xuất khẩu Global Gap</p>\r\n</div>\r\n<p><img src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2016/t5/13233294_1326196660725614_1622688581_n.jpg?20\" alt=\"Xoai cat hoa loc\" /></p>\r\n<h3>Xo&agrave;i c&aacute;t h&ograve;a lộc mua ở đ&acirc;u?</h3>\r\n<p>Thật sự số lượng Xo&agrave;i H&ograve;a Lộc ra với H&agrave; Nội kh&ocirc;ng được nhiều, lắm khi đặt trước cả tuần m&agrave; vẫn lỡ hẹn đ&oacute; anh chị. Nếu muốn mua xo&agrave;i H&ograve;a Lộc chuẩn vui l&ograve;ng đến với ch&uacute;ng t&ocirc;i.&nbsp;CleverFood&nbsp;<strong>b&aacute;n xo&agrave;i c&aacute;t H&ograve;a Lộc</strong>&nbsp;chuẩn truyền thống,&nbsp;<strong>gi&aacute; xo&agrave;i c&aacute;t H&ograve;a Lộc</strong>&nbsp;h&agrave;ng ng&agrave;y đều được cập nhật chi tiết. Tuy nhi&ecirc;n cũng cảnh b&aacute;o c&aacute;c anh chị, tr&ecirc;n thị trường đang c&oacute; rất nhiều cơ ở trộn xo&agrave;i H&ograve;a Lộc với c&aacute;c loại xo&agrave;i c&aacute;t kh&aacute;c để kiếm lời bất ch&iacute;nh, để &yacute; những đặc&nbsp;điểm sau để tr&aacute;nh mất tiền oan nha.<br />Xo&agrave;i c&aacute;t H&ograve;a Lộc c&oacute; dạng quả thu&ocirc;n d&agrave;i, tr&ograve;n m&igrave;nh, eo rốn quả r&otilde;, đỉnh quả nhọn, bầu tr&ograve;n gần cuống. Vỏ quả khi ch&iacute;n m&agrave;u v&agrave;ng tươi, vỏ mỏng, phủ lớp phấn trắng mịn, c&oacute; đốm nhỏ, m&agrave;u n&acirc;u đen, đốm dạng tr&ograve;n; thịt quả m&agrave;u v&agrave;ng tươi, d&agrave;y, độ chắc thịt cao, mịn, dẻo, &iacute;t xơ. Quả c&oacute; vị rất ngọt, m&ugrave;i thơm dịu đặc trưng, khi c&ograve;n nguy&ecirc;n vỏ xo&agrave;i H&ograve;a Lộc chuẩn kh&ocirc;ng thơm nồng như loại c&aacute;t chu, tuy nhi&ecirc;n khi đ&atilde; bổ ra th&igrave; hương thơm của n&oacute; c&oacute; thể n&oacute;i l&agrave; thi&ecirc;n hạ &iacute;t đối. Ch&iacute;nh v&igrave; vậy gi&aacute; xo&agrave;i c&aacute;t H&ograve;a Lộc c&oacute; cao gấp rưỡi, c&oacute; những l&uacute;c gấp đ&ocirc;i gi&aacute; xo&agrave;i c&aacute;t th&ocirc;ng thường cũng l&agrave; điều dễ l&yacute; giải.</p>\r\n<p><img src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2016/t5/1418802714.jpeg?20\" alt=\"xoai Hoa Loc\" /></p>\r\n<h3>Gi&aacute; xo&agrave;i c&aacute;t H&ograve;a Lộc&nbsp;</h3>\r\n<p>Thật kh&ocirc;ng sai nếu n&oacute;i xo&agrave;i c&aacute;t H&ograve;a Lộc 1 m&igrave;nh 1 gi&aacute; m&agrave;&nbsp;kh&ocirc;ng cần quan t&acirc;m đến c&aacute;c đối thủ cạnh tranh. Chưa bao giờ t&ocirc;i thấy gi&aacute; xo&agrave;i c&aacute;t H&ograve;a Lộc xuống dưới mức 100k/kg, lu&ocirc;n lu&ocirc;n gấp rưỡi gi&aacute; c&aacute;c loại xo&agrave;i c&aacute;t Chu kh&aacute;c c&oacute; mặt tr&ecirc;n thị trường. Cũng hợp l&yacute; th&ocirc;i, v&igrave; chất lượng cũng vượt trội lu&ocirc;n m&agrave;.<br />Gi&aacute; xo&agrave;i c&aacute;t H&ograve;a Lộc:110k/kg</p>', 29, '2019-06-18', 'Xoài cát Hòa Lộc thuần chủng'),
(5, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F5%2F1560867516129-cay_giong_cam_sanh_03.jpg?alt=media&token=9da31aad-611c-4fc6-85ae-59feffa537d7', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F5%2Fresized-1560867516129-cay_giong_cam_sanh_03.jpg?alt=media&token=f0c0b833-d162-4b59-b04a-5bb966ff41c5', 4, 13, 'Cam sành loại 1', 1, 1, 0, 60000, 'Việt Nam', 2, 0, 0, '<p>-<strong>Cam s&agrave;nh</strong>&nbsp;l&agrave; một giống c&acirc;y ăn quả thuộc chi Cam chanh ph&acirc;n bố rộng khắp Việt Nam từ Tuy&ecirc;n Quang , H&agrave; Giang ,Y&ecirc;n B&aacute;i tới Vĩnh Long , Tiền Giang ,Cần Thơ nhưng nh&igrave;n chung cam s&agrave;nh th&iacute;ch hợp với v&ugrave;ng đất ph&ugrave; sa cổ m&agrave;u mỡ,kh&iacute; hậu m&aacute;t ẩm.&nbsp;</p>\r\n<p><img src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2015/7/cam_xanh.jpg?0\" alt=\"cam s&agrave;nh\" /></p>\r\n<p>2.Đặc điểm:</p>\r\n<p>-<strong>Cam s&agrave;nh</strong>&nbsp;c&oacute; đặc t&iacute;nh sinh trưởng trung b&igrave;nh,&nbsp;khuynh hướng vươn cao. C&acirc;y cho tr&aacute;i sớm sau 2 năm trồng (c&acirc;y gh&eacute;p).<br />-Thời vụ hoạch cam s&agrave;nh&nbsp;tập trung v&agrave;o&nbsp;th&aacute;ng 8 &ndash; 12 v.<br />-Đặc điểm: tr&aacute;i c&oacute; dạng h&igrave;nh cầu hơi dẹp, trọng lượng trung b&igrave;nh 235,9g , vỏ&nbsp;<strong><em>cam s&agrave;nh</em></strong>&nbsp;m&agrave;u xanh đến xanh v&agrave;ng khi ch&iacute;n, sần v&agrave; dầy 3-5mm, t&eacute;p m&agrave;u v&agrave;ng cam đậm, nhiều nước, vị ngọt chua - độ Brix: 8 -10%, m&ugrave;i rất thơm v&agrave; kh&aacute; nhiều hạt (8-16 hạt/tr&aacute;i).</p>\r\n<p><img src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2015/7/cam_sanh.jpg?0\" alt=\"cam s&agrave;nh\" /></p>\r\n<p>3.C&ocirc;ng dụng:</p>\r\n<p><strong>-Cam s&agrave;nh</strong>&nbsp;gi&agrave;u vitamin C, vitamin A, canxi, chất xơ&hellip; rất bổ dưỡng cho cơ thể phụ nữ mang thai. Vitamin B9 (axit folic) c&oacute; trong cam s&agrave;nh v&ocirc; c&ugrave;ng quan trọng, đặc biệt đối với b&agrave; bầu hoặc những người đang cố gắng thụ thai. Cam s&agrave;nh gi&uacute;p ngăn ngừa một số loại khuyết tật bẩm sinh, tăng sức đề kh&aacute;ng v&agrave; gi&uacute;p sản xuất c&aacute;c tế b&agrave;o m&aacute;u khỏe mạnh. Ngo&agrave;i ra chất limonoid trong nước cam gi&uacute;p ngăn ngừa bệnh ung thư v&agrave; c&oacute; t&aacute;c dụng giải độc, lợi tiểu. Phụ nữ mang thai thường ăn cam s&agrave;nh, hoặc c&aacute;c loại tr&aacute;i c&oacute; họ h&agrave;ng với cam như qu&yacute;t, bưởi,&hellip; c&oacute; tỉ lệ nhiễm c&aacute;c bệnh ung thư (phổi v&agrave; dạ d&agrave;y) kh&aacute; thấp.</p>\r\n<p><img src=\"http://media.bizwebmedia.net/sites/99161/data/Upload/2015/6/cam_sanh2.jpg\" alt=\"cam s&agrave;nh\" /></p>\r\n<p>4.Sử dụng:</p>\r\n<p>-Mẹ bầu n&ecirc;n sử dụng&nbsp;<em><strong>cam s&agrave;nh</strong></em>&nbsp;tươi, vắt lấy nước uống v&agrave; c&oacute; thể pha đường. Tuy nhi&ecirc;n, chứng bệnh tiểu đường thai kỳ rất dễ gặp n&ecirc;n tốt hơn hết c&aacute;c mẹ n&ecirc;n uống nước cam s&agrave;nh nguy&ecirc;n chất, kh&ocirc;ng pha đường. Tốt nhất n&ecirc;n uống nước cam v&agrave;o l&uacute;c kh&ocirc;ng no, kh&ocirc;ng đ&oacute;i, tức sau khi ăn từ 1 &ndash; 2 tiếng. Nếu uống nước cam khi vừa ăn s&aacute;ng xong sẽ rất dễ bị tức bụng, c&ograve;n nếu mẹ bầu uống v&agrave;o buổi tối muộn th&igrave; lại dễ bị đi tiểu đ&ecirc;m.</p>\r\n<p>-Nếu mẹ bầu đang bị vi&ecirc;m lo&eacute;t dạ d&agrave;y, t&aacute; tr&agrave;ng th&igrave; kh&ocirc;ng n&ecirc;n uống nước&nbsp;<em><strong>cam s&agrave;nh</strong></em>, v&igrave; n&oacute; chứa rất nhiều chất hữu cơ l&agrave;m tăng a-x&iacute;t trong dạ d&agrave;y, g&acirc;y ra chứng ợ n&oacute;ng v&agrave; l&agrave;m chứng vi&ecirc;m lo&eacute;t nặng th&ecirc;m. Ngo&agrave;i ra nước cam s&agrave;nh&nbsp;c&oacute; t&aacute;c dụng nhuận tr&agrave;ng n&ecirc;n nếu bạn bị ti&ecirc;u chảy th&igrave; n&ecirc;n pha lo&atilde;ng ch&uacute;ng với nước v&agrave; uống từng ch&uacute;t một th&ocirc;i.</p>\r\n<p>-Để chữa ho bằng vỏ&nbsp;<em><strong>cam s&agrave;nh</strong></em>, c&aacute;c mẹ lưu &yacute; l&agrave; cam sau khi đ&atilde; rửa sạch d&ugrave;ng đũa kho&eacute;t một lỗ nhỏ ở ch&iacute;nh giữa quả cam v&agrave; bỏ v&agrave;o đ&oacute; ch&uacute;t muối, sau đ&oacute; bỏ quả cam v&agrave;o l&ograve; nướng trong v&ograve;ng 15 ph&uacute;t. Khi lấy cam ra, l&uacute;c cam c&ograve;n n&oacute;ng, bạn b&oacute;c vỏ ra rồi ăn rất tốt. Cũng c&oacute; thể cắt nhỏ vỏ cam v&agrave; bỏ v&agrave;o ấm tr&agrave; d&ugrave;ng h&atilde;m để uống.</p>\r\n<p><img src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2015/7/cam_sanh_nuoc_ep.jpg?0\" alt=\"nước &eacute;p cam s&agrave;nh\" /></p>\r\n<p>5.Bảo quản:</p>\r\n<p>-<strong>Cam s&agrave;nh</strong>&nbsp;kh&oacute; bảo quản,thời gian bảo quản kh&ocirc;ng được l&acirc;u,ở nhiệt độ 0-4&deg;C cam c&oacute; thể để được 5-7 ng&agrave;y.Ch&iacute;nh v&igrave; thế ở nước ngo&agrave;i người ta hay sản xuất nước &eacute;p từ cam thay v&igrave; ăn sử dụng trực tiếp</p>\r\n<p>Nếu muốn mua&nbsp;<strong>cam s&agrave;nh</strong>&nbsp;c&aacute;c bạn n&ecirc;n tới cửa h&agrave;ng&nbsp;<a href=\"http://cleverfood.com.vn/hoa-qua-sach-trong-nuoc-b1566497.html\" target=\"_blank\" rel=\"noopener\"><strong>hoa quả Việt Nam</strong></a>&nbsp; uy t&iacute;n tại&nbsp;H&agrave; Nội&nbsp;để tr&aacute;nh mua phải h&agrave;ng k&eacute;m chất lượng,kh&ocirc;ng đảm bảo vệ sinh&nbsp;an to&agrave;n.</p>', 29, '2019-06-18', 'Cam sành giúp ngăn ngừa một số loại khuyết tật bẩm sinh, tăng sức đề kháng và giúp sản xuất các tế bào máu khỏe mạnh'),
(6, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F6%2F1560868251738-N5005-500x500.jpg?alt=media&token=6ac86169-6417-46f7-b572-46af0f73facd', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F6%2Fresized-1560868251738-N5005-500x500.jpg?alt=media&token=60bd9818-fa52-4abf-876f-30b8c15b082d', 6, 22, 'Nấm hương organic', 1, 1, 4, 250000, 'Việt Nam', 1, 10, 10, '<p><strong>Nấm Hương&ndash; Kh&ocirc;ng đơn giản l&agrave; một loại gia vị th&ecirc;m v&agrave;o nhiều m&oacute;n ăn h&agrave;ng ng&agrave;y</strong></p>\r\n<p>Ch&uacute;ng ta thường chỉ sử dụng nấm hương trong một số m&oacute;n ăn như nem, nấu s&uacute;p như một loại gia vị, đ&ocirc;i khi c&oacute; cũng được m&agrave; kh&ocirc;ng c&oacute; cũng chẳng sao. Thực tế th&igrave; loại thực phẩm n&agrave;y c&oacute; nhiều c&ocirc;ng dụng hơn bạn tưởng chứ kh&ocirc;ng chỉ c&oacute; &yacute; nghĩa về mặt dinh dưỡng, dưỡng nhan, l&agrave;m đẹp da.</p>\r\n<p>Nấm hương c&ograve;n c&oacute; thể chế biến th&agrave;nh rất nhiều m&oacute;n ăn, b&agrave;i thuốc chữa bệnh cũng như gi&uacute;p tăng cường miễn dịch m&ugrave;a lạnh v&ocirc; c&ugrave;ng hiệu quả.</p>\r\n<p>Theo cựu đại t&aacute;, lương y đa khoa B&ugrave;i Hồng Minh (Ph&oacute; Chủ tịch Hội Đ&ocirc;ng y Ba Đ&igrave;nh, H&agrave; Nội), trong Đ&ocirc;ng y, nấm hương c&oacute; vị ngọt, t&iacute;nh b&igrave;nh, c&oacute; c&ocirc;ng dụng bổ t&igrave;, &iacute;ch kh&iacute;, dưỡng huyết, h&ograve;a huyết v&agrave; ti&ecirc;u đờm, giảm cholesterol m&aacute;u, ph&ograve;ng ngừa sỏi thận v&agrave; sỏi tiết niệu, trợ gi&uacute;p ti&ecirc;u h&oacute;a...</p>\r\n<p>Đ&acirc;y được coi l&agrave; si&ecirc;u thực phẩm d&agrave;nh cho những người bị thiếu m&aacute;u do thiếu sắt, người bị cao huyết &aacute;p, tiểu đường, trẻ em suy dinh dưỡng.</p>\r\n<p>\"Nấm hương đặc biệt tốt cho người thiếu m&aacute;u, nhất l&agrave; phụ nữ. Chị em c&oacute; thể sử dụng nấm hương thường xuy&ecirc;n v&agrave;o những ng&agrave;y trước v&agrave; trong chu kỳ kinh nguyệt để bổ sung ngay lượng m&aacute;u bị thiếu v&agrave;o cơ thể.</p>\r\n<p>Một lượng nấm hương vừa đủ sẽ gi&uacute;p hỗ trợ tốt cho việc t&aacute;i tạo m&aacute;u, đồng thời điều h&ograve;a kh&iacute; huyết cực tốt\", vị lương y n&agrave;y cho biết.</p>\r\n<div class=\"VCSortableInPreviewMode active\">\r\n<div><img id=\"img_2e447700-cf58-11e7-b3b7-61544e4a0fdb\" title=\"Chữa được nhiều bệnh, tốt cho sức khỏe chị em: Chuy&ecirc;n gia Đ&ocirc;ng y &ldquo;m&aacute;ch nước&rdquo; m&oacute;n ăn chữa bệnh từ nấm hương - Ảnh 1.\" src=\"http://sohanews.sohacdn.com/2017/photo-1-1511336329900.jpg\" alt=\"Chữa được nhiều bệnh, tốt cho sức khỏe chị em: Chuy&ecirc;n gia Đ&ocirc;ng y &ldquo;m&aacute;ch nước&rdquo; m&oacute;n ăn chữa bệnh từ nấm hương - Ảnh 1.\" width=\"\" height=\"\" data-original=\"http://sohanews.sohacdn.com/2017/photo-1-1511336329900.jpg\" /></div>\r\n<div class=\"PhotoCMS_Caption\">\r\n<p class=\"\" data-placeholder=\"[nhập ch&uacute; th&iacute;ch]\">Nấm hương đặc biệt tốt cho người thiếu m&aacute;u, cực tốt cho chị em phụ nữ n&oacute;i chung.</p>\r\n</div>\r\n</div>\r\n<p>Khi cơ thể c&oacute; đầy đủ lượng m&aacute;u, da dẻ sẽ hồng h&agrave;o, căng mịn, tr&agrave;n đầy sức sống. Với khả năng tăng cường miễn dịch, bạn sẽ kh&ocirc;ng cảm thấy mệt mỏi sau khi sử dụng loại thực phẩm n&agrave;y thường xuy&ecirc;n.</p>\r\n<p>Nghi&ecirc;n cứu của y học hiện đại cũng cho thấy, đ&acirc;y l&agrave; thực phẩm cực tốt gi&uacute;p tăng cường miễn dịch v&agrave;o m&ugrave;a lạnh. Trong 100g nấm kh&ocirc; trung b&igrave;nh c&oacute; 12,5g chất đạm, 1,6g chất b&eacute;o, 60g đường, 16mg canxi, v&agrave; 3.9mg sắt.</p>\r\n<p>Trong nấm hương c&oacute; khoảng 30 enzym v&agrave; tất cả c&aacute;c axit amin cần thiết cho cơ thể. Đ&acirc;y đều l&agrave; những axit amin m&agrave; cơ thể kh&ocirc;ng tự tổng hợp được.</p>\r\n<div class=\"VCSortableInPreviewMode active\">\r\n<div><img id=\"img_2d7bf6e0-cf58-11e7-87ab-d533f549c381\" style=\"display: block; margin-left: auto; margin-right: auto;\" title=\"Chữa được nhiều bệnh, tốt cho sức khỏe chị em: Chuy&ecirc;n gia Đ&ocirc;ng y &ldquo;m&aacute;ch nước&rdquo; m&oacute;n ăn chữa bệnh từ nấm hương - Ảnh 2.\" src=\"http://sohanews.sohacdn.com/2017/photo-2-1511336329905.jpg\" alt=\"Chữa được nhiều bệnh, tốt cho sức khỏe chị em: Chuy&ecirc;n gia Đ&ocirc;ng y &ldquo;m&aacute;ch nước&rdquo; m&oacute;n ăn chữa bệnh từ nấm hương - Ảnh 2.\" width=\"\" height=\"\" data-original=\"http://sohanews.sohacdn.com/2017/photo-2-1511336329905.jpg\" /></div>\r\n<div class=\"PhotoCMS_Caption\">\r\n<p class=\"\" data-placeholder=\"[nhập ch&uacute; th&iacute;ch]\">Với khả năng tăng cường miễn dịch, bạn sẽ kh&ocirc;ng cảm thấy mệt mỏi sau khi ăn nấm hương thường xuy&ecirc;n.</p>\r\n</div>\r\n</div>\r\n<p>Lương y B&ugrave;i Hồng Minh cho biết, về t&aacute;c dụng dược l&yacute;, nấm hương c&oacute; t&aacute;c dụng giải độc, bảo vệ gan cực tốt.</p>\r\n<p>Trong nấm hương c&oacute; chứa polysaccharide c&oacute; khả năng hoạt h&oacute;a miễn dịch tế b&agrave;o, th&uacute;c đẩy qu&aacute; tr&igrave;nh sinh trưởng v&agrave; ph&aacute;t triển của tế b&agrave;o lympho, k&iacute;ch hoạt tế b&agrave;o lympho T v&agrave; lympho B &ndash; những tế b&agrave;o đ&oacute;ng vai tr&ograve; ch&iacute;nh trong việc bảo vệ cơ thể.</p>\r\n<p>Th&ocirc;ng tin từ Draxe cũng khẳng định, lợi &iacute;ch dinh dưỡng trong nấm bao gồm khả năng ức chế virus v&agrave; giảm mức độ nghi&ecirc;m trọng của bệnh ở những người bị bệnh.</p>\r\n<p>V&iacute; dụ như nấm hương l&agrave;m tăng sản xuất tế b&agrave;o lympho B v&agrave; T, l&agrave; những tế b&agrave;o miễn dịch quan trọng gi&uacute;p kiểm so&aacute;t phản ứng của ch&uacute;ng ta đối với c&aacute;c mầm bệnh (vi khuẩn c&oacute; hại), virus, chất độc v&agrave; c&aacute;c chất kh&aacute;c c&oacute; thể khiến ch&uacute;ng ta trở th&agrave;nh nạn nh&acirc;n của bệnh tật .</p>\r\n<div class=\"VCSortableInPreviewMode active\">\r\n<div><img id=\"img_2ff5d080-cf58-11e7-8ff4-5154559f2cc0\" style=\"display: block; margin-left: auto; margin-right: auto;\" title=\"Chữa được nhiều bệnh, tốt cho sức khỏe chị em: Chuy&ecirc;n gia Đ&ocirc;ng y &ldquo;m&aacute;ch nước&rdquo; m&oacute;n ăn chữa bệnh từ nấm hương - Ảnh 3.\" src=\"http://sohanews.sohacdn.com/2017/photo-3-1511336329909.jpg\" alt=\"Chữa được nhiều bệnh, tốt cho sức khỏe chị em: Chuy&ecirc;n gia Đ&ocirc;ng y &ldquo;m&aacute;ch nước&rdquo; m&oacute;n ăn chữa bệnh từ nấm hương - Ảnh 3.\" width=\"\" height=\"\" data-original=\"http://sohanews.sohacdn.com/2017/photo-3-1511336329909.jpg\" /></div>\r\n<div class=\"PhotoCMS_Caption\">\r\n<p class=\"\" data-placeholder=\"[nhập ch&uacute; th&iacute;ch]\">Lợi &iacute;ch dinh dưỡng trong nấm bao gồm khả năng ức chế virus v&agrave; giảm mức độ nghi&ecirc;m trọng của bệnh ở những người bị bệnh.</p>\r\n</div>\r\n</div>', 40, '2019-06-18', 'Chữa được nhiều bệnh, tốt cho sức khỏe chị em: Chuyên gia Đông y “mách nước” món ăn chữa bệnh từ nấm hương'),
(7, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F7%2F1560868643100-xuong-ca-hoi-nauy.jpg?alt=media&token=25b5e41c-fa59-4af2-a5be-817889110250', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F7%2Fresized-1560868643100-xuong-ca-hoi-nauy.jpg?alt=media&token=6790d4aa-a510-40cc-9cee-e42342bca379', 3, 10, 'Cá hồi hữu cơ Nauy ', 8, 1, 0, 300000, 'Mỹ', 2, 0, 7, '<h2><strong>Nguồn gốc của c&aacute; hồi Organic &ndash; c&aacute; hồi hữu cơ Vikenco</strong></h2>\r\n<p>Kh&ocirc;ng giống như những d&ograve;ng c&aacute; hồi thường,&nbsp;<a title=\"c&aacute; hồi Organic\" href=\"https://gofood.vn/hai-san-nhap-khau/ca-hoi-nauy-organic/ca-hoi-huu-co-nauy-nguyen-con-tuoi-organic-salmon-fresh.html\"><strong>c&aacute; hồi Organic</strong></a>&nbsp;c&oacute; chất lượng tốt nhất bởi sự chăm s&oacute;c đặc biệt, nguồn thức ăn hữu cơ, m&ocirc;i trường sống sạch với c&aacute;c d&ograve;ng biển lạnh.</p>\r\n<p><strong>C&aacute; hồi Nauy Organic</strong>&nbsp;sinh sống trong l&agrave;n nước sạch tự nhi&ecirc;n của v&ugrave;ng biển Nauy nằm về ph&iacute;a Bắc Đại T&acirc;y Dương. Với kh&iacute; hậu lạnh quanh năm, nhiệt độ lu&ocirc;n duy tr&igrave; ở mức nhiệt -17 độ C, thậm ch&iacute; c&oacute; khi nhiệt độ l&ecirc;n tới &ndash; 20 độ C. Nhưng b&ugrave; lại điều kiện thi&ecirc;n nhi&ecirc;n v&agrave; chất lượng nước ở đ&acirc;y l&agrave; điều l&yacute; tưởng lo&agrave;i c&aacute; hồi. Những ch&uacute;&nbsp;<strong>c&aacute; hồi Organic</strong>&nbsp;gần như kh&ocirc;ng phải tiếp x&uacute;c với c&aacute;c t&aacute;c nh&acirc;n g&acirc;y hại từ ph&iacute;a con người, được tự do bơi lội v&agrave; ph&aacute;t triển.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://gofood.vn/uploads/Anh/ca-hoi-organic/ca-hoi-organic-song-o-dau.jpg\" alt=\"M&ocirc;i trường sống của c&aacute; hồi Organic\" width=\"800\" height=\"217\" /></p>\r\n<p><em>Lưới qu&acirc;y c&aacute; hồi nằm giữa biển Bắc Đại T&acirc;y Dương</em></p>\r\n<h2><strong>Điều đặc biệt l&agrave;m n&ecirc;n t&ecirc;n tuổi của c&aacute; hồi Organic vikenco l&agrave; g&igrave; ?</strong></h2>\r\n<p>- 100% C&aacute; hồi Organic được nu&ocirc;i trong m&ocirc;i trường tự nhi&ecirc;n, mật độ nu&ocirc;i l&agrave; 10Kg/m3<br />- Tất cả thức ăn đều được tuyển lựa từ nguồn gốc tự nhi&ecirc;n, kh&ocirc;ng biến đổi Gen v&agrave; được kiểm so&aacute;t bởi MSC<br />- Sử dụng c&aacute;c loại thi&ecirc;n địch để ti&ecirc;u diệt rận biển&nbsp;</p>\r\n<p>- M&agrave;u sắc c&aacute; hồi tự nhi&ecirc;n<br />- To&agrave;n bộ qu&aacute; tr&igrave;nh l&agrave;m sạch bề mặt lưới qu&acirc;y đều được l&agrave;m bằng m&aacute;y m&oacute;c hoặc thủ c&ocirc;ng. Kh&ocirc;ng sử dụng c&aacute;c loại h&oacute;a chất để l&agrave;m sạch bề mặt lưới qu&acirc;y nu&ocirc;i, kh&ocirc;ng sử dụng c&aacute;c h&oacute;a chất c&oacute; gốc đồng, gốc dầu.</p>\r\n<p>Sau gần 5 năm nghi&ecirc;n cứu v&agrave; ph&aacute;t triển, tu&acirc;n thủ những ti&ecirc;u chuẩn khắt khe nhất tr&ecirc;n thế giới, từ ti&ecirc;u chuẩn con giống đầu v&agrave;o, thức ăn, m&ocirc;i trường biển cho tới th&agrave;nh phẩm đầu ra, nền thủy sản bền vững Vikenco mới được c&aacute;c tổ chức Quốc tế cấp chứng nhận Organic (một trong những chứng nhận khắt khe v&agrave; kh&oacute; khăn nhất trong sản xuất sản phẩm theo hướng bền vững). Ch&iacute;nh v&igrave; vậy, ng&agrave;y nay ch&uacute;ng ta được thưởng thức c&aacute; hồi Organic với chất lượng cao nhất, h&agrave;m lượng dinh dưỡng vượt trội hơn hẳn c&aacute;c loại c&aacute; hồi nhập khẩu từ Nhật Bản v&agrave; tuyệt đối an to&agrave;n với sức khỏe.</p>\r\n<p style=\"text-align: center;\"><iframe src=\"https://www.youtube.com/embed/jWXcWQTrVhg\" width=\"560\" height=\"314\" allowfullscreen=\"allowfullscreen\" data-mce-fragment=\"1\"></iframe></p>\r\n<p>Ng&agrave;y nay, Farm Salmar với h&atilde;ng Vikenco đ&atilde; trở th&agrave;nh thương hiệu xuất khẩu c&aacute; hồi, đặc biệt l&agrave; C&aacute; hồi Organic chất lượng cao ra thị trường thế giới.&nbsp;</p>\r\n<p>Salmar Farming c&oacute; sản phẩm c&aacute; hồi Organic (c&aacute; hồi hữu cơ) được chứng nhận theo ti&ecirc;u chuẩn \"Debio\" cho nu&ocirc;i trồng thuỷ sản c&aacute; hồi đại dương, v&agrave; ti&ecirc;u chuẩn n&agrave;y cũng bao gồm c&aacute;c quy định của EU đối với nu&ocirc;i c&aacute; hồi hữu cơ v&ocirc; c&ugrave;ng nghi&ecirc;m ngặt tr&ecirc;n to&agrave;n thế giới.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://gofood.vn/uploads/Anh/ca-hoi-organic/Vikenco-Debio-certification-(Organic-Production)-2017-1.jpg\" alt=\"Chứng nhận c&aacute; hồi Organic\" width=\"566\" height=\"800\" /></p>\r\n<p><em>Chứng nhận Debio cho nu&ocirc;i trồng thuỷ sản c&aacute; hồi đại dương</em></p>\r\n<h3><strong>C&aacute; hồi Organic nguy&ecirc;n con tươi phải &ldquo;bay&rdquo;</strong></h3>\r\n<p>Đ&uacute;ng vậy, c&aacute; hồi phải bay, bởi chỉ biết bơi kh&ocirc;ng th&ocirc;i vẫn chưa đủ đ&acirc;u!</p>\r\n<p>Chỉ c&oacute; đường bay thẳng từ Nauy về mới đảm bảo được độ tươi ngon của từng miếng c&aacute; hồi đỏ cam. Nhưng bạn biết kh&ocirc;ng, trước khi cất c&aacute;nh những ch&uacute; c&aacute; c&ograve;n được chăm s&oacute;c cực kỳ chu đ&aacute;o nữa.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://gofood.vn/uploads/Anh/ca-hoi-organic/vikenco_1.jpg\" alt=\"Organic Salmon Vikenco\" width=\"800\" height=\"450\" /></p>\r\n<p><em>C&ocirc;ng nghệ SuperGreen với đ&aacute; bảo quản v&agrave; hệ thống kho lạnh tr&ecirc;n m&aacute;y bay</em></p>\r\n<p>Ngay sau khi được thu hoạch v&agrave; sơ chế, c&aacute; hồi Organic nguy&ecirc;n con được đặt v&agrave;o trong những chiếc th&ugrave;ng xốp bảo &ocirc;n đặc biệt. Hệ thống l&agrave;m lạnh chuy&ecirc;n nghiệp trang bị tr&ecirc;n m&aacute;y bay v&agrave; xe chở chuy&ecirc;n dụng duy tr&igrave; m&ocirc;i trường l&yacute; tưởng để giữ c&aacute; l&uacute;c n&agrave;o cũng được tươi chứ kh&ocirc;ng đ&ocirc;ng lạnh ho&agrave;n to&agrave;n. Nhờ vậy, thịt c&aacute; lu&ocirc;n lu&ocirc;n nguy&ecirc;n bản như mới trong suốt qu&aacute; tr&igrave;nh vận chuyển.&nbsp;Khi thưởng thức sashimi từ c&aacute; hồi Nauy Organic tươi của Gofood, bạn mới cảm nhận được vị ngọt của từng l&aacute;t c&aacute; hồi.</p>\r\n<p>Nhiều kh&aacute;ch h&agrave;ng ăn thử một lần l&agrave; nghiện lu&ocirc;n vị b&eacute;o ngậy đặc trưng, cảm nhận rằng từng miếng cứ &ldquo;m&aacute;t hết cả miệng&rdquo;, để rồi li&ecirc;n tục gắp gắp kh&ocirc;ng th&ocirc;i!</p>\r\n<h3><strong>C&aacute; hồi Organic nguy&ecirc;n con nặng bao nhi&ecirc;u kg ?</strong></h3>\r\n<p>C&aacute; hồi Organic Vikenco nguy&ecirc;n con &iacute;t c&oacute; size c&aacute; to - thường c&oacute; khối lượng nhỏ hơn c&aacute; hồi ti&ecirc;u chuẩn Globalgap. Mỗi con c&aacute; hồi Organic nguy&ecirc;n con thường c&oacute; c&acirc;n nặng 6-7 kg v&agrave; tỉ lệ c&aacute; đực tr&ecirc;n c&aacute;c th&ugrave;ng h&agrave;ng thấp hơn c&aacute; thường.</p>', 90, '2019-06-18', 'Sử dụng cho món shashimi tươi hay cá hồi áp chảo, nướng đều ngon đặc biệt là làm ruốc và nấu cháo cho mẹ và bé.');
INSERT INTO `product` (`ID`, `IMAGE`, `RESIZEDIMAGE`, `CATEGORYID`, `SUBCATEGORYID`, `NAME`, `BRANDID`, `STATUS`, `RATE`, `PRICE`, `ORIGIN`, `KILOGRAM`, `SALE`, `VIPSALE`, `DESCRIPTION`, `INVENTORY`, `CREATED`, `SHORTDESCRIPTION`) VALUES
(8, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F8%2F1560868574481-221389421-jpeg.jpg?alt=media&token=ebcbe877-8be8-47cb-bed8-10b1438f043f', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F8%2Fresized-1560868574481-221389421-jpeg.jpg?alt=media&token=4bb8d8bb-b80e-4e58-b36b-1b5dd768a155', 3, 10, 'Cá hồi hữu cơ Nauy nguyên con tươi - Organic Salmon Fresh', 8, 1, 0, 449000, 'Mỹ', 2, 5, 7, '<h2><strong>Nguồn gốc của c&aacute; hồi Organic &ndash; c&aacute; hồi hữu cơ Vikenco</strong></h2>\r\n<p>Kh&ocirc;ng giống như những d&ograve;ng c&aacute; hồi thường,&nbsp;<a title=\"c&aacute; hồi Organic\" href=\"https://gofood.vn/hai-san-nhap-khau/ca-hoi-nauy-organic/ca-hoi-huu-co-nauy-nguyen-con-tuoi-organic-salmon-fresh.html\"><strong>c&aacute; hồi Organic</strong></a>&nbsp;c&oacute; chất lượng tốt nhất bởi sự chăm s&oacute;c đặc biệt, nguồn thức ăn hữu cơ, m&ocirc;i trường sống sạch với c&aacute;c d&ograve;ng biển lạnh.</p>\r\n<p><strong>C&aacute; hồi Nauy Organic</strong>&nbsp;sinh sống trong l&agrave;n nước sạch tự nhi&ecirc;n của v&ugrave;ng biển Nauy nằm về ph&iacute;a Bắc Đại T&acirc;y Dương. Với kh&iacute; hậu lạnh quanh năm, nhiệt độ lu&ocirc;n duy tr&igrave; ở mức nhiệt -17 độ C, thậm ch&iacute; c&oacute; khi nhiệt độ l&ecirc;n tới &ndash; 20 độ C. Nhưng b&ugrave; lại điều kiện thi&ecirc;n nhi&ecirc;n v&agrave; chất lượng nước ở đ&acirc;y l&agrave; điều l&yacute; tưởng lo&agrave;i c&aacute; hồi. Những ch&uacute;&nbsp;<strong>c&aacute; hồi Organic</strong>&nbsp;gần như kh&ocirc;ng phải tiếp x&uacute;c với c&aacute;c t&aacute;c nh&acirc;n g&acirc;y hại từ ph&iacute;a con người, được tự do bơi lội v&agrave; ph&aacute;t triển.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://gofood.vn/uploads/Anh/ca-hoi-organic/ca-hoi-organic-song-o-dau.jpg\" alt=\"M&ocirc;i trường sống của c&aacute; hồi Organic\" width=\"800\" height=\"217\" /></p>\r\n<p><em>Lưới qu&acirc;y c&aacute; hồi nằm giữa biển Bắc Đại T&acirc;y Dương</em></p>\r\n<h2><strong>Điều đặc biệt l&agrave;m n&ecirc;n t&ecirc;n tuổi của c&aacute; hồi Organic vikenco l&agrave; g&igrave; ?</strong></h2>\r\n<p>- 100% C&aacute; hồi Organic được nu&ocirc;i trong m&ocirc;i trường tự nhi&ecirc;n, mật độ nu&ocirc;i l&agrave; 10Kg/m3<br />- Tất cả thức ăn đều được tuyển lựa từ nguồn gốc tự nhi&ecirc;n, kh&ocirc;ng biến đổi Gen v&agrave; được kiểm so&aacute;t bởi MSC<br />- Sử dụng c&aacute;c loại thi&ecirc;n địch để ti&ecirc;u diệt rận biển&nbsp;</p>\r\n<p>- M&agrave;u sắc c&aacute; hồi tự nhi&ecirc;n<br />- To&agrave;n bộ qu&aacute; tr&igrave;nh l&agrave;m sạch bề mặt lưới qu&acirc;y đều được l&agrave;m bằng m&aacute;y m&oacute;c hoặc thủ c&ocirc;ng. Kh&ocirc;ng sử dụng c&aacute;c loại h&oacute;a chất để l&agrave;m sạch bề mặt lưới qu&acirc;y nu&ocirc;i, kh&ocirc;ng sử dụng c&aacute;c h&oacute;a chất c&oacute; gốc đồng, gốc dầu.</p>\r\n<p>Sau gần 5 năm nghi&ecirc;n cứu v&agrave; ph&aacute;t triển, tu&acirc;n thủ những ti&ecirc;u chuẩn khắt khe nhất tr&ecirc;n thế giới, từ ti&ecirc;u chuẩn con giống đầu v&agrave;o, thức ăn, m&ocirc;i trường biển cho tới th&agrave;nh phẩm đầu ra, nền thủy sản bền vững Vikenco mới được c&aacute;c tổ chức Quốc tế cấp chứng nhận Organic (một trong những chứng nhận khắt khe v&agrave; kh&oacute; khăn nhất trong sản xuất sản phẩm theo hướng bền vững). Ch&iacute;nh v&igrave; vậy, ng&agrave;y nay ch&uacute;ng ta được thưởng thức c&aacute; hồi Organic với chất lượng cao nhất, h&agrave;m lượng dinh dưỡng vượt trội hơn hẳn c&aacute;c loại c&aacute; hồi nhập khẩu từ Nhật Bản v&agrave; tuyệt đối an to&agrave;n với sức khỏe.</p>\r\n<p>&nbsp;</p>\r\n<p style=\"text-align: center;\"><iframe src=\"https://www.youtube.com/embed/jWXcWQTrVhg\" width=\"560\" height=\"314\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\"></iframe></p>\r\n<p>&nbsp;</p>\r\n<p>Ng&agrave;y nay, Farm Salmar với h&atilde;ng Vikenco đ&atilde; trở th&agrave;nh thương hiệu xuất khẩu c&aacute; hồi, đặc biệt l&agrave; C&aacute; hồi Organic chất lượng cao ra thị trường thế giới.&nbsp;</p>\r\n<p>Salmar Farming c&oacute; sản phẩm c&aacute; hồi Organic (c&aacute; hồi hữu cơ) được chứng nhận theo ti&ecirc;u chuẩn \"Debio\" cho nu&ocirc;i trồng thuỷ sản c&aacute; hồi đại dương, v&agrave; ti&ecirc;u chuẩn n&agrave;y cũng bao gồm c&aacute;c quy định của EU đối với nu&ocirc;i c&aacute; hồi hữu cơ v&ocirc; c&ugrave;ng nghi&ecirc;m ngặt tr&ecirc;n to&agrave;n thế giới.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://gofood.vn/uploads/Anh/ca-hoi-organic/Vikenco-Debio-certification-(Organic-Production)-2017-1.jpg\" alt=\"Chứng nhận c&aacute; hồi Organic\" width=\"566\" height=\"800\" /></p>\r\n<p><em>Chứng nhận Debio cho nu&ocirc;i trồng thuỷ sản c&aacute; hồi đại dương</em></p>\r\n<h3><strong>C&aacute; hồi Organic nguy&ecirc;n con tươi phải &ldquo;bay&rdquo;</strong></h3>\r\n<p>Đ&uacute;ng vậy, c&aacute; hồi phải bay, bởi chỉ biết bơi kh&ocirc;ng th&ocirc;i vẫn chưa đủ đ&acirc;u!</p>\r\n<p>Chỉ c&oacute; đường bay thẳng từ Nauy về mới đảm bảo được độ tươi ngon của từng miếng c&aacute; hồi đỏ cam. Nhưng bạn biết kh&ocirc;ng, trước khi cất c&aacute;nh những ch&uacute; c&aacute; c&ograve;n được chăm s&oacute;c cực kỳ chu đ&aacute;o nữa.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://gofood.vn/uploads/Anh/ca-hoi-organic/vikenco_1.jpg\" alt=\"Organic Salmon Vikenco\" width=\"800\" height=\"450\" /></p>\r\n<p><em>C&ocirc;ng nghệ SuperGreen với đ&aacute; bảo quản v&agrave; hệ thống kho lạnh tr&ecirc;n m&aacute;y bay</em></p>\r\n<p>Ngay sau khi được thu hoạch v&agrave; sơ chế, c&aacute; hồi Organic nguy&ecirc;n con được đặt v&agrave;o trong những chiếc th&ugrave;ng xốp bảo &ocirc;n đặc biệt. Hệ thống l&agrave;m lạnh chuy&ecirc;n nghiệp trang bị tr&ecirc;n m&aacute;y bay v&agrave; xe chở chuy&ecirc;n dụng duy tr&igrave; m&ocirc;i trường l&yacute; tưởng để giữ c&aacute; l&uacute;c n&agrave;o cũng được tươi chứ kh&ocirc;ng đ&ocirc;ng lạnh ho&agrave;n to&agrave;n. Nhờ vậy, thịt c&aacute; lu&ocirc;n lu&ocirc;n nguy&ecirc;n bản như mới trong suốt qu&aacute; tr&igrave;nh vận chuyển.&nbsp;Khi thưởng thức sashimi từ c&aacute; hồi Nauy Organic tươi của Gofood, bạn mới cảm nhận được vị ngọt của từng l&aacute;t c&aacute; hồi.</p>\r\n<p>Nhiều kh&aacute;ch h&agrave;ng ăn thử một lần l&agrave; nghiện lu&ocirc;n vị b&eacute;o ngậy đặc trưng, cảm nhận rằng từng miếng cứ &ldquo;m&aacute;t hết cả miệng&rdquo;, để rồi li&ecirc;n tục gắp gắp kh&ocirc;ng th&ocirc;i!</p>\r\n<h3><strong>C&aacute; hồi Organic nguy&ecirc;n con nặng bao nhi&ecirc;u kg ?</strong></h3>\r\n<p>C&aacute; hồi Organic Vikenco nguy&ecirc;n con &iacute;t c&oacute; size c&aacute; to - thường c&oacute; khối lượng nhỏ hơn c&aacute; hồi ti&ecirc;u chuẩn Globalgap. Mỗi con c&aacute; hồi Organic nguy&ecirc;n con thường c&oacute; c&acirc;n nặng 6-7 kg v&agrave; tỉ lệ c&aacute; đực tr&ecirc;n c&aacute;c th&ugrave;ng h&agrave;ng thấp hơn c&aacute; thường.</p>', 30, '2019-06-18', 'Sử dụng cho món shashimi tươi hay cá hồi áp chảo, nướng đều ngon đặc biệt là làm ruốc và nấu cháo cho mẹ và bé.'),
(9, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F9%2F1560869620228-2fb2620a2dcf540e125a5ab771e28501.jpg?alt=media&token=7bbef6be-38ff-4434-86bd-711e701f3cdc', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F9%2Fresized-1560869620228-2fb2620a2dcf540e125a5ab771e28501.jpg?alt=media&token=aff687d5-7334-4b79-a86e-e75e9c0e0d80', 6, 23, 'Đậu gà trắng Chickpeas', 1, 1, 0, 30000, 'Úc', 2, 0, 0, '<p><strong>H&agrave;m lượng dinh dưỡng trong đậu g&agrave;</strong>:&nbsp;100 gram đậu g&agrave; kh&ocirc; c&oacute; chứa&nbsp;382 KCal; 6.81g chất b&eacute;o; 20g protein; 174mcg Acid Forlic; 105mg Canxi; 0,62g Lysine; 1,076g Kali; 4,79mg Sắt; 0,38g Phospho&nbsp;v&agrave; 13 gram chất xơ,&nbsp;0 Cholesterol.&nbsp; N&oacute; cũng l&agrave; một nguồn cung cấp nhiều nguồn kho&aacute;ng chất kh&aacute;c bao gồm mangan, magie, kẽm, đồng, vitamin B6.</p>\r\n<p><strong>Đậu g&agrave; l&agrave; thực phẩm gi&agrave;u chất xơ</strong>: Chất xơ l&agrave; một trong những l&yacute; do n&ecirc;n th&ecirc;m loại đậu n&agrave;y v&agrave;o thực đơn của bạn. Hầu hết, chế độ ăn uống h&agrave;ng ng&agrave;y của mọi người đều thiếu chất xơ. T&ugrave;y thuộc v&agrave;o độ tuổi, giới t&iacute;nh nhu cầu chất xơ l&agrave; 21 đến 38 gam mỗi ng&agrave;y. 100 gam đậu&nbsp;đ&aacute;p ứng 1/3 nhu cầu về chất xơ của một ng&agrave;y.</p>\r\n<p>Chất xơ trong thực phẩm như đậu chickpeas gi&uacute;p bạn cảm thấy năng lượng tr&agrave;n đầy, ăn &iacute;t hơn, giảm v&ograve;ng eo. Đậu n&agrave;y chứa chất xơ h&ograve;a tan, gi&uacute;p hạ thấp lipoprotein, cholesterol xấu, giữ đường trong m&aacute;u ổn định, mang lại nhiều lợi &iacute;ch cho người mắc bệnh tiểu. Ăn nhiều thực phẩm chứa chất xơ sẽ gi&uacute;p bạn giảm nguy cơ mắc một số loại ung thư, bệnh li&ecirc;n quan tới ti&ecirc;u h&oacute;a, dạ d&agrave;y, trực tr&agrave;ng</p>\r\n<p><span lang=\"vi\"><strong>&nbsp;Đậu g&agrave; gi&agrave;u folate. Folate&nbsp;</strong>đ&oacute;ng vai tr&ograve; quan trọng cho sức khỏe, đặc biệt l&agrave; phụ nữ trong độ tuổi sinh đẻ. N&oacute; đ&oacute;ng vai tr&ograve; quan trọng trong sự tăng trưởng của tế b&agrave;o, sự ph&aacute;t triển của b&agrave;o thai. Lượng folate thấp trước v&agrave; trong khi mang thai c&oacute; li&ecirc;n quan đến c&aacute;c khiếm khuyết ống thần kinh hoặc c&aacute;i dị tật bẩm sinh của cột sống hoặc n&atilde;o, dẫn đến c&aacute;c bệnh như spina bifida. Folate cũng đ&oacute;ng vai tr&ograve; quan trọng trong sự h&igrave;nh th&agrave;nh hồng cầu v&agrave; DNA.&nbsp;</span>100g đậu g&agrave; đ&aacute;p ứng hơn 70% nhu cầu folate h&agrave;ng ng&agrave;y của phụ nữ n&oacute;i chung v&agrave; khoảng 50% nhu cầu của phụ nữ mang thai v&agrave; cho con b&uacute;.</p>', 49, '2019-06-18', 'Đậu Chickpea khô nguyên hạt 100% được nhập khẩu, phân phối tại Sức Khỏe Xanh.'),
(10, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F10%2F1560870235609-trung_ga_huu_co_resize_grande.jpg?alt=media&token=2bfcf7cb-a0bc-41e8-a946-fd000dd6b823', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F10%2Fresized-1560870235609-trung_ga_huu_co_resize_grande.jpg?alt=media&token=064cead8-7aaf-40c9-8167-0aaf60346c2c', 1, 3, 'Trứng gà organic', 1, 1, 5, 75000, 'Trung Quốc', 1, 10, 0, '<p><strong>hững điểm kh&aacute;c biệt của trứng g&agrave; hữu cơ so với trứng thường:</strong></p>\r\n<p><strong>1. Giống g&agrave; cho trứng</strong></p>\r\n<p>V&iacute; như tại&nbsp;<em>Hifood</em>, trứng g&agrave; hữu cơ của trang trại Bảo Ch&acirc;u, S&oacute;c Sơn, H&agrave; Nội, được lấy từ giống&nbsp;<em>g&agrave; Ai Cập</em>&nbsp;v&agrave;&nbsp;<em>g&agrave; &aacute;c</em>. Cụ thể, những con g&agrave; n&agrave;y đều được cho ăn thức ăn hữu cơ (th&oacute;c, ng&ocirc;...) được l&ecirc;n men bởi chế phẩm E.M của Nhật Bản. Tại trang trại hữu cơ, g&agrave; được sống trong m&ocirc;i trường sạch sẽ b&ecirc;n trong chuồng k&iacute;n, được vệ sinh chuồng định kỳ.</p>\r\n<p><em><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://bizweb.dktcdn.net/100/021/951/files/trangtraigabaochau.jpg?v=1450343449491\" /></em></p>\r\n<p><em>Trang trại g&agrave; hữu cơ Bảo Ch&acirc;u, nơi chăn nu&ocirc;i g&agrave; theo c&ocirc;ng nghệ E.M (Effective Microorganisms) của Nhật Bản. (Ảnh: BC Farm)</em></p>\r\n<p>G&agrave; tại trang trại Bảo Ch&acirc;u ho&agrave;n to&agrave;n&nbsp;<strong>kh&ocirc;ng sử dụng thuốc kh&aacute;ng sinh, chất k&iacute;ch th&iacute;ch tăng trưởng hay chất k&iacute;ch đẻ,</strong>&nbsp;gi&uacute;p g&agrave; khỏe mạnh v&agrave; sạch bệnh.</p>\r\n<p><strong>2. L&ograve;ng đỏ chất lượng</strong></p>\r\n<p>Trứng g&agrave; hữu cơ c&oacute; l&ograve;ng đỏ nhiều hơn trứng thường. L&ograve;ng đỏ c&oacute; m&agrave;u cam đậm (trứng c&oacute; m&agrave;u c&agrave;ng đậm c&agrave;ng c&oacute; nhiều chất dinh dưỡng). Ngo&agrave;i ra, trứng g&agrave; hữu cơ của trang trại Bảo Ch&acirc;u&nbsp;<strong>kh&ocirc;ng hề sử dụng chất tạo l&ograve;ng đỏ.&nbsp;</strong>Trứng cũng c&oacute;&nbsp;<strong>độ đậm đặc cao hơn</strong>&nbsp;trứng th&ocirc;ng thường rất nhiều.</p>\r\n<p><em><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://bizweb.dktcdn.net/100/021/951/files/longdotrungga3-09741a06-86e6-4e94-aa84-9b91ca5d1132.jpg?v=1450343617395\" /></em></p>\r\n<p><em>(Ảnh minh họa)</em></p>\r\n<p><strong>3. Gi&agrave;u chất dinh dưỡng</strong></p>\r\n<p>Trứng g&agrave; hữu cơ đ&atilde; được khẳng định chứa nhiều chất dinh dưỡng hơn trứng thường rất nhiều. So với trứng g&agrave; th&ocirc;ng thường, trứng g&agrave; hữu cơ c&oacute;&nbsp;<strong>h&agrave;m lượng Protein v&agrave; Omega-3 cao hơn</strong>, nhưng lại c&oacute;&nbsp;<strong>h&agrave;m lượng Choresterol thấp hơn</strong>&nbsp;đ&aacute;ng kể.</p>\r\n<p><strong>4. Dễ ti&ecirc;u h&oacute;a</strong></p>\r\n<p><em><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://bizweb.dktcdn.net/100/021/951/files/trunggaran.jpg?v=1450343781384\" /></em></p>\r\n<p><em>(Ảnh minh họa)</em></p>\r\n<p>Đối với trứng thường, nếu ăn qu&aacute; 2 quả th&igrave; thường sẽ bị đầy bụng. Tuy nhi&ecirc;n, đối với trứng g&agrave; hữu cơ, người ta c&oacute; thể ăn đến 4 - 5 quả trong một lần ăn.</p>\r\n<p><strong>5. Hương vị kh&aacute;c biệt</strong></p>\r\n<p>Theo đ&aacute;nh gi&aacute; của nhiều người ti&ecirc;u d&ugrave;ng, trứng g&agrave; hữu cơ c&oacute; vị ngậy hơn hẳn trứng g&agrave; th&ocirc;ng thường, gi&uacute;p cho m&oacute;n ăn với trứng trở n&ecirc;n ngon miệng, đậm đ&agrave; v&agrave; hấp dẫn hơn.</p>', 56, '2019-06-18', 'Được sinh ra từ nhũng chú gà nuôi thả tự nhiên trên núi tại trang trại Núi Sắng Ninh Bình.\r\nNguồn thức ăn chủ yếu là lúa, ngô tại trang trại không chứa hooc-mon tăng trưởng, thức ăn công nghiệp hay bấ'),
(11, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F11%2F1560872197738-fff.jpg?alt=media&token=f4a65583-f391-441f-b019-7ec6f5065113', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F11%2Fresized-1560872197738-fff.jpg?alt=media&token=ab1ac0f3-b036-4333-8b2b-f1c81e4b03c1', 1, 2, 'Thịt Nạc organic', 8, 1, 0, 300000, 'Mỹ', 1, 10, 10, '<p><strong>Hướng dẫn chế biến:</strong></p>\r\n<p>Kh&uacute;c thịt cao cấp n&agrave;y thường được d&ugrave;ng để chế biến c&aacute;c m&oacute;n ăn trong c&aacute;c bữa tiệc, vừa ngon v&agrave; vừa thể hiện được đẳng cấp.</p>\r\n<p>C&aacute;c m&oacute;n ngon phổ biến được chế biến từ sườn non như sườn x&agrave;o chua ngọt, sườn ram, hoặc được d&ugrave;ng để nấu ch&aacute;o v&agrave; m&oacute;n b&uacute;n. Đặc biệt, sườn BBQ ch&iacute;nh l&agrave; linh hồn của m&oacute;n sườn nướng v&agrave;ng rụm, gi&ograve;n tan sốt BBQ thơm lừng đậm vị.</p>\r\n<p><strong>Hướng dẫn bảo quản:</strong>&nbsp;</p>\r\n<p>Bảo quản ở nhiệt độ&nbsp;&le;&nbsp;-18⁰C.&nbsp;Sử dụng trong thời hạn 7 ng&agrave;y khi chuyển sang bảo quản ở nhiệt độ 0⁰C tới 4⁰C.&nbsp;</p>\r\n<p>-------------------</p>\r\n<p><strong>V&igrave; sao n&ecirc;n chọn mua thịt nhập khẩu&nbsp;tại La Maison?</strong></p>\r\n<p><strong>-&nbsp;</strong><strong>Thịt Ngon Quốc Tế - Chất lượng h&agrave;ng đầu</strong>. Được nhập khẩu từ c&aacute;c quốc gia c&oacute; nền chăn nu&ocirc;i ti&ecirc;n tiến v&agrave; c&ocirc;ng nghệ chế biến thịt h&agrave;ng đầu thế giới như Đan Mạch, Đức, Ph&aacute;p, T&acirc;y Ban Nha, Mỹ, Canada, &Uacute;c, Argentina...</p>\r\n<p><strong>-&nbsp;</strong><strong>Tươi ngon tự nhi&ecirc;n - An to&agrave;n sức khỏe</strong>. Giống heo thịt, b&ograve; thịt danh tiếng thế giới, được&nbsp;chăn nu&ocirc;i ho&agrave;n to&agrave;n tự nhi&ecirc;n, cho thịt chất lượng cao v&agrave; thơm ngon hảo hạng.</p>\r\n<p><strong>-&nbsp;</strong><strong>C&ocirc;ng nghệ bảo quản hiện đại</strong>&nbsp;gi&uacute;p duy tr&igrave;, bảo to&agrave;n v&agrave; ho&agrave;n nguy&ecirc;n chất lượng thịt, đảm bảo thịt sau khi ho&agrave;n nguy&ecirc;n vẫn tươi ngon tự nhi&ecirc;n.</p>', 96, '2019-06-18', 'Sườn BBQ heo Mỹ là một trong những phần thịt ngon nhất của giống heo cao cấp, phần thịt thơm mềm, ăn không hề ngán nhờ phần thịt nạc lẫn gân giòn, ít mỡ và xương được kết hợp với các loại gia vị khác '),
(12, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F12%2F1560873288512-dgdgd%20(2).jpg?alt=media&token=7c3c4500-3378-4915-9320-dd2c7f75879f', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F12%2Fresized-1560873288512-dgdgd%20(2).jpg?alt=media&token=d76e96a4-171f-4444-b9bb-36491367b6ce', 6, 20, 'Gạo hữu cơ OrgaGro Jasmine ', 5, 1, 0, 125000, 'Việt Nam', 3, 0, 0, '<p>Gạo hữu cơ Jasmine l&agrave; sản phẩm gi&agrave;u đạm cao gấp rưỡi gạo thường, gi&agrave;u canxi v&agrave; Fiber</p>\r\n<p>Đối với những người bị bệnh tim, tăng huyết &aacute;p, bệnh tiểu đường, b&eacute;o ph&igrave;, bệnh đường ti&ecirc;u h&oacute;a v&agrave; c&aacute;c bệnh kh&aacute;c th&igrave; d&ugrave;ng gạo hữu cơ Jasmine mỗi ng&agrave;y rất tốt cho sức khỏe</p>\r\n<p>Gạo hữu cơ Jasmine Orgagro đ&atilde; đạt chứng chỉ ORGANIC USDA của Mỹ</p>\r\n<p>&nbsp;</p>', 49, '2019-06-18', 'Gạo hữu cơ Jasmine là sản phẩm giàu đạm cao gấp rưỡi gạo thường, giàu canxi và Fiber'),
(13, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F13%2F1560873537807-a1a1__ca-rot.jpg?alt=media&token=6429256a-13f8-452b-b29f-6c1e7738c9c7', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F13%2Fresized-1560873537807-a1a1__ca-rot.jpg?alt=media&token=5c5016d8-c17e-40a9-a923-bc61afe4c875', 5, 18, 'Cà rốt đà Lạt', 6, 1, 0, 780000, 'Việt Nam', 1, 0, 0, '<p><strong>C&agrave; rốt Đ&agrave; Lạt loại 1</strong>&nbsp;được&nbsp;trồng tự nhi&ecirc;n tại c&aacute;c n&ocirc;ng trại v&agrave; chăm s&oacute;c tỉ mỉ để thu được những sản phẩm chất lượng nhất. Đặc biệt, sản&nbsp;phẩm&nbsp;trồng&nbsp;bằng ph&acirc;n b&oacute;n hữu cơ, kh&ocirc;ng sử dụng c&aacute;c h&oacute;a chất g&acirc;y hại, đảm bảo kh&ocirc;ng ảnh hưởng đến sức khỏe người ti&ecirc;u d&ugrave;ng.&nbsp;<strong>C&agrave; rốt Đ&agrave; Lạt&nbsp;</strong>do Csfood ph&acirc;n phối được chọn lọc kỹ lưỡng từ nguồn nguy&ecirc;n liệu đầu v&agrave;o, cho sản phẩm lu&ocirc;n tươi sạch, giữ nguy&ecirc;n gi&aacute; trị vốn c&oacute;.</p>\r\n<p><strong>C&agrave; rốt Đ&agrave; Lạt loại 1</strong>&nbsp;kh&ocirc;ng chỉ l&agrave; thức ăn tốt, bổ dưỡng, c&oacute; gi&aacute; trị dinh dưỡng cao, cung cấp lượng vitamin C dồi d&agrave;o tốt cho mắt&nbsp;m&agrave; c&ograve;n c&oacute; t&aacute;c dụng l&agrave;m đẹp da, gi&uacute;p x&oacute;a c&aacute;c vết n&aacute;m đen tr&ecirc;n mặt. Ngo&agrave;i ra, c&agrave; rốt c&ograve;n được d&ugrave;ng để chế biến th&agrave;nh nhiều m&oacute;n ăn ngon trong gia đ&igrave;nh&nbsp;như c&aacute;c m&ograve;n x&agrave;o, s&uacute;p v&agrave; nấu canh&hellip; mang lại nhiều m&oacute;n ăn ngon, hấp dẫn&nbsp;cho cả gia đ&igrave;nh.</p>\r\n<p><strong>TH&Ocirc;NG TIN SẢN PHẨM</strong></p>\r\n<p><strong>Xuất xứ:&nbsp;</strong>C&ocirc;ng Ty TNHH Đ&agrave; Lạt G.A.P</p>\r\n<p><strong>Quy c&aacute;ch:&nbsp;</strong>1 Kg/Bịch</p>\r\n<p><strong>Đơn vị t&iacute;nh:&nbsp;</strong>Bịch</p>\r\n<p><strong>Sử dụng:&nbsp;</strong>D&ugrave;ng chế biến m&oacute;n ăn t&ugrave;y &yacute;</p>\r\n<p><strong>Bảo quản:&nbsp;</strong>Bảo quản nơi kh&ocirc; r&aacute;o tho&aacute;ng m&aacute;t, tr&aacute;nh &aacute;nh nắng trực tiếp</p>', 49, '2019-06-18', 'Cà rốt Đà Lạt loại 1 '),
(14, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F14%2F1560874075189-sau_rieng_ri6.jpg?alt=media&token=2916bc27-df52-4ee1-9997-4dd28f0414cc', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F14%2Fresized-1560874075189-sau_rieng_ri6.jpg?alt=media&token=f79f491f-6438-4a74-ba79-aa2047141ab0', 4, 13, 'Sầu riêng Ri6', 6, 1, 0, 250000, 'Việt Nam', 4, 1, 5, '<p>Đ&atilde; từ l&acirc;u&nbsp;<strong>sầu ri&ecirc;ng</strong>&nbsp;được ca ngợi l&agrave; vua của c&aacute;c loại tr&aacute;i c&acirc;y. Như nh&agrave; tự nhi&ecirc;n học t&agrave;i danh người Anh l&agrave; Alfred Russel Wallace (1823-1913) đ&atilde; từng nhận x&eacute;t &ldquo;Cấu tạo v&agrave; hương vị của m&ugrave;i sầu ri&ecirc;ng thật kh&oacute; tả. Đ&oacute; l&agrave; một vị trứng, bơ, sữa, gia vị th&ecirc;m bằng hạt hạnh đ&agrave;o v&agrave; lẫn trong đ&oacute; thoang thoảng c&oacute; vị kem ph&ocirc; mai, sốt h&agrave;nh, rượu sơ-ri&hellip;&rdquo;</p>\r\n<p><img src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2016/t5/13059924_1303469982998282_2088730912_n.jpg?20\" alt=\"Sầu ri&ecirc;ng\" /></p>\r\n<p>Sầu ri&ecirc;ng l&agrave; loại&nbsp;<a href=\"http://cleverfood.com.vn/hoa-qua-sach-b1566494.html\" target=\"_blank\" rel=\"noopener\"><strong>hoa quả</strong></a>&nbsp;độc quyền của c&aacute;c nước nhiệt đới, chất lượng sầu mỗi nơi mỗi kh&aacute;c, nhưng theo đ&aacute;nh gi&aacute; của nhiều chuy&ecirc;n gia ẩm thực, sầu ri&ecirc;ng Việt Nam v&agrave; Th&aacute;i Lan cho m&ugrave;i vị, hương thơm tuyệt vời nhất ( hoặc kinh khủng nhất với những người kh&ocirc;ng ăn được ). Đ&atilde; c&oacute; những clip vui quay cảnh nhiều vị kh&aacute;ch T&acirc;y khổ sở như thế n&agrave;o khi lần đầu ti&ecirc;n được nếm thử hương vị \" Kịch Độc\" của quả&nbsp;sầu ri&ecirc;ng.</p>\r\n<p>Xem c&aacute;ch nhận biết sầu ri&ecirc;ng ch&iacute;n rụng v&agrave; sầu ng&acirc;m thuốc:</p>\r\n<p style=\"text-align: center;\">​<iframe src=\"https://www.youtube.com/embed/gRcOeCegdgw\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\" data-mce-fragment=\"1\"></iframe></p>\r\n<h3>C&aacute;c giống sầu ri&ecirc;ng nổi bật ở Việt Nam</h3>\r\n<p>Thứ nhất đầu bảng phải kể đến d&ograve;ng S&aacute;u Hũ (S&aacute;u Hữu), đ&acirc;y l&agrave; d&ograve;ng sầu ri&ecirc;ng ngon nhất ở Việt Nam. Đặc t&iacute;nh của S&aacute;u Hũ (S&aacute;u Hữu) l&agrave; quả rất nhỏ, tr&aacute;i thu&ocirc;n d&agrave;i, cơm mẩy hạt l&eacute;p, tr&aacute;i chỉ từ 1,2kg đến 2kg l&agrave; to nhất, d&ograve;ng n&agrave;y quả sầu ri&ecirc;ng&nbsp;ngọt đậm, thơm, nhưng do sản lượng thấp n&ecirc;n phần lớn giống n&agrave;y ở Việt Nam sắp tiệt chủng, d&acirc;n chặt đi để trồng RI6 l&agrave; d&ograve;ng sầu c&ocirc;ng nghiệp quả đều lợi cho việc thu mua của thương l&aacute;i. Hiện tại&nbsp;<strong>gi&aacute; sầu ri&ecirc;ng</strong>&nbsp;S&aacute;u Hũ đang ở mức kh&ocirc;ng tưởng, rất kh&oacute; để đem v&agrave;o kinh doanh</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://media.bizwebmedia.net/sites/99161/data/Upload/2015/3/sau_rieng_ri6_cleverfood__2.jpg\" alt=\"tr&aacute;i sầu ri&ecirc;ng\" /></p>\r\n<p>Thứ hai phải l&agrave;&nbsp;d&ograve;ng M&atilde;ng Thon, giống n&agrave;y quả c&agrave;ng to c&agrave;ng ngon, c&oacute; những quả sầu ri&ecirc;ng M&atilde;ng Thon l&ecirc;n tới 14kg. Đặc điểm của d&ograve;ng sầu n&agrave;y l&agrave; cơm rất r&aacute;o, tưởng sượng nhưng kh&ocirc;ng sượng, vị ngọt hơn RI6, cơm v&agrave;ng v&agrave; độ l&eacute;p của hạt l&ecirc;n tới 90%; giống Th&aacute;i Lan, nếu mọi người đi Th&aacute;i m&agrave; hay ăn&nbsp;<strong>sầu ri&ecirc;ng</strong>&nbsp;sấy dẻo th&igrave; ch&iacute;nh l&agrave; giống n&agrave;y v&igrave; chỉ duy nhất cơm sầu ri&ecirc;ng r&aacute;o mới c&oacute; thể sấy dẻo được.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2016/t5/sau_mang_thon.jpg?20\" alt=\"quả sầu ri&ecirc;ng\" /><br />&nbsp;</p>\r\n<p>Thứ ba ch&iacute;nh l&agrave; d&ograve;ng Ri6, đ&acirc;y l&agrave; d&ograve;ng sầu ri&ecirc;ng phổ biến nhất Việt Nam.&nbsp;</p>\r\n<p>Từ những năm cuối của thập ni&ecirc;n 1990 ở ấp Phước Định 1, x&atilde; B&igrave;nh H&ograve;a Phước, huyện Long Hồ, Vĩnh Long xuất hiện một giống sầu ri&ecirc;ng mới: cơm v&agrave;ng, hạt l&eacute;p, vị ngọt, m&ugrave;i thơm, cơm kh&ocirc; r&aacute;o, cầm kh&ocirc;ng d&iacute;nh tay m&agrave; người d&acirc;n nơi đ&acirc;y quen gọi l&agrave; sầu ri&ecirc;ng Ri 6, được đặt theo t&ecirc;n của vị &ldquo;cha đẻ&rdquo; cho giống sầu ri&ecirc;ng n&agrave;y l&agrave; &Ocirc;ng S&aacute;u Ri.&nbsp;<strong>Sầu ri&ecirc;ng Ri 6</strong>&nbsp;l&agrave; loại sầu ri&ecirc;ng cao cấp Việt Nam cho năng suất cao v&agrave; chất lượng tr&aacute;i rất thơm ngon được thị trường ưa chuộng v&agrave; li&ecirc;n tục đoạt giải thưởng tại c&aacute;c kỳ hội thi tr&aacute;i ngon của Viện C&acirc;y ăn quả miền Nam v&agrave; hội chợ n&ocirc;ng nghiệp Đồng bằng S&ocirc;ng Cửu Long. B&ecirc;n cạnh đ&oacute; sầu ri&ecirc;ng Ri 6 c&ograve;n rất dễ trồng, dễ chăm s&oacute;c, dễ đậu tr&aacute;i, lại cho thu hoạch sớm hơn c&aacute;c loại sầu ri&ecirc;ng kh&aacute;c. Giống sầu ri&ecirc;ng Ri 6 được đ&aacute;nh gi&aacute; l&agrave; giống c&oacute; chất lượng tốt, rất &iacute;t khi bị sượng, được xếp v&agrave;o nh&oacute;m hạt l&eacute;p d&ugrave; c&oacute; 15-20% tr&aacute;i c&oacute; hạt to. Sầu ri&ecirc;ng Ri 6 c&oacute; cơm d&agrave;y, v&agrave;ng, thơm,m&ugrave;i thơm đặc trưng, ngọt vừa phải v&agrave; c&oacute; vị b&eacute;o, tỉ lệ hạt l&eacute;p đạt 40%/tr&aacute;i, b&igrave;nh qu&acirc;n mỗi tr&aacute;i nặng từ 3-5kg.</p>\r\n<p>&nbsp;</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2016/t5/12914993_1288593681152579_6998706_o.jpg?20\" alt=\"Sầu ri&ecirc;ng Ri6\" width=\"500\" height=\"500\" /></p>\r\n<h3>Dinh dưỡng trong tr&aacute;i sầu ri&ecirc;ng</h3>\r\n<p>Trong th&agrave;nh phần dinh dưỡng cho thấy&nbsp;<strong>sầu ri&ecirc;ng Ri6</strong>&nbsp;l&agrave; một loại quả đặc biệt, gi&aacute; trị calo, tỷ lệ cacbohydrat, protein, lipit, chất kho&aacute;ng đều rất cao so với c&aacute;c quả kh&aacute;c. B&ecirc;n cạnh đ&oacute; hạt sầu ri&ecirc;ng cũng chứa rất nhiều chất dinh dưỡng n&ecirc;n được sử dụng l&agrave;m thức ăn v&agrave; thuốc bổ dưỡng dưới dạng luộc, nướng hoặc rang ch&iacute;n, ăn b&ugrave;i như hột m&iacute;t, hạt dẻ. Bột sầu ri&ecirc;ng cũng d&ugrave;ng l&agrave;m chất phụ gia trong việc chế biến c&aacute;c loại b&aacute;nh kẹo, mứt. Hơn nữa, ngo&agrave;i cho tr&aacute;i ăn được, nhiều bộ phận của sầu ri&ecirc;ng c&ograve;n d&ugrave;ng để l&agrave;m thuốc. Nhiều người cho rằng&nbsp;<strong>sầu ri&ecirc;ng</strong>&nbsp;c&ograve;n nhiều kinh nghiệm&nbsp;k&igrave; diệu hơn cả&nbsp;<a href=\"http://cleverfood.com.vn/bo-sap-dac-lac-7382223.html\" target=\"_blank\" rel=\"noopener\"><strong>Bơ s&aacute;p</strong></a>.&nbsp;Tuy chứa nhiều chất bổ v&agrave; tốt cho sức khỏe, nhưng ch&uacute;ng ta kh&ocirc;ng n&ecirc;n ăn qu&aacute; nhiều sầu ri&ecirc;ng trong ng&agrave;y, g&acirc;y &ldquo;n&oacute;ng&rdquo;, c&oacute; thể nổi mụn, nhọt.&nbsp;</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2016/t5/13022301_1303469949664952_1527925427_n.jpg?20\" alt=\"sau rieng\" /></p>\r\n<h2>C&aacute;ch bổ sầu ri&ecirc;ng</h2>\r\n<p>Bổ sầu ri&ecirc;ng thật sự kh&ocirc;ng hề kh&oacute;, tuy nhi&ecirc;n lưu &yacute; tr&aacute;i sầu ri&ecirc;ng rất nhiều gai nhọn v&agrave; cứng, kh&ocirc;ng cẩn thận m&aacute;u đổ như chơi, t&ocirc;i cũng d&iacute;nh mấy lần rồi c&aacute;c b&aacute;c ạ, cứ động đến sầu y như rằng đứt tay, t&agrave;i thật. Thao t&aacute;c bổ sầu th&igrave; cũng đơn giản th&ocirc;i, lựa quả n&agrave;o ch&iacute;n ngon, chọc c&aacute;i k&eacute;o v&agrave;o đ&iacute;t quả rồi lựa t&aacute;ch nhẹ nh&agrave;ng ra. Nếu kh&ocirc;ng h&igrave;nh dung được th&igrave; xem video sau:</p>\r\n<p style=\"text-align: center;\"><iframe src=\"https://www.youtube.com/embed/QEhSbpBVf54\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\" data-mce-fragment=\"1\"></iframe></p>\r\n<p>&nbsp;</p>\r\n<h4>C&aacute;ch l&agrave;m sinh tố sầu ri&ecirc;ng</h4>\r\n<p><strong>Tr&aacute;i sầu ri&ecirc;ng</strong>&nbsp;ăn tươi cũng đ&atilde; ngon tuyệt vời, nhưng nhiều người muốn biến tấu cho độc đ&aacute;o hơn th&igrave; theo t&ocirc;i chỉ c&oacute; m&oacute;n&nbsp;<strong>sinh tố sầu ri&ecirc;ng</strong>&nbsp;l&agrave; chuẩn nhất.</p>\r\n<p><strong>Chuẩn bị:</strong></p>\r\n<p>-0,5kg thịt&nbsp;<strong>sầu ri&ecirc;ng</strong>&nbsp;ch&iacute;n<br />-Sữa tươi: 100ml<br />-Sữa đặc<br />-Đ&aacute;, đường</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2016/t5/cach_lam_sinh_to_sau_rieng_ngon_cho_ngay_he_thanh_mat.jpg?20\" alt=\"sinh to sau rieng\" /></p>\r\n<p>Chế biến:</p>\r\n<p>-Ta t&aacute;c rời từng m&uacute;i sầu, m&oacute;c bỏ hết hạt, phần cơm dồn v&agrave;o m&aacute;y xay<br />-R&oacute;t 100ml sữa tươi v&agrave; đ&aacute; v&agrave;o, bật m&aacute;y xay chạy khoảng 2p<br />-Mở nắp dồn sữa đặc v&agrave; đường v&agrave;o, tiếp tục xay trong 2p l&agrave; được</p>\r\n<p>R&oacute;t ra cốc v&agrave; bạn đ&atilde; c&oacute; 1 ly<strong>&nbsp;sinh tố sầu ri&ecirc;ng</strong>&nbsp;ngon tuyệt vời.</p>\r\n<h3>C&aacute;ch chọn sầu ri&ecirc;ng ngon</h3>\r\n<p>-N&ecirc;n chọn những quả m&eacute;o m&oacute;, sầu ri&ecirc;ng xấu m&atilde; thường rất ngon<br />-Khi chọn sầu ri&ecirc;ng nhớ để &yacute; phần cuống, nếu n&oacute; qu&aacute; kh&ocirc; hoặc mủn rồi th&igrave; kh&ocirc;ng n&ecirc;n chọn, v&igrave; chứng tỏ&nbsp;<strong>quả sầu ri&ecirc;ng</strong>&nbsp;đ&atilde; được để l&acirc;u ng&agrave;y, tỉ lệ hỏng, sượng cao hơn đ&aacute;ng kể<br />-Quả sầu ch&iacute;n tới sẽ ph&aacute;t ra m&ugrave;i thơm nồng n&agrave;n, nếu hương thơm nhạt nh&ograve;a th&igrave; kh&ocirc;ng n&ecirc;n chọn, một l&agrave; chưa ch&iacute;n, hai l&agrave; kh&ocirc;ng ngon<br />-Mượn c&ocirc;ng cụ thử của người b&aacute;n, g&otilde; v&agrave;o tr&aacute;i sầu ri&ecirc;ng nếu k&ecirc;u bộp bộp l&agrave; h&agrave;ng chuẩn, nếu tiếng k&ecirc;u chắc nịch th&igrave; chắc chắn sầu bị sượng.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://media.bizwebmedia.net/Sites/99161/data/upload/2016/t5/img_3032.jpg?20\" alt=\"c&aacute;ch chọn sầu ri&ecirc;ng ngon\" /></p>\r\n<h3>Mua sầu ri&ecirc;ng ở đ&acirc;u H&agrave; Nội?</h3>\r\n<p>Để mua sầu ri&ecirc;ng chuẩn, anh chị c&oacute; thể tới&nbsp;<a href=\"http://cleverfood.com.vn/\" target=\"_blank\" rel=\"noopener\"><strong>cửa h&agrave;ng thực phẩm sạch</strong></a>&nbsp;CleverFood để chọn ạ. Sầu ở CleverFood đảm bảo:</p>\r\n<p><em>Sầu Ch&iacute;n C&acirc;y, Đủ Th&aacute;ng Đủ Ng&agrave;y Mới Vặt Chứ Chẳng Bao Giờ \"Tắm\" H&oacute;a Chất<br />Cơm d&agrave;y, v&agrave;ng, hạt l&eacute;p , m&ugrave;i thơm \"độc đ&aacute;o\",Ngọt,B&eacute;o,B&ugrave;i,Ngậy. Ăn l&agrave; Nghiện, Nghiện l&agrave; Nhớ Nhưng Kh&ocirc;ng Ngu&ocirc;i</em></p>\r\n<h3>Gi&aacute; sầu ri&ecirc;ng h&ocirc;m nay</h3>\r\n<p><strong>Gi&aacute; sầu ri&ecirc;ng</strong>&nbsp;<br />Hiện nay CleverFood về sầu đi VietNam AirLine. Gi&aacute; sầu ri&ecirc;ng bay khoảng 159k/kg</p>', 30, '2019-06-18', 'SẦU RIÊNG RI6 - Vua của các loại sầu riêng: Sầu riêng Ri 6 cơm vàng, hạt lép, vị ngọt, mùi thơm, cơm khô ráo, cầm không dính tay'),
(15, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F15%2F1560874363943-images%20(2)%20-%20Copy.jpg?alt=media&token=8e621d35-450c-41fd-90a7-dbdd46d02bd5', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F15%2Fresized-1560874363943-images%20(2)%20-%20Copy.jpg?alt=media&token=06723d8a-aea3-4471-a2b9-52b764f6e21b', 4, 13, 'Bơ Booth Dak Lak', 6, 1, 0, 100000, 'Việt Nam', 1, 0, 0, '<p>Trong v&agrave;i năm gần đ&acirc;y người ti&ecirc;u d&ugrave;ng Việt dần quen với một giống Bơ cực ngon được trồng tại Đắk Lăk. Kh&ocirc;ng chỉ cho chất lượng ổn định: &iacute;t sượng, &iacute;t thối m&agrave; c&ograve;n mang lại hương vị nhiều phần kh&aacute;c biệt. Người ta đ&aacute;nh gi&aacute; Bơ Booth c&oacute; cơm kh&ocirc; v&agrave; dẻo hơn đ&aacute;ng kể so với bơ S&aacute;p thường, đồng thời khi ăn cảm nhận r&otilde; vị ngọt ngậy nổi bật, chỉ b&oacute;c ăn kh&ocirc;ng đ&atilde; ngon rồi chứ chưa cần th&ecirc;m đường, th&ecirc;m sữa.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://www.thucphamchosach.com/images/Sanpham/2017/fruit_vietnam_1497.jpg\" alt=\"\" width=\"573\" height=\"380\" /><br />Đặc biệt&nbsp;m&ugrave;a&nbsp;Bơ Booth&nbsp;từ th&aacute;ng 9-11, tức l&agrave;<span class=\"text_exposed_show\">&nbsp;muộn hơn 2 th&aacute;ng so với Bơ S&aacute;p, khiến n&oacute; đ&atilde; ngon nay lại th&ecirc;m phần qu&yacute; hiếm.&nbsp;</span></p>\r\n<p><strong><span class=\"text_exposed_show\">T&aacute;c dụng của việc ăn bơ:</span></strong></p>\r\n<p><span class=\"text_exposed_show\">Quả bơ chứa khoảng 25 loại vitamin v&agrave; kho&aacute;ng chất tự nhi&ecirc;n tốt cho sức khỏe: Ở những người huyết &aacute;p kh&ocirc;ng ổn định Bơ gi&uacute;p ổn định huyết &aacute;p, những người c&oacute; nguy cơ b&eacute;o ph&igrave; Bo gi&uacute;p &nbsp;kiểm so&aacute;t c&acirc;n nặng, với tất cả mọi người thường xuy&ecirc;n ăn bơ th&igrave; Bơ gi&uacute;p ngăn ngừa ung thư, Với c&aacute;c chị em phụ nữ, c&aacute;c mẹ th&igrave; việc ăn Bơ thường &nbsp;xuy&ecirc;n gi&uacute;p duy tr&igrave; l&agrave;n da khỏe mạnh.... v&agrave; c&ograve;n rất nhiều t&aacute;c dụng tuyệt vời m&agrave; việc ăn bở đem lại nữa.</span></p>', 40, '2019-06-18', 'Giống bơ nhập khẩu từ Mỹ được trồng thành công tại Đắk Lắk  chất lượng thơm ngon, cho trái đồng đều (2-3 trái/kg). . Kính mời các mẹ đặt hàng mua Bơ Booth tại Chợ Sạch Giá bán 100k/kg'),
(16, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F16%2F1560874647999-9554022432798%20(1).jpg?alt=media&token=3efb0a02-1419-412a-800d-da8f8ec32b63', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F16%2Fresized-1560874647999-9554022432798%20(1).jpg?alt=media&token=a85cef74-c331-486d-bf1a-d4184f1f1be1', 6, 20, 'Gạo lứt huyết rồng Bảo Minh túi 1kg', 1, 1, 0, 48000, 'Việt Nam', 1, 0, 0, '<p><strong><a href=\"https://www.adayroi.com/gao-lut-c3325600639751149\" target=\"_blank\" rel=\"noopener\">Gạo lứt</a>&nbsp;huyết rồng&nbsp;<a href=\"https://www.adayroi.com/bao-minh-br1208\" target=\"_blank\" rel=\"noopener\">Bảo Minh</a></strong>&nbsp;l&agrave; giống&nbsp;<strong>gạo m&agrave;u đỏ n&acirc;u, hạt gạo thon d&agrave;i, ruột phớt hồng</strong>,&nbsp;c&oacute; chứa h&agrave;m lượng dưỡng chất cao đặc biệt l&agrave; Lipit, Gluxit, chất xơ, Vitamin A, B1, Omega 3, 6, 9&hellip; Sản phẩm l&agrave; loại thực phẩm&nbsp;<strong>an to&agrave;n, bổ dưỡng cho mọi lứa tuổi</strong>, l&agrave; nguồn bổ sung Vitamin B1, Gluxit, Lipit cần thiết cho những người c&oacute; nhu cầu dinh dưỡng cao như người ăn chay, người gi&agrave; yếu, trẻ em, người bị tiểu đường, ung thư&hellip; H&agrave;m lượng Omega cao trong gạo lứt đỏ gi&uacute;p ph&ograve;ng chống ung thư, phục hồi chức năng hệ miễn dịch.</p>', 77, '2019-06-18', 'Bảo quản tại nơi khô thoáng, nhiệt độ thích hợp <30 độ C, tránh côn trùng sống, tránh mùi lạ'),
(17, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F17%2F1560875124228-de_suon_bo_nguyen_xuong_obe_resize_grande.jpg?alt=media&token=015057a2-76d1-4817-8f84-109098c5fb03', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F17%2Fresized-1560875124228-de_suon_bo_nguyen_xuong_obe_resize_grande.jpg?alt=media&token=1373d36b-bb61-4aea-abb5-995f124baedc', 1, 1, 'DẺ SƯỜN BÒ OBE HỮU CƠ  ', 1, 1, 0, 180000, 'Úc', 1, 10, 20, '<p><strong>Ti&ecirc;u chuẩn:</strong>&nbsp;Nhập khẩu, Organic<br /><br /><strong>M&ocirc; tả</strong>: Dẻ sườn b&ograve; OBE Organic l&agrave; phần thịt được lọc ra từ xương sườn của con b&ograve;, phần thịt n&agrave;y c&oacute; c&aacute;c dải mở xen kẽ, nổi tiếng l&agrave; c&oacute; vị ngọt đậm đ&agrave;, hương thơm b&eacute;o ngậy. OBE organic l&agrave; thương hiệu b&ograve; &Uacute;c hữu cơ cao cấp. Trong nhiều thập kỷ, OBE Organic đ&atilde; trở th&agrave;nh ti&ecirc;u chuẩn cho loại thịt b&ograve; hữu cơ tự nhi&ecirc;n đ&aacute;ng tin cậy nhất tr&ecirc;n thế giới. Đ&ugrave;ng dể nướng, &aacute;p chảo<br /><br /><br /><strong>Bảo quản v&agrave; sử dụng:</strong>&nbsp;Bảo quản ở nhiệt độ -18 độ C, r&atilde; đ&ocirc;ng khi sử dụng.<br /><br /><strong>Giới thiệu trang trại&nbsp;</strong>: Trang trại b&ograve; OBE &Uacute;C. B&ograve; được nhập nguy&ecirc;n con từ &Uacute;c, sau khi chuyển về Việt Nam được nu&ocirc;i tại trang trại th&ecirc;m 15-20 ng&agrave;y, cho ăn thức ăn Việt Nam để hương vị thịt b&ograve; ph&ugrave; hợp với khẩu vị của người Việt nam hơn. V&agrave; giết mổ theo ng&agrave;y, trong qu&aacute; tr&igrave;nh giết mổ c&oacute; sự gi&aacute;m s&aacute;t của chi cục th&uacute; y.&nbsp;<br /><br /><strong>Hello Măm kiểm định:</strong><br /><br />- Sản phẩm được Hello Măm kiểm tra mẫu định kỳ 6 th&aacute;ng/lần tại c&aacute;c ph&ograve;ng x&eacute;t nghiệm:&nbsp;</p>\r\n<ul>\r\n<li>Trung t&acirc;m ph&acirc;n t&iacute;ch v&agrave; chứng nhận chất lượng sản phẩm N&ocirc;ng nghiệp H&agrave; Nội&nbsp;</li>\r\n<li>Trung t&acirc;m Y tế dự ph&ograve;ng - Trung t&acirc;m kiểm định v&agrave; Khảo nghiệm thuốc Bảo vệ thực vật ph&iacute;a Bắc&nbsp;</li>\r\n<li>Viện kiểm nghiệm An to&agrave;n vệ sinh thực phẩm quốc gia&nbsp;</li>\r\n<li>C&ocirc;ng ty TNHH EURO Sắc K&yacute; Hải Đăng</li>\r\n<li>Kiểm dịch đ&ocirc;ng vật của chi cục th&uacute; y cơ sở. (Giấy kiểm dịch l&agrave; giấy được cấp khi động vật đem đi giết mổ kh&ocirc;ng mắc c&aacute;c bệnh l&yacute; v&agrave; thịt đảm bảo chất lượng cho người sử dụng)</li>\r\n</ul>\r\n<p>- Sản phẩm được Hello Măm kiểm tra khi h&agrave;ng về tại Ph&ograve;ng kiểm định chất lượng sản phẩm Hello Măm về c&aacute;c chỉ ti&ecirc;u cảm quan về m&agrave;u sắc thịt, độ đ&agrave;n hồi... v&agrave; chỉ ti&ecirc;u ho&aacute; sinh gồm độ PH (độ tươi của thịt)</p>', 98, '2019-06-18', 'Sản phẩm được Hello Măm kiểm tra khi hàng về tại Phòng kiểm định chất lượng sản phẩm Hello Măm về các chỉ tiêu cảm quan về màu sắc thịt, độ đàn hồi... và chỉ tiêu hoá sinh gồm độ PH (độ tươi của thịt)'),
(18, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F18%2F1560901141340-roka.jpg?alt=media&token=6552b13f-00ba-4838-ab63-805743205db7', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F18%2Fresized-1560901141340-roka.jpg?alt=media&token=a5a4e791-9403-4c10-8a7f-e28be7567ac0', 5, 17, 'Xà lách rocket', 7, 1, 0, 150000, 'Việt Nam', 1, 0, 0, '<h2>X&agrave; l&aacute;ch rocket hay c&ograve;n gọi l&agrave; rau arugula c&oacute; thể t&igrave;m thấy tr&ecirc;n khắp thế giới, ở những v&ugrave;ng &ocirc;n đới với hương vị đặc trưng hăng v&agrave; cay. Ng&agrave;y nay, n&oacute; bắt đầu c&oacute; mặt trong c&aacute;c khu chợ VN v&agrave; được biết đến với nhiều c&ocirc;ng dụng tuyệt vời.</h2>\r\n<div>\r\n<table class=\"imagefull\" align=\"center\">\r\n<tbody>\r\n<tr>\r\n<td>\r\n<div>\r\n<div class=\"pswp-content__wrapimage\">\r\n<div class=\"pswp-content__image\">\r\n<figure data-index=\"0\"><img class=\"loaded\" src=\"https://image.thanhnien.vn/660/uploaded/trandong/2015_04_28/rau-xa-lach-d_mrel.jpg\" alt=\"X&agrave; l&aacute;ch rocket l&agrave; loại rau c&oacute; &iacute;ch cho cơ thể - Ảnh: Shutterstock \" data-src=\"https://image.thanhnien.vn/660/uploaded/trandong/2015_04_28/rau-xa-lach-d_mrel.jpg\" data-was-processed=\"true\" /></figure>\r\n</div>\r\n</div>\r\n<div>X&agrave; l&aacute;ch rocket l&agrave; loại rau c&oacute; &iacute;ch cho cơ thể - Ảnh: Shutterstock</div>\r\n</div>\r\n</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<strong>Ngừa ung thư</strong>: Giống như những &ldquo;người anh em&rdquo; b&ocirc;ng cải xanh, cải bắp, s&uacute;p lơ..., x&agrave; l&aacute;ch rocket được cho l&agrave; c&oacute; c&ocirc;ng dụng chống ung thư tuyệt vời. Nhiều nghi&ecirc;n cứu cho thấy chất xơ v&agrave; chất chống &ocirc; xy h&oacute;a cao trong loại rau n&agrave;y kết hợp lại c&oacute; thể bảo vệ cơ thể tr&aacute;nh được nhiều bệnh ung thư: v&uacute;, tuyến tiền liệt, phổi, tuyến tụy.</div>\r\n<div><strong>Hỗ trợ giảm c&acirc;n</strong>: 2 ch&eacute;n đầy x&agrave; l&aacute;ch rocket chứa kh&ocirc;ng qu&aacute; 80 calo, lại th&ecirc;m h&agrave;m lượng chất xơ phong ph&uacute; n&ecirc;n n&oacute; được xem l&agrave; một trong những thực phẩm c&oacute; t&aacute;c dụng giảm c&acirc;n hữu hiệu. B&ecirc;n cạnh đ&oacute;, nhờ chứa nhiều chất xơ, x&agrave; l&aacute;ch rocket gi&uacute;p đường ruột khỏe mạnh th&ocirc;ng qua cơ chế th&uacute;c đẩy việc tống khứ c&aacute;c chất độc ra khỏi cơ thể.</div>\r\n<div><strong>Bảo vệ n&atilde;o</strong>: C&aacute;c nh&agrave; khoa học vừa t&igrave;m thấy trong x&agrave; l&aacute;ch rocket chứa nhiều vitamin, đặc biệt l&agrave; nguồn phong ph&uacute; folate - một vitamin B v&ocirc; c&ugrave;ng quan trọng. Nhiều bằng chứng cho thấy mức độ thấp của folate c&oacute; li&ecirc;n quan đến nguy cơ ph&aacute;t triển bệnh Alzheimer v&agrave; c&aacute;c loại bệnh suy giảm nhận thức.</div>\r\n<div><strong>Lọc m&aacute;u, ngừa tổn thương gan</strong>: Nghi&ecirc;n cứu cho thấy chất diệp lục trong x&agrave; l&aacute;ch rocket c&oacute; thể ngăn chặn c&aacute;c tổn thương ở gan từ c&aacute;c độc tố aflatoxin. Đ&acirc;y l&agrave; một trong những loại rau tốt nhất trong việc lọc sạch m&aacute;u. Theo c&aacute;c nh&agrave; khoa học, x&agrave; l&aacute;ch rocket chứa chất lưu huỳnh k&iacute;ch th&iacute;ch lưu th&ocirc;ng m&aacute;u v&agrave; tăng cường chức năng gan. Để nhận được chất diệp lục tốt nhất, n&ecirc;n ăn x&agrave; l&aacute;ch rocket dưới dạng rau sống, trộn dầu giấm hoặc luộc.</div>\r\n<div><strong>Giảm vi&ecirc;m</strong>: X&agrave; l&aacute;ch rocket chứa hợp chất được gọi l&agrave; isothiocyanates v&agrave; indole-3-carbinol, đ&atilde; được chứng minh c&oacute; thể dập tắt chứng vi&ecirc;m của cơ thể. &Iacute;t vi&ecirc;m c&oacute; nghĩa l&agrave; cơ thể sẽ tr&agrave;n đầy năng lượng.</div>\r\n<div><strong>Hỗ trợ xương chắc khỏe</strong>: Xương thật sự khỏe mạnh phải cần đến can xi, vitamin D, vitamin K. Vitamin K gi&uacute;p xương (v&agrave; răng) hấp thụ can xi một c&aacute;ch tối ưu, v&agrave; x&agrave; l&aacute;ch rocket l&agrave; nguồn dồi d&agrave;o vitamin K. Chỉ cần nửa ch&eacute;n x&agrave; l&aacute;ch l&agrave; bạn đ&atilde; c&oacute; 10,9 microgram vitamin K; v&agrave; nếu ti&ecirc;u thụ được 3 ch&eacute;n, bạn c&oacute; thể cung cấp đủ lượng vitamin K cho cơ thể trong một ng&agrave;y.</div>', 50, '2019-06-19', 'Xà lách rocket hay còn gọi là rau arugula có thể tìm thấy trên khắp thế giới, ở những vùng ôn đới với hương vị đặc trưng hăng và cay. Ngày nay, nó bắt đầu có mặt trong các khu chợ VN và được biết đến '),
(19, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F19%2F1560901656333-_rawsprout.jpg?alt=media&token=68984b93-083d-4afb-ba1a-29a1abb9d499', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F19%2Fresized-1560901656333-_rawsprout.jpg?alt=media&token=1e382c5f-5076-4056-9e00-46621ce3051a', 5, 16, 'Rau mầm hữu cơ', 5, 1, 0, 60000, 'Việt Nam', 1, 0, 0, '<p>RAU HỮU CƠ<br />L&agrave; loại rau canh t&aacute;c trong điều kiện ho&agrave;n to&agrave;n tự nhi&ecirc;n<br />&ndash; Kh&ocirc;ng b&oacute;n ph&acirc;n h&oacute;a học<span class=\"text_exposed_show\"><br />&ndash; Kh&ocirc;ng phun thuốc bảo vệ thực vật<br />&ndash; Kh&ocirc;ng phun thuốc k&iacute;ch th&iacute;ch sinh trưởng<br />&ndash; Kh&ocirc;ng sử dụng thuốc diệt cỏ<br />&ndash; Kh&ocirc;ng sử dụng sản phẩm biến đổi gen</span></p>\r\n<div class=\"text_exposed_show\">\r\n<p>RAU AN TO&Agrave;N<br />C&ograve;n được gọi l&agrave; rau &ldquo;sạch&rdquo; khi cach t&aacute;c kh&ocirc;ng được sử dụng qu&aacute; TI&Ecirc;U CHUẨN CHO PH&Eacute;P c&aacute;c chất sau:<br />1. Hạn chế dư lượng thuốc h&oacute;a học (thuốc s&acirc;u, thuốc cỏ) cho ph&eacute;p<br />2. Hạn chế số lượng vi sinh vật v&agrave; k&yacute; sinh tr&ugrave;ng mang mầm bệnh nhiều<br />3. Hạn chế dư lượng đạm nitrat (NO3).<br />4. Hạn chế dư lượng c&aacute;c kim loại nặng (ch&igrave;, thủy ng&acirc;n, as&ecirc;n&iacute;c, kẽm, đồng&hellip;)</p>\r\n<p>RAU THỦY CANH<br />Trồng rau thủy canh kh&ocirc;ng thực sự &ldquo;sạch&rdquo; như mọi người vẫn nghĩ. Phương ph&aacute;p n&agrave;y về bản chất l&agrave; sử dụng c&aacute;c loại h&oacute;a chất để l&agrave;m m&ocirc;i trường dinh dưỡng. Rễ c&acirc;y lu&ocirc;n tiếp x&uacute;c với m&ocirc;i trường h&oacute;a chất n&agrave;y ở dạng dư thừa n&ecirc;n việc để lại dư lượng ho&aacute; học trong rau l&agrave; điều kh&oacute; tr&aacute;nh khỏi.<br />Chất lượng rau thủy canh kh&ocirc;ng được tốt, rau ăn rất nhạt v&agrave; kh&ocirc;ng c&oacute; (hoặc c&oacute; rất &iacute;t) m&ugrave;i vị như khi ăn rau trồng bằng đất hoặc gi&aacute; thể</p>\r\n<p>th&ocirc;ng thường. Khả năng bảo quản của rau thuỷ canh rất k&eacute;m. Rau sau khi thu hoạch chỉ bảo quản được v&agrave;i giờ l&agrave; bắt đầu h&eacute;o v&agrave; qu&aacute; tr&igrave;nh h&eacute;o xảy ra rất nhanh do tế n&agrave;o rau l&uacute;c n&agrave;o cũng trong trạng th&aacute;i trương nước.</p>\r\n<p>Rau Mầm của ch&uacute;ng t&ocirc;i l&agrave; loại rau hữu cơ, chỉ nu&ocirc;i lớn bằng độ ẩm của nguồn nước sạch th&agrave;nh phố HCM v&agrave; kh&ocirc;ng sử dụng bất cứ chất k&iacute;ch th&iacute;ch tăng trưởng n&agrave;o n&ecirc;n ho&agrave;n to&agrave;n an to&agrave;n v&agrave; tốt cho sức khỏe của c&aacute;c bạn.</p>\r\n</div>', 49, '2019-06-19', 'Rau cải mầm tại Organicfood.vn đảm bảo được lựa chọn lựa và nuôi trồng trong môi trường hoàn toàn hữu cơ, đảm bảo an toàn sức khỏe và giữ nguyên các chất dinh dưỡng cho cơ thể.'),
(20, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F20%2F1560901958985-ca_chua_cherry_ngot.jpg?alt=media&token=8fbf1f9f-f660-4341-9e3e-e4fb8a3a1d30', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F20%2Fresized-1560901958985-ca_chua_cherry_ngot.jpg?alt=media&token=23ccee03-d2c2-497b-a5c8-90299011d5f3', 5, 18, 'Cà chua cherry', 4, 1, 0, 40000, 'Việt Nam', 1, 3, 5, '<div><strong>C&ocirc;ng dụng</strong></div>\r\n<div>\r\n<ul>\r\n<li>C&agrave; chua bi chocolate c&oacute; c&ocirc;ng dụng l&agrave;m đẹp như: chống l&atilde;o h&oacute;a, l&agrave;m da mịn m&agrave;ng tươi s&aacute;ng, bảo vệ bề mặt da ....</li>\r\n</ul>\r\n</div>\r\n<div>\r\n<ul>\r\n<li>Cũng giống như c&aacute;c loại c&agrave; chua kh&aacute;c, c&ocirc;ng dụng của c&agrave; chua chocolate rất nhiều, ph&ograve;ng chống ung thư, chữa vi&ecirc;m gan m&atilde;n t&iacute;nh, hỗ trợ cho người bị vi&ecirc;m thận, chữa bệnh tim mach, chữa b&iacute; đại tiện, thiếu m&aacute;u, chữa m&uacute;n nhọt, b&otilde;ng lửa, chữa sốt cao k&egrave;m theo kh&aacute;t nước hay chữa tăng huyết &aacute;p, chảy m&aacute;u ch&acirc;n răng...</li>\r\n</ul>\r\n</div>\r\n<div><strong>C&aacute;ch d&ugrave;ng</strong></div>\r\n<ul>\r\n<li>C&agrave; chua bi chocolate thường được chuộng ăn sống hơn l&agrave; chế biến th&agrave;nh c&aacute;c m&oacute;n ăn trong bữa cơm. Người ta ăn c&agrave; chua bi như một loại tr&aacute;i c&acirc;y.</li>\r\n<li>C&agrave; chua c&oacute; thể được ăn sống với m&oacute;n salad, hay &eacute;p th&agrave;nh nước hoa quả bổ dưỡng...</li>\r\n</ul>\r\n<div>\r\n<ul>\r\n<li>Một vĩ c&agrave; chua bi chocolate 500gram mỗi ng&agrave;y sẽ gi&uacute;p ta bồi bổ th&ecirc;m nhiều chất dinh dưỡng cũng như sức đề kh&aacute;ng.</li>\r\n</ul>\r\n</div>\r\n<div><strong>Bảo quản:&nbsp;</strong>C&agrave; chua thường ch&iacute;n rất nhanh khi để ở nhiệt độ ph&ograve;ng</div>', 59, '2019-06-19', 'Cà chua bi chocolate có kích thước nhỏ, quả tròn như viên bi, có màu nâu, mọng nước, ăn vào có vị hơi chua.');
INSERT INTO `product` (`ID`, `IMAGE`, `RESIZEDIMAGE`, `CATEGORYID`, `SUBCATEGORYID`, `NAME`, `BRANDID`, `STATUS`, `RATE`, `PRICE`, `ORIGIN`, `KILOGRAM`, `SALE`, `VIPSALE`, `DESCRIPTION`, `INVENTORY`, `CREATED`, `SHORTDESCRIPTION`) VALUES
(21, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F21%2F1560928681451-vendor-ca-chua-cherry-chum.jpg?alt=media&token=6d225a7d-36e6-4323-ab73-fbade910b13a', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F21%2Fresized-1560928681451-vendor-ca-chua-cherry-chum.jpg?alt=media&token=5498cc99-cf59-4d92-a511-ed0e3840426b', 4, 13, 'vải loại 1', 7, 1, 0, 780000, 'Việt Nam', 2, 0, 5, '<div class=\"clearfix fon5 mgt15\">\r\n<div><strong>L&agrave; đặc sản của Bắc Giang, vải thiều Lục Ngạn đ&atilde; trở th&agrave;nh c&acirc;y trồng chủ lực, mang về những m&ugrave;a ngọt. Những quả vải thiều đỏ mọng, thơm ngon đ&atilde; c&oacute; mặt tại c&aacute;c thị trường Nga, Nhật Bản g&oacute;p phần l&agrave;m gi&agrave;u cho địa phương.</strong></div>\r\n</div>\r\n<div class=\"clearfix fon6 mgt15\">\r\n<div>Được coi l&agrave; vựa vải thiều lớn nhất cả nước, vải thiều Lục Ngạn l&agrave; một trong những nh&oacute;m h&agrave;ng n&ocirc;ng sản xuất khẩu chủ lực của ng&agrave;nh N&ocirc;ng nghiệp Bắc Giang. Những vườn vải thiều bạt ng&agrave;n dọc hai b&ecirc;n đường ở x&atilde; Hồng Giang, huyện Lục Ngạn&nbsp;\r\n<table cellspacing=\"10\" cellpadding=\"1\" align=\"right\">\r\n<tbody>\r\n<tr>\r\n<td>Theo Trung t&acirc;m X&uacute;c tiến thương mại (Sở C&ocirc;ng Thương Bắc Giang), t&iacute;nh đến ng&agrave;y 25/6 vải thiều Lục Ngạn đ&atilde; xuất khẩu sang thị trường Li&ecirc;n bang Nga khoảng 40 tấn v&agrave; Nhật Bản 20 tấn.</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\nkhiến ai đi qua đ&acirc;y cũng phải trầm trồ. Đang v&agrave;o vụ thu hoạch,&nbsp; vườn vải nh&agrave; &ocirc;ng Nguyễn Thanh To&agrave;n ở th&ocirc;n k&eacute;p 1 rực một m&agrave;u đỏ. &Ocirc;ng To&agrave;n chia sẻ: &ldquo;Năm nay thời tiết, kh&iacute; hậu thuận lợi, vải cho năng suất, chất lượng cao hơn mọi năm. Với 0,8ha vải thiều trồng theo ti&ecirc;u chuẩn VietGAP, vườn vải nh&agrave; t&ocirc;i cho năng suất khoảng 8 tấn&rdquo;.</div>\r\n<div><br />Ở vườn kế b&ecirc;n, anh Nguyễn Hữu Tạo cho biết, vải thiều Bắc Giang c&oacute; đặc t&iacute;nh rất ri&ecirc;ng do thổ nhưỡng đồng đất Lục Ngạn đ&atilde; tạo cho vải độ ngọt vừa, nhiều nước, m&ugrave;i thơm đặc trưng, hạt nhỏ đen b&oacute;ng, c&ugrave;i d&agrave;y, vỏ mịn&hellip;<br /><br />&ldquo;C&ugrave;ng giống vải thiều, nhưng trồng tại địa phương kh&aacute;c, chất lượng quả sẽ thay đổi. Người Bắc Giang n&oacute;i chung v&agrave; n&ocirc;ng d&acirc;n huyện Lục Ngạn n&oacute;i ri&ecirc;ng vẫn v&iacute; c&acirc;y vải thiều l&agrave; &ldquo;c&acirc;y của đất&rdquo; bởi c&acirc;y hội tụ được tinh hoa của đất - trời Bắc Giang&rdquo; - anh Tạo tự h&agrave;o chia sẻ v&agrave; cho biết th&ecirc;m. Với 0,5ha trồng vải thiều theo ti&ecirc;u chuẩn VietGAP, năm nay vườn vải nh&agrave; anh Tạo cho sản lượng hơn 7 tấn.<br /><br />\r\n<table cellspacing=\"1\" cellpadding=\"1\" align=\"center\">\r\n<tbody>\r\n<tr>\r\n<td><img src=\"https://cmsbaoanh.vnanet.vn/Upload/2018/7/2/02072018110449334-2_resize.JPG\" border=\"0\" hspace=\"3\" vspace=\"3\" /><br /><em>Bắc Giang được cho l&agrave; thủ phủ của vải bởi quả c&oacute; m&agrave;u đỏ tươi,<br />to, mọng nước hơn c&aacute;c tỉnh th&agrave;nh kh&aacute;c tr&ecirc;n cả nước.<br /><br /><img src=\"https://cmsbaoanh.vnanet.vn/Upload/2018/7/2/02072018110450676-38_resize.JPG\" border=\"0\" hspace=\"3\" vspace=\"3\" /><br />Những nụ cười của người n&ocirc;ng d&acirc;n khi vải nh&agrave; năm nay được m&ugrave;a.<br /><br /><img src=\"https://cmsbaoanh.vnanet.vn/Upload/2018/7/2/02072018110449568-19_resize.JPG\" border=\"0\" hspace=\"3\" vspace=\"3\" /><br />Những quả vải tươi ngon được c&aacute;c thương l&aacute;i chọn lựa sẽ được đem đ&oacute;ng th&ugrave;ng để xuất khẩu.<br /><br /><img src=\"https://cmsbaoanh.vnanet.vn/Upload/2018/7/2/02072018110450364-22_resize.JPG\" border=\"0\" hspace=\"3\" vspace=\"3\" /><br />Số lượng vải thu mua sẽ được cắt cuống bỏ v&agrave;o th&ugrave;ng bảo quản để đem xuất khẩu.<br /><br /><img src=\"https://cmsbaoanh.vnanet.vn/Upload/2018/7/2/02072018110449849-20_resize.JPG\" border=\"0\" hspace=\"3\" vspace=\"3\" /><br />Để bảo quản vải c&oacute; thể tươi ngon khi vận chuyển xuất khẩu<br />người d&acirc;n huyện Lục Ngạn ứng dụng bằng đ&aacute; lạnh để giữ cho quả vải c&oacute; thể tươi từ 4-6 tuần.<br /><br /><img src=\"https://cmsbaoanh.vnanet.vn/Upload/2018/7/2/02072018110450910-IMG_7568_resize.JPG\" border=\"0\" hspace=\"3\" vspace=\"3\" /><br />Tỉnh Bắc Giang tổ chức Hội chợ giới thiệu vải thiều Lục Ngạn tại Trung t&acirc;m thương mại Big C (H&agrave; Nội).</em></td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<br />Năm 2018, tổng sản lượng vải thiều Lục Ngạn ước đạt hơn 90 ngh&igrave;n tấn, trong đ&oacute; vải sớm khoảng 13 ngh&igrave;n tấn, vải ch&iacute;nh vụ khoảng 75 ngh&igrave;n tấn. Đầu th&aacute;ng 6/2018 đ&atilde; thu hoạch vải sớm, từ ng&agrave;y 15-6 đến 30-7 sẽ thu hoạch vải ch&iacute;nh vụ. Với sức ti&ecirc;u thụ v&agrave; thị trường ng&agrave;y c&agrave;ng mở rộng, vải thiều g&oacute;p phần n&acirc;ng vị thế của huyện Lục Ngạn v&agrave; tỉnh Bắc Giang trong tiến tr&igrave;nh hội nhập kinh tế quốc tế.<br /><br />\r\n<table cellspacing=\"10\" cellpadding=\"1\" align=\"right\">\r\n<tbody>\r\n<tr>\r\n<td>Vietnam Airlines đang phục vụ m&oacute;n tr&aacute;ng miệng vải thiều đối với c&aacute;c bữa ăn tr&ecirc;n khay cho h&agrave;nh kh&aacute;ch hạng Thương gia v&agrave; hạng phổ th&ocirc;ng đặc biệt tr&ecirc;n c&aacute;c chặng bay nội địa v&agrave; quốc tế xuất ph&aacute;t từ H&agrave; Nội.</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\nĐặc biệt, nguồn lực từ quả vải đ&atilde; g&oacute;p phần quan trọng th&uacute;c đẩy c&aacute;c ng&agrave;nh sản xuất, kinh doanh, dịch vụ của Bắc Giang ph&aacute;t triển. Chị Nguyễn Thị Lan, một trong những hộ chuy&ecirc;n đ&oacute;ng g&oacute;i vải thiều cho thương l&aacute;i xuất b&aacute;n đi c&aacute;c nước cho biết, nhờ c&acirc;y vải, đời sống của người d&acirc;n địa phương ng&agrave;y c&agrave;ng ổn định v&agrave; được n&acirc;ng l&ecirc;n. Hiện l&agrave; thời điểm đầu vụ, trung b&igrave;nh mỗi ng&agrave;y, cửa h&agrave;ng của chị Lan đ&oacute;ng khoảng 300 th&ugrave;ng xốp, mỗi th&ugrave;ng khoảng 10kg vải cho c&aacute;c thương l&aacute;i...<br /><br />\"Ngo&agrave;i gi&aacute; trị kinh tế từ quả vải, tổng doanh thu từ những dịch vụ kh&aacute;c đi k&egrave;m ước đạt hơn 1 ngh&igrave;n tỷ đồng mỗi năm. Bởi vậy, với người d&acirc;n Bắc Giang, c&acirc;y vải đ&atilde;, đang v&agrave; tiếp tục gắn liền với truyền thống sản xuất, sự ph&aacute;t triển kinh tế của địa phương...\", Ph&oacute; Chủ tịch UBND huyện Lục Ngạn Cao Văn Ho&agrave;n khẳng định./.</div>\r\n</div>', 50, '2019-06-19', 'Là đặc sản của Bắc Giang, vải thiều Lục Ngạn đã trở thành cây trồng chủ lực, mang về những mùa ngọt. Những quả vải thiều đỏ mọng, thơm ngon đã có mặt tại các thị trường Nga, Nhật Bản góp phần làm giàu'),
(22, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F22%2F1560930217712-images%20(2)%20-%20Copy.jpg?alt=media&token=81162742-4937-44e6-afe4-e491316ab45d', 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F22%2Fresized-1560930217712-images%20(2)%20-%20Copy.jpg?alt=media&token=471b64c0-da88-4738-ae53-6f2dd49e7813', 4, 13, 'bơ dak lak', 7, 1, 4, 50000, 'Việt Nam', 1, 5, 5, '<p>cải thiện sức khỏe, l&agrave;m đẹp da, gi&uacute;p v&oacute;c d&aacute;ng c&acirc;n đối cũng như ph&ograve;ng ngừa c&aacute;c bệnh nan y.</p>\r\n<p>Tốt như thế n&ecirc;n nhiều gia đ&igrave;nh chọn bơ về để l&agrave;m&nbsp;<a title=\"sinh tố bơ \" href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-lam-sinh-to-bo-ngon-don-gian-1030185\" target=\"_blank\" rel=\"nofollow noopener\">sinh tố bơ&nbsp;</a>hay lấy bơ l&agrave;m những m&oacute;n như&nbsp;<a title=\"xốt bơ\" href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/guacamole-la-gi-cach-lam-mon-guacamole-1164461\" target=\"_blank\" rel=\"nofollow noopener\">xốt bơ</a>&nbsp;chẳng hạn. V&agrave; để l&agrave;m được những m&oacute;n ăn đ&oacute; thật ngon, c&aacute;c chị em cần phải biết c&aacute;ch chọn bơ ngon v&igrave; nếu kh&ocirc;ng bạn c&oacute; thể sẽ chọn nhầm bơ bị sượng đắng, ăn kh&ocirc;ng ngon nữa.</p>\r\n<p><strong>Bạn c&oacute; thể xem c&aacute;ch chọn bơ chi tiết trong video n&agrave;y hoặc xem th&ocirc;ng tin ở b&agrave;i viết b&ecirc;n dưới nh&eacute;:</strong></p>\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n<div class=\"videoyt\" data-video=\"a9NQzo2c5QA\"><img src=\"https://img.youtube.com/vi/a9NQzo2c5QA/hqdefault.jpg\" />\r\n<div class=\"videobhx\" data-video=\"a9NQzo2c5QA\">&nbsp;</div>\r\n</div>\r\n<h3 id=\"hmenuid1\">1Quan s&aacute;t cuống bơ</h3>\r\n<p>Để biết được bơ đ&atilde; ch&iacute;n tới chưa, bạn n&ecirc;n nh&igrave;n v&agrave;o cuống bơ. Hầu như tất cả c&aacute;c loại bơ phổ biến hiện nay đều lựa chọn theo c&aacute;ch n&agrave;y.</p>\r\n<p><strong>Nếu bạn thấy l&otilde;i cuống bơ c&oacute; m&agrave;u xanh th&igrave; quả bơ đ&oacute; chưa ch&iacute;n. Nếu l&otilde;i cuống bơ c&oacute; m&agrave;u n&acirc;u th&igrave; bơ đ&oacute; đ&atilde; ch&iacute;n qu&aacute;, thậm ch&iacute; l&agrave; bị nẫu. Nếu l&otilde;i cuống c&oacute; m&agrave;u hơi v&agrave;ng chứng tỏ bơ vừa ch&iacute;n tới, ăn rất ngon, bạn n&ecirc;n chọn những quả bơ n&agrave;y.</strong></p>\r\n<p>Thế nhưng nếu bạn mua nhiều bơ về nh&agrave; cho gia đ&igrave;nh d&ugrave;ng dần th&igrave; chỉ n&ecirc;n chọn v&agrave;i tr&aacute;i đ&atilde; ch&iacute;n tới c&ograve;n lại n&ecirc;n chọn tr&aacute;i chưa ch&iacute;n để tr&aacute;nh bơ bị ch&iacute;n qu&aacute;, l&uacute;c n&agrave;y ăn sẽ kh&ocirc;ng c&ograve;n ngon, thậm ch&iacute; kh&ocirc;ng thể d&ugrave;ng được nữa.</p>\r\n<p>-&nbsp;<a title=\"Bật m&iacute; c&aacute;ch l&agrave;m bơ ch&iacute;n nhanh m&agrave; chẳng cần h&oacute;a chất\" href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/bat-mi-cach-lam-bo-chin-nhanh-ma-chang-can-hoa-chat-1017772\" target=\"_blank\" rel=\"nofollow noopener\">Bật m&iacute; c&aacute;ch l&agrave;m bơ ch&iacute;n nhanh m&agrave; chẳng cần h&oacute;a chất</a></p>\r\n<p><img class=\"lazy initial loaded\" style=\"display: block; margin-left: auto; margin-right: auto;\" title=\"Cuống bơ xanh hay ch&iacute;n &eacute;p\" src=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang11_800x520.jpg\" alt=\"Cuống bơ xanh hay ch&iacute;n &eacute;p\" data-original=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang11_800x520.jpg\" data-src=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang11_800x520.jpg\" data-was-processed=\"true\" /></p>\r\n<p><img class=\"lazy initial loaded\" style=\"display: block; margin-left: auto; margin-right: auto;\" title=\"Bơ gi&agrave; sắp ch&iacute;n hay bơ ch&iacute;n ngon\" src=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang13_800x520.jpg\" alt=\"Bơ gi&agrave; sắp ch&iacute;n hay bơ ch&iacute;n ngon\" data-original=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang13_800x520.jpg\" data-src=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang13_800x520.jpg\" data-was-processed=\"true\" /></p>\r\n<p><img class=\"lazy initial loaded\" style=\"display: block; margin-left: auto; margin-right: auto;\" title=\"Bơ đ&atilde; ch&iacute;n l&acirc;u ng&agrave;y kh&ocirc;ng c&ograve;n ngon\" src=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang12_800x520.jpg\" alt=\"Bơ đ&atilde; ch&iacute;n l&acirc;u ng&agrave;y kh&ocirc;ng c&ograve;n ngon\" data-original=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang12_800x520.jpg\" data-src=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang12_800x520.jpg\" data-was-processed=\"true\" /></p>\r\n<h3 id=\"hmenuid2\">2Quan s&aacute;t bề ngo&agrave;i của bơ</h3>\r\n<p>Th&ocirc;ng thường c&aacute;c loại bơ c&oacute; vỏ m&agrave;u xanh, b&oacute;ng chứng tỏ bơ n&agrave;y chưa ch&iacute;n, kh&ocirc;ng d&ugrave;ng được. Bơ c&oacute; m&agrave;u chuyển sang n&acirc;u t&iacute;m, vỏ sần s&ugrave;i nghĩa l&agrave; bơ đ&atilde; bắt đầu ch&iacute;n rồi.</p>\r\n<p>Tuy nhi&ecirc;n c&oacute; những giống bơ khi ch&iacute;n cũng &iacute;t thay đổi m&agrave;u sắc v&iacute; dụ như bơ nước chẳng hạn. N&ecirc;n bạn cũng h&atilde;y trang bị th&ecirc;m kiến thức về c&aacute;c giống bơ phổ biến tr&ecirc;n thị trường hiện nay.</p>\r\n<p><img class=\"lazy initial loaded\" style=\"display: block; margin-left: auto; margin-right: auto;\" title=\"Bơ c&oacute; lấm tấm sao nhiều, vỏ sần nhưng b&oacute;ng c&oacute; nhiều s&aacute;p - ngon\" src=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang14_800x616.jpg\" alt=\"Bơ c&oacute; lấm tấm sao nhiều, vỏ sần nhưng b&oacute;ng c&oacute; nhiều s&aacute;p - ngon\" data-original=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang14_800x616.jpg\" data-src=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang14_800x616.jpg\" data-was-processed=\"true\" /></p>\r\n<p><a title=\"Chia sẻ th&ecirc;m về c&aacute;ch nhận biết bơ ch&iacute;n &eacute;p\" href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-de-nhan-biet-bo-bi-tam-hoa-chat-1163964\" target=\"_blank\" rel=\"nofollow noopener\">Chia sẻ th&ecirc;m về c&aacute;ch nhận biết bơ ch&iacute;n &eacute;p</a>&nbsp;hay bị hỏng bằng bề ngo&agrave;i cho c&aacute;c bạn lu&ocirc;n. Hiện nay nhiều gian thương đ&atilde; d&ugrave;ng h&oacute;a chất để biến bơ sống th&agrave;nh bơ ch&iacute;n chỉ trong t&iacute;ch tắc, ảnh hưởng rất xấu đến sức khỏe.&nbsp;</p>\r\n<p><img class=\"lazy initial loaded\" style=\"display: block; margin-left: auto; margin-right: auto;\" title=\"Bơ &iacute;t c&oacute; lấm tấm sao, vỏ qu&aacute; sần v&agrave; kh&ocirc; hay qu&aacute; nhẵn b&oacute;ng đều kh&ocirc;ng ngon\" src=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang15_800x616.jpg\" alt=\"Bơ &iacute;t c&oacute; lấm tấm sao, vỏ qu&aacute; sần v&agrave; kh&ocirc; hay qu&aacute; nhẵn b&oacute;ng đều kh&ocirc;ng ngon\" data-original=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang15_800x616.jpg\" data-src=\"https://cdn.tgdd.vn/Files/2018/06/16/1095699/cach-chon-bo-ngon-tuoi-khong-bi-dang15_800x616.jpg\" data-was-processed=\"true\" /></p>\r\n<h3 id=\"hmenuid3\">3Cảm gi&aacute;c khi cầm quả bơ</h3>\r\n<p>Khi chọn bơ h&atilde;y cầm quả bơ v&agrave; nắn nhẹ xung quanh.&nbsp;<strong>Nếu bơ cầm nặng, chắc tay, cảm gi&aacute;c khi nắn bơ mềm th&igrave; đ&oacute; l&agrave; bơ ch&iacute;n ngon</strong>.</p>\r\n<p>Ngo&agrave;i ra d&acirc;n gian c&ograve;n m&aacute;ch nhau c&aacute;ch lắc nhẹ quả bơ, nếu c&oacute; tiếng hạt b&ecirc;n trong k&ecirc;u th&igrave; l&agrave; bơ ngon. C&aacute;ch n&agrave;y vẫn đ&uacute;ng với một số loại bơ nhưng với những bơ mới hiện nay th&igrave; hạt d&ugrave; ch&iacute;n vẫn kh&iacute;t với thịt bơ v&igrave; thế bạn cũng kh&oacute; đo&aacute;n được bơ c&oacute; thật sự ch&iacute;n chưa với c&aacute;ch n&agrave;y.</p>\r\n<p>B&ecirc;n cạnh đ&oacute; &acirc;m thanh khi lắc bơ kh&ocirc;ng khẳng định được 100% chất lượng của quả bơ.&nbsp;Nếu lắc quả m&agrave; c&oacute; &acirc;m thanh k&ecirc;u nhỏ, chắc th&igrave; bơ đ&atilde; gi&agrave;, tuy nhi&ecirc;n nếu lắc m&agrave; &acirc;m thanh qu&aacute; rỗng, k&ecirc;u lộp bộp th&igrave; chắc chắn đ&acirc;y l&agrave; bơ non.</p>', 50, '2019-06-19', 'Sản phẩm bơ ngon');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_combo`
--

CREATE TABLE `product_combo` (
  `ID` int(11) NOT NULL,
  `PRODUCTID1` int(11) NOT NULL,
  `PRODUCTID2` int(11) NOT NULL,
  `PRODUCTID3` int(11) NOT NULL,
  `NAME` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `STATUS` tinyint(1) NOT NULL,
  `RATE` int(11) NOT NULL,
  `PRICE` double NOT NULL,
  `KILOGRAM` double NOT NULL,
  `SALE` double NOT NULL,
  `VIPSALE` double NOT NULL,
  `DESCRIPTION` longtext COLLATE utf8_unicode_ci NOT NULL,
  `INVENTORY` int(11) NOT NULL,
  `CREATED` date DEFAULT NULL,
  `SHORTDESCRIPTION` varchar(2000) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_combo`
--

INSERT INTO `product_combo` (`ID`, `PRODUCTID1`, `PRODUCTID2`, `PRODUCTID3`, `NAME`, `STATUS`, `RATE`, `PRICE`, `KILOGRAM`, `SALE`, `VIPSALE`, `DESCRIPTION`, `INVENTORY`, `CREATED`, `SHORTDESCRIPTION`) VALUES
(1, 10, 11, 17, 'Combo Organic', 1, 0, 555000, 3, 5, 10, '<p>Sự kết hợp của c&aacute;c sản phẩm đến từ organic l&agrave; sự lựa chọn tuyệt vời cho mua h&egrave; của bạn</p>', 10, '2019-06-19', 'Các sản phẩm combo đến từ organic'),
(2, 20, 19, 13, 'Combo Rau organic', 1, 1, 880000, 3, 5, 10, '<div><strong>C&ocirc;ng dụng</strong></div>\r\n<div>\r\n<ul>\r\n<li>C&agrave; chua bi chocolate c&oacute; c&ocirc;ng dụng l&agrave;m đẹp như: chống l&atilde;o h&oacute;a, l&agrave;m da mịn m&agrave;ng tươi s&aacute;ng, bảo vệ bề mặt da ....</li>\r\n</ul>\r\n</div>\r\n<div>\r\n<ul>\r\n<li>Cũng giống như c&aacute;c loại c&agrave; chua kh&aacute;c, c&ocirc;ng dụng của c&agrave; chua chocolate rất nhiều, ph&ograve;ng chống ung thư, chữa vi&ecirc;m gan m&atilde;n t&iacute;nh, hỗ trợ cho người bị vi&ecirc;m thận, chữa bệnh tim mach, chữa b&iacute; đại tiện, thiếu m&aacute;u, chữa m&uacute;n nhọt, b&otilde;ng lửa, chữa sốt cao k&egrave;m theo kh&aacute;t nước hay chữa tăng huyết &aacute;p, chảy m&aacute;u ch&acirc;n răng...</li>\r\n</ul>\r\n</div>\r\n<div><strong>C&aacute;ch d&ugrave;ng</strong></div>\r\n<ul>\r\n<li>C&agrave; chua bi chocolate thường được chuộng ăn sống hơn l&agrave; chế biến th&agrave;nh c&aacute;c m&oacute;n ăn trong bữa cơm. Người ta ăn c&agrave; chua bi như một loại tr&aacute;i c&acirc;y.</li>\r\n<li>C&agrave; chua c&oacute; thể được ăn sống với m&oacute;n salad, hay &eacute;p th&agrave;nh nước hoa quả bổ dưỡng...</li>\r\n</ul>\r\n<div>\r\n<ul>\r\n<li>Một vĩ c&agrave; chua bi chocolate 500gram mỗi ng&agrave;y sẽ gi&uacute;p ta bồi bổ th&ecirc;m nhiều chất dinh dưỡng cũng như sức đề kh&aacute;ng.</li>\r\n</ul>\r\n</div>', 9, '2019-06-19', 'Sản phẩm rau'),
(3, 8, 2, 7, 'Com bo hải sản', 1, 0, 1349000, 5, 10, 15, '<p>C&aacute;c sản phẩm từ c&aacute; nauy</p>', 19, '2019-06-19', 'Combo hải sản tươi'),
(4, 1, 4, 15, 'Combo hoa quả tươi', 1, 1, 290000, 3, 5, 10, '<p>Trong v&agrave;i năm gần đ&acirc;y người ti&ecirc;u d&ugrave;ng Việt dần quen với một giống Bơ cực ngon được trồng tại Đắk Lăk. Kh&ocirc;ng chỉ cho chất lượng ổn định: &iacute;t sượng, &iacute;t thối m&agrave; c&ograve;n mang lại hương vị nhiều phần kh&aacute;c biệt. Người ta đ&aacute;nh gi&aacute; Bơ Booth c&oacute; cơm kh&ocirc; v&agrave; dẻo hơn đ&aacute;ng kể so với bơ S&aacute;p thường, đồng thời khi ăn cảm nhận r&otilde; vị ngọt ngậy nổi bật, chỉ b&oacute;c ăn kh&ocirc;ng đ&atilde; ngon rồi chứ chưa cần th&ecirc;m đường, th&ecirc;m sữa.</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://www.thucphamchosach.com/images/Sanpham/2017/fruit_vietnam_1497.jpg\" alt=\"\" width=\"573\" height=\"380\" /><br />Đặc biệt&nbsp;m&ugrave;a&nbsp;Bơ Booth&nbsp;từ th&aacute;ng 9-11, tức l&agrave;<span class=\"text_exposed_show\">&nbsp;muộn hơn 2 th&aacute;ng so với Bơ S&aacute;p, khiến n&oacute; đ&atilde; ngon nay lại th&ecirc;m phần qu&yacute; hiếm.&nbsp;</span></p>\r\n<p><strong><span class=\"text_exposed_show\">T&aacute;c dụng của việc ăn bơ:</span></strong></p>\r\n<p><span class=\"text_exposed_show\">Quả bơ chứa khoảng 25 loại vitamin v&agrave; kho&aacute;ng chất tự nhi&ecirc;n tốt cho sức khỏe: Ở những người huyết &aacute;p kh&ocirc;ng ổn định Bơ gi&uacute;p ổn định huyết &aacute;p, những người c&oacute; nguy cơ b&eacute;o ph&igrave; Bo gi&uacute;p &nbsp;kiểm so&aacute;t c&acirc;n nặng, với tất cả mọi người thường xuy&ecirc;n ăn bơ th&igrave; Bơ gi&uacute;p ngăn ngừa ung thư, Với c&aacute;c chị em phụ nữ, c&aacute;c mẹ th&igrave; việc ăn Bơ thường &nbsp;xuy&ecirc;n gi&uacute;p duy tr&igrave; l&agrave;n da khỏe mạnh.... v&agrave; c&ograve;n rất nhiều t&aacute;c dụng tuyệt vời m&agrave; việc ăn bở đem lại nữa.</span></p>', 38, '2019-06-19', 'Mua 2 loại bơ được tặng thêm xoài cát lộc'),
(5, 6, 9, 16, 'Combo đồ khô', 1, 0, 328000, 4, 5, 10, '<p>Combo gạo nấm gi&uacute;p giảm bớt t&uacute;i tiền khi mua h&agrave;ng, c&aacute;c bạn h&atilde;y lựa chọn sản phẩm n&agrave;y nh&eacute;</p>', 10, '2019-06-19', 'Các sản phầm đồ khô từ organic'),
(6, 5, 4, 3, 'Combo Trái cây mùa hè', 1, 0, 230000, 4, 10, 15, '<p style=\"text-align: center;\"><strong><img class=\"img-responsive\" src=\"http://image.baophapluat.vn/w800/Uploaded/2019/zsgkqzztgymu/2017_12_21/1_qaex.jpg\" alt=\"Nhận biết xo&agrave;i c&aacute;t H&ograve;a Lộc chuẩn cho ng&agrave;y tết\" /></strong></p>\r\n<p><strong>C&aacute;ch nhận biết xo&agrave;i c&aacute;t H&ograve;a Lộc</strong></p>\r\n<p>- Khi quả xanh: sẽ c&oacute; đặc điểm nổi bật đ&oacute; l&agrave; vỏ b&ecirc;n ngo&agrave;i c&oacute; m&agrave;u xanh ngọc, tr&ecirc;n đầu quả c&oacute; nhiều đốm đen li ti.</p>\r\n<p>- Khi quả ch&iacute;n: Vỏ b&ecirc;n ngo&agrave;i sẽ chuyển từ xanh ngọc sang m&agrave;u v&agrave;ng chanh rất đẹp mắt, xung quanh phần đầu quả c&oacute; nhiều đốm đen hoặc n&acirc;u như vết kim đ&acirc;m, phần đầu được phủ bởi lớp phấn trắng mỏng.</p>\r\n<p>- Quả xo&agrave;i c&aacute;t H&ograve;a Lộc d&agrave;y, thu&ocirc;n, bụng tr&ograve;n, phần đầu nhọn nhưng vẫn c&oacute; đường cong, phần eo rốn kh&aacute; r&otilde;, cuống tr&ograve;n.</p>\r\n<p>-&nbsp;Xoài Cát Hòa L&ocirc;̣c có n&uacute;m cuống nhỏ hơn. Xo&agrave;i Ho&agrave; Lộc c&oacute; c&aacute;i d&uacute;n c&aacute;ch đu&ocirc;i 1 cm.</p>\r\n<p>- K&iacute;ch thước to, cầm nặng tay, trọng lượng mỗi quả c&oacute; thể l&ecirc;n đến 450 - 600g.</p>\r\n<p>- Thịt quả khi ch&iacute;n dẻo, d&agrave;y, mịn, thơm, ngọt thanh, quả ch&iacute;n ngon hơn rất nhiều khi ăn quả xanh. Thịt quả kh&ocirc;ng bị nhiều xơ như những giống xo&agrave;i kh&aacute;c.</p>\r\n<p>- M&ugrave;i vị đặc trưng,&nbsp;xo&agrave;i c&aacute;t H&ograve;a Lộc người ăn sẽ thấy vị ngọt thanh, dẻo, thơm. Khi cắt th&agrave;nh miếng sẽ thấy m&agrave;u v&agrave;ng ươm, thịt d&agrave;y v&agrave; mịn, kh&ocirc;ng c&oacute; nhiều xơ, ăn dẻo, rất ngọt. M&ugrave;i vị của ch&uacute;ng kh&aacute; đặc biệt, khi ăn thấy sự kh&aacute;c biệt r&otilde; rệt so với nhiều giống xo&agrave;i kh&aacute;c.</p>\r\n<p>-&nbsp;Thời gian thu hoạch: Xoài Cát H&ograve;a Lộc từ khi tr&ocirc;̉ hoa đ&ecirc;́n khi chín trung bình thời gian khoảng 3,5 tháng. Thời vụ thu hoạch/năm từ tháng 3- 5. Ch&iacute;nh v&igrave; vậy bạn h&atilde;y lựa chọn đ&uacute;ng thời điểm thu hoạch để lựa chọn xo&agrave;i nh&eacute;. Tuy nhi&ecirc;n hiện nay do nhu cầu thị trường m&agrave; xo&agrave;i c&aacute;t H&ograve;a Lộc c&oacute; cung cấp quanh năm nhưng chắc chắn v&agrave;o ch&iacute;nh vụ th&igrave; xo&agrave;i sẽ thơm ngon hơn.</p>', 20, '2019-06-19', 'Sản phẩm trái cây mùa hè đến từ organic'),
(7, 2, 7, 1, 'combo', 1, 0, 980000, 4, 10, 10, '<p>sản phẩm mới</p>', 10, '2019-06-19', 'sản phẩm mới');

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
(1, 1, '2019-06-19', 'Thêm', 'Thêm mới'),
(2, 2, '2019-06-19', 'Thêm', 'Thêm mới'),
(3, 3, '2019-06-19', 'Thêm', 'Thêm mới'),
(4, 4, '2019-06-19', 'Thêm', 'Thêm mới'),
(5, 5, '2019-06-19', 'Thêm', 'Thêm mới'),
(6, 6, '2019-06-19', 'Thêm', 'Thêm mới'),
(7, 7, '2019-06-19', 'Thêm', 'Thêm mới');

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
  `LINK` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `PRODUCTID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_image`
--

INSERT INTO `product_image` (`ID`, `LINK`, `PRODUCTID`) VALUES
(19, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F2%2F1560866326865-eon9smmp7cqnp.jpg?alt=media&token=e7228ffb-2e06-48ac-b195-74d6d3d04524', 2),
(20, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F2%2F1560866326868-muc-ong-huu-co-phu-quoc-195x195.png?alt=media&token=41fdf007-871d-4758-b22b-e8f9b5d93cb5', 2),
(21, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F2%2F1560866326868-muc-la-huu-co-phu-quoc-1-195x195.png?alt=media&token=8ebec7ec-7916-493c-a079-e769866bc9d3', 2),
(22, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F2%2F1560866326867-muc_la_master.jpg?alt=media&token=eedbbe1f-a2c9-481e-9414-44d1aeaae265', 2),
(23, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F2%2F1560866326866-kho-muc-loai-2_large.jpg?alt=media&token=c117f62a-9474-4b13-b8ef-d7e3fac41fb2', 2),
(24, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F3%2F1560866764359-5a5f620bee40df432bfac54c.png?alt=media&token=ae50588c-9291-4872-9c02-3f225278561a', 3),
(25, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F3%2F1560866764356-5a5f615dee40df432bfac53b.png?alt=media&token=18c685b4-f119-4437-854c-123906430cef', 3),
(26, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F3%2F1560866764364-vai(2).jpg?alt=media&token=16d1b64d-864a-44e5-8a80-c2761a019d13', 3),
(27, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F3%2F1560866764361-litchi.png?alt=media&token=9347761f-7eb0-41f9-8851-f1c57936598d', 3),
(28, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F3%2F1560866764364-vai(2).jpg?alt=media&token=16d1b64d-864a-44e5-8a80-c2761a019d13', 3),
(29, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F4%2F1560867181673-images.jpg?alt=media&token=db544b6a-ca70-4c13-a188-7d63fdd4878a', 4),
(30, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F4%2F1560867181676-xoai.jpg?alt=media&token=1d2b4555-c7ab-4cd9-b905-b771636c6c5d', 4),
(31, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F4%2F1560867181670-cong-dung-xoai-cat-hoa-loc-5.jpg?alt=media&token=13701b8a-bd32-47a6-9bde-52aabe85e9f2', 4),
(32, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F4%2F1560867181673-mk-xoai-hoa-loc-global-400gr_800x800.png?alt=media&token=276fafd8-2e75-40fe-be80-5fb20564a22d', 4),
(33, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F4%2F1560867181675-su-that-ve-chi-so-gi-cua-thuc-pham-nguoi-dai-thao-duong-nen-biet-d1-1501063304-width600height405.jpg?alt=media&token=e80c568f-fed0-40b7-a25e-1e91acf2611d', 4),
(34, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F5%2F1560867516129-cay_giong_cam_sanh_03.jpg?alt=media&token=9da31aad-611c-4fc6-85ae-59feffa537d7', 5),
(35, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F5%2F1560867516125-cam-sanh.jpg?alt=media&token=1611205e-ba2a-4c12-b3f6-37f4a3014c3a', 5),
(36, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F5%2F1560867516128-cam-sanh-2430483_960_720.jpg?alt=media&token=52a86b01-8624-46c7-9486-0c6dfb4a3c13', 5),
(37, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F5%2F1560867516126-camsanh-6322.jpg?alt=media&token=b351f8a4-8a85-4cb9-afd1-8070f8ce8cbb', 5),
(38, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F5%2F1560867516122-194afc2632e83a633b0c0ef07f1b9d76.jpg?alt=media&token=2aa4f39d-c4bc-4de1-aa8a-5925975cf5d1', 5),
(43, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F6%2F1560868251738-N5005-500x500.jpg?alt=media&token=6ac86169-6417-46f7-b572-46af0f73facd', 6),
(44, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F6%2F1560868251740-nam.jpg?alt=media&token=e41b260f-7b11-4489-93c9-845a149c83b1', 6),
(45, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F6%2F1560868251740-nam-huong.jpg?alt=media&token=b3efbd5e-5322-41e1-b18c-92e78502ec42', 6),
(46, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F6%2F1560868251741-nam-huong-kho-viet-san-goi-250g-201812121505346643.jpg?alt=media&token=bc86254f-fd8a-4200-b36a-a9673662dde3', 6),
(47, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F6%2F1560868251743-Thumbnail.jpg?alt=media&token=40bce306-e5c3-4725-9da1-2cb3acd76235', 6),
(48, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F8%2F1560868574481-221389421-jpeg.jpg?alt=media&token=ebcbe877-8be8-47cb-bed8-10b1438f043f', 8),
(49, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F8%2F1560868574480-45001.jpg?alt=media&token=1ac81d74-685a-4cdc-bdb6-cfdb83c09a98', 8),
(50, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F8%2F1560868574478-9e57609a242a963afcc2e8803b708db8.jpg?alt=media&token=70df8bd2-7d4b-4430-a770-c4a581408ae9', 8),
(51, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F8%2F1560868574483-xuong-ca-hoi-nauy-organic-1.jpg?alt=media&token=fb924fda-36f4-448a-9841-434f2273401b', 8),
(52, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F8%2F1560868574482-xuong-ca-hoi-nauy.jpg?alt=media&token=60b7e55b-dbb7-408e-ad5f-edf6d5a15161', 8),
(53, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F7%2F1560868643100-xuong-ca-hoi-nauy.jpg?alt=media&token=25b5e41c-fa59-4af2-a5be-817889110250', 7),
(54, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F7%2F1560868643100-45001.jpg?alt=media&token=97bfd267-6947-4e69-8123-2bc01647d443', 7),
(55, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F7%2F1560868643100-221389421-jpeg.jpg?alt=media&token=07557fa0-6595-4252-91ea-3492aa028f1a', 7),
(56, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F7%2F1560868643099-9e57609a242a963afcc2e8803b708db8.jpg?alt=media&token=bc32971c-2666-4807-85ed-227d4c245a81', 7),
(57, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F7%2F1560868643101-xuong-ca-hoi-nauy-organic-1.jpg?alt=media&token=1b55de2a-d852-4975-a92e-9fe05594e33d', 7),
(59, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F9%2F1560869620228-2fb2620a2dcf540e125a5ab771e28501.jpg?alt=media&token=7bbef6be-38ff-4434-86bd-711e701f3cdc', 9),
(60, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F9%2F1560869620229-af48ed9d60593de6075eb922c65a7e73.jpg?alt=media&token=9aeb6a1d-9e15-4826-a29f-93987cc366af', 9),
(61, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F9%2F1560869620229-f7b9aec94cb5feeaafa3890e832cc6c2.jpg?alt=media&token=27e08aad-07d8-42f6-9e25-e011af3bf626', 9),
(62, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F9%2F1560869620228-23df563a75fa8f7ebadeea92a9165b95.jpg?alt=media&token=d9d92201-d4f9-4875-9b00-cf89f8fe142f', 9),
(63, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F9%2F1560869620229-b92a6cdb3d781505f2d8805f192ddbfb.jpg?alt=media&token=4198f389-e426-4840-a839-979b97739b3b', 9),
(64, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F10%2F1560870235608-trung_ga_huu_co__2__resize_grande.jpg?alt=media&token=e41a9cee-46b6-4321-b172-249bf0b167a4', 10),
(65, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F10%2F1560870235609-trung_ga_huu_co_resize_grande.jpg?alt=media&token=2bfcf7cb-a0bc-41e8-a946-fd000dd6b823', 10),
(66, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F10%2F1560870235608-trung_ga_huu_co__1__resize_grande.jpg?alt=media&token=0abde4af-79a0-4bbf-9a28-188319d3bd83', 10),
(67, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F10%2F1560870235606-44.jpg?alt=media&token=58f4c871-ceed-442f-9ea9-c0c3c993db87', 10),
(68, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F10%2F1560870235607-444.jpg?alt=media&token=645548ff-def7-467f-ac2e-7270fec710dd', 10),
(69, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F11%2F1560872197738-fff.jpg?alt=media&token=f4a65583-f391-441f-b019-7ec6f5065113', 11),
(70, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F11%2F1560872197739-images%20(1).jpg?alt=media&token=45acfb47-08b0-4800-be22-f01fb704773c', 11),
(71, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F11%2F1560872197740-nac-vai-1.jpg?alt=media&token=fc7af117-4f76-493a-8a57-9697ab35ba59', 11),
(72, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F11%2F1560872197731-6556.jpg?alt=media&token=12dd1fb3-2ce9-48ef-8114-5139a3553924', 11),
(73, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F11%2F1560872197734-akaka_nacvai_500x500.jpg?alt=media&token=c13579d1-f73e-444c-a465-d44b34e34378', 11),
(74, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F12%2F1560873288512-dgdgd%20(2).jpg?alt=media&token=7c3c4500-3378-4915-9320-dd2c7f75879f', 12),
(75, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F12%2F1560873288509-6f026291e848ae7135999c6233c099c9.jpg?alt=media&token=8c7878c1-3fc3-4cf0-bae3-5c24e23766f5', 12),
(76, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F12%2F1560873288511-5833a42ca1b00e9937bd74d788930dc9.jpg?alt=media&token=134fde7d-f7ee-4718-952a-2b5eb7386096', 12),
(77, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F12%2F1560873288512-dgdgd%20(3).jpg?alt=media&token=5a61a9b7-db9e-48a4-9fec-24982ba4f089', 12),
(78, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F12%2F1560873288512-dgdgd%20(1).jpg?alt=media&token=50ed894a-3f43-4537-a21b-ef86568ecfa5', 12),
(79, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F13%2F1560873537807-a1a1__ca-rot.jpg?alt=media&token=6429256a-13f8-452b-b29f-6c1e7738c9c7', 13),
(80, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F13%2F1560873537804-02c77c20-38a4-11e8-8ed4-675bdcb61186.jpg?alt=media&token=0bdf9abe-c1fe-42ca-95bb-c813392b118f', 13),
(81, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F13%2F1560873537807-655934734388.jpg?alt=media&token=d62e90d2-adac-4896-b719-a3583846a31d', 13),
(82, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F13%2F1560873537806-1530-736531538022856-1538022856--400x400.png?alt=media&token=f5d177c2-2056-4cf1-b093-af1c2f2f3ee2', 13),
(83, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F13%2F1560873537805-88f7da1ae192a448e3bebcccd26a97f4.jpg?alt=media&token=1cd70dfb-e7a0-4228-bde0-20eafe5352b2', 13),
(84, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F14%2F1560874075189-sau_rieng_ri6.jpg?alt=media&token=2916bc27-df52-4ee1-9997-4dd28f0414cc', 14),
(85, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F14%2F1560874075188-S_u_rieng_Ri_6_large.png?alt=media&token=14f89a8e-51ec-4538-a663-810708f1cb4d', 14),
(86, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F14%2F1560874075186-0027150_1.jpg?alt=media&token=b2d9cbfc-a434-47eb-a7b4-d89afee974ef', 14),
(87, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F14%2F1560874075188-IMG_4619-800x800.jpg?alt=media&token=682b9618-1589-407a-b2d4-ece55452f099', 14),
(88, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F14%2F1560874075190-Sau-rieng-Ri6-vinfruits.com-2.jpg?alt=media&token=8a2c8303-b395-449b-86a9-ae13a61e9682', 14),
(89, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F15%2F1560874363943-images%20(2)%20-%20Copy.jpg?alt=media&token=8e621d35-450c-41fd-90a7-dbdd46d02bd5', 15),
(90, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F15%2F1560874363941-0120331bo_sap_lam_dong2.jpg?alt=media&token=8f6b3eec-44ef-4958-bd3d-17d15234cdb5', 15),
(91, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F15%2F1560874363942-fruit_vietnam_1497.jpg?alt=media&token=7c9c6fb1-4128-4dad-8d4d-27a166464e86', 15),
(92, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F15%2F1560874363939-0120331bo_sap_lam_dong2%20-%20Copy.jpg?alt=media&token=d46310d6-7da8-4cdc-951d-1484ab1567a1', 15),
(93, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F15%2F1560874363942-21740193_336079293470059_2979623756845115236_n%20-%20Copy.jpg?alt=media&token=2505aaec-1489-4a57-a84f-90936e243488', 15),
(94, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F16%2F1560874647999-9554022432798%20(1).jpg?alt=media&token=3efb0a02-1419-412a-800d-da8f8ec32b63', 16),
(95, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F16%2F1560874648003-gao-huyet-rong.jpg?alt=media&token=29cd43d0-b9c9-4195-a85a-2acfdb76e6f1', 16),
(96, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F16%2F1560874647998-1553571799167_5459235.jpg?alt=media&token=03315c6a-1dc0-4732-b464-60ee9e78180c', 16),
(97, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F16%2F1560874648002-bot-gao-lut-huyet-rong-2.jpg?alt=media&token=a00f1b8d-7f68-48b6-9fae-158d39e81030', 16),
(98, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F16%2F1560874648000-16402154127390.jpg?alt=media&token=6812ea62-64a1-427d-aa78-dbc595677c47', 16),
(99, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F17%2F1560875124228-de_suon_bo_nguyen_xuong_obe_resize_grande.jpg?alt=media&token=015057a2-76d1-4817-8f84-109098c5fb03', 17),
(100, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F17%2F1560875124230-than-lung-bo-obe-huu-co-300g-500x500.jpg?alt=media&token=b46b2c6f-91e0-4dca-b55b-9934de9aef8d', 17),
(101, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F17%2F1560875124229-de-suon-bo-obe-huu-co-300g-500x500.jpg?alt=media&token=2e1a7667-8aba-42b6-960c-28f2d1ec9ed6', 17),
(102, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F17%2F1560875124223-6556.jpg?alt=media&token=0e395c1a-e503-4bd2-92da-5e75707f0187', 17),
(103, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F17%2F1560875124226-de_20suon_20rut_20suong_20bo_20uc.png?alt=media&token=126c2f03-2321-4ca3-8210-5fa3e7afd322', 17),
(104, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F18%2F1560901141340-roka.jpg?alt=media&token=6552b13f-00ba-4838-ab63-805743205db7', 18),
(105, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F18%2F1560901141331-2621-636521550681021-1550681021--400x400.jpg?alt=media&token=9201fddf-baf8-4b35-b999-3ddd87d0cbdc', 18),
(106, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F18%2F1560901141338-arugula-rocket-web.jpg?alt=media&token=5e96ae8a-9b7a-494b-a958-21c904b48c1f', 18),
(107, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F18%2F1560901141327-920x920_master.jpg?alt=media&token=d53bce33-d8fc-4a5b-a6d6-6123e1dd07da', 18),
(108, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F18%2F1560901141335-55148251-bunch-of-arugula-or-rocket-leaves-tied-with-twine-isolated-on-white-background-stock-photo-37f6ff47-849c-48d2-8386-778e80418252.jpg?alt=media&token=649a878d-8827-4d7b-a787-62a739f84c8', 18),
(109, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F19%2F1560901656333-_rawsprout.jpg?alt=media&token=68984b93-083d-4afb-ba1a-29a1abb9d499', 19),
(110, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F19%2F1560901656342-rau-mam-cai-xoong-3.jpg?alt=media&token=a6ea5143-4a5e-4393-bd2c-ff587bdaea65', 19),
(111, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F19%2F1560901656340-hat-giong-cai-mam-da-lat.png?alt=media&token=f22a26d1-604f-4af5-9057-53803346b5e4', 19),
(112, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F19%2F1560901656337-cai-mam-huu-co-500x500.png?alt=media&token=d12531cd-40d9-465c-aa6e-7e99c25a8233', 19),
(113, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F19%2F1560901656343-Rau-mam-rau-muong-1.jpg?alt=media&token=4972e6c2-00b2-4956-80c8-3f4e3a37e1a4', 19),
(114, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F20%2F1560901958985-ca_chua_cherry_ngot.jpg?alt=media&token=8fbf1f9f-f660-4341-9e3e-e4fb8a3a1d30', 20),
(115, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F20%2F1560901958988-vendor-ca-chua-cherry-chum.jpg?alt=media&token=0c1c45a9-9921-48d2-ba30-c7b265d3aeea', 20),
(116, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F20%2F1560901958986-GAPREDCHERRYTOMATO(1).jpg?alt=media&token=e51a54fa-902f-4ade-832a-d1c5f6e0cb44', 20),
(117, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F20%2F1560901958987-trai-ca-chua-cherry-chocolate_large.jpg?alt=media&token=e3e89dd4-db25-4ff7-bc82-a2455988ade2', 20),
(118, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F20%2F1560901958984-ca_chua_bi_cherry_master.jpg?alt=media&token=7796ca55-dfe4-4ac5-a671-2c6c85c52e58', 20),
(119, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F21%2F1560928681451-vendor-ca-chua-cherry-chum.jpg?alt=media&token=6d225a7d-36e6-4323-ab73-fbade910b13a', 21),
(120, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F21%2F1560928681439-5a5f615dee40df432bfac53b.png?alt=media&token=c741a574-1bab-4b47-b7d9-1c02eb6d42d5', 21),
(121, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F21%2F1560928681442-5a5f620bee40df432bfac54c.png?alt=media&token=61000899-bb39-451c-ac73-63d90ba6f343', 21),
(122, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F21%2F1560928681450-vai(2).jpg?alt=media&token=e24c8782-9203-45fe-a90d-4df7cb754d8b', 21),
(123, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F21%2F1560928681445-litchi.png?alt=media&token=3c7227f2-3649-427c-8713-d6b4b870305c', 21),
(129, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F1%2F1560928956305-images%20(2).jpg?alt=media&token=6031ea0b-a884-4b2c-9039-2707bd87ae2c', 1),
(130, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F1%2F1560928956305-images%20(2)%20-%20Copy.jpg?alt=media&token=6e04457b-e015-4ecf-896f-ffec8995bddd', 1),
(131, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F1%2F1560928956304-bo-huu-co-500x500.jpg?alt=media&token=5d21f226-4bdb-406c-b699-8e6328c54372', 1),
(132, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F1%2F1560928956303-bo_sap_dak_lak.png?alt=media&token=c49e8794-bf1b-4aec-a57f-f16e5b6fb6cc', 1),
(133, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F1%2F1560928956307-qua_bo_reed%20(1).png?alt=media&token=afd6ee1f-7b1c-400e-ba5d-fd6de8259814', 1),
(134, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F22%2F1560930217712-images%20(2)%20-%20Copy.jpg?alt=media&token=81162742-4937-44e6-afe4-e491316ab45d', 22),
(135, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F22%2F1560930217715-t%E1%BA%A3i%20xu%E1%BB%91ng.jpg?alt=media&token=ab5de715-90b3-4db2-9e0b-93f263695f5f', 22),
(136, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F22%2F1560930217714-qua-bo.jpg?alt=media&token=ac2b5184-f83f-4c31-82a4-cb3a730589e2', 22),
(137, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F22%2F1560930217711-0120331bo_sap_lam_dong2%20-%20Copy.jpg?alt=media&token=bfc6fa4d-796d-405e-85db-11620db30cbd', 22),
(138, 'https://firebasestorage.googleapis.com/v0/b/oderfood-cf526.appspot.com/o/ProductImages%2F22%2F1560930217713-qua_bo_reed.png?alt=media&token=61530d17-4348-46e1-880e-cf614ccdc458', 22);

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
(1, 1, '2019-06-18', 'Thêm', 'Thêm mới'),
(2, 2, '2019-06-18', 'Thêm', 'Thêm mới'),
(3, 3, '2019-06-18', 'Thêm', 'Thêm mới'),
(4, 4, '2019-06-18', 'Thêm', 'Thêm mới'),
(5, 5, '2019-06-18', 'Thêm', 'Thêm mới'),
(6, 6, '2019-06-18', 'Thêm', 'Thêm mới'),
(7, 7, '2019-06-18', 'Thêm', 'Thêm mới'),
(8, 8, '2019-06-18', 'Thêm', 'Thêm mới'),
(9, 7, '2019-06-18', 'Cập nhật', 'Cập nhật thông tin'),
(10, 9, '2019-06-18', 'Thêm', 'Thêm mới'),
(11, 7, '2019-06-18', 'Cập nhật', 'Cập nhật thông tin'),
(12, 8, '2019-06-18', 'Cập nhật', 'Cập nhật thông tin'),
(13, 10, '2019-06-18', 'Thêm', 'Thêm mới'),
(14, 2, '2019-06-18', 'Cập nhật', 'Cập nhật thông tin'),
(15, 11, '2019-06-18', 'Thêm', 'Thêm mới'),
(16, 12, '2019-06-18', 'Thêm', 'Thêm mới'),
(17, 13, '2019-06-18', 'Thêm', 'Thêm mới'),
(18, 14, '2019-06-18', 'Thêm', 'Thêm mới'),
(19, 15, '2019-06-18', 'Thêm', 'Thêm mới'),
(20, 16, '2019-06-18', 'Thêm', 'Thêm mới'),
(21, 17, '2019-06-18', 'Thêm', 'Thêm mới'),
(22, 18, '2019-06-19', 'Thêm', 'Thêm mới'),
(23, 19, '2019-06-19', 'Thêm', 'Thêm mới'),
(24, 20, '2019-06-19', 'Thêm', 'Thêm mới'),
(25, 1, '2019-06-19', 'Cập nhật', 'Cập nhật thông tin'),
(26, 17, '2019-06-19', 'Cập nhật', 'Cập nhật thông tin'),
(27, 11, '2019-06-19', 'Cập nhật', 'Cập nhật thông tin'),
(28, 7, '2019-06-19', 'Cập nhật', 'Cập nhật thông tin'),
(29, 21, '2019-06-19', 'Thêm', 'Thêm mới'),
(30, 22, '2019-06-19', 'Thêm', 'Thêm mới');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_tag`
--

CREATE TABLE `product_tag` (
  `PRODUCTID` int(11) NOT NULL,
  `TAGID` int(11) NOT NULL
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
-- Cấu trúc bảng cho bảng `session_cart`
--

CREATE TABLE `session_cart` (
  `ID` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `PRODUCT_ID` int(11) NOT NULL,
  `PRODUCT_COMBO_ID` int(11) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `IS_LOGIN` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `session_cart`
--

INSERT INTO `session_cart` (`ID`, `PRODUCT_ID`, `PRODUCT_COMBO_ID`, `QUANTITY`, `IS_LOGIN`) VALUES
('XSErzhfLW', 6, 0, 1, 0),
('XSErzhfLW', 11, 0, 2, 0);

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
(1, 1, 'Thịt bò'),
(2, 1, 'Thịt heo'),
(3, 1, 'thịt gia cầm -  trứng'),
(4, 2, 'Dầu ăn hữu cơ'),
(5, 2, 'Các loại gia vị'),
(6, 2, 'Giấm hữu cơ'),
(7, 2, 'Nước chấm'),
(8, 2, 'Bơ - Pho mát'),
(9, 3, 'Mực'),
(10, 3, 'Cá'),
(11, 3, 'Tôm - Cua'),
(12, 3, 'Thủy - hải sản khác'),
(13, 4, 'Trái cây việt'),
(14, 4, 'Trái cây nhập khẩu'),
(15, 4, 'Trái cây khô'),
(16, 5, 'Nấm - Rau mầm'),
(17, 5, 'Rau hữu cơ'),
(18, 5, 'Củ - quả hữu cơ'),
(19, 5, 'Rau gia vị'),
(20, 6, 'Gạo hữu cơ'),
(21, 6, 'ngũ cốc hữu cơ'),
(22, 6, 'Đồ khô khác'),
(23, 6, 'Các loại hạt hữu cơ');

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
(1, 'Bưởi'),
(2, 'Giá rẻ'),
(3, 'Các món ngon'),
(4, 'các món dinh dưỡng'),
(5, 'từ organic'),
(6, 'Tin công nghệ'),
(7, '4.0'),
(8, 'Gà'),
(9, 'Organic'),
(10, 'Mùa hè'),
(11, 'mẹo vặt'),
(12, 'mẹo hay'),
(13, 'Mẹo từ bưởi'),
(14, 'Món ăn'),
(15, 'Cá'),
(16, 'Tin tức'),
(17, 'Nông sản'),
(18, 'organic');

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
ALTER TABLE `brand` ADD FULLTEXT KEY `NAME` (`NAME`);

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
ALTER TABLE `category` ADD FULLTEXT KEY `NAME` (`NAME`);

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
ALTER TABLE `customer` ADD FULLTEXT KEY `FULLNAME` (`FULLNAME`);

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
ALTER TABLE `news` ADD FULLTEXT KEY `TITLE` (`TITLE`,`SHORTCONTENT`);

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
-- Chỉ mục cho bảng `news_views`
--
ALTER TABLE `news_views`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_news_view` (`IDNEWS`);

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
-- Chỉ mục cho bảng `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_product_category` (`CATEGORYID`),
  ADD KEY `FK_product_sub_category` (`SUBCATEGORYID`),
  ADD KEY `FK_product_brand` (`BRANDID`);
ALTER TABLE `product` ADD FULLTEXT KEY `NAME` (`NAME`);

--
-- Chỉ mục cho bảng `product_combo`
--
ALTER TABLE `product_combo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_product_combo_product1` (`PRODUCTID1`),
  ADD KEY `FK_product_combo_product2` (`PRODUCTID2`),
  ADD KEY `FK_product_combo_product3` (`PRODUCTID3`);
ALTER TABLE `product_combo` ADD FULLTEXT KEY `NAME` (`NAME`);

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
ALTER TABLE `sub_category` ADD FULLTEXT KEY `NAME` (`NAME`);

--
-- Chỉ mục cho bảng `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`ID`);
ALTER TABLE `tag` ADD FULLTEXT KEY `NAME` (`NAME`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `brand`
--
ALTER TABLE `brand`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `customer`
--
ALTER TABLE `customer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `customer_type`
--
ALTER TABLE `customer_type`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `customer_view`
--
ALTER TABLE `customer_view`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `feature`
--
ALTER TABLE `feature`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `news_image`
--
ALTER TABLE `news_image`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `news_info_history`
--
ALTER TABLE `news_info_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `news_views`
--
ALTER TABLE `news_views`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `order_info`
--
ALTER TABLE `order_info`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `order_status`
--
ALTER TABLE `order_status`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `product_combo`
--
ALTER TABLE `product_combo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `product_combo_info_history`
--
ALTER TABLE `product_combo_info_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `product_image`
--
ALTER TABLE `product_image`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT cho bảng `product_info_history`
--
ALTER TABLE `product_info_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `search_history`
--
ALTER TABLE `search_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `tag`
--
ALTER TABLE `tag`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `FK_cart_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_cart_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_comment_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_comment_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `comment_reaction`
--
ALTER TABLE `comment_reaction`
  ADD CONSTRAINT `FK_comment_reaction_comment` FOREIGN KEY (`COMMENTID`) REFERENCES `comment` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_comment_reaction_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `FK_customer_customer_type` FOREIGN KEY (`CUSTOMERTYPEID`) REFERENCES `customer_type` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `customer_view`
--
ALTER TABLE `customer_view`
  ADD CONSTRAINT `FK_customer_view_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `news_image`
--
ALTER TABLE `news_image`
  ADD CONSTRAINT `FK_news_image_news` FOREIGN KEY (`NEWSID`) REFERENCES `news` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `news_info_history`
--
ALTER TABLE `news_info_history`
  ADD CONSTRAINT `FK_news_info_history_news` FOREIGN KEY (`NEWSID`) REFERENCES `news` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `news_views`
--
ALTER TABLE `news_views`
  ADD CONSTRAINT `FK_news_view` FOREIGN KEY (`IDNEWS`) REFERENCES `news` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `FK_order_detail_order_info` FOREIGN KEY (`ORDERINFOID`) REFERENCES `order_info` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_order_detail_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `order_info`
--
ALTER TABLE `order_info`
  ADD CONSTRAINT `FK_order_info_customer` FOREIGN KEY (`CUSTOMERID`) REFERENCES `customer` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_product_brand` FOREIGN KEY (`BRANDID`) REFERENCES `brand` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_category` FOREIGN KEY (`CATEGORYID`) REFERENCES `category` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_sub_category` FOREIGN KEY (`SUBCATEGORYID`) REFERENCES `sub_category` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_combo`
--
ALTER TABLE `product_combo`
  ADD CONSTRAINT `FK_product_combo_product1` FOREIGN KEY (`PRODUCTID1`) REFERENCES `product` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_combo_product2` FOREIGN KEY (`PRODUCTID2`) REFERENCES `product` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_combo_product3` FOREIGN KEY (`PRODUCTID3`) REFERENCES `product` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_combo_info_history`
--
ALTER TABLE `product_combo_info_history`
  ADD CONSTRAINT `FK_product_combo_info_history_product_combo` FOREIGN KEY (`PRODUCTCOMBOID`) REFERENCES `product_combo` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_feature`
--
ALTER TABLE `product_feature`
  ADD CONSTRAINT `FK_product_feature_feature` FOREIGN KEY (`FEATUREID`) REFERENCES `feature` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_feature_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `FK_product_image_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_info_history`
--
ALTER TABLE `product_info_history`
  ADD CONSTRAINT `FK_product_info_history_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_tag`
--
ALTER TABLE `product_tag`
  ADD CONSTRAINT `FK_product_tag_product` FOREIGN KEY (`PRODUCTID`) REFERENCES `product` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_product_tag_tag` FOREIGN KEY (`TAGID`) REFERENCES `tag` (`ID`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `FK_sub_category_category` FOREIGN KEY (`CATEGORYID`) REFERENCES `category` (`ID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
