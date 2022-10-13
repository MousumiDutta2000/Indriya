/**
 * @author Satyajit Ghosh
 * @email satyajit.ghosh@stu.adamasuniversity.ac.in
 * @date 2022-10-12
 */
'use strict';
const { Contract } = require('fabric-contract-api');

class PrimaryContract extends Contract{
async initLedger(ctx) {
    console.info('============= Initialize Ledger ===========');
}
}
module.exports = PrimaryContract;
