var connect_DB = require('./connect_db');
var mysql = require("mysql");

function checkNoEmpty(obj) {
    if (obj == null || typeof obj !== 'object' || JSON.stringify(obj) === '{}') return false;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
                return false;
            }
        }
    }
    return true;
}

function reviewList(review_status, student_id, controller) {
    let sql = `
    SELECT reviews.review_id, reviews.title, reviews.book_name, reviews.book_author, reviews.summary, reviews.image_url, reviews.submit_date, reviews.status, members.student_id, members.student_name, members.avatar_url
    FROM reviews INNER JOIN members
    ON reviews.student_id = members.student_id
    `;
    if (review_status) {
        sql += ` WHERE reviews.status = "${review_status}"`;
    }
    else if (student_id) {
        sql += ` WHERE reviews.student_id = ${student_id}`;
    }
    sql += " ORDER BY reviews.submit_date DESC";
    connect_DB.query(sql, function (err, result) {
        controller(err, result);
    })
}

function reviewContent(review_id, review_status, student_id, controller) {
    let sql = `
    SELECT reviews.review_id, reviews.title, reviews.book_name, reviews.book_author, reviews.summary, reviews.content, reviews.image_url, reviews.submit_date, reviews.status, members.student_name, members.avatar_url
    FROM reviews INNER JOIN members 
    ON reviews.student_id = members.student_id 
    WHERE reviews.review_id = ?
    `;
    if (review_status) {
        sql += ` AND reviews.status = "${review_status}"`;
    }
    else if (student_id) {
        sql += ` AND reviews.student_id = ${student_id}`;
    }
    connect_DB.query(sql, [review_id], function (err, result) {
        controller(err, result);
    })
}

function searchReview(book_name, review_status, student_id, controller) {
    let sql = `
    SELECT reviews.review_id, reviews.title, reviews.book_name, reviews.book_author, reviews.summary, reviews.image_url, reviews.submit_date, reviews.status, members.student_name
    FROM reviews INNER JOIN members
    ON reviews.student_id = members.student_id
    WHERE reviews.book_name LIKE "%${mysql.escape(book_name)}%"
    `;
    if (review_status) {
        sql += ` AND reviews.status = "${review_status}"`;
    }
    else if (student_id) {
        sql += ` AND reviews.student_id = ${student_id}`;
    }
    connect_DB.query(sql, function (err, result) {
        controller(err, result);
    })
}

function submitNewReview(review, controller) {
    let sql = `
    INSERT INTO reviews (title, book_name, book_author, summary, content, image_url, submit_date, status, student_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    let currentDate = new Date().toJSON().slice(0, 10);
    connect_DB.query(sql, [
        review.title,
        review.book_name,
        review.book_author,
        review.summary,
        review.content,
        review.image_url,
        currentDate,
        "Chờ duyệt",
        review.student_id
    ], function (err, result) {
        controller(err, result);
    });
}

function editReview(review, controller) {
    let sql = `
    UPDATE reviews
    SET title = ?, book_name = ?, book_author = ?, summary = ?, content = ?, image_url = ?
    WHERE review_id = ?
    `;
    connect_DB.query(sql, [
        review.title,
        review.book_name,
        review.book_author,
        review.summary,
        review.content,
        review.image_url,
        review.review_id
    ], function (err, result) {
        controller(err, result);
    });
}

function deleteReview(review_id, controller) {
    let sql = "DELETE FROM reviews WHERE review_id = ?";
    connect_DB.query(sql, [review_id], function (err, result) {
        controller(err, result);
    })
}

function changeReviewStatus(review_id, review_status, controller) {
    let sql = "UPDATE reviews SET status = ? WHERE review_id = ?";
    connect_DB.query(sql, [review_status, review_id], function (err, result) {
        controller(err, result);
    })
}

module.exports = {
    checkNoEmpty,
    reviewList,
    reviewContent,
    searchReview,
    submitNewReview,
    editReview,
    deleteReview,
    changeReviewStatus
}