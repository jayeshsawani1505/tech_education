-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 07:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tech_edu`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `BranchId` int(11) NOT NULL,
  `BranchName` varchar(255) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`BranchId`, `BranchName`, `createdOn`) VALUES
(1, 'naroda', '2024-12-10 19:30:07'),
(2, 'kubeshwar', '2024-12-10 19:30:07');

-- --------------------------------------------------------

--
-- Table structure for table `branchadmin`
--

CREATE TABLE `branchadmin` (
  `BranchAdminID` int(11) NOT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `PhoneNumber` bigint(20) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `IsActive` int(11) DEFAULT NULL,
  `BranchID` int(11) DEFAULT NULL,
  `RoleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branchadmin`
--

INSERT INTO `branchadmin` (`BranchAdminID`, `FirstName`, `LastName`, `PhoneNumber`, `Address`, `Email`, `Image`, `UserName`, `Password`, `IsActive`, `BranchID`, `RoleId`) VALUES
(1, 'krupalsinh', 'Chavda', 7600230620, 'naroda', 'krupal@gmail.com', '/uploads/branchAdmin/1733840528216-965006673.jpg', 'user@example.com', 'user@123', NULL, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `CourseId` int(11) NOT NULL,
  `CourseName` varchar(255) NOT NULL,
  `CertificateFees` varchar(255) NOT NULL,
  `course_duration` int(11) NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`CourseId`, `CourseName`, `CertificateFees`, `course_duration`, `IsDeleted`) VALUES
(1, 'M.S. Office', '300', 3, 0),
(2, 'D.T.P', '350', 3, 0),
(3, 'Internet', '200', 1, 0),
(4, 'Tally ERP 9 with GST', '450', 3, 0),
(5, 'Digital Marketing', '500', 3, 0),
(6, 'Basic Computer Knowledge', '300', 1, 0),
(7, 'Typing (Hindi, English, Gujarati)', '200', 1, 0),
(8, 'CoralDraw', '300', 1, 0),
(9, 'Photoshop', '300', 1, 0),
(10, 'C Language', '500', 3, 0),
(11, 'C++ Language', '500', 3, 0),
(12, 'Java Language', '500', 3, 0),
(13, 'Python Language', '500', 3, 0),
(14, 'DCA (Diploma In Computer Application)', '700', 12, 0),
(15, 'ADCA (Advance Diploma In Computer Application)', '1000', 12, 0),
(16, 'PGDCA (Post Graduation Diploma In Computer Application)', '1500', 12, 0),
(17, 'Spoken English Course', '500', 3, 0),
(18, 'Certificate In Teacher Training', '1500', 12, 0);

-- --------------------------------------------------------

--
-- Table structure for table `fees`
--

CREATE TABLE `fees` (
  `FeesId` int(11) NOT NULL,
  `feeSrNo` varchar(255) DEFAULT NULL,
  `StudentId` int(11) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fees`
--

