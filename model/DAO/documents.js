var connect_DB = require("./connect_db");
var mysql = require("mysql");

function checkEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
        return true;
      }
    }
  }
  return false;
}

function getDocList(res) {
  connect_DB.query("SELECT * FROM documents", function (err, result, fields) {
    if (err) {
      return res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau." });
    }
    
    if (result.length == 0) {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu về tài liệu." });
    }
    
    res.json({ docList: result });
  });
}

function searchDoc(res, document_id, doc_name, type) {
  // let sql = "SELECT * FROM documents WHERE ";
  // if (document_id) {
  //   sql += "document_id = ";
  //   sql += mysql.escape(document_id);
  // }
  // if (doc_name) {
  //   if (document_id) sql += " AND ";
  //   sql += "doc_name = ";
  //   sql += mysql.escape(doc_name);
  // }
  // if (type) {
  //   if (document_id || doc_name) sql += " AND ";
  //   sql += "type = ";
  //   sql += mysql.escape(type);
  // }
  let escapedDocName = mysql.escape(doc_name);
  let sql = `SELECT * FROM documents WHERE LOWER(doc_name) LIKE LOWER('%${escapedDocName.slice(1, escapedDocName.length - 1)}%')`;
  connect_DB.query(sql, function (err, result, fields) {
    if (err) {
      return res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau." });
    }
    
    if (result.length == 0) {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu về tài liệu được yêu cầu." });
    }
    
    res.json({ docList: result });
  });
}

function getDocDetail(res, document_id) {
  connect_DB.query("SELECT * FROM documents WHERE document_id = ?", [document_id], function (err, result, fields) {
    if (err) {
      return res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau." });
    }
    
    if (result.length == 0) {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu về tài liệu được yêu cầu." });
    }
    
    res.json({ docDetail: result[0] });
  });
}

function addDoc(res, document) {
  let sql = "INSERT INTO documents (doc_name, type, author, publisher, publish_year, quantity, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connect_DB.query(sql,
    [
      document.doc_name,
      document.type,
      document.author,
      document.publisher,
      document.publish_year,
      document.quantity,
      document.description,
      document.image_url
    ],
    function (err, result) {
      if (err) {
        return res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau." });
      }
      
      res.json({ message: "Thêm tài liệu thành công." });
    }
  );
}

function updateDoc(res, document) {
  connect_DB.query("SELECT * FROM documents WHERE document_id = ?", [document.document_id], function (err, result, fields) {
    if (err) {
      return res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau." });
    }
    
    if (result.length == 0) {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu về tài liệu được yêu cầu." });
    }
    
    let sql = "UPDATE documents SET doc_name = ?, type = ?, author = ?, publisher = ?, publish_year = ?, quantity = ?, description = ?, image_url = ? WHERE document_id = ?";
    connect_DB.query(sql,
      [
        document.doc_name,
        document.type,
        document.author,
        document.publisher,
        document.publish_year,
        document.quantity,
        document.description,
        document.image_url,
        document.document_id
      ],
      function (err, result) {
        if (err) {
          return res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau." });
        }
        
        res.json({ message: "Sửa tài liệu thành công." });
      }
    );
  });
}

function deleteDoc(res, document_id) {
  connect_DB.query("SELECT * FROM documents WHERE document_id = ?", [document_id], function (err, result, fields) {
    if (err) {
      return res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau." });
    }
    
    if (result.length == 0) {
      return res.status(400).json({ message: "Không tìm thấy dữ liệu về tài liệu được yêu cầu xóa." });
    }
    
    connect_DB.query("DELETE FROM documents WHERE document_id = ?", [document_id], function (err, result) {
      if (err) {
        return res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau." });
      }
      
      res.json({ message: "Xóa thành công" });
    });
  });
}

module.exports = {
  getDocList,
  searchDoc,
  getDocDetail,
  checkEmpty,
  addDoc,
  updateDoc,
  deleteDoc,
};