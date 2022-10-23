/**
 * @author Satyajit Ghosh
 * @email satyajit.ghosh@stu.adamasuniversity.ac.in
 * @date 2022-10-13
 */
'use strict';
const { Contract } = require('fabric-contract-api');

class Patient {

    constructor(docType,PID, firstName, lastName, age, phoneNumber, address, organRequired, bloodgroup, gender,medhistory) {
        this.docType = docType;
        this.PID = PID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.organRequired = organRequired;
        this.bloodgroup = bloodgroup;
        this.gender = gender;
        this.medhistory=medhistory;
        this.match=[];
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
        args.docType,
        args.PID,
        args.firstName,
        args.lastName,
        args.age,
        args.phoneNumber,
        args.address,
        args.organRequired,
        args.bloodgroup,
        args.gender,
        args.medhistory
    );
    const exists = await this.patientExists(ctx, newpatient.PID);
    if (exists) {
        throw new Error(`The patient ${newpatient.PID} already exists`);
    }
    const buffer = Buffer.from(JSON.stringify(newpatient));
    await ctx.stub.putState(newpatient.PID, buffer);
}

//Read all patients
async queryAll(ctx,docType) {
    let queryString = {};
    queryString.selector = {};
    if(docType=='patient'){
        queryString.selector.docType = 'patient';
    }else if(docType=='donor'){
        queryString.selector.docType = 'donor';
    }
    const buffer = await this.getQueryResultForQueryString(ctx, JSON.stringify(queryString));
    let asset = JSON.parse(buffer.toString());
    return asset;
}
async getQueryResultForQueryString(ctx, queryString) {
    let resultsIterator = await ctx.stub.getQueryResult(queryString);
    console.info('getQueryResultForQueryString <--> ', resultsIterator);
    let results = await this.getAllResults(resultsIterator, false);
    return JSON.stringify(results);
}
async getAllResults(iterator, isHistory) {
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
    async match(ctx,args){
        args=JSON.parse(args)
        let organRequired=args.organRequired
        let bloodgroup=args.bloodgroup
        let gender=args.gender
        let allPatients=await this.queryAll(ctx)
        let matches=[]
        for(let i=0;i<allPatients.length;i++){
            let p=allPatients[i]
            if(p.Record.docType=='donor' && p.Record.bloodgroup==bloodgroup && p.Record.organRequired==organRequired && p.Record.gender==gender){
                matches.push(p)
            }
        }
        return matches
    }

    async deletePatient(ctx, PID) {
        const exists = await this.patientExists(ctx, PID);
        if (!exists) {
            throw new Error(`The patient ${PID} does not exist`);
        }
        await ctx.stub.deleteState(PID);
    }

    async readPatient(ctx, PID) {
        const exists = await this.patientExists(ctx, PID);
        if (!exists) {
            throw new Error(`The patient ${PID} does not exist`);
        }

        const buffer = await ctx.stub.getState(PID);
        let asset = JSON.parse(buffer.toString());
        return asset;
    }
    async selectMatch(ctx,args){
        args=JSON.parse(args);
        let Donor_PID=args.Donor_PID;
        let Receiver_PID=args.Receiver_PID;
        let buffer1 = await ctx.stub.getState(Donor_PID);
        let asset1 = JSON.parse(buffer1.toString());

        let buffer2 = await ctx.stub.getState(Receiver_PID);
        let asset2 = JSON.parse(buffer2.toString());

        asset2.match=asset1.PID;
        asset1.match=asset2.PID;

        console.log(asset1)
        console.log(asset2)
        
        buffer1 = Buffer.from(JSON.stringify(asset2));
        buffer2=Buffer.from(JSON.stringify(asset1));
        await ctx.stub.putState(asset2.PID, buffer1);
        await ctx.stub.putState(asset1.PID, buffer2);
    }

}
module.exports = PrimaryContract;
