const review_model = require("../model/DAO/review");
const authorization_model = require('../model/DAO/authorization');

module.exports = {
    reviewListAccepted: function (req, res) { // Chỉ lấy danh sách các bài review đã được chấp nhận, và ai cũng được thấy
        review_model.reviewList("Chấp nhận", null, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
            }
            else {
                res.status(200).json({ reviewList: result });
            }
        })
    },
    reviewContentAccepted: function (req, res) { // Chỉ lấy nội dung bài review đã được chấp nhận, và ai cũng được đọc
        if (req.body.review_id) {
            review_model.reviewContent(req.body.review_id, "Chấp nhận", null, function (err, result) {
                if (err) {
                    res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                }
                else if (result.length === 0) {
                    res.status(400).json({ message: "Bài review không tồn tại, hoặc đang chờ duyệt và do đó không được công khai!" });
                }
                else {
                    res.status(200).json({ review: result[0] });
                }
            })
        }
        else {
            res.status(400).json({ message: "Vui lòng gửi id bài review muốn đọc" });
        }

    },
    searchReviewAccepted: function (req, res) { // Chỉ tìm các bài review đã được chấp nhận, và ai cũng được tìm
        if (req.body.book_name) {
            review_model.searchReview(req.body.book_name, "Chấp nhận", null, function (err, result) {
                if (err) {
                    res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                }
                else if (result.length === 0) {
                    res.status(400).json({ message: "Bài review cần tìm không tồn tại, hoặc đang chờ duyệt và do đó không được công khai!" });
                }
                else {
                    res.status(200).json({ reviewList: result });
                }
            })
        }
        else {
            res.status(400).json({ message: "Vui lòng gửi tên sách có bài review muốn đọc!" });
        }
    },
    reviewListMember: [authorization_model.loadCurMember, authorization_model.authorizeCollaborator, function (req, res) {
        // Lấy danh sách các bài review của một thành viên cụ thể đã gửi lên, gồm cả các bài đang chờ duyệt hoặc đã bị từ chối
        // Do đó cần xác thực và chỉ lấy đúng của thành viên đã xác thực
        review_model.reviewList(null, req.cur_member.student_id, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
            }
            else {
                res.status(200).json({ reviewList: result });
            }
        })
    }],
    reviewContentMember: [authorization_model.loadCurMember, authorization_model.authorizeCollaborator, function (req, res) {
        // Lấy nội dung bài review của một thành viên cụ thể đã gửi lên, gồm cả các bài đang chờ duyệt hoặc đã bị từ chối
        // Do đó cần xác thực và chỉ lấy đúng của thành viên đã xác thực
        if (req.body.review_id) {
            review_model.reviewContent(req.body.review_id, null, req.cur_member.student_id, function (err, result) {
                if (err) {
                    res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                }
                else if (result.length === 0) {
                    res.status(400).json({ message: "Bài review không tồn tại, hoặc bạn không được xem bài review chưa được duyệt của người khác" });
                }
                else {
                    res.status(200).json({ review: result[0] });
                }
            })
        }
        else {
            res.status(400).json({ message: "Vui lòng gửi id bài review muốn đọc!" });
        }

    }],
    searchReviewMember: [authorization_model.loadCurMember, authorization_model.authorizeCollaborator, function (req, res) {
        // Tìm bài review của một thành viên cụ thể đã gửi lên, gồm cả các bài đang chờ duyệt hoặc đã bị từ chối
        // Do đó cần xác thực và chỉ lấy đúng của thành viên đã xác thực
        if (req.body.book_name) {
            review_model.searchReview(req.body.book_name, null, req.cur_member.student_id, function (err, result) {
                if (err) {
                    res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                }
                else if (result.length === 0) {
                    res.status(400).json({ message: "Bài review cần tìm không tồn tại, hoặc bạn không được tìm bài review chưa được duyệt của người khác" });
                }
                else {
                    res.status(200).json({ reviewList: result });
                }
            })
        }
        else {
            res.status(400).json({ message: "Vui lòng gửi tên sách có bài review muốn đọc!" });
        }
    }],
    reviewListAll: [authorization_model.loadCurMember, authorization_model.authorizeContentMember, function (req, res) {
        // Thành viên ban nội dung và chủ nhiệm thì được coi hết mọi thứ :)
        review_model.reviewList(null, null, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
            }
            else {
                res.status(200).json({ reviewList: result });
            }
        })
    }],
    reviewContentAll: [authorization_model.loadCurMember, authorization_model.authorizeContentMember, function (req, res) {
        // Thành viên ban nội dung và chủ nhiệm thì bài nào cũng coi được :)
        if (req.body.review_id) {
            review_model.reviewContent(req.body.review_id, null, null, function (err, result) {
                if (err) {
                    res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                }
                else if (result.length === 0) {
                    res.status(400).json({ message: "Bài review không tồn tại. Vui lòng kiểm tra" });
                }
                else {
                    res.status(200).json({ review: result[0] });
                }
            })
        }
        else {
            res.status(400).json({ message: "Vui lòng gửi id bài review muốn đọc!" });
        }

    }],
    searchReviewAll: [authorization_model.loadCurMember, authorization_model.authorizeContentMember, function (req, res) {
        // Thành viên ban nội dung và chủ nhiệm thì bài nào cũng tìm được :)
        if (req.body.book_name) {
            review_model.searchReview(req.body.book_name, null, null, function (err, result) {
                if (err) {
                    res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                }
                else if (result.length === 0) {
                    res.status(400).json({ message: "Bài review cần tìm không tồn tại" });
                }
                else {
                    res.status(200).json({ reviewList: result });
                }
            })
        }
        else {
            res.status(400).json({ message: "Vui lòng gửi tên sách có bài review muốn đọc!" });
        }
    }],
    submitNewReview: [authorization_model.loadCurMember, authorization_model.authorizeCollaborator, function (req, res) {
        let review = {
            title: req.body.title,
            book_name: req.body.book_name,
            book_author: req.body.book_author,
            summary: req.body.summary,
            content: req.body.content,
            image_url: req.body.image_url,
            student_id: req.cur_member.student_id
        };
        if (review_model.checkNoEmpty(review)) {
            review_model.submitNewReview(review, function (err, result) {
                if (err) {
                    res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                }
                else {
                    res.status(200).json({ message: "Gửi bài thành công. Vui lòng chờ duyệt" });
                }
            })
        }
        else {
            res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin cho bài review!" });
        }
    }],
    editReview: [authorization_model.loadCurMember, authorization_model.authorizeContentMember, function (req, res) {
        let review = {
            title: req.body.title,
            book_name: req.body.book_name,
            book_author: req.body.book_author,
            summary: req.body.summary,
            content: req.body.content,
            image_url: req.body.image_url,
            review_id: req.body.review_id
        };
        if (review_model.checkNoEmpty(review)) {
            review_model.reviewContent(req.body.review_id, null, null, function (err, result) {
                if (err) {
                    res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                }
                else if (result.length === 0) {
                    res.status(400).json({ message: "Bài review không tồn tại. Vui lòng kiểm tra" });
                }
                else {
                    review_model.editReview(review, function (err, result) {
                        if (err) {
                            res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                        }
                        else {
                            res.status(200).json({ message: "Chỉnh sửa bài thành công!" });
                        }
                    })
                }
            });

        }
        else {
            res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin cần chỉnh sửa cho bài review!" });
        }
    }],
    deleteReview: [authorization_model.loadCurMember, authorization_model.authorizeContentMember, function (req, res) {
        if (req.body.review_id) {
            review_model.reviewContent(req.body.review_id, null, null, function (err, result) {
                if (err) {
                    res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                }
                else if (result.length === 0) {
                    res.status(400).json({ message: "Bài review không tồn tại. Vui lòng kiểm tra" });
                }
                else {
                    review_model.deleteReview(req.body.review_id, function (err, result) {
                        if (err) {
                            res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                        }
                        else {
                            res.status(200).json({ message: "Xoá bài thành công!" });
                        }
                    })
                }
            });
        }
        else {
            res.status(400).json({ message: "Vui lòng gửi id bài review cần xoá!" });
        }
    }],
    acceptReview: [authorization_model.loadCurMember, authorization_model.authorizeContentMember, function (req, res) {
        if (req.body.review_id) {
            review_model.reviewContent(req.body.review_id, null, null, function (err, result) {
                if (err) {
                    res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                }
                else if (result.length === 0) {
                    res.status(400).json({ message: "Bài review không tồn tại. Vui lòng kiểm tra" });
                }
                else {
                    review_model.changeReviewStatus(req.body.review_id, "Chấp nhận", function (err, result) {
                        if (err) {
                            res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                        }
                        else {
                            res.status(200).json({ message: "Chấp nhận bài thành công!" });
                        }
                    })
                }
            });
        }
        else {
            res.status(400).json({ message: "Vui lòng gửi id bài review muốn chấp nhận" });
        }
    }],
    rejectReview: [authorization_model.loadCurMember, authorization_model.authorizeContentMember, function (req, res) {
        if (req.body.review_id) {
            review_model.reviewContent(req.body.review_id, null, null, function (err, result) {
                if (err) {
                    res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                }
                else if (result.length === 0) {
                    res.status(400).json({ message: "Bài review không tồn tại. Vui lòng kiểm tra" });
                }
                else {
                    review_model.changeReviewStatus(req.body.review_id, "Từ chối", function (err, result) {
                        if (err) {
                            res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                        }
                        else {
                            res.status(200).json({ message: "Từ chối bài thành công!" });
                        }
                    })
                }
            });
        }
        else {
            res.status(400).json({ message: "Vui lòng gửi id bài review muốn từ chối" });
        }
    }]
}