INSERT INTO `fees` (`FeesId`, `feeSrNo`, `StudentId`, `Amount`, `CreatedOn`, `ModifiedOn`) VALUES
(1, 'FEE-001', 5, 4500.00, '2024-12-10 20:10:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` int(11) NOT NULL,
  `courseName` varchar(255) NOT NULL,
  `language` varchar(100) NOT NULL,
  `text` varchar(255) NOT NULL,
  `options` longtext NOT NULL,
  `answer` varchar(255) NOT NULL,
  `selected` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_questions`
--

INSERT INTO `quiz_questions` (`id`, `courseName`, `language`, `text`, `options`, `answer`, `selected`) VALUES
(1, 'CCC', 'Gujarati', '(1) M.S.Word માં Ruler કયા જોવા મળે છે?', '[\"A. Bottom And Right\", \"B. Top And Right\", \"C. Top And Left\", \"D. Top And Bottom\"]', '2', NULL),
(2, 'CCC', 'Gujarati', '(2) M.S .Excel માં રો સિલેકટ કરવાની શોટર્કટ કી કઈ છે?', '[\"A. Ctrl + Shift\", \"B. Ctrl +Shift +Space\", \"C. Ctrl + Space\", \"D. Shift + Space\"]', '3', NULL),
(3, 'CCC', 'Gujarati', '(3) Power Point માં Chart ની Shortcut Key શું છે?', '[\"A. Alt + N + C\", \"B. Ctrl + Shift + N + C\", \"C. Shift + N + C\", \"D. Shift + Alt + N + C\"]', '2', NULL),
(4, 'CCC', 'Gujarati', '(4) Excel માં એક કરતા વધારે Cell ને Select કરવા માટે કઈ કી દબાવી જરુરી છે?', '[\"A. Shift\", \"B. Ctrl\", \"C. Alt\", \"D. Tab\"]', '0', NULL),
(5, 'CCC', 'Gujarati', '(5) M. S. Word માં Current Date લાવા ની Shortcut Key શું છે?', '[\"A. Ctrl+;\", \"B. Shift + Tab + D\", \"C. Ctrl + shift + ;\", \"D. Alt + Shift +D\"]', '3', NULL),
(6, 'CCC', 'Gujarati', '(6) કોઇ પણ કોમ્પયુટરસિસ્ટમ નું મગજ __________ છે.', '[\"A. Control Unit\", \"B. C.P.U\", \"C. Memory\", \"D. A.L.U\"]', '1', NULL),
(7, 'CCC', 'Gujarati', '(7) M.S. Word માં Page ના Top ઉપર બે વાર Click કરવા થી શું Open થાય છે?', '[\"A. Watermark\", \"B. Page Borders\", \"C. Header & Footer\", \"D. Margins\"]', '2', NULL),
(8, 'CCC', 'Gujarati', '(8) નીચેના માંથી MS Excel માં શું નથી જોવા મળતું?', '[\"A. Size\", \"B. Ruler\", \"C. Gridlines\", \"D. Indent\"]', '3', NULL),
(9, 'CCC', 'Gujarati', '(9) Power Point માં New Slide લાવા Shortcut Key કઈ છે?', '[\"A. Ctrl + M\", \"B. Shift + M\", \"C. Ctrl + N\", \"D. Ctrl + Shift + N\"]', '2', NULL),
(10, 'CCC', 'Gujarati', '(10) નીચેના માંથી ક્યો CPU નો ભાગ નથી?', '[\"A. SMPS\", \"B. Hard Disk\", \"C. Mother Board\", \"D. Memory Card\"]', '3', NULL),
(11, 'CCC', 'Gujarati', '(11) સામાન્ય રીતે Excel માં એક Cell ની લંબાઇ કેટલી હોય છે?', '[\"A. 8.43\", \"B. 7.09\", \"C. 15.00\", \"D. 4.89\"]', '0', NULL),
(12, 'CCC', 'Gujarati', '(12) Word માં Font ની Size મોટી કરવા માટે શેનો ઉપયોગ થાય છે?', '[\"A. Alt + Shift + >\", \"B. Ctrl +Shift+ >\", \"C. Ctrl + Shift + <\", \"D. Shift + Alt + <\"]', '1', NULL),
(13, 'CCC', 'Gujarati', '(13) દરેક Program નું પ્રથમ પેજ કયા નામ થી ઓળખાય છે?', '[\"A. Current Page\", \"B. First Page\", \"C. Home Page\", \"D. Front Page\"]', '0', NULL),
(14, 'CCC', 'Gujarati', '(14) File ને એક જગ્યાએ થી બીજી જગ્યાએ લઇ જવા માટે શેનો ઉપયોગ થાય છે?', '[\"A. Copy and Paste\", \"B. Cut And Paste\", \"C. Move\", \"D. Move and Paste\"]', '1', NULL),
(15, 'CCC', 'Gujarati', '(15) 1024 MB = _________', '[\"A. 1 GB\", \"B. 1 MB\", \"C. 1 TB\", \"D. 1 KB\"]', '0', NULL),
(16, 'CCC', 'Gujarati', '(16) Shapes ની અંદર Typing કરવા માટે શેનો ઉપયોગ થાય છે?', '[\"A. Change Text\", \"B. Edit Text\", \"C. Move Text\", \"D. Add Text\"]', '3', NULL),
(17, 'CCC', 'Gujarati', '(17) Ctrl, shift અને Alt કી ને ________ કહેવામા આવે છે?', '[\"A. Modifier Key\", \"B. Function Key\", \"C. Number Key\", \"D. Combination Key\"]', '3', NULL),
(18, 'CCC', 'Gujarati', '(18) માહિતીને ઝડપથી Transfer કરવામાં આવતું કોને સાધન ઉપયોગી બને છે?', '[\"A. USP\", \"B. UBS\", \"C. UPS\", \"D. USB\"]', '3', NULL),
(19, 'CCC', 'Gujarati', '(19) માઇક્રો સોફટના સ્થાપક કોન છે?', '[\"A. Paul Allen\", \"B. Bill Gates\", \"C. A & B બને\", \"D. None\"]', '2', NULL),
(20, 'CCC', 'Gujarati', '(20) બે લાઇન વચ્ચે 1.5 ની જગ્યા આપવા ની શોર્ટ કી કઈ છે?', '[\"A. Ctrl+ 5\", \"B. Ctrl + Shift + F5\", \"C. Alt + 6\", \"D. Shift + F6\"]', '0', NULL),
(21, 'CCC', 'Gujarati', '(21) કોઇ પણ કોમ્પયુટરસિસ્ટમ નું મગજ __________ છે.', '[\"A. Control Unit\", \"B. C.P.U\", \"C. Memory\", \"D. A.L.U\"]', '1', NULL),
(22, 'CCC', 'Gujarati', '(22) M.S. Word માં Page ના Top ઉપર બે વાર Click કરવા થી શું Open થાય છે?', '[\"A. Watermark\", \"B. Page Borders\", \"C. Header & Footer\", \"D. Margins\"]', '2', NULL),
(23, 'CCC', 'Gujarati', '(23) નીચેના માંથી MS Excel માં શું નથી જોવા મળતું?', '[\"A. Size\", \"B. Ruler\", \"C. Gridlines\", \"D. Indent\"]', '3', NULL),
(24, 'CCC', 'Gujarati', '(24) Power Point માં New Slide લાવા Shortcut Key કઈ છે?', '[\"A. Ctrl + M\", \"B. Shift + M\", \"C. Ctrl + N\", \"D. Ctrl + Shift + N\"]', '2', NULL),
(25, 'CCC', 'Gujarati', '(25) નીચેના માંથી ક્યો CPU નો ભાગ નથી?', '[\"A. SMPS\", \"B. Hard Disk\", \"C. Mother Board\", \"D. Memory Card\"]', '3', NULL),
(26, 'CCC', 'Gujarati', '(26) સામાન્ય રીતે Excel માં એક Cell ની લંબાઇ કેટલી હોય છે?', '[\"A. 8.43\", \"B. 7.09\", \"C. 15.00\", \"D. 4.89\"]', '0', NULL),
(27, 'CCC', 'Gujarati', '(27) Word માં Font ની Size મોટી કરવા માટે શેનો ઉપયોગ થાય છે?', '[\"A. Alt + Shift + >\", \"B. Ctrl +Shift+ >\", \"C. Ctrl + Shift + <\", \"D. Shift + Alt + <\"]', '1', NULL),
(28, 'CCC', 'Gujarati', '(28) દરેક Program નું પ્રથમ પેજ કયા નામ થી ઓળખાય છે?', '[\"A. Current Page\", \"B. First Page\", \"C. Home Page\", \"D. Front Page\"]', '0', NULL),
(29, 'CCC', 'Gujarati', '(29) File ને એક જગ્યાએ થી બીજી જગ્યાએ લઈ જવા માટે શેનો ઉપયોગ થાય છે?', '[\"A. Copy and Paste\", \"B. Cut And Paste\", \"C. Move\", \"D. Move and Paste\"]', '1', NULL),
(30, 'CCC', 'Gujarati', '(30) 1024 MB = _________', '[\"A. 1 GB\", \"B. 1 MB\", \"C. 1 TB\", \"D. 1 KB\"]', '0', NULL),
(31, 'CCC', 'Gujarati', '(31) Shapes ની અંદર Typing કરવા માટે શેનો ઉપયોગ થાય છે?', '[\"A. Change Text\", \"B. Edit Text\", \"C. Move Text\", \"D. Add Text\"]', '3', NULL),
(32, 'CCC', 'Gujarati', '(32) Ctrl, shift અને Alt કી ને ________ કહેવામા આવે છે?', '[\"A. Modifier Key\", \"B. Function Key\", \"C. Number Key\", \"D. Combination Key\"]', '3', NULL),
(33, 'CCC', 'Gujarati', '(33) માહિતીTransfer કરવા માટે કઈ સાધન સૌથી વધુ ઉપયોગી છે?', '[\"A. USP\", \"B. UBS\", \"C. UPS\", \"D. USB\"]', '3', NULL),
(34, 'CCC', 'Gujarati', '(34) માઇક્રો સોફટના સ્થાપક કોન છે?', '[\"A. Paul Allen\", \"B. Bill Gates\", \"C. A & B બન\", \"D. None\"]', '2', NULL),
(35, 'CCC', 'Gujarati', '(35) બે લાઇન વચ્ચે 1.5 ની જગ્યા આપવા ની શોર્ટ કી કઈ છે?', '[\"A. Ctrl+5\", \"B. Ctrl + Shift + F5\", \"C. Alt + 6\", \"D. Shift + F6\"]', '0', NULL),
(36, 'CCC', 'Gujarati', '(36) MS Excel માં Control અને Space કી નો ઉપયોગ કરવાથી શું થાય છે?', '[\"A. Excel Selects the Column\", \"B. Excel Selects the Row\", \"C. Excel Deletes the Row\", \"D. Excel Selects the Cell\"]', '0', NULL),
(37, 'CCC', 'Gujarati', '(37) MS Excelમાં Columns ને ___________થી ઓળખવામાં આવે છે?', '[\"A. A, B, C, D...\", \"B. A, B, C, D...\", \"C. 1, 2, 3, 4...\", \"D. Alphabet\"]', '0', NULL),
(38, 'CCC', 'Gujarati', '(38) MS Excel 2016 માં Rowsનું Maximum Number શું છે?', '[\"A. 1,048,576\", \"B. 1,057,897\", \"C. 1,200,000\", \"D. 2,000,000\"]', '0', NULL),
(39, 'CCC', 'Gujarati', '(39) PowerPointમાં ક્યા ભાગમાં લખાણ એડ કરી શકાય છે?', '[\"A. Header\", \"B. Footer\", \"C. Slide\", \"D. Design\"]', '2', NULL),
(40, 'CCC', 'Gujarati', '(40) MS Word ની Blank Document ની લોડ શોટકટ કી શું છે?', '[\"A. Ctrl+N\", \"B. Shift+Ctrl+N\", \"C. Ctrl+P\", \"D. Ctrl+Z\"]', '0', NULL),
(41, 'CCC', 'Gujarati', '(41) MS Excel માં Automatic Calculation બંધ કરવા માટે કઈ ક્રમ કરે છે?', '[\"A. File → Options → Advanced\", \"B. File → Options → Calculation\", \"C. Insert → Formula\", \"D. View → Calculation\"]', '1', NULL),
(42, 'CCC', 'Gujarati', '(42) PowerPointમાં કયા પ્રકારના Transition છે?', '[\"A. Wipe\", \"B. Split\", \"C. Fade\", \"D. All of Above\"]', '3', NULL),
(43, 'CCC', 'Gujarati', '(43) MS Word માં Paragraph Alignment માટે કઈ Shortcut છે?', '[\"A. Ctrl + L\", \"B. Ctrl + R\", \"C. Ctrl + E\", \"D. All of Above\"]', '3', NULL),
(44, 'CCC', 'Gujarati', '(44) MS Excel માં Row Selection માટે કઈ Shortcut કી છે?', '[\"A. Shift + Space\", \"B. Ctrl + Space\", \"C. Ctrl + Shift + Space\", \"D. Alt + Space\"]', '0', NULL),
(45, 'CCC', 'Gujarati', '(45) MS Word માં Table Insert કરવા માટે કઈ Short Key છે?', '[\"A. Ctrl + Alt + T\", \"B. Ctrl + Shift + T\", \"C. Ctrl + Alt + F\", \"D. Ctrl + T\"]', '1', NULL),
(46, 'CCC', 'Gujarati', '(46) MS Excelમાં Column Header શું દર્શાવે છે?', '[\"A. Numbers\", \"B. Letters\", \"C. Symbols\", \"D. None of Above\"]', '1', NULL),
(47, 'CCC', 'Gujarati', '(47) MS Word માં Footnote Insert કરવા માટે કઈ Shortcut છે?', '[\"A. Alt + Ctrl + F\", \"B. Ctrl + Alt + F\", \"C. Ctrl + Shift + F\", \"D. Shift + F\"]', '0', NULL),
(48, 'CCC', 'Gujarati', '(48) MS PowerPoint માં Object Selection માટે કઈ Shortcut છે?', '[\"A. Ctrl + A\", \"B. Alt + A\", \"C. Ctrl + S\", \"D. Ctrl + Shift + A\"]', '0', NULL),
(49, 'CCC', 'Gujarati', '(49) PowerPoint Presentation એક્ટિવેટ કેવી રીતે થાય છે?', '[\"A. Ctrl + F5\", \"B. F5\", \"C. Shift + F5\", \"D. Alt + F5\"]', '1', NULL),
(50, 'CCC', 'Gujarati', '(50) MS Excel માં Number Format બદલવા માટે કઈ Shortcut છે?', '[\"A. Ctrl + Shift + F\", \"B. Ctrl + Shift + M\", \"C. Ctrl + 1\", \"D. Ctrl + F\"]', '2', NULL),
(51, 'Tally', 'Gujarati', '1. Tally માં કંપની બંધ કરવાની શોર્ટ કટ કી કૈની છે?', '[\"A. F1\", \"B. Alt + F1\", \"C. Alt + F2\", \"D. Alt + F3\"]', '1', NULL),
(52, 'Tally', 'Gujarati', '2. ટેલી માં ટ્રાયલ બેલેંસ જોવા માટે નીચેમાં થી કઈ સ્ટેપ ફોલો કરવામાં આવે છે?', '[\"A. Gateway Of Tally >Report>Trial Balance\", \"B. Gateway Of Tally > Trial Balance\", \"C. Gateway Of Tally>Report>Display>Trail Balance\", \"D. None Of These\"]', '2', NULL),
(53, 'Tally', 'Gujarati', '3. Closing Stock કોની અંદર આવે છે?', '[\"A. Current Stock\", \"B. Fixed Asset\", \"C. Stock In Hand\", \"D. Direct Income\"]', '0', NULL),
(54, 'Tally', 'Gujarati', '4. Discount Column ક્યા હોય છે?', '[\"A. Sales Invoice\", \"B. Purchase Invoice\", \"C. Both A & B\", \"D. Accounting Voucher\"]', '2', NULL),
(55, 'Tally', 'Gujarati', '5. નીચે માંથી ક્યુ Account By Default હોતુ નથી?', '[\"A. Cash\", \"B. List Of Voucher\", \"C. Profit And Loss\", \"D. None\"]', '3', NULL),
(56, 'Tally', 'Gujarati', '6. Gate Way of Tally ના પેજ માં સૌથી નીચે શુ હોય છે?', '[\"A. Start Button\", \"B. List of Voucher\", \"C. Company Features\", \"D. Calculator\"]', '3', NULL),
(57, 'Tally', 'Gujarati', '7. Inventory Books નો ઉપયોગ શુ જોવા માટે થાય છે?', '[\"A. Stock Items\", \"B. Group Summry\", \"C. Godown\", \"D. All\"]', '3', NULL),
(58, 'Tally', 'Gujarati', '8. F12 બટન નો ઉપયોગ શુ જોવા માટે થાય છે?', '[\"A. Select Company\", \"B. Inventory Features\", \"C. Configuration\", \"D. More Features\"]', '2', NULL),
(59, 'Tally', 'Gujarati', '9. Tally Restore Option ક્યા જોવા મળે છે?', '[\"A. New Company\", \"B. Company Information\", \"C. Backup\", \"D. Company Reset\"]', '2', NULL),
(60, 'Tally', 'Gujarati', '10. નીચે માંથી Tally માં Profit & Loss Account કેવી રીતે જોઈ શકાય છે?', '[\"A. Gate Way Of Tally > Reports > Profit & Loss\", \"B. Gate Way Of Tally > Display > Profit & Loss\", \"C. Gate Way Of Tally > Account Book > Profit & Loss\", \"D. None\"]', '0', NULL),
(61, 'Tally', 'Gujarati', '11. Tally માં દિવસ ના અવલોકન માટે કયા ફીચર નો ઉપયોગ થાય છે?', '[\"A. Trial Balance\", \"B. Balance Sheet\", \"C. Day Book\", \"D. Profit And Loss\"]', '2', NULL),
(62, 'Tally', 'Gujarati', '12. Tally માં Balance Sheet ના રિપોર્ટ કેવી રીતે જોવો?', '[\"A. Gateway of Tally > Report > Balance Sheet\", \"B. Gateway of Tally > Display > Balance Sheet\", \"C. Gateway of Tally > Balance Sheet\", \"D. None\"]', '1', NULL),
(63, 'Tally', 'Gujarati', '13. Tally માં Balance Sheet ની શોધ કેવી રીતે કરી શકાય છે?', '[\"A. Gateway of Tally > Report > Balance Sheet\", \"B. Gateway of Tally > Display > Balance Sheet\", \"C. Reports > Balance Sheet\", \"D. None\"]', '2', NULL),
(64, 'Tally', 'Gujarati', '14. Tally માં Inventory Features કયા થાય છે?', '[\"A. Stock Item\", \"B. Stock Group\", \"C. Stock Categories\", \"D. All\"]', '3', NULL),
(65, 'Tally', 'Gujarati', '15. Tally માં Invoice Printing Options કયા હોય છે?', '[\"A. Sales Invoice\", \"B. Purchase Invoice\", \"C. Both\", \"D. None\"]', '2', NULL),
(66, 'Tally', 'Gujarati', '16. Tally માં Discount Column કયા Voucher ના ઉપયોગ માટે હોય છે?', '[\"A. Purchase Voucher\", \"B. Sales Voucher\", \"C. Payment Voucher\", \"D. Receipt Voucher\"]', '1', NULL),
(67, 'Tally', 'Gujarati', '17. Tally માં મોટે ભાગે કયા ટાઇપ ના વાઉચર નો ઉપયોગ થાય છે?', '[\"A. Payment Voucher\", \"B. Receipt Voucher\", \"C. Sales Voucher\", \"D. All Of The Above\"]', '3', NULL),
(68, 'Tally', 'Gujarati', '18. Tally માં માહિતી સાથે મુખ્ય પાનું કેવી રીતે જોઈ શકાય છે?', '[\"A. Gateway of Tally\", \"B. Display\", \"C. Reports\", \"D. None\"]', '0', NULL),
(69, 'Tally', 'Gujarati', '19. Tally માં ઇન્ડિવિદ્યુઅલ મોનિટર માટે કયું શોર્ટકટ કી છે?', '[\"A. Alt + F2\", \"B. Alt + F3\", \"C. F4\", \"D. None\"]', '1', NULL),
(70, 'Tally', 'Gujarati', '20. Tally માં ગણતરીના વાઉચર કેવી રીતે રજૂ થાય છે?', '[\"A. Sales\", \"B. Purchase\", \"C. Both A & B\", \"D. Receipt\"]', '3', NULL),
(71, 'Tally', 'Gujarati', '21. Tally માં ફેરફાર કરીને વિષય ના પુરાવા કયા ઉપલબ્ધ થાય છે?', '[\"A. Display\", \"B. Gateway of Tally\", \"C. Reports\", \"D. All Of The Above\"]', '3', NULL),
(72, 'Tally', 'Gujarati', '22. Tally માં નવો કંપની બનાવવાનો સ્ટેપ કયા હોય છે?', '[\"A. F1\", \"B. Alt + F1\", \"C. Alt + F2\", \"D. F3\"]', '2', NULL),
(73, 'Tally', 'Gujarati', '23. Tally માં પેમેન્ટની વિગતો શું છે?', '[\"A. Sales Voucher\", \"B. Receipt Voucher\", \"C. Payment Voucher\", \"D. Purchase Voucher\"]', '2', NULL),
(74, 'Tally', 'Gujarati', '24. Tally માં ખાલી કાર્ડ પછી કયા મળતા છે?', '[\"A. Purchase Invoice\", \"B. Payment Voucher\", \"C. Receipts\", \"D. None\"]', '0', NULL),
(75, 'Tally', 'Gujarati', '25. Tally માં કયા મુખ્ય વાઉચર કન્ટ્રોલ થાય છે?', '[\"A. Payment\", \"B. Receipt\", \"C. Sales\", \"D. Purchase\"]', '3', NULL),
(76, 'Tally', 'Gujarati', '26. Tally માં ભારતમાં અંબર નમૂના માટે શું છે?', '[\"A. Sales Tax\", \"B. VAT\", \"C. Excise\", \"D. Income Tax\"]', '1', NULL),
(77, 'Tally', 'Gujarati', '27. Tally માં ટ્રાન્સફર ક્રેડિટ (Transfer Credit) કેટલા પ્રકારે હોય છે?', '[\"A. Credit Note\", \"B. Debit Note\", \"C. Both A & B\", \"D. None\"]', '0', NULL),
(78, 'Tally', 'Gujarati', '28. Tally માં માસિક કાર્ય કે જે તમારા માટે ચિહ્નિત હોય છે?', '[\"A. Gateway of Tally\", \"B. Display\", \"C. Reports\", \"D. All Of These\"]', '3', NULL),
(79, 'Tally', 'Gujarati', '29. Tally માં કેટલા પ્રકારે સેવાઓનો ભજવાવટ થાય છે?', '[\"A. Online\", \"B. Offline\", \"C. Both\", \"D. None\"]', '2', NULL),
(80, 'Tally', 'Gujarati', '30. Tally માં થાપણો અને મોસમનો પણ ઉપયોગ કેવી રીતે થાય છે?', '[\"A. Adjustments\", \"B. Sales Tax\", \"C. Allowances\", \"D. None\"]', '0', NULL),
(81, 'Tally', 'Gujarati', '31. Tally માં નોટ અને ફક્ત ચિહ્નિગ જોડવાની પસંદગી છે?', '[\"A. Edit\", \"B. Delete\", \"C. Modify\", \"D. All\"]', '1', NULL),
(82, 'Tally', 'Gujarati', '32. Tally માં પરિવર્તન વિન્ડોમાં બધા તમારું ધ્યાન શું હતું?', '[\"A. Display\", \"B. Reports\", \"C. Gateway of Tally\", \"D. None\"]', '3', NULL),
(83, 'Tally', 'Gujarati', '33. Tally માં ટ્રાયલ બેલેન્સ અને પ્રોફિટ શીટના કયા જુદા જુદા મેળવો?', '[\"A. Reporting\", \"B. Display\", \"C. Print\", \"D. None\"]', '1', NULL),
(84, 'Tally', 'Gujarati', '34. Tally માં તમારી પસંદગી માટે ચિહ્નિગ અપડેટ અને બીજા શું છે?', '[\"A. Data backup\", \"B. Transactions\", \"C. Accounting\", \"D. All\"]', '2', NULL),
(85, 'Tally', 'Gujarati', '35. Tally માં ઇન્ડિવિદ્યુઅલ કંપની મેનેજમેન્ટ કેવી રીતે થાય છે?', '[\"A. Backups\", \"B. Stock Summary\", \"C. Reports\", \"D. None\"]', '0', NULL),
(86, 'Tally', 'Gujarati', '36. Tally માં કયા નમૂના વાઉચરો આપવામાં આવે છે?', '[\"A. Payment\", \"B. Receipt\", \"C. Purchase\", \"D. Sales\"]', '1', NULL),
(87, 'Tally', 'Gujarati', '37. Tally માં પેમેન્ટ પસંદગી કઈ રીતે હાથ ધરાય છે?', '[\"A. Display\", \"B. Select\", \"C. Invoice\", \"D. None\"]', '3', NULL),
(88, 'Tally', 'Gujarati', '38. Tally માં મુખ્ય વાઉચરો માટે શું ટેકનિક છે?', '[\"A. Control\", \"B. Modify\", \"C. Save\", \"D. Cancel\"]', '2', NULL),
(89, 'Tally', 'Gujarati', '39. Tally માં પેમેન્ટ આપવી?', '[\"A. Modify\", \"B. Delete\", \"C. Save\", \"D. Entry\"]', '3', NULL),
(90, 'Tally', 'Gujarati', '40. Tally માં ફીલ્ડ નોંધ સક્ષમ વાઉચરો?', '[\"A. Report\", \"B. Transactions\", \"C. Both A and B\", \"D. None\"]', '1', NULL),
(91, 'Tally', 'Gujarati', '41. Tally માં વિન્ડો ડ્રાય કરે છે?', '[\"A. Cash Management\", \"B. Payment\", \"C. Backup\", \"D. None\"]', '0', NULL),
(92, 'Tally', 'Gujarati', '42. Tally માં ઘનક મર્યાદામાં દિગ્ગજ થઈ રહ્યો છે?', '[\"A. F3\", \"B. Alt + F1\", \"C. F2\", \"D. None\"]', '2', NULL),
(93, 'Tally', 'Gujarati', '43. Tally માં વ્યવહારોના ટિપ્સ કયા છે?', '[\"A. Create\", \"B. Edit\", \"C. Delete\", \"D. All\"]', '3', NULL),
(94, 'Tally', 'Gujarati', '44. Tally માં પેમેન્ટ માહિતીનો ઉપયોગ શા માટે થાય છે?', '[\"A. Entry\", \"B. Update\", \"C. Manage\", \"D. Report\"]', '1', NULL),
(95, 'Tally', 'Gujarati', '45. Tally માં સરકારના નિયમો શું છે?', '[\"A. Reports\", \"B. Settings\", \"C. Configuration\", \"D. None\"]', '2', NULL),
(96, 'Tally', 'Gujarati', '46. Tally માં પ્રિન્ટ કરવાનું શુ છે?', '[\"A. Sales Voucher\", \"B. Payment\", \"C. Invoice\", \"D. Stock\"]', '3', NULL),
(97, 'Tally', 'Gujarati', '47. Tally માં નમૂના માટે શું છે?', '[\"A. Display\", \"B. List\", \"C. Help\", \"D. All\"]', '2', NULL),
(98, 'Tally', 'Gujarati', '48. Tally માં પુરાવા પ્રોફાઇલ કઈ રીતે જોઈ શકાય છે?', '[\"A. Configure\", \"B. Display\", \"C. Reports\", \"D. None\"]', '1', NULL),
(99, 'Tally', 'Gujarati', '49. Tally માં આધાર સમય મર્યાદામાં કયું હોય છે?', '[\"A. Sales\", \"B. Backup\", \"C. Adjustments\", \"D. Transaction\"]', '0', NULL),
(100, 'Tally', 'Gujarati', '50. Tally માં સૌમ્ય તારીખ કઈ રીતે પસંદગીની છે?', '[\"A. Customize\", \"B. Gateway\", \"C. Reports\", \"D. Settings\"]', '1', NULL),
(101, 'Tally', 'Hindi', '1. Tally में कंपनी बंद करने की शॉर्टकट क्या है?', '[\"A. F1\", \"B. Alt + F1\", \"C. Alt + F2\", \"D. Alt + F3\"]', '1', NULL),
(102, 'Tally', 'Hindi', '2. टैली में ट्रायल बैलेंस देखने के लिए निम्नलिखित किस स्टेप का पालन करना चाहिए?', '[\"A. Gateway Of Tally >Report>Trial Balance\", \"B. Gateway Of Tally > Trial Balance\", \"C. Gateway Of Tally>Report>Display>Trail Balance\", \"D. कोई नहीं\"]', '2', NULL),
(103, 'Tally', 'Hindi', '3. क्लोजिंग स्टॉक का क्या मतलब होता है?', '[\"A. वर्तमान स्टॉक\", \"B. स्थायी संपत्ति\", \"C. हाथ में स्टॉक\", \"D. प्रत्यक्ष आय\"]', '2', NULL),
(104, 'Tally', 'Hindi', '4. डिस्काउंट कॉलम कहां होता है?', '[\"A. बिक्री इनवॉइस\", \"B. खरीद इनवॉइस\", \"C. दोनों A और B\", \"D. एकाउंटिंग वाउचर\"]', '2', NULL),
(105, 'Tally', 'Hindi', '5. निम्न में से कौनसा एकाउंट डिफ़ॉल्ट नहीं होता?', '[\"A. कैश\", \"B. वाउचर की सूची\", \"C. लाभ और हानि\", \"D. कोई नहीं\"]', '3', NULL),
(106, 'Tally', 'Hindi', '6. गेटवे ऑफ़ टैली में सबसे नीचे क्या होता है?', '[\"A. स्टार्ट बटन\", \"B. वाउचर की सूची\", \"C. कंपनी की सुविधाएं\", \"D. कैलकुलेटर\"]', '3', NULL),
(107, 'Tally', 'Hindi', '7. इन्वेंटरी बुक्स का उपयोग क्यों किया जाता है?', '[\"A. स्टॉक आइटम्स\", \"B. समूह सारांश\", \"C. गोडाउन\", \"D. सभी\"]', '3', NULL),
(108, 'Tally', 'Hindi', '8. F12 बटन का उपयोग क्यों किया जाता है?', '[\"A. कंपनी का चयन\", \"B. इन्वेंटरी विशेषताएँ\", \"C. विन्यास\", \"D. अधिक विशेषताएँ\"]', '2', NULL),
(109, 'Tally', 'Hindi', '9. टैली रिस्टोर ऑप्शन किस से मिलता है?', '[\"A. नया कंपनी\", \"B. कंपनी की जानकारी\", \"C. बैकअप\", \"D. कंपनी रीसेट\"]', '2', NULL),
(110, 'Tally', 'Hindi', '10. निम्नलिखित में से Tally में Profit & Loss Account कैसे देखा जा सकता है?', '[\"A. गेटवे ऑफ टैली > रिपोर्ट्स > प्रॉफिट एंड लॉस\", \"B. गेटवे ऑफ टैली > डिस्प्ले > प्रॉफिट एंड लॉस\", \"C. गेटवे ऑफ टैली > एकाउंट बुक > प्रॉफिट एंड लॉस\", \"D. कोई नहीं\"]', '0', NULL),
(111, 'Tally', 'Hindi', '11. Tally में जब एकाउंट मेंन्टेनेंस किया जाता है, तो वहां Balance Sheet कैसे बनता है?', '[\"A. मैन्युअली\", \"B. लिस्ट ऑफ़ मेनु\", \"C. रैंडमली\", \"D. ऑटोमेटिक\"]', '3', NULL),
(112, 'Tally', 'Hindi', '12. Tally में आज की तारीख बदलने के लिए शॉर्टकट क्या है?', '[\"A. F2\", \"B. Alt + F2\", \"C. F3\", \"D. Alt + F3\"]', '1', NULL),
(113, 'Tally', 'Hindi', '13. Tally में एकाउंटिंग फीचर्स ओपन करने के लिए शॉर्टकट क्या है?', '[\"A. F11 > F1\", \"B. F11 > F2\", \"C. F11 > F3\", \"D. F11 > F4\"]', '0', NULL),
(114, 'Tally', 'Hindi', '14. Tally में पर्चेस एकाउंट का शॉर्टकट क्या है?', '[\"A. F5\", \"B. F6\", \"C. F7\", \"D. F9\"]', '3', NULL),
(115, 'Tally', 'Hindi', '15. Sales Voucher में कौनसी शॉर्टकट Key Use होती है?', '[\"A. F7\", \"B. F8\", \"C. F9\", \"D. F10\"]', '1', NULL),
(116, 'Tally', 'Hindi', '16. Journal Voucher में Debit और Credit को Represent करने के लिए कौनसी Key Use होती है?', '[\"A. Alt + A\", \"B. Alt + J\", \"C. Alt + C\", \"D. Alt + D\"]', '3', NULL),
(117, 'Tally', 'Hindi', '17. Contra Entry का उपयोग कब होता है?', '[\"A. केवल Cash और Bank Transactions के लिए\", \"B. Credit Transactions के लिए\", \"C. Sales Transactions के लिए\", \"D. Purchase Transactions के लिए\"]', '0', NULL),
(118, 'Tally', 'Hindi', '18. Stock Summary Report को देखने के लिए क्या शॉर्टकट है?', '[\"A. Ctrl + A\", \"B. Ctrl + S\", \"C. Alt + S\", \"D. F11\"]', '1', NULL),
(119, 'Tally', 'Hindi', '19. Tally में Backup का विकल्प कहाँ होता है?', '[\"A. Company Info\", \"B. Display Menu\", \"C. Inventory Menu\", \"D. Accountant Menu\"]', '0', NULL),
(120, 'Tally', 'Hindi', '20. Tally में Trial Balance कैसे देखा जा सकता है?', '[\"A. F1\", \"B. Alt + F5\", \"C. Ctrl + F5\", \"D. Alt + F3\"]', '3', NULL),
(121, 'Tally', 'Hindi', '21. Financial Year Change करने के लिए कौनसी Shortcut Key Use होती है?', '[\"A. Alt + F1\", \"B. Alt + F2\", \"C. Alt + F3\", \"D. Alt + F4\"]', '1', NULL),
(122, 'Tally', 'Hindi', '22. Cost Centre का उपयोग किसके लिए किया जाता है?', '[\"A. Employee Tracking\", \"B. Inventory Management\", \"C. Cost Analysis\", \"D. Tax Filing\"]', '2', NULL),
(123, 'Tally', 'Hindi', '23. Tax Deduction के लिए कौनसी Key Use होती है?', '[\"A. Ctrl + T\", \"B. Alt + T\", \"C. Shift + T\", \"D. F11\"]', '1', NULL),
(124, 'Tally', 'Hindi', '24. Tally में Inventory की Units Set करने के लिए क्या करें?', '[\"A. Stock Summary > Add Units\", \"B. Gateway Of Tally > Units\", \"C. Gateway Of Tally > Create > Units\", \"D. Gateway Of Tally > Settings > Units\"]', '2', NULL),
(125, 'Tally', 'Hindi', '25. टैली के कौन से फ़ीचर में कई कंपनियों का डेटा संभाला जा सकता है?', '[\"A. Multi-Company Handling\", \"B. Single-Company Handling\", \"C. Advanced Handling\", \"D. सभी\"]', '0', NULL),
(126, 'Tally', 'Hindi', '26. टैली में बैंक रिकॉन्सिलिएशन ऑप्शन कहाँ होता है?', '[\"A. बैंकिंग मेनू\", \"B. डिस्प्ले मेनू\", \"C. अकाउंट बुक्स\", \"D. इन्वेंट्री\"]', '0', NULL),
(127, 'Tally', 'Hindi', '27. Tally में Purchase Order के लिए किस Shortcut का उपयोग होता है?', '[\"A. F8\", \"B. F9\", \"C. Ctrl + P\", \"D. Alt + P\"]', '1', NULL),
(128, 'Tally', 'Hindi', '28. Tally में Godown Report कैसे प्राप्त करें?', '[\"A. स्टॉक रिपोर्ट > गोडाउन\", \"B. डिस्प्ले > गोडाउन\", \"C. गेटवे ऑफ टैली > गोडाउन\", \"D. इन्वेंट्री रिपोर्ट\"]', '2', NULL),
(129, 'Tally', 'Hindi', '29. टैली में Export का Shortcut क्या है?', '[\"A. Ctrl + E\", \"B. Alt + E\", \"C. Shift + E\", \"D. F12\"]', '0', NULL),
(130, 'Tally', 'Hindi', '30. टैली में Credit Note के लिए शॉर्टकट Key क्या है?', '[\"A. Ctrl + C\", \"B. Alt + C\", \"C. F8\", \"D. F9\"]', '2', NULL),
(131, 'Tally', 'Hindi', '31. Payment Entry के लिए कौनसी Key उपयोगी होती है?', '[\"A. F5\", \"B. F6\", \"C. F7\", \"D. F8\"]', '1', NULL),
(132, 'Tally', 'Hindi', '32. टैली में VAT Returns कहाँ से एक्सेस कर सकते हैं?', '[\"A. Tax Reports\", \"B. VAT Menu\", \"C. Display Reports > VAT\", \"D. सभी\"]', '2', NULL),
(133, 'Tally', 'Hindi', '33. Stock Analysis Report को कैसे देख सकते हैं?', '[\"A. F5\", \"B. Alt + F5\", \"C. Ctrl + F5\", \"D. Shift + F5\"]', '1', NULL),
(134, 'Tally', 'Hindi', '34. टैली में Debit Note के लिए कौनसी Key होती है?', '[\"A. Alt + F5\", \"B. Alt + F6\", \"C. Alt + F7\", \"D. Alt + F8\"]', '2', NULL),
(135, 'Tally', 'Hindi', '35. Profit & Loss Report को Access करने के लिए?', '[\"A. Ctrl + P\", \"B. Alt + P\", \"C. Alt + F2\", \"D. Alt + F1\"]', '3', NULL),
(136, 'Tally', 'Hindi', '36. टैली में बैंक पेमेंट के लिए?', '[\"A. F4\", \"B. F6\", \"C. F7\", \"D. F9\"]', '1', NULL),
(137, 'Tally', 'Hindi', '37. Contra Entry में किसका उपयोग होता है?', '[\"A. Cash & Bank\", \"B. Purchases & Bank\", \"C. Sales & Bank\", \"D. All\"]', '0', NULL),
(138, 'Tally', 'Hindi', '38. टैली के Basic Configuration Menu में क्या होता है?', '[\"A. Settings\", \"B. Preferences\", \"C. Company Features\", \"D. Accounting Features\"]', '3', NULL),
(139, 'Tally', 'Hindi', '39. Multiple Addresses का Feature किस Version में Introduce किया गया?', '[\"A. Tally 7.2\", \"B. Tally 9\", \"C. Tally ERP 9\", \"D. Tally Prime\"]', '2', NULL),
(140, 'Tally', 'Hindi', '40. टैली में Group Company बनाने के लिए?', '[\"A. Company Menu\", \"B. Display Menu\", \"C. Configuration\", \"D. Multi-Company Menu\"]', '0', NULL),
(141, 'Tally', 'Hindi', '41. Tally में Voucher Printing का Shortcut क्या है?', '[\"A. Ctrl + P\", \"B. Alt + P\", \"C. Shift + P\", \"D. F12\"]', '0', NULL),
(142, 'Tally', 'Hindi', '42. Tally में E-mail Integration के लिए कौन सी Key का उपयोग किया जाता है?', '[\"A. Ctrl + E\", \"B. Alt + E\", \"C. Shift + E\", \"D. F11\"]', '0', NULL),
(143, 'Tally', 'Hindi', '43. Tally में कोई भी रिपोर्ट Export करने के लिए क्या Key होती है?', '[\"A. Ctrl + E\", \"B. Alt + E\", \"C. F12\", \"D. F1\"]', '0', NULL),
(144, 'Tally', 'Hindi', '44. Tally में GST Return दाखिल करने के लिए क्या विकल्प होता है?', '[\"A. Tax Reports\", \"B. GST Reports\", \"C. F12\", \"D. GST Menu\"]', '1', NULL),
(145, 'Tally', 'Hindi', '45. Tally में आयकर कटौती (TDS) को सेट करने के लिए किस विकल्प का उपयोग किया जाता है?', '[\"A. Accounting Features\", \"B. Taxation Features\", \"C. F11\", \"D. F12\"]', '1', NULL),
(146, 'Tally', 'Hindi', '46. Tally में Sales वाउचर के लिए कौन सा शॉर्टकट है?', '[\"A. F5\", \"B. F6\", \"C. F7\", \"D. F8\"]', '0', NULL),
(147, 'Tally', 'Hindi', '47. टैली में अगले महीने के लिए वाउचर स्टोर करने के लिए कौन सा विकल्प होता है?', '[\"A. फाइनेंसियल साल सेट करना\", \"B. Voucher Backup\", \"C. Backup & Restore\", \"D. All\"]', '0', NULL),
(148, 'Tally', 'Hindi', '48. टैली में स्टॉक मास्टर बनाने के लिए कौन सा विकल्प होता है?', '[\"A. Gateway of Tally > Stock\", \"B. Gateway of Tally > Create\", \"C. Gateway of Tally > Display\", \"D. Gateway of Tally > Settings\"]', '1', NULL),
(149, 'Tally', 'Hindi', '49. टैली में बैंक पेमेंट के लिए कौन सा वाउचर टाइप उपयोग किया जाता है?', '[\"A. Payment Voucher\", \"B. Receipt Voucher\", \"C. Contra Voucher\", \"D. Sales Voucher\"]', '0', NULL),
(150, 'Tally', 'Hindi', '50. Tally में Stock Adjustment करने के लिए क्या वाउचर इस्तेमाल होता है?', '[\"A. Stock Voucher\", \"B. Journal Voucher\", \"C. Payment Voucher\", \"D. Receipt Voucher\"]', '0', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `registeredstudents`
--

CREATE TABLE `registeredstudents` (
  `StudentId` int(11) NOT NULL,
  `FormNo` varchar(255) NOT NULL,
  `CenRegNo` varchar(255) NOT NULL,
  `AdmissionDate` date NOT NULL,
  `CourseID` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL,
  `BranchId` int(11) NOT NULL,
  `CertificateFees` decimal(10,2) NOT NULL,
  `RegFees` decimal(10,2) NOT NULL,
  `Surname` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `SonOfDaughterOf` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `BirthDate` date NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `Address` text NOT NULL,
  `City` varchar(255) NOT NULL,
  `State` varchar(255) NOT NULL,
  `Pincode` varchar(10) NOT NULL,
  `MobileNumber` varchar(15) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `StudentImage` varchar(255) DEFAULT NULL,
  `CourseStartDate` date NOT NULL,
  `CourseEndDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registeredstudents`
--

INSERT INTO `registeredstudents` (`StudentId`, `FormNo`, `CenRegNo`, `AdmissionDate`, `CourseID`, `RoleId`, `BranchId`, `CertificateFees`, `RegFees`, `Surname`, `Name`, `SonOfDaughterOf`, `Email`, `BirthDate`, `Gender`, `Address`, `City`, `State`, `Pincode`, `MobileNumber`, `Password`, `StudentImage`, `CourseStartDate`, `CourseEndDate`) VALUES
(4, '001', '001', '2024-12-10', 5, 3, 1, 500.00, 4500.00, 'patel', 'susu', 'idk', 'susu@gmail.com', '2024-12-10', 'femalw', 'dsdsd', 'asas', 'sdas', '32323', '12312212', 'patelsusu', '/uploads/student/1733841311023-644802909.png', '2024-12-10', '2025-03-10'),
(5, 'FORM-0005', 'CENREG-0005', '2024-12-10', 11, 3, 2, 500.00, 5000.00, 'vaishanani', 'drashti', 'idk', 'drashti@gmail.com', '2002-08-25', 'female', 'fdfdf', 'amd', 'guj', '38230', '764532182', 'vaishananidrashti', '/uploads/student/1733841311023-644802909.png', '2024-12-10', '2025-03-10');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'BranchManager'),
(3, 'Student');

-- --------------------------------------------------------

--
-- Table structure for table `studentexamdetails`
--

CREATE TABLE `studentexamdetails` (
  `StudentExamDetailsId` int(11) NOT NULL,
  `StudentId` int(11) NOT NULL,
  `SubjectName` varchar(255) NOT NULL,
  `CorrectAnswers` varchar(255) NOT NULL,
  `TotalMarks` varchar(255) NOT NULL,
  `Grade` varchar(4) DEFAULT NULL,
  `ExamDate` date NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentexamdetails`
--

INSERT INTO `studentexamdetails` (`StudentExamDetailsId`, `StudentId`, `SubjectName`, `CorrectAnswers`, `TotalMarks`, `Grade`, `ExamDate`, `createdOn`) VALUES
(4, 5, '', '48', '50', 'A+', '2024-12-10', '2024-12-10 16:15:27'),
(5, 4, 'Digital Marketing', '40', '50', 'A', '2024-12-10', '2024-12-10 18:04:41');

-- --------------------------------------------------------

--
-- Table structure for table `studentqualifications`
--

CREATE TABLE `studentqualifications` (
  `id` int(11) NOT NULL,
  `StudentId` int(11) NOT NULL,
  `qualification` varchar(255) NOT NULL,
  `board` varchar(255) NOT NULL,
  `passingYear` year(4) NOT NULL,
  `grade` varchar(10) NOT NULL,
  `attachFile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentqualifications`
--

INSERT INTO `studentqualifications` (`id`, `StudentId`, `qualification`, `board`, `passingYear`, `grade`, `attachFile`) VALUES
(2, 4, 'ssc', 'guj', '2023', 'a', '/uploads/qualifications/1733841325993-642564186.pdf'),
(3, 5, 'BSC', 'GUJ', '2024', 'A', '/uploads/qualifications/1733841469167-704867328.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `PhoneNumber` varchar(15) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `UserName` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `RoleId` int(11) NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT 0,
  `CreatedOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `ModifiedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `StudentId` int(11) NOT NULL,
  `BranchId` int(11) NOT NULL,
  `profilepicture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `FirstName`, `LastName`, `Email`, `PhoneNumber`, `Address`, `UserName`, `Password`, `RoleId`, `IsActive`, `IsDeleted`, `CreatedOn`, `ModifiedOn`, `StudentId`, `BranchId`, `profilepicture`) VALUES
(1, 'itcareer', 'itcareer', 'itcareer@gmail.com', '32232323', 'itcareer', 'itcareer', 'itcareer', 1, 0, 0, '2024-12-10 14:03:51', '2024-12-10 14:04:26', 0, 0, NULL),
(2, 'krupalsinh', 'Chavda', 'krupal@gmail.com', '7600230620', 'naroda', 'user@example.com', 'user@123', 2, 0, 0, '2024-12-10 14:22:08', '2024-12-10 14:22:08', 0, 1, '/uploads/branchAdmin/1733840528216-965006673.jpg'),
(4, 'susu', 'patel', 'susu@gmail.com', '12312212', 'dsdsd', 'susupatel', 'patelsusu', 3, 0, 0, '2024-12-10 14:35:11', '2024-12-10 14:35:11', 4, 1, '/uploads/student/1733841311023-644802909.png'),
(5, 'drashti', 'vaishanani', 'drashti@gmail.com', '764532182', 'fdfdf', 'drashtivaishanani', 'vaishananidrashti', 3, 0, 0, '2024-12-10 14:37:47', '2024-12-10 14:38:37', 5, 2, '/uploads/student/1733841311023-644802909.png');

-- --------------------------------------------------------

--
-- Table structure for table `youtubebanner`
--

CREATE TABLE `youtubebanner` (
  `BannerId` int(11) NOT NULL,
  `Url` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`BranchId`);

--
-- Indexes for table `branchadmin`
--
ALTER TABLE `branchadmin`
  ADD PRIMARY KEY (`BranchAdminID`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`CourseId`) USING BTREE;

--
-- Indexes for table `fees`
--
ALTER TABLE `fees`
  ADD PRIMARY KEY (`FeesId`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registeredstudents`
--
ALTER TABLE `registeredstudents`
  ADD PRIMARY KEY (`StudentId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `studentexamdetails`
--
ALTER TABLE `studentexamdetails`
  ADD PRIMARY KEY (`StudentExamDetailsId`);

--
-- Indexes for table `studentqualifications`
--
ALTER TABLE `studentqualifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `youtubebanner`
--
ALTER TABLE `youtubebanner`
  ADD PRIMARY KEY (`BannerId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `BranchId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `branchadmin`
--
ALTER TABLE `branchadmin`
  MODIFY `BranchAdminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `CourseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `fees`
--
ALTER TABLE `fees`
  MODIFY `FeesId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `registeredstudents`
--
ALTER TABLE `registeredstudents`
  MODIFY `StudentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `studentexamdetails`
--
ALTER TABLE `studentexamdetails`
  MODIFY `StudentExamDetailsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `studentqualifications`
--
ALTER TABLE `studentqualifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `youtubebanner`
--
ALTER TABLE `youtubebanner`
  MODIFY `BannerId` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
