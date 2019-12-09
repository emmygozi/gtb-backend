import express from 'express';
import Users from '../controllers/users';
import Transactions from '../controllers/transaction';

const router = express.Router();

router.post('/auth/manufacturer', Users.manufacturerLogin);
router.post('/auth/bank', Users.bankLogin);
router.post('/distributor', Users.distrSignup);
router.post('/auth/distributor', Users.distrLogin);

router.get('/bank', Transactions.getBankTransactions);
router.get('/manufacturer', Transactions.getManufacturerTransactions);
router.get('/distributor/:distributorid', Transactions.getDistributorTransactions);
router.post('/transaction', Transactions.createOrder);
router.patch('/distributor/:id', Transactions.acceptOrDeclineTransactions);
router.patch('/distributor/cash/:id', Transactions.cashTransafer);

export default router;
