import express from 'express';
import Users from '../controllers/users';
import Transactions from '../controllers/transaction';
import CreditEligibility from '../controllers/creditEligibility';
import Authorization from '../helpers/Authorization';

const router = express.Router();

router.post('/auth/manufacturer', Users.manufacturerLogin);
router.post('/auth/bank', Users.bankLogin);
router.post('/distributor', Users.distrSignup);
router.post('/auth/distributor', Users.distrLogin);

router.get('/bank', Transactions.getBankTransactions);
router.get('/manufacturer', Transactions.getManufacturerTransactions);
router.get('/manufacturer/pending', Transactions.getPendingManufacturerTransactions);
router.get('/manufacturer/approved', Transactions.getApprovedManufacturerTransactions);
router.get('/manufacturer/delivered', Transactions.getDeliveredManufacturerTransactions);
router.get('/distributor/:distributorid', Transactions.getDistributorTransactions);
router.post('/transaction', Authorization.authorize, Transactions.createOrder);
router.patch('/transaction/:id', Authorization.authorize, Transactions.acceptOrDeclineTransactions);
router.patch('/transaction/cash/:id', Transactions.cashTransafer);

router.get('/eligibility/:id', Authorization.authorize, CreditEligibility.eligible);
router.get('/eligibility', Authorization.authorize, CreditEligibility.allEligible);

export default router;
