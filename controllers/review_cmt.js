const review_model = require("../model/DAO/review");
const review_cmt_model = require("../model/DAO/review_cmt");
const authorization_model = require('../model/DAO/authorization');

module.exports = {
    // Lưu ý chỉ cộng tác viên trở lên mới có bình luận, không đăng nhập thì không có quyền gọi module này
    getCommentList: [authorization_model.loadCurMember, authorization_model.authorizeCollaborator, function (req, res) {
        // Lấy danh sách tất cả bình luận của một bài review 
        review_cmt_model.getComment(req.body.review_id, null, null, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Lỗi tải bình luận. Vui lòng thử lại sau!" });
            }
            else {
                res.status(200).json({ commentList: result });
            }
        })
    }],
    addComment: [authorization_model.loadCurMember, authorization_model.authorizeCollaborator, function (req, res) {
        // Thêm một bình luận mới vào một bài review đã chấp nhận
        // Sẽ kiểm tra xem bài review có tồn tại và được chấp nhận chưa trước khi thêm
        review_model.reviewContent(req.body.review_id, "Chấp nhận", null, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
            }
            else if (result.length === 0) {
                res.status(400).json({ message: "Không nhận bình luận do bài review không tồn tại, hoặc đang chờ duyệt và do đó không được công khai!" });
            }
            else {
                review_cmt_model.addNewComment(req.body.review_id, req.cur_member.student_id, req.body.cmt_content, function (err, result) {
                    if (err) {
                        res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                    }
                    else {
                        res.status(200).json({ message: "Gửi bình luận hoàn tất!", cmt_id: result.insertId });
                    }
                })
            }
        })
    }],
    editOwnComment: [authorization_model.loadCurMember, authorization_model.authorizeCollaborator, function (req, res) {
        // Cho phép một người dùng chỉnh sửa một bình luận của chính họ
        // Sẽ xác thực bình luận đúng là thuộc về người dùng trước khi chỉnh sửa
        review_cmt_model.getComment(req.body.review_id, req.cur_member.student_id, req.body.cmt_id, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Lỗi tải bình luận. Vui lòng thử lại sau!" });
            }
            else if (result.length === 0) {
                res.status(400).json({ message: "Bình luận cần chỉnh sửa không tồn tại hoặc không thuộc về bạn!" })
            }
            else {
                review_cmt_model.editComment(req.body.cmt_id, req.body.cmt_content, function (err, result) {
                    if (err) {
                        res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                    }
                    else {
                        res.status(200).json({ message: "Chỉnh sửa bình luận hoàn tất!" });
                    }
                })
            }
        })
    }],
    deleteOwnComment: [authorization_model.loadCurMember, authorization_model.authorizeCollaborator, function (req, res) {
        // Cho phép một người dùng xoá một bình luận của chính họ
        // Sẽ xác thực bình luận đúng là thuộc về người dùng trước khi xoá
        review_cmt_model.getComment(req.body.review_id, req.cur_member.student_id, req.body.cmt_id, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Lỗi tải bình luận. Vui lòng thử lại sau!" });
            }
            else if (result.length === 0) {
                res.status(400).json({ message: "Bình luận cần chỉnh sửa không tồn tại hoặc không thuộc về bạn!" })
            }
            else {
                review_cmt_model.deleteComment(req.body.cmt_id, function (err, result) {
                    if (err) {
                        res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                    }
                    else {
                        res.status(200).json({ message: "Xoá bình luận hoàn tất!" });
                    }
                })
            }
        })
    }],
    deleteCommentForced: [authorization_model.loadCurMember, authorization_model.authorizeClubMember, function (req, res) {
        // Tính năng cưỡng chế xoá bình luận của thành viên câu lạc bộ
        review_cmt_model.getComment(req.body.review_id, null, req.body.cmt_id, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Lỗi tải bình luận. Vui lòng thử lại sau!" });
            }
            else if (result.length === 0) {
                res.status(400).json({ message: "Bình luận cần chỉnh sửa không tồn tại" });
            }
            else {
                review_cmt_model.deleteComment(req.body.cmt_id, function (err, result) {
                    if (err) {
                        res.status(500).json({ message: "Có lỗi đã xảy ra. Vui lòng thử lại sau!" });
                    }
                    else {
                        res.status(200).json({ message: "Xoá bình luận hoàn tất!" });
                    }
                })
            }
        })
    }]
}