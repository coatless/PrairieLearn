var ERR = require('async-stacktrace');
var _ = require('lodash');
var path = require('path');
var csvStringify = require('csv').stringify;
var express = require('express');
var router = express.Router();

var logger = require('../../logger');
var sqldb = require('../../sqldb');
var sqlLoader = require('../../sql-loader');

var sql = sqlLoader.load(path.join(__dirname, 'userTests.sql'));

router.get('/', function(req, res, next) {
    var params = {
        courseInstanceId: res.locals.courseInstanceId,
        userId: res.locals.user.id,
        uid: res.locals.user.uid,
        mode: req.mode,
        role: res.locals.enrollment.role,
    };
    sqldb.query(sql.all, params, function(err, result) {
        if (ERR(err, next)) return;
        res.locals.rows = result.rows;
        res.render(path.join(__dirname, 'userTests'), res.locals);
    });
});

module.exports = router;