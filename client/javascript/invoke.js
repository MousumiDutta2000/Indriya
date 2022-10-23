/**
 * @author Satyajit Ghosh
 * @date 2022-09-17
 */
'use strict';

let contract;
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));
const session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
//============================================================
app.listen(3000, async () => {
    console.log("Started on PORT 3000");
    contract = await main();
    console.log(contract);
    console.log("Server Started Successfully");
})


async function main() {
    // load the network configuration
    const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get('appUser');
    if (!identity) {
        console.log('An identity for the user "appUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('INDRIYA');
    return contract;
}

app.get('/',(req,res)=>{
    res.render('login')
})

app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
    if(username=='admin' && password=='1234'){
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect('/admin');

    }else if(username=='hos1' && password=='1234'){
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect('/hos');
    }
    else{
        response.send('Incorrect Username and/or Password!');
        response.end();
    }
});

app.get('/admin', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin && request.session.username=='admin') {
		// Output username
		//response.send('Welcome back, ' + request.session.username + '!');

        response.render('admin')
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

app.get('/hos', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin && request.session.username=='hos1') {
		// Output username
		//response.send('Welcome back, ' + request.session.username + '!');

        response.render('hospital')
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});
app.get('/hos/registerpatient',function (request,response){
    	// If the user is loggedin
	if (request.session.loggedin && request.session.username=='hos1') {
		// Output username
		//response.send('Welcome back, ' + request.session.username + '!');

        response.render('addpatient')
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
})
app.get('/hos/match',async function (request,response){
        	// If the user is loggedin
	if (request.session.loggedin && request.session.username=='hos1') {
		// Output username
		//response.send('Welcome back, ' + request.session.username + '!');
        let info=JSON.parse(await queryAll('patient'));
        response.render('patientlist_hos',{"data":info})
        }else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
})
app.post('/createpatient', async (req, res) => {
    try {
        console.log(req.body)
        await createPatient(JSON.stringify(req.body));
        res.send(req.body.docType+" added sucessfully");
    } catch (error) {
        res.sendStatus(400);
    }
})
app.get('/admin/:type', async (req, res) => {
    try {
       let info=JSON.parse(await queryAll(req.params.type));
       if(req.params.type=='donor'){
           res.render('donorlist',{"data":info})
       }else if(req.params.type=='patient'){
        res.render('patientlist',{"data":info})
       }
      //  res.sendStatus(200)
    } catch (error) {
        res.sendStatus(404);
    }
})
app.get('/findmatch/:organRequired/:bloodgroup/:gender/:PID',async (req,res)=>{
    try{
        let info={"organRequired":req.params.organRequired,"bloodgroup":req.params.bloodgroup,"gender":req.params.gender}
        let data=JSON.parse(await match(info));
        data.Patient_ID=req.params.PID;
        res.render('matched_donor_list',{"data":data})
    }catch{
        res.sendStatus(404)
    }
})
app.get('/patient/:PID',async (req,res)=>{
    try{
        res.json(JSON.parse(await readPatient(req.params.PID)))
    }catch{
        res.sendStatus(404)
    }
})
app.get('/delete/:PID',async (req,res)=>{
    try {
        await deletePatient(req.params.PID);
        res.send("Sucessfully Deleted")
    } catch (error) {
        res.sendStatus(400);
    }
})
app.get('/selectmatch/:donorpid/:receiverpid',async(req,res)=>{
    try {
        let args={"Donor_PID":req.params.donorpid,
        "Receiver_PID":req.params.receiverpid};
        console.log(args)
        await selectMatch(args);
        res.render("matched_congo_page")
    } catch (error) {
        res.sendStatus(400);
    }
})

async function match(args){
    console.log(args)
    const result = await contract.evaluateTransaction('PrimaryContract:match',JSON.stringify(args))
    return result;
}
async function createPatient(args){
    console.log(args)
    await contract.submitTransaction('PrimaryContract:createPatient', args)
    console.log('PrimaryContract:createPatient-Transaction has been submitted');
}
async function queryAll(docType){
    const result = await contract.evaluateTransaction('PrimaryContract:queryAll',docType);
    console.log(`PrimaryContract:queryAll-Transaction has been evaluated, result is: ${result.toString()}`);
    return result;
}
async function deletePatient(PID){
    await contract.submitTransaction('PrimaryContract:deletePatient',PID);
    console.log('PrimaryContract:deletePatient-Transaction has been submitted');
}
async function readPatient(PID){
    const result = await contract.evaluateTransaction('PrimaryContract:readPatient',PID);
    console.log(`PrimaryContract:queryAll-Transaction has been evaluated, result is: ${result.toString()}`);
    return result;
}
async function selectMatch(args){
    await contract.submitTransaction('PrimaryContract:selectMatch',JSON.stringify(args));
    console.log('PrimaryContract:selectMatch-Transaction has been submitted');
}