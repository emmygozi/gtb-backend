"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _transaction = _interopRequireDefault(require("../controllers/transaction"));

var _creditEligibility = _interopRequireDefault(require("../controllers/creditEligibility"));

var _Authorization = _interopRequireDefault(require("../helpers/Authorization"));

const router = _express.default.Router();

router.post('/auth/manufacturer', _users.default.manufacturerLogin);
router.post('/auth/bank', _users.default.bankLogin);
router.post('/distributor', _users.default.distrSignup);
router.post('/auth/distributor', _users.default.distrLogin);
router.get('/bank', _transaction.default.getBankTransactions);
router.get('/manufacturer', _transaction.default.getManufacturerTransactions);
router.get('/distributor/:distributorid', _transaction.default.getDistributorTransactions);
router.post('/transaction', _Authorization.default.authorize, _transaction.default.createOrder);
router.patch('/transaction/:id', _Authorization.default.authorize, _transaction.default.acceptOrDeclineTransactions);
router.patch('/transaction/cash/:id', _transaction.default.cashTransafer);
router.get('/eligibility/:id', _Authorization.default.authorize, _creditEligibility.default.eligible);
router.get('/eligibility', _Authorization.default.authorize, _creditEligibility.default.allEligible);
var _default = router;
exports.default = _default;