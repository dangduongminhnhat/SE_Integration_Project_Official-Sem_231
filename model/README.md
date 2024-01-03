1. Module mượn sách
a. Datbase: 
	REQUESTBORROW (request Book loan) state:
	// status:
	// 0: request mượn chưa được duyệt
	// 1: request mượn đã được duyệt và chưa trả
	// 2: request mượn không được duyệt
	// 3: đã trả
	// 4: chưa trả chưa request trả
	// 5: quá hạn chưa request trả
	// 6: request trả đúng hạn
	// 7: request trả trễ hạn
	// 8: request trả đã được đồng ý
	// 9: phạt
	// 10: chưa trả đã request trả
	// 11: quá hạn đã request trả
b. Code:
	+ 500: DATABASE_FAILED
	+ 300: OK
c. API:
* Get loan (book borrow) list:

- Manager:
API: /api/loanManagement/manager/list
Res: 
	+ Failed:  JSON {code: 500}
	+ Successed: JSON {loanList: {"id": <INT>, "student_id": <INT>, "student_name": <VARCHAR>, "doc_name": <VARCHAR>,"request_date": <DATE>}}

- User: (User request book history)
API: /api/loanManagement/customer/loanhistory?id=<INT>
Res: 
	+ Failed:  JSON {code: 500}
	+ Successed: JSON {loanHistory: {"id": <INT>, "request_day": <DATE>, "doc_name": <VARCHAR>, "state": <INT>, "update_date": <DATE>}}

* Get borrowed book history:
API: /api/loanManagement/customer/borrowhistory?id=<INT>
Res: 
	+ Failed:  JSON {code: 500}
	+ Successed: JSON {borrowHistory: {"received_day": <DATE>, "doc_name": <VARCHAR>, "state": <INT>, "returned_day": <DATE>}}

* Approve request: 

- Manager: 
API: /api/loanManagement/manager/request/approve?id=<INT>
Res: 
	+ Failed:  
 		> Cannot connect to database
   			JSON { 500: "Fail to connect to databse" }
   		> Fail to update request's state
   			JSON { 501: "Fail to update request's state" }
  		> Fail to update document's quantity
   			JSON { 502: "Fail to update request's quantity" }
   		> No more document to be borrowed
   			JSON { 503: "No more document to be borrowed" }
	+ Successed: JSON { 300: OK}

* Deny request:

- Manager: 
API: /api/loanManagement/manager/request/deny?id=<INT>
Res: 
	+ Failed:  JSON {code: 500}
	+ Successed: JSON { code: 300}


* Request book:

- User:
API: /api/loanManagement/customer/request?stu_id=<INT>&book_id=<INT>
Res: 
	+ Failed:  JSON {code: 500}
	+ Successed: JSON {code: 300}
-------------------------------------------------------------------------------------
2. Module quản lí bài đăng hoạt động
* Get post list
API: /api/post
Res: 
	+ Failed:  JSON {500: "Database Error: Cannot fetch from database"}
	+ Successed: JSON {"postList": [{"post_id": <INT>, "title": <TEXT>, "brief": <TEXT>, "create_date": <DATE>, "last_change": <DATE>}]}

* Get detail of a post (including comments)
API: /api/post/detail?id=<INT>
Res: 
	+ Failed:  JSON {500: "Database Error: Cannot fetch from database"}
	+ Successed: JSON {
				"post": [{"post_id": <INT>, "title": <TEXT>, "brief": <TEXT>, "content": <TEXT>, "create_date": <DATE>, "last_change": <DATE>}],
    				"comments": [{"cmt_id": <INT>, "post_id": <INT>, "student_id": <INT>, "content": <TEXT>, "last_change": <DATE>},{..},..]
			}
* Create new post
API: /api/post/new?title=<TEXT>&brief=<TEXT>&content=<TEXT>
Res: 
	+ Failed:  JSON {500: "Database Error: Cannot insert into database"}
	+ Successed: JSON {300: "OK"}

* Edit post
API: /api/post/edit?id=<INT>&title=<TEXT>&brief=<TEXT>&content=<TEXT>
Res: 
	+ Failed:  JSON {500: "Database Error: Cannot insert into database"}
	+ Successed: JSON {300: "OK"}

* Delete post
API: /api/post/delete?id=<INT>
Res: 
	+ Failed:  JSON {500: "Database Error: Cannot delete from database"}
	+ Successed: JSON {300: "OK"}

* Create new comment
API: /api/post/comment/new?post_id=<INT>&student_id=<INT>&content=<TEXT>
Res: 
	+ Failed:  JSON { 500: }
	+ Successed: JSON { 300: "OK"}

* Edit comment
API: /api/post/comment/edit?id=<INT>&content=<TEXT>
Res: 
	+ Failed:  JSON {500: "Database Error: Cannot insert into database"}
	+ Successed: JSON {300: "OK"}

* Delete comment
API: /api/post/comment/delete?id=<INT>
Res: 
	+ Failed:  JSON {500: "Database Error: Cannot delete from database"}
	+ Successed: JSON {300: "OK"}
-------------------------------------------------------------------------------------
3. Module quản lí thành viên:
   
* View users list
API: /api/userManagement
RES: JSON: {"userList": [{"student_id":<INT>,"student_name":<TEXT>,"state":<TEXT>,"permission":[<role 1>,<role 2>,...]},...]}

* Search users
API: /api/userManagement/search?term=<TEXT>
RES: JSON: {"userList": [{"student_id":<INT>,"student_name":<TEXT>,"state":<TEXT>,"permission":[<role 1>,<role 2>,...]},...]}

* View user's detail
API: /api/userManagement/detail?id=<INT>
RES: JSON: {"user": {"student_id":<INT>, "student_name":<TEXT>, "email": <TEXT>, "join_date": <TEXT>, "state": <TEXT>, "permission": [<role 1>, <role 2>,...]}}

* Block/Active a User ------ value = <INT> in {1: block, 0: unblocked/active}
API: /api/userManagement/block?id=<INT>&value=<INT>
Res: 
	+ Failed:  JSON {500: "Database Error: Cannot delete from database"}
	+ Successed: JSON {300: "OK"}

* Change Permission ------ value of each permission in {1: yes, 0: no}
API: /api/userManagement/permission?id=<INT>&admin=<INT>&collaborator=<INT>&member=<INT>
Res: 
	+ Failed:  JSON {500: "Database Error: Cannot delete from database"}
	+ Successed: JSON {300: "OK"}

