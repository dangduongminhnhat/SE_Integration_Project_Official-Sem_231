var connect_DB = require('./connect_db')

// function getUserList(res) {
//     connect_DB.query("CALL view_users_list()", function (err, result, fields) {
//         if (err) res.json({ 500: "Database Error: Cannot fetch from database"});
//         else res.json({userList: JSON.stringify(result[0])});
//     });
// }

function getUserList(res) {
    connect_DB.query("SELECT * FROM members", function (err, result, fields){
        if (err) res.json({500: "Database Error: Cannot fetch from database"});
        else res.json({userList: JSON.stringify(result)});
    });
}

function getUserSearch(req, res) {
    const search_term = req.query.term;
    connect_DB.query("CALL search_user(" + search_term + ")", function (err, result, fields) {
        if (err) res.json({ 500: "Database Error: Cannot fetch from database" });
        else res.json({ userList: JSON.stringify(result[0]) });
    });
}

function getUserDetail(req, res) {
    const id = req.query.id;
    connect_DB.query("CALL get_user_by_id(" + id + ")", function (err, result, fields) {
        if (err) res.json({ 500: "Database Error: Cannot fetch from database" });
        else res.json({ user: JSON.stringify(result[0][0]) });
    });
}

function blockUser(req, res) {
    const value = req.query.value;
    const id = req.query.id;
    if (value == 1) {
        connect_DB.query("UPDATE members SET state = 'Đã bị khóa' WHERE student_id = " + id, function (err, result, fields) {
            if (err) res.json({500: "Database Error: Cannot fetch from database"});
            else res.json({300: "OK"});
        });
    }
    else {
        connect_DB.query("UPDATE members SET state = 'Đang hoạt động' WHERE student_id = " + id, function (err, result, fields) {
            if (err) res.json({500: "Database Error: Cannot fetch from database"});
            else res.json({300: "OK"});
        });
    }
    
}

function changePermission(req, res) {
    const id = req.query.id;
    const role = req.query.role;

    connect_DB.query("UPDATE members SET permission = " + role + " WHERE student_id = " + id, function (err, result, fields) {
        if (err) res.json({500: "Database Error: Cannot fetch from database"});
        else res.json({300: "OK"});
    });
}

module.exports = { getUserList, getUserSearch, getUserDetail, blockUser, changePermission};
