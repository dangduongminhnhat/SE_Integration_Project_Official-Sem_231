const document_model = require("../model/DAO/documents");

module.exports = {
  getDocList: function (req, res) {
    document_model.getDocList(res);
  },
  searchDoc: function (req, res) {
    let obj_id = {
      document_id: req.query.document_id
    };
    let obj_name = {
      doc_name: req.query.doc_name
    };
    let obj_type = {
      type: req.query.type
    };
    if (document_model.checkEmpty(obj_id) && document_model.checkEmpty(obj_name) && document_model.checkEmpty(obj_type)) {
      return res.status(400).json({ message: 'Không có thông tin tài liệu' });
    }
    
    document_model.searchDoc(res, req.query.document_id, req.query.doc_name, req.query.type);
  },
  getDocDetail: function (req, res) {
    let obj = {
      document_id: req.query.document_id
    };
    if (document_model.checkEmpty(obj)) {
      return res.status(400).json({ message: 'Không có ID tài liệu' });
    }
    
    document_model.getDocDetail(res, req.query.document_id);
  },
  addDoc: function (req, res) {
    let obj = {
      doc_name: req.body.doc_name,
      type: req.body.type,
      author: req.body.author,
      publisher: req.body.publisher,
      publish_year: req.body.publish_year,
      quantity: req.body.quantity,
      description: req.body.description,
      image_url: req.body.image_url
    };
    if (document_model.checkEmpty(obj)) {
      return res.status(400).json({ message: 'Thông tin tài liệu không đầy đủ. Vui lòng bổ sung' });
    }
    
    document_model.addDoc(res, obj);
  },
  updateDoc: function (req, res) {
    // For unchanged fields, old data should be submmited. Do not let any field empty
    let obj = {
      doc_name: req.body.doc_name,
      type: req.body.type,
      author: req.body.author,
      publisher: req.body.publisher,
      publish_year: req.body.publish_year,
      quantity: req.body.quantity,
      description: req.body.description,
      document_id: req.body.document_id,
      description: req.body.description,
      image_url: req.body.image_url
    };
    if (document_model.checkEmpty(obj)) {
      return res.status(400).json({ message: 'Thông tin tài liệu không đầy đủ. Vui lòng bổ sung' });
    }
    
    document_model.updateDoc(res, obj);
  },
  deleteDoc: function (req, res) {
    let obj = {
      document_id: req.query.document_id,
    };
    if (document_model.checkEmpty(obj)) {
      res.status(400).json({ message: 'Không có ID tài liệu' });
    }
    else {
      document_model.deleteDoc(res, req.query.document_id);
    }
  }
};