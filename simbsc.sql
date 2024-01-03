-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 01, 2024 lúc 11:31 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `simbsc`
--

DROP DATABASE IF EXISTS `simbsc`;
CREATE DATABASE `simbsc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `simbsc`;

DELIMITER $$
--
-- Thủ tục
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_by_id` (IN `StudentId` INT(11))   SELECT
    members.student_id,
    members.student_name,
    members.email,
    members.join_date,
    members.state,
    CONCAT('[', GROUP_CONCAT('"', role.role, '"'), ']') AS permission
FROM
    members RIGHT OUTER JOIN role ON members.student_id = role.student_id
WHERE
	members.student_id = StudentId
GROUP BY
    members.student_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `search_user` (IN `user_input` TEXT)   SELECT
    members.student_id,
    members.student_name,
    members.state,
    CONCAT('[', GROUP_CONCAT('"', role.role, '"'), ']') AS permission
FROM
    members RIGHT OUTER JOIN role ON members.student_id = role.student_id
WHERE
    ((CAST(members.student_id AS CHAR) LIKE CONCAT('%', user_input, '%')) OR
    (user_input NOT REGEXP '^[0-9]+$' AND members.student_name LIKE CONCAT('%', user_input, '%')))
GROUP BY
    members.student_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `view_users_list` ()   SELECT
    members.student_id,
    members.student_name,
    members.state,
    CONCAT('[', GROUP_CONCAT('"', role.role, '"'), ']') AS permission
FROM
    members RIGHT OUTER JOIN role ON members.student_id = role.student_id
GROUP BY
    members.student_id$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `documents`
--

