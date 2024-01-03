# SE_Integration_Project_Official-Sem_231
Đây là repository chính thức cho môn Đồ án tồng hợp - hướng Công nghệ phần mềm HK231.

***(Cập nhật đầu tiên 5/11/2023: ReactJS được cài đặt trong thư mục views của project này, các thành viên làm pront-end vui lòng làm trong thư mục views)***

***(Cập nhật tiếp theo 15/11/2023): Cập nhật hệ thống đăng nhập đăng ký (vẫn đang kiểm thử), sử dụng cơ chế tokenization***

***(Cập nhật 20/11/2023: Cập nhật thư viện cors vào expressJS với hi vọng giải quyết dứt điểm lỗi này)***

***(Cập nhật 24/11/2023: Cập nhật thư viện http-proxy-middleware vào ReactJS với hi vọng giải quyết dứt điểm lỗi cors)***

## Setup ngay sau khi clone project lần đầu
### Setup cơ sở dữ liệu MySQL và khởi chạy server MySQL trên máy
Trước hết, ***vui lòng cài đặt MySQL lên máy nếu chưa có, rồi nhập file `simbsc.sql` vào***. Nếu chưa biết cách cài đặt thì đây là hướng dẫn:
- Các bạn có thể cài trực tiếp ứng dụng MySQL lên máy, hoặc cài đặt ứng dụng tổng hợp XAMPP tại [đây](https://www.apachefriends.org/download.html) (ứng dụng này được sử dụng trong môn Lập trình Web nên cài cũng không thừa đâu).
- Nếu dùng XAMPP, cài đặt xong thì vui lòng run as administrator ứng dụng, khi cửa sổ bật ra thì bấm nút Start ở dòng MySQL và Apache. Sau đó vào trình duyệt bất kỳ trên máy, nhập localhost rồi enter. Trang Welcome sẽ hiện ra.
- Trên thanh điều hướng, nhấn vào mục `phpMyAdmin`. Trang quản lý sẽ hiện ra, và trên thanh điều hướng mới lúc này sẽ có nút Import hoặc nhập. Bấm vào đó, khi trang hiện lên sẽ thấy khung chọn tệp. Chọn tệp `simbsc.sql` rồi bấm nhập. Sau khi xong, để ý dashboard bên trái màn hình, cái list với mấy cái icon hình trụ ấy, nếu thấy một dòng tên `simbsc` xuất hiện nghĩa là file database đã nhập thành công. Có thể nhấp vào dòng đó để bắt đầu xem trong cái database đó có gì.
- Sau đó, trong ứng dụng XAMPP bạn có thể stop Apache đi nếu không cần vọc nữa (nếu cần tương tác trên môi trường tiếp thì giữ cũng được), nhưng tuyệt đối không tắt MySQL. Do hiện sử dụng localhost để host server database, nếu bạn tắt nó đi nghĩa là server database sẽ offline và web chắc chắn sẽ bị lỗi ở những trang cần truy cứu database. Chỉ stop MySQL đi khi bạn muốn tắt máy đi nghỉ không debug cho project này nữa, hoặc chỉ đơn giản là đã suffer với project này quá đủ rồi, đang muốn làm cái khác và không còn nhu cầu bật cái web của project này nữa thì tắt :). Nhớ mỗi khi cần bật cái web của project này lên thì phải start MySQL trong XAMPP trước.
- Mỗi khi kiểm tra thấy repo có cập nhật, nên drop cái database cũ, rồi import lại file `simbsc.sql` hiện tại trong project vì có thể có những thay đổi trên DB. Các bạn khi làm xong nếu có đổi gì trong database cũng export file sql mới rồi bỏ vào repo này để người sau còn cập nhật theo.
### Setup các thư viện cho project
Do việc push kèm thư mục node_modules (thư mục chứa các thư viện cho NodeJS và ReactJS) sẽ khiến project trở nên rất nặng (thư mục node_modules của ReactJS có dung lượng loanh quanh 300-400 MB), cũng như git sẽ không thể track được toàn bộ thay đổi.

Do đó, hai thư mục node_modules của NodeJS và ReactJS đã phải được đưa vào .gitignore.

Vì thế, ngay sau khi clone project này về lần đầu tiên, các thành viên vui lòng tiến hành cài đặt lại các thư viện này. Cụ thể như sau:

Với NodeJS, mở terminal và gõ:
```
npm install
```
Các thư viện cần thiết cho NodeJS sẽ được cài đặt.

Với ReactJS cũng tương tự, chỉ cần chuyển vào thư mục views sau đó cài đặt. Gõ hai lệnh sau:
```
cd views
npm install
```
Các thư viện cần thiết cho ReactJS sẽ được cài đặt.

## Khởi chạy web
Sau khi clone project này, mở terminal tại thư mục mà project được clone (nếu đang ở thư mục views thì phải quay ra thư mục cha nha) và gõ:
```
npm run dev
```
Trang localhost:3000 sẽ khởi chạy tự động trên trình duyệt mặc định của máy sau vài giây nếu việc thiết lập thành công (nó hơi lâu một chút do phải khởi chạy cả ReactJS ở front-end lẫn NodeJS/ExpressJS ở back-end)

## Một số thông tin về web
### Công nghệ được sử dụng
- Front-end:
    - HTML + CSS
    - Bootstrap 5 (được cài đặt như là một thư viện trong thư mục node_modules của ReactJS)
    - Javascript
    - jQuery
    - ReactJS
    - Axios (để thực hiện http request trong ReactJS)
- Back-end:
    - Server code: NodeJS v20, ExpressJS
    - Database: MySQL

### Các lưu ý
- File database này hiện chỉ phục vụ hai module: quản lý tài liệu và mượn sách/tài liệu, do đó hiện chỉ có 3 table documents (đã có dữ liệu), members và borrow (chưa có dữ liệu). Vui lòng thêm dữ liệu vào khi làm. 
- **Hiện tại, trang chưa được hiện thực tính năng đăng nhập đăng ký (sẽ cập nhật sau). Do đó, có lẽ các request cho module mượn sách hiện tại vui lòng gừi thông tin trực tiếp về người dùng lên server đề xử lý**
- Trang web được viết theo mô hình MVC (Model - View - Controller), trong đó phần views sử dụng ReactJS để hiện thực. Các thành viên nên tìm hiểu qua mô hình này, cách triển khai mô hình trên NodeJS để hiện thực theo mô hình này.
- Nếu có đổi database về sau, chỉ cần thay đổi file `connect_db` và các file model đối tượng liên quan trong thư mục `model`. Code hiện tại đã cố gắng chia tách phần model kết nối database này với phần model của từng page trong web nhằm đảm bảo khi hiện thực hoặc đổi database, chỉ cần thay đổi kết nối trong `connect_db` và thay đổi các câu lệnh truy vấn trong các file model đối tượng liên quan, còn API mà các file đối tượng cung cấp ra là không đổi và không cần sửa (tuân thủ tối da bộ quy tắc quan trọng trong lập trình: SOLID)
- Trang web có vài thiết lập liên quan đến bảo mật thông qua các thư viện: `helmet`, `express-rate-limit`.
- Trang web đã cấu hình proxy cho ReactJS để đảm bảo ReactJS và NodeJS server tương tác được (không bị lỗi cors). Hiện đã cập nhật thêm thư viện cors cho server.
- Đối với backend server, cần restart server nếu muốn code đã thay đổi chạy được.
```
netstat -ano | findstr :<PORT>
taskkill /PID <PID> /F
```
hoặc ```Ctrl+C```

Lời cuối, chúc tất cả một ngày tốt lành!
