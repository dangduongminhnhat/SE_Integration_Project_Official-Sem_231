var connect_DB = require('./connect_db')

function getPostList(res) {
    connect_DB.query("SELECT student_id, student_name, post_id, title, brief, create_date, last_change FROM (posts NATURAL JOIN members)", function (err, result, fields) {
        if (err) res.json({ 500: "Database Error: Cannot fetch from database"});
        else res.json({postList: JSON.stringify(result)});
    });
}

function getPost (req, res) {
    var id = req.query.id;
    connect_DB.query(`SELECT * FROM posts WHERE post_id = ${id}`, function (err, postResult, fields) {
        if (err) res.status(500).json({ error: "Database Error: Cannot fetch post from the database" });
        else res.json({postDetail: JSON.stringify(postResult)})
    });
}

function createPost(req, res) {
    var title = req.body.title;
    var brief = req.body.brief;
    var content = req.body.content;
    var student_id = req.cur_member.student_id;
    const create_date = new Date().toISOString().split('T')[0];

    connect_DB.query(`INSERT INTO posts(student_id, title, brief, content, create_date) VALUES (${student_id}, "${title}", "${brief}", "${content}" ,"${create_date}")`, function (err, result, fields) {
        if (err) res.json({ 500: "Database Error: Cannot insert into database"});
        else res.json({ 300: "OK"});
    });
}

function editPost(req, res) {
    var id = req.query.id;
    var title = req.query.title;
    var brief = req.query.brief;
    var content = req.query.content;
    const last_change = new Date().toISOString().split('T')[0];
  
    connect_DB.query(`UPDATE posts SET title = ${title}, brief = ${brief}, content = ${content}, last_change = "${last_change}" WHERE post_id = ${id}`, function (err, result, fields) {
        if (err) res.json({ 500: "Database Error: Cannot update database" });
        else res.json({ 300: "OK" });
    });
}

function deletePost(req, res) {
    var id = req.query.id;

    connect_DB.query(`DELETE FROM posts WHERE post_id = ${id}`, function (err, result, fields) {
        if (err) res.json({ 500: "Database Error: Cannot delete from database" });
        else res.json({ 300: "OK" });
    });
}

function getCommentList(req, res) {
    var id = req.query.id

    connect_DB.query(`SELECT cmt_id, content, student_name, avatar_url, last_change FROM (post_comments NATURAL JOIN members) WHERE post_id = ${id}`, function (err, result, fields) {
        if (err) res.json({ 500: "Database Error: Cannot delete from database" });
        else res.json({commentList: JSON.stringify(result) });
    });
}

function createPostcmt(req, res) {
    var post_id = req.body.id;
    var student_id = req.cur_member.student_id;
    var content = req.body.content;
    const last_change = new Date().toISOString().split('T')[0];

    connect_DB.query(`INSERT INTO post_comments(post_id, student_id, content, last_change) VALUES (${post_id}, ${student_id}, "${content}" ,"${last_change}")`, function (err, result, fields) {
        if (err) res.json({ 500: "Database Error: post_id or student_id is not exist" });
        else res.json({ 300: "OK" });
    });
}

function editPostcmt(req, res) {
    var id = req.query.id;
    var content = req.query.content;
    const last_change = new Date().toISOString().split('T')[0];

    connect_DB.query(`UPDATE post_comments SET content = "${content}", last_change = "${last_change}" WHERE cmt_id = ${id}`, function (err, result, fields) {
        if (err) res.json({ 500: "Database Error: Cannot update database" });
        else res.json({ 300: "OK" });
    });
}

function deletePostcmt(req, res) {
    var id = req.query.id;

    connect_DB.query(`DELETE FROM post_comments WHERE cmt_id = ${id}`, function (err, result, fields) {
        if (err) res.json({ 500: "Database Error: Cannot delete from database" });
        else res.json({ 300: "OK" });
    });
}


module.exports = { getPostList, getPost, createPost, editPost, deletePost, getCommentList, createPostcmt, editPostcmt, deletePostcmt};