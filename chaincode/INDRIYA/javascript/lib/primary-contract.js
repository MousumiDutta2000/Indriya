/**
 * @author Satyajit Ghosh
 * @email satyajit.ghosh@stu.adamasuniversity.ac.in
 * @date 2022-10-13
 */
'use strict';
const { Contract } = require('fabric-contract-api');

class Patient {

    constructor(PID, firstName, lastName, age, phoneNumber, address, organRequired, bloodgroup, gender) {
        this.docType = 'patient';
        this.PID = PID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.organRequired = organRequired;
        this.bloodgroup = bloodgroup;
        this.gender = gender;
        return this;
    }
}

class PrimaryContract extends Contract{
async initLedger(ctx) {
    console.info('============= Initialize Ledger ===========');
}
// Patient already exists
async patientExists(ctx, PID) {
    const buffer = await ctx.stub.getState(PID);
    return (!!buffer && buffer.length > 0);
}
// Create a patient
async createPatient(ctx, args) {
    args = JSON.parse(args);
    console.log("creating patient");
    console.log(args);
    let newpatient = new Patient(
        args.PID,
        args.firstName,
        args.lastName,
        args.age,
        args.phoneNumber,
        args.address,
        args.bloodgroup,
        args.gender,
        args.organRequired
    );
    const exists = await this.patientExists(ctx, newpatient.PID);
    if (exists) {
        throw new Error(`The patient ${newpatient.PID} already exists`);
    }
    const buffer = Buffer.from(JSON.stringify(newpatient));
    await ctx.stub.putState(newpatient.PID, buffer);
}

//Read all patients
async queryAllPatients(ctx) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.docType = 'patient';
    const buffer = await this.getQueryResultForQueryString(ctx, JSON.stringify(queryString));
    let asset = JSON.parse(buffer.toString());
    return asset;
}
async getQueryResultForQueryString(ctx, queryString) {
    let resultsIterator = await ctx.stub.getQueryResult(queryString);
    console.info('getQueryResultForQueryString <--> ', resultsIterator);
    let results = await this.getAllPatientResults(resultsIterator, false);
    return JSON.stringify(results);
}
async getAllPatientResults(iterator, isHistory) {
    let allResults = [];
    while (true) {
        let res = await iterator.next();

        if (res.value && res.value.value.toString()) {
            let jsonRes = {};
            console.log(res.value.value.toString('utf8'));

            if (isHistory && isHistory === true) {
                jsonRes.Timestamp = res.value.timestamp;
            }
            jsonRes.Key = res.value.key;

            try {
                jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
            } catch (err) {
                console.log(err);
                jsonRes.Record = res.value.value.toString('utf8');
            }
            allResults.push(jsonRes);
        }
        if (res.done) {
            console.log('end of data');
            await iterator.close();
            console.info(allResults);
            return allResults;
        }
    }
}

}
module.exports = PrimaryContract;
