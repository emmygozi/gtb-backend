"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../db/config"));

class CreditEligbility {
  static async eligible(req, res) {
    const {
      id
    } = req.params;
    const accountQuery = {
      text: `select accountno, accountname, bvn, accountbalance, averageinflow, averageoutflow, 
            age, returnedchequecount, taxid, minmonthlodgement, minqtlodgement, classificationname, 
            yearlyturnover from account where id='${id}'`
    };
    const accountDetails = await _config.default.query(accountQuery);
    const {
      age,
      returnedchequecount,
      taxid,
      minmonthlodgement,
      minqtlodgement,
      classificationname,
      yearlyturnover
    } = accountDetails.rows[0];
    console.log(accountDetails.rows[0]);
    let agerating = 0;
    let returnedchequerating = 0;
    let classrating = 0;
    let taxidrating = 0;
    let yearlyturnoverrating = 0;
    let minmtlodgementrating = 0;
    let minqtlodgementrating = 0; // age

    if (age > 5) {
      agerating = 5;
    } else if (age < 5 && age > 1) {
      agerating = 4; // eslint-disable-next-line eqeqeq
    } else if (age == 1) {
      agerating = 3;
    } else if (age < 1 && age > 0.5) {
      agerating = 2;
    } else if (age < 0.5) {
      agerating = 1;
    } // returned cheque count
    // eslint-disable-next-line eqeqeq


    if (returnedchequecount == 0) {
      returnedchequerating = 5;
    } else if (returnedchequecount > 0) {
      returnedchequerating = 1;
    } // smes
    // eslint-disable-next-line eqeqeq


    if (classificationname == 'SME') {
      classrating = 5;
    } else {
      classrating = 1;
    } // taxid


    if (taxid.endsWith('0001')) {
      taxidrating = 5;
    } else {
      taxidrating = 1;
    } // minmonthlodgement


    const avgmtturnover = yearlyturnover / 12;
    const reqminmtlodgement = avgmtturnover * (30 / 100);

    if (minmonthlodgement > reqminmtlodgement) {
      minmtlodgementrating = 5; // eslint-disable-next-line eqeqeq
    } else if (minmonthlodgement == reqminmtlodgement) {
      minmtlodgementrating = 2;
    } else if (minmonthlodgement < reqminmtlodgement) {
      minmtlodgementrating = 1;
    } // minquarterlodgement


    const avgqtturnover = yearlyturnover / 4;
    const reqminqtlodgement = avgqtturnover * (30 / 100);

    if (minqtlodgement > reqminqtlodgement) {
      minqtlodgementrating = 5; // eslint-disable-next-line eqeqeq
    } else if (minqtlodgement == reqminqtlodgement) {
      minqtlodgementrating = 2;
    } else if (minqtlodgement < reqminqtlodgement) {
      minqtlodgementrating = 1;
    } // 12 month turnover


    if (yearlyturnover > 1500000) {
      yearlyturnoverrating = 5;
    } else if (yearlyturnover > 500000 && yearlyturnover < 1500000) {
      yearlyturnoverrating = 4; // eslint-disable-next-line eqeqeq
    } else if (yearlyturnover == 500000) {
      yearlyturnoverrating = 3;
    } else if (yearlyturnover < 500000 && yearlyturnover > 250000) {
      yearlyturnoverrating = 2;
    } else if (yearlyturnover < 250000) {
      yearlyturnoverrating = 1;
    }

    const overallrating = (agerating + returnedchequerating + classrating + taxidrating + yearlyturnoverrating + minmtlodgementrating + minqtlodgementrating) / 7;
    const ratings = {
      agerating,
      returnedchequerating,
      classrating,
      taxidrating,
      yearlyturnoverrating,
      minmtlodgementrating,
      minqtlodgementrating,
      overallrating
    };
    res.status(200).json({
      status: 200,
      data: ratings
    });
  }

