var mongoose = require('mongoose');
// var mongodb = require('../mongodb');
var Schema = new mongoose.Schema({
	//required 必填,default： 默认值,validate: 自定义匹配(指定一个函数参数为当前字段),min: 最小值(只适用于数字),max: 最大值(只适用于数字),
	//match: 正则匹配(只适用于字符串),	enum:  枚举匹配(只适用于字符串) unique: true 字段唯一
    loginname:{type:String,required:true,unique: true},
    password:{type:String,required:true},
    headimg:{ type: String, default: "" },
    name:{ type: String, default: ""},
    phone:{type:String,default:""},
    email:{type:String,default:""},
    sex:{type:Number,default:0},//0保密1男2女
    signature:{type:String,default:""},//个性签名
    creattime:{ type: Number, default: null },
    updatatime:{ type: Number, default: null },
    lastlogintime:{ type: Number, default: null },
    isvalid:{type:Number,default:1}//是否有效
  });

var sysuser = mongoose.model('sysuser',Schema);
//DAO
var PaperDAO = function(){};
PaperDAO.prototype.sysuser = sysuser;
//创建账号
PaperDAO.prototype.save = function(obj, callback){
	obj.creattime = Date.now();
    obj.updatatime = Date.now();
    obj.nickname = obj.loginid;
	var instance = new sysuser(obj);
	instance.save(function(err,data){
    var uinfo = data?{ 
      _id : data._doc._id,
      nickname :data._doc.nickname,
      headimg : data._doc.headimg
    }:"";
		callback(err,uinfo);
	});
}
//获取所有用户信息
PaperDAO.prototype.getAllUser = function(obj, callback){
	sysuser.find({},{ loginid:0,password:0 },callback(err, data));
}
//登录
PaperDAO.prototype.login = function(obj, callback){
  var param = {
    loginid:obj.loginid,
    password:obj.password
  }
  sysuser.findOne(param,{ loginid:0,password:0 },callback(err, data));
}

//根据id获取用户信息
PaperDAO.prototype.getUserInfo = function(obj, callback){
    sysuser.findOne({_id:obj.uid},{ loginid:0,password:0 },callback(err, data));
}

module.exports = new PaperDAO();