CREATE TABLE `documents` (
  `document_id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_name` varchar(256) NOT NULL,
  `type` varchar(256) NOT NULL,
  `author` varchar(256) NOT NULL,
  `publisher` varchar(512) NOT NULL,
  `publish_year` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `image_url` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`document_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `documents`
--

INSERT INTO `documents` (`document_id`, `doc_name`, `type`, `author`, `publisher`, `publish_year`, `quantity`, `description`, `image_url`) VALUES
(1, 'Kiến trúc máy tính', 'Sách cơ sở ngành', 'Phạm Quốc Cường', 'NXB Đại học Quốc gia TPHCM', 2019, 1, 'Kiến trúc máy tính cũng là một trong các môn cơ sở ngành quan trọng, môn học đề cập tới cơ sở về kiến trúc tập lệnh và tổ chức của máy tính, các vấn đề cơ bản trong thiết kế máy tính. Ngoài ra các bạn còn được học cơ bản về ngôn ngữ lập trình gần gũi nhất với máy tính đó là Assembly (cụ thể là MIPS).', 'https://th.bing.com/th/id/R.6148bed16bbd11ac1a9fda2f8a324cd8?rik=6e%2bvwUG3bgHXOg&riu=http%3a%2f%2fwww.bgt.hcmut.edu.vn%2fimages%2fstories%2fvirtuemart%2fproduct%2fkien-truc-may-tinh.jpg&ehk=X%2bCyOmYr3%2fbV4AJwh7%2fEqhYABBdxGrYMhjYjC7t7dPI%3d&risl=&pid=ImgRaw&r=0'),
(2, 'Ngày cuối cùng của một tử tù', 'Sách văn học', 'Victor Hugo', 'NXB Văn học', 2000, 5, '\"Ngày Cuối Cùng Của Một Tử Tù\" là cuốn sách khá thành công đến từ ngòi bút của nhà văn Victor Hugo. Ông là người có sức ảnh hưởng to lớn đối với nền văn học Pháp nói riêng và văn học thế giới nói chung.', 'https://sach86.com/wp-content/uploads/2021/11/Ngay-Cuoi-Cung-Cua-Mot-Tu-Tu.jpg'),
(3, 'Cấu trúc dữ liệu và giải thuật', 'Sách cơ sở ngành', 'Nguyễn Trung Trực', 'NXB Đại học Quốc gia TPHCM', 2019, 1, 'Quyển sách Cấu trúc dữ liệu và Giải thuật trình bày cấu trúc dữ liệu tuyến tính (mảng, danh sách liên kết) và cấu trúc dữ liệu phi tuyến (cây, đồ thị) và các giải thuật của các cấu trúc dữ liệu này. Các cấu trúc dữ liệu và giải thuật được trình bày theo kiểu lập trình có cấu trúc (structured programming) (minh họa bằng ngôn ngữ lập trình C++) và theo kiểu lập trình hướng đối tượng (object-oriented programming) (minh họa bằng ngôn ngữ lập trình C#). Các phần phụ lục là các chương trình được viết theo kiểu lập trình tổng quát (generic programming). Quyển sách này bao gồm 12 chương và 9 phụ lục.', 'https://lh3.googleusercontent.com/pw/ACtC-3fMzvqEVNMukfA8PA3KVxvfUWOBWImHMbiERBQcV3Io0HQvE4jxhlorn6udriwihN_ZbdXw-t8SCouZe_5aX-s_W9HiRQcidVf_aS1szGyvgGSkZMrMjaf4ZJ9v4Rl8YnTRU9YncgSqShlrjaIZowFnRg=w384-h576-no?authuser=0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `members`
--

CREATE TABLE `members` (
  `student_id` int(11) NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `email` varchar(127) NOT NULL,
  `password` varchar(127) NOT NULL,
  `avatar_url` varchar(512) DEFAULT NULL,
  `state` varchar(127) NOT NULL,
  `join_date` date NOT NULL DEFAULT current_timestamp(),
  `permission` varchar(255) NOT NULL,
  PRIMARY KEY (`student_id`),
  KEY `student_id` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `members`
--

INSERT INTO `members` (`student_id`, `student_name`, `email`, `password`, `avatar_url`, `state`, `join_date`, `permission`) VALUES
(2000000, 'Admin 1', 'admin1@gmail.com', '$2b$10$UpVm2Pt389EY0anjTZAwIulqMNBSo3Wmqk8inN47l9ABQyk5XfWKK', 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Đang hoạt động', '2023-11-14', 'Thành viên ban chủ nhiệm'),
(2000001, 'Admin 2', 'admin2@gmail.com', '$2b$10$ExtohTHcom1BvBpujafeQet/o8rMJNppbF4xQ8J8MbLE9eE3oilJO', 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Đang hoạt động', '2023-11-14', 'Thành viên ban chủ nhiệm'),
(2000002, 'Collab 1', 'collab1@gmail.com', '$2b$10$E30b5YunGc0lJ1G7D/PrZenQXV.oeiHuNaCH2T/QLB6eX3J2DCLFe', 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Đang hoạt động', '2023-11-15', 'Cộng tác viên'),
(2000003, 'Media 1', 'media1@gmail.com', '$2b$10$moDAhs42MpTxRNkxayBSOOe2z959mhTzD.RP6PQMTkFH0Uc1uA2rS', 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Đang hoạt động', '2023-11-15', 'Thành viên ban truyền thông'),
(2000004, 'Content 1', 'content1@gmail.com', '$2b$10$K.arbzneeymcCNZTFfqObOrHfNSTXGsWHPIgR9WtC1YVCcSEKnpcu', 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Đang hoạt động', '2023-11-15', 'Thành viên ban nội dung'),
(2000005, 'Logistic 1', 'logistic1@gmail.com', '$2b$10$nzR46CJ934k6zhXr0y.Pne7frXTbAAXIkgYeFkjNlZIio3okbtEd6', 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Đang hoạt động', '2023-11-15', 'Thành viên ban hậu cần'),
(2000006, 'Collab 2', 'collab2@gmail.com', '$2b$10$E30b5YunGc0lJ1G7D/PrZenQXV.oeiHuNaCH2T/QLB6eX3J2DCLFe', 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Đã bị khóa', '2023-11-15', 'Cộng tác viên'),
(2000007, 'Collab 3', 'collab3@gmail.com', '$2b$10$E30b5YunGc0lJ1G7D/PrZenQXV.oeiHuNaCH2T/QLB6eX3J2DCLFe', 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'Đã bị khóa', '2023-11-15', 'Cộng tác viên');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `brief` text NOT NULL,
  `content` text NOT NULL,
  `create_date` date NOT NULL,
  `last_change` date DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`post_id`, `student_id`, `title`, `brief`, `content`, `create_date`, `last_change`) VALUES
(1, 2000000, 'Tổ chức sự kiện ra mắt website chính thức của SIMBSC', 'Tổ chức sự kiện ra mắt website chính thức của SIMBSC. Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho in ấn. ', 'Lorem Ipsum là gì?\r\nLorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để tạo thành một bản mẫu văn bản. Đoạn văn bản này không những đã tồn tại năm thế kỉ, mà khi được áp dụng vào tin học văn phòng, nội dung của nó vẫn không hề bị thay đổi. Nó đã được phổ biến trong những năm 1960 nhờ việc bán những bản giấy Letraset in những đoạn Lorem Ipsum, và gần đây hơn, được sử dụng trong các ứng dụng dàn trang, như Aldus PageMaker.\r\n\r\nTại sao lại sử dụng nó?\r\nChúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa dễ gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản. Lorem Ipsum có ưu điểm hơn so với đoạn văn bản chỉ gồm nội dung kiểu \"Nội dung, nội dung, nội dung\" là nó khiến văn bản giống thật hơn, bình thường hơn. Nhiều phần mềm thiết kế giao diện web và dàn trang ngày nay đã sử dụng Lorem Ipsum làm đoạn văn bản giả, và nếu bạn thử tìm các đoạn \"Lorem ipsum\" trên mạng thì sẽ khám phá ra nhiều trang web hiện vẫn đang trong quá trình xây dựng. Có nhiều phiên bản khác nhau đã xuất hiện, đôi khi do vô tình, nhiều khi do cố ý (xen thêm vào những câu hài hước hay thông tục).\r\n\r\n\r\nNó đến từ đâu?\r\nTrái với quan điểm chung của số đông, Lorem Ipsum không phải chỉ là một đoạn văn bản ngẫu nhiên. Người ta tìm thấy nguồn gốc của nó từ những tác phẩm văn học la-tinh cổ điển xuất hiện từ năm 45 trước Công Nguyên, nghĩa là nó đã có khoảng hơn 2000 tuổi. Một giáo sư của trường Hampden-Sydney College (bang Virginia - Mỹ) quan tâm tới một trong những từ la-tinh khó hiểu nhất, \"consectetur\", trích từ một đoạn của Lorem Ipsum, và đã nghiên cứu tất cả các ứng dụng của từ này trong văn học cổ điển, để từ đó tìm ra nguồn gốc không thể chối cãi của Lorem Ipsum. Thật ra, nó được tìm thấy trong các đoạn 1.10.32 và 1.10.33 của \"De Finibus Bonorum et Malorum\" (Đỉnh tối thượng của Cái Tốt và Cái Xấu) viết bởi Cicero vào năm 45 trước Công Nguyên. Cuốn sách này là một luận thuyết đạo lí rất phổ biến trong thời kì Phục Hưng. Dòng đầu tiên của Lorem Ipsum, \"Lorem ipsum dolor sit amet...\" được trích từ một câu trong đoạn thứ 1.10.32.', '2023-12-11', NULL),
(2, 2000001, 'Sự kiện quyên góp sách ngày 13/11/2023', 'Sự kiện quyên góp sách ngày 13/11/2023. Trích đoạn chuẩn của Lorem Ipsum được sử dụng từ thế kỉ thứ 16 và được tái bản sau đó cho những người quan tâm đến nó.', 'Trái với quan điểm chung của số đông, Lorem Ipsum không phải chỉ là một đoạn văn bản ngẫu nhiên. Người ta tìm thấy nguồn gốc của nó từ những tác phẩm văn học la-tinh cổ điển xuất hiện từ năm 45 trước Công Nguyên, nghĩa là nó đã có khoảng hơn 2000 tuổi. Một giáo sư của trường Hampden-Sydney College (bang Virginia - Mỹ) quan tâm tới một trong những từ la-tinh khó hiểu nhất, \"consectetur\", trích từ một đoạn của Lorem Ipsum, và đã nghiên cứu tất cả các ứng dụng của từ này trong văn học cổ điển, để từ đó tìm ra nguồn gốc không thể chối cãi của Lorem Ipsum. Thật ra, nó được tìm thấy trong các đoạn 1.10.32 và 1.10.33 của \"De Finibus Bonorum et Malorum\" (Đỉnh tối thượng của Cái Tốt và Cái Xấu) viết bởi Cicero vào năm 45 trước Công Nguyên. Cuốn sách này là một luận thuyết đạo lí rất phổ biến trong thời kì Phục Hưng. Dòng đầu tiên của Lorem Ipsum, \"Lorem ipsum dolor sit amet...\" được trích từ một câu trong đoạn thứ 1.10.32.', '2023-12-08', NULL),
(3, 2000000, 'Tổ chức họp mặt cuối năm của SIMBSC', 'Tổ chức họp mặt cuối năm của SIMBSC. Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa dễ gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản.', 'Tại sao lại sử dụng nó?\r\nChúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa dễ gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản. Lorem Ipsum có ưu điểm hơn so với đoạn văn bản chỉ gồm nội dung kiểu \"Nội dung, nội dung, nội dung\" là nó khiến văn bản giống thật hơn, bình thường hơn. Nhiều phần mềm thiết kế giao diện web và dàn trang ngày nay đã sử dụng Lorem Ipsum làm đoạn văn bản giả, và nếu bạn thử tìm các đoạn \"Lorem ipsum\" trên mạng thì sẽ khám phá ra nhiều trang web hiện vẫn đang trong quá trình xây dựng. Có nhiều phiên bản khác nhau đã xuất hiện, đôi khi do vô tình, nhiều khi do cố ý (xen thêm vào những câu hài hước hay thông tục)', '2023-12-10', '2023-12-11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post_comments`
--

CREATE TABLE `post_comments` (
  `cmt_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `last_change` date NOT NULL,
  PRIMARY KEY (`cmt_id`),
  KEY `post_comments_ibfk_1` (`student_id`),
  KEY `post_comments_ibfk_2` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `post_comments`
--

INSERT INTO `post_comments` (`cmt_id`, `post_id`, `student_id`, `content`, `last_change`) VALUES
(1, 1, 2000002, '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"', '2023-12-11'),
(2, 1, 2000002, 'Trích đoạn chuẩn của Lorem Ipsum được sử dụng từ thế kỉ thứ 16 và được tái bản sau đó cho những người quan tâm đến nó. Đoạn 1.10.32 và 1.10.33 trong cuốn \"De Finibus Bonorum et Malorum\" của Cicero cũng được tái bản lại theo đúng cấu trúc gốc, kèm theo phiên bản tiếng Anh được dịch bởi H. Rackham vào năm 1914.\r\n\r\n', '2023-12-10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `requestborrow`
--

CREATE TABLE `requestborrow` (
  `student_id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `request_day` date NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `update_date` date DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `received_day` date DEFAULT NULL,
  `returned_day` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `requestborrow`
--

INSERT INTO `requestborrow` (`student_id`, `document_id`, `request_day`, `status`, `update_date`, `id`, `received_day`, `returned_day`) VALUES
(2000002, 1, '2023-12-05', 0, NULL, 6, NULL, NULL),
(2000002, 5, '2023-12-01', 0, NULL, 7, NULL, NULL),
(2000002, 3, '2023-12-01', 0, NULL, 8, NULL, NULL),
(2000006, 9, '2023-12-01', 0, NULL, 9, NULL, NULL),
(2000007, 6, '2023-12-01', 0, NULL, 10, NULL, NULL),
(2000007, 3, '2023-12-01', 0, NULL, 11, NULL, NULL),
(2000002, 1, 'NULL', 4, NULL, 12, '2023-12-12', NULL),
(2000002, 3, 'NULL', 5, NULL, 13, '2023-12-10', NULL),
(2000006, 1, '2023-12-17', 6, NULL, 14, '2023-12-11', NULL),
(2000007, 3, '2023-12-18', 7, NULL, 15, '2023-12-10', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(1024) NOT NULL,
  `book_name` varchar(2048) NOT NULL,
  `book_author` varchar(2048) NOT NULL,
  `summary` varchar(10000) NOT NULL,
  `content` mediumtext NOT NULL,
  `image_url` varchar(512) DEFAULT NULL,
  `submit_date` date NOT NULL,
  `status` varchar(128) NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `student_id` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`review_id`, `title`, `book_name`, `book_author`, `summary`, `content`, `image_url`, `submit_date`, `status`, `student_id`) VALUES
(1, 'Cấu trúc dữ liệu và giải thuật - Kiến thức nền cho ngành KHMT', 'Cấu trúc dữ liệu và giải thuật', 'Nguyễn Trung Trực', 'Đây là tóm tắt bài review (tối đa 10000 kí tự)', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc non blandit massa enim. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Sit amet consectetur adipiscing elit duis tristique sollicitudin. Ornare quam viverra orci sagittis eu. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Ultrices dui sapien eget mi proin. Cursus in hac habitasse platea. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Diam vel quam elementum pulvinar etiam non.\\n\nUt tellus elementum sagittis vitae et. Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget. Nullam ac tortor vitae purus faucibus ornare. Dui ut ornare lectus sit amet. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Sagittis vitae et leo duis ut. Enim sed faucibus turpis in. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. At consectetur lorem donec massa sapien faucibus et molestie. Egestas maecenas pharetra convallis posuere. Interdum posuere lorem ipsum dolor.\\n\nQuam quisque id diam vel quam elementum pulvinar etiam non. Sed blandit libero volutpat sed. Aliquet enim tortor at auctor. Eu lobortis elementum nibh tellus molestie nunc. Leo in vitae turpis massa sed elementum tempus. Vitae justo eget magna fermentum iaculis eu non. Malesuada fames ac turpis egestas sed tempus urna et. In massa tempor nec feugiat nisl pretium fusce id. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Tristique senectus et netus et malesuada fames ac turpis egestas. Risus nullam eget felis eget nunc lobortis. Tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius. Cras sed felis eget velit aliquet sagittis.\\n\nEget duis at tellus at urna. Cras adipiscing enim eu turpis. A diam maecenas sed enim ut sem viverra aliquet. Enim neque volutpat ac tincidunt. Semper viverra nam libero justo laoreet sit amet cursus sit. Nulla aliquet porttitor lacus luctus accumsan. Potenti nullam ac tortor vitae purus faucibus. Eget mauris pharetra et ultrices neque ornare. Orci sagittis eu volutpat odio. Massa massa ultricies mi quis hendrerit dolor. Pellentesque id nibh tortor id aliquet. Lacus sed turpis tincidunt id aliquet. Justo eget magna fermentum iaculis. Vestibulum rhoncus est pellentesque elit ullamcorper. Lorem sed risus ultricies tristique. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. In ante metus dictum at tempor commodo ullamcorper.\\n\nAmet consectetur adipiscing elit duis tristique sollicitudin. Odio ut sem nulla pharetra. Varius vel pharetra vel turpis nunc eget lorem dolor. Ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin. Aliquam nulla facilisi cras fermentum odio eu. Egestas sed tempus urna et pharetra pharetra massa. Blandit massa enim nec dui nunc mattis enim. Faucibus nisl tincidunt eget nullam non nisi est. Vulputate dignissim suspendisse in est ante in. Arcu non odio euismod lacinia at quis. Arcu cursus euismod quis viverra. Ullamcorper malesuada proin libero nunc.', 'https://lh3.googleusercontent.com/pw/ACtC-3fMzvqEVNMukfA8PA3KVxvfUWOBWImHMbiERBQcV3Io0HQvE4jxhlorn6udriwihN_ZbdXw-t8SCouZe_5aX-s_W9HiRQcidVf_aS1szGyvgGSkZMrMjaf4ZJ9v4Rl8YnTRU9YncgSqShlrjaIZowFnRg=w384-h576-no?authuser=0', '2023-11-01', 'Chấp nhận', 2000002),
(2, 'Kiến trúc máy tính - Kiến thức nền cho ngành KHMT', 'Kiến trúc máy tính', 'Phạm Quốc Cường', 'Đây là tóm tắt bài review (tối đa 10000 kí tự)', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc non blandit massa enim. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Sit amet consectetur adipiscing elit duis tristique sollicitudin. Ornare quam viverra orci sagittis eu. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Ultrices dui sapien eget mi proin. Cursus in hac habitasse platea. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Diam vel quam elementum pulvinar etiam non.\r\n\r\nUt tellus elementum sagittis vitae et. Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget. Nullam ac tortor vitae purus faucibus ornare. Dui ut ornare lectus sit amet. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Sagittis vitae et leo duis ut. Enim sed faucibus turpis in. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. At consectetur lorem donec massa sapien faucibus et molestie. Egestas maecenas pharetra convallis posuere. Interdum posuere lorem ipsum dolor.', 'https://th.bing.com/th/id/R.6148bed16bbd11ac1a9fda2f8a324cd8?rik=6e%2bvwUG3bgHXOg&riu=http%3a%2f%2fwww.bgt.hcmut.edu.vn%2fimages%2fstories%2fvirtuemart%2fproduct%2fkien-truc-may-tinh.jpg&ehk=X%2bCyOmYr3%2fbV4AJwh7%2fEqhYABBdxGrYMhjYjC7t7dPI%3d&risl=&pid=ImgRaw&r=0', '2023-11-02', 'Chấp nhận', 2000003),
(3, 'Ngày cuối cùng của một tử tù và lòng nhân đạo của Victor Hugo', 'Ngày cuối cùng của một tử tù', 'Victor Hugo', 'Ra đời vào năm 1829, không được đồ sộ cả về dung lượng lẫn hệ thống các sự kiện, nhân vật như những Thằng gù nhà thờ Đức bà Paris hay Những người khốn khổ song Ngày cuối cùng của một tử tù vẫn là tác phẩm hết sức tiêu biểu cho phong cách sáng tác và đặc biệt là tinh thần nhân đạo của nhà văn vĩ đại người Pháp Victor Hugo.', 'Ngày cuối cùng của một tử tù, tựa sách đã hé lộ phần nào nội dung tác phẩm: đây là câu chuyện kể về ngày cuối cùng trước khi bị mang lên máy chém của một phạm nhân khoảng bốn mươi tuổi. Trong thời gian đầu, người tử tù bị giam ở nhà ngục Bicetre. Tại đây, ông đã ghi lại tất cả những gì diễn ra trong hơn năm tuần ông bị giam giữ. Sau đó, ông được chuyển đến nhà ngục la Conciergerie và cuối cùng là từ nhà ngục Conciergerie trước khi tới đoạn đầu đài. Cuốn tiểu thuyết chỉ hơn 100 trang với nội dung gói gọn trọn một ngày nhưng đã chất chứa sức nặng vô hình trong giá trị nội dung lẫn giá trị tư tưởng mà Victor Hugo gửi gắm vào từng câu, từng chữ.', 'https://reviewsach.net/wp-content/uploads/2020/04/Ng%C3%A0y-cu%E1%BB%91i-c%C3%B9ng-c%E1%BB%A7a-m%E1%BB%99t-t%E1%BB%AD-t%C3%B9.jpg', '2023-11-11', 'Chấp nhận', 2000003);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews_comments`
--

CREATE TABLE `reviews_comments` (
  `cmt_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `review_id` int(11) NOT NULL,
  `cmt_content` varchar(10000) NOT NULL,
  `cmt_datetime` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cmt_id`),
  KEY `student_id_FK` (`student_id`),
  KEY `review_id_FK` (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews_comments`
--

INSERT INTO `reviews_comments` (`cmt_id`, `student_id`, `review_id`, `cmt_content`, `cmt_datetime`) VALUES
(1, 2000000, 1, 'I have to say this book was amazing. The author did a great job of explaining the concepts and applications of data structures and algorithms in a clear and engaging way. The book was full of examples, exercises, and tips that helped me understand and practice the topics. I learned a lot from this book, and I highly recommend it to anyone who wants to improve their coding skills and knowledge of DSA.', '2023-12-01 17:10:53'),
(2, 2000001, 1, 'I have to say this book was amazing. The author did a great job of explaining the concepts and applications of data structures and algorithms in a clear and engaging way. The book was full of examples, exercises, and tips that helped me understand and practice the topics. I learned a lot from this book, and I highly recommend it to anyone who wants to improve their coding skills and knowledge of DSA.', '2023-12-01 18:10:53'),
(3, 2000004, 1, 'This book is very clear, engaging and informative. The author did a great job of explaining the concepts and applications of data structures and algorithms. I learned a lot from the examples and exercises. This book is a must-read for anyone who wants to improve their coding skills and problem-solving abilities.', '2023-12-01 22:10:00'),
(4, 2000006, 3, 'Quả là một cuốn sách có ý nghĩa. Tôi vô cùng xúc động khi đọc qua từng câu từ của tác phẩm này. Nhà văn Victor Hugo thực sự rất tài giỏi.', '2023-12-14 10:10:10'),
(5, 2000007, 3, 'Sách rất hay. Thật đáng ngưỡng mộ!', '2023-12-14 10:10:10'),
(6, 2000004, 3, 'Hay quá đi. Mãi đỉnh.', '2023-12-14 11:11:11');

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `post_comments`
--
ALTER TABLE `post_comments`
  ADD CONSTRAINT `post_comments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `members` (`student_id`),
  ADD CONSTRAINT `post_comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `members` (`student_id`);

--
-- Các ràng buộc cho bảng `reviews_comments`
--
ALTER TABLE `reviews_comments`
  ADD CONSTRAINT `review_id_FK` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_id_FK` FOREIGN KEY (`student_id`) REFERENCES `members` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