  static async allEligible(req, res) {
    const accountQuery = {
      text: `select a.name distributor, accountno, accountname, bvn, accountbalance, 
      averageinflow, averageoutflow, age, returnedchequecount, taxid, minmonthlodgement, 
      minqtlodgement, classificationname,  yearlyturnover from distributors a, account b where a.accountid=b.id
      `
    };
    const ratings = [];
    const accountDetails = await _config.default.query(accountQuery); // eslint-disable-next-line no-plusplus

    for (let i = 0; i < accountDetails.rows.length; i++) {
      const {
        accountno,
        accountname,
        age,
        returnedchequecount,
        taxid,
        minmonthlodgement,
        minqtlodgement,
        classificationname,
        yearlyturnover
      } = accountDetails.rows[i];
      console.log(accountDetails.rows[i]);
      let agerating = 0;
      let returnedchequerating = 0;
      let classrating = 0;
      let taxidrating = 0;
      let yearlyturnoverrating = 0;
      let minmtlodgementrating = 0;
      let minqtlodgementrating = 0; // age

      if (age > 5) {
        agerating = 5;
      } else if (age < 5 && age > 1) {
        agerating = 4; // eslint-disable-next-line eqeqeq
      } else if (age == 1) {
        agerating = 3;
      } else if (age < 1 && age > 0.5) {
        agerating = 2;
      } else if (age < 0.5) {
        agerating = 1;
      } // returned cheque count
      // eslint-disable-next-line eqeqeq


      if (returnedchequecount == 0) {
        returnedchequerating = 5;
      } else if (returnedchequecount > 0) {
        returnedchequerating = 1;
      } // smes
      // eslint-disable-next-line eqeqeq


      if (classificationname == 'SME') {
        classrating = 5;
      } else {
        classrating = 1;
      } // taxid


      if (taxid.endsWith('0001')) {
        taxidrating = 5;
      } else {
        taxidrating = 1;
      } // minmonthlodgement


      const avgmtturnover = yearlyturnover / 12;
      const reqminmtlodgement = avgmtturnover * (30 / 100);

      if (minmonthlodgement > reqminmtlodgement) {
        minmtlodgementrating = 5; // eslint-disable-next-line eqeqeq
      } else if (minmonthlodgement == reqminmtlodgement) {
        minmtlodgementrating = 2;
      } else if (minmonthlodgement < reqminmtlodgement) {
        minmtlodgementrating = 1;
      } // minquarterlodgement


      const avgqtturnover = yearlyturnover / 4;
      const reqminqtlodgement = avgqtturnover * (30 / 100);

      if (minqtlodgement > reqminqtlodgement) {
        minqtlodgementrating = 5; // eslint-disable-next-line eqeqeq
      } else if (minqtlodgement == reqminqtlodgement) {
        minqtlodgementrating = 2;
      } else if (minqtlodgement < reqminqtlodgement) {
        minqtlodgementrating = 1;
      } // 12 month turnover


      if (yearlyturnover > 1500000) {
        yearlyturnoverrating = 5;
      } else if (yearlyturnover > 500000 && yearlyturnover < 1500000) {
        yearlyturnoverrating = 4; // eslint-disable-next-line eqeqeq
      } else if (yearlyturnover == 500000) {
        yearlyturnoverrating = 3;
      } else if (yearlyturnover < 500000 && yearlyturnover > 250000) {
        yearlyturnoverrating = 2;
      } else if (yearlyturnover < 250000) {
        yearlyturnoverrating = 1;
      }

      const overallrating = [];
      overallrating.push((agerating + returnedchequerating + classrating + taxidrating + yearlyturnoverrating + minmtlodgementrating + minqtlodgementrating) / 7);
      ratings.push({
        accountno,
        accountname,
        agerating,
        returnedchequerating,
        classrating,
        taxidrating,
        yearlyturnoverrating,
        minmtlodgementrating,
        minqtlodgementrating,
        overallrating
      });
    }

    res.status(200).json({
      status: 200,
      data: ratings
    });
  }

}

var _default = CreditEligbility;
exports.default = _default;