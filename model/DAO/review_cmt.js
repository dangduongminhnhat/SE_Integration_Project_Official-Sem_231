var connect_DB = require('./connect_db');
var mysql = require("mysql");

function getComment(review_id, student_id, cmt_id, controller) {
    let sql = `
    SELECT reviews_comments.*, members.student_name, members.avatar_url
    FROM reviews_comments INNER JOIN members
    ON reviews_comments.student_id = members.student_id
    WHERE reviews_comments.review_id = ? 
    `;
    if (student_id) {
        sql += ` AND reviews_comments.student_id = "${mysql.escape(student_id)}"`;
    }
    if (cmt_id) {
        sql += ` AND reviews_comments.cmt_id = "${mysql.escape(cmt_id)}"`
    }
    sql += " ORDER BY reviews_comments.cmt_datetime DESC";
    connect_DB.query(sql, [review_id], function (err, result) {
        controller(err, result);
    })
}

function addNewComment(review_id, student_id, cmt_content, controller) {
    let sql = `
    INSERT INTO reviews_comments (student_id, review_id, cmt_content)
    VALUES (?, ?, ?)
    `;
    connect_DB.query(sql, [
        student_id,
        review_id,
        cmt_content
    ], function (err, result) {
        controller(err, result);
    });
}

function editComment(cmt_id, cmt_content, controller) {
    let sql = `
    UPDATE reviews_comments
    SET cmt_content = ?
    WHERE cmt_id = ?
    `;
    connect_DB.query(sql, [
        cmt_content,
        cmt_id
    ], function (err, result) {
        controller(err, result);
    })
}

function deleteComment(cmt_id, controller) {
    connect_DB.query("DELETE FROM reviews_comments WHERE cmt_id = ?", [cmt_id], function (err, result) {
        controller(err, result);
    })
}

module.exports = {
    getComment,
    addNewComment,
    editComment,
    deleteComment
}