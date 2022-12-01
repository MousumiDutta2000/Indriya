# Indriya

Indriya: Organ Donation and Transplantation System using Blockchain

Demo Video : https://youtu.be/0kyaSlfcbNA

Indriya is a distributed online system that automates the organ donation and transplantation process and
increases speed, transparency, and security. It provides various interfaces for different stakeholders like
doctors, donors and recipient. It aims to automate the match-making process between donor and recipient.
This distributed blockchain-based organ donation and transplantation system stores the details of the patient
or organ receiver and the details of the organ donor. The patient details include name, age, gender, address,
contact information, blood group, organ required, and previous medical history. The same information is
also taken from the organ donor. This information is uploaded by the respective hospitals or authorized
doctors. The match-making process checks if the organ required type matches the donating organ. Next, it
also checks if the blood group and gender of the receiver are matching with the donor. If everything matches,
then the system informs the patient about the match. 

### Requirements :
1. Node v10.19.0
2. NPM v6.14.4
3. Docker version 20.10.12, build 20.10.12-0ubuntu2~20.04.1
4. Git 2.25.1
5. cURL 7.68.0

( https://hyperledger-fabric.readthedocs.io/ml/latest/prereqs.html )

<b>Install Command</b>
```
sudo apt-get update
sudo apt-get install nodejs npm git curl docker docker-compose
```
<hr>

### Install Samples, Binaries, and Docker Images

```
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.2 1.4.9
```
(https://hyperledger-fabric.readthedocs.io/ml/latest/install.html)

### Clone this repository
```
git clone git@github.com:SATYAJIT1910/PTJSP.git
```

### Next run the script (go to test-network folder and then)
```
./start.sh
```
### Run the Server (go to client folder and then)

Run this for one time to install requirements
```
npm install
```
Next run the following commands to register admin and user in blockchain

```
node enrollAdmin.js
node registerUser.js
```
Make a .env file inside <code>client/javascript/</code> . It should look like below sample -
```
# .env file
ADMIN_ID='your_admin_password'
ADMIN_KEY='your_admin_password'
HOS_ID='your_hos_id'
HOS_KEY='your_hos_password'

```

To start the server use -
```
npm start
```
## Important Points

To clear the network use -
```
sudo ./network.sh down
```
from test-network folder.
<hr>
Then to make sure all the docker containers are clear additionally you can use -

```
docker rm $(docker ps -a -q) -f
```
<hr>
To start the network again after system shutdown , you need to re-run the docker containers

```
docker start $(docker ps -a -q)
```
<hr>
If you clean the network , then again you need to delete the <code>admin.id</code> and <code>appUser.id</code> from the <code>/client/javascript/wallet/</code> and again generate them using <code>enrollAdmin.js</code>
and <code>registerUser.js</code>

## Troubleshooting
<hr>
<li>Got permission denied issue in Docker:</li>

<b>Solution:</b>

<a href="https://stackoverflow.com/a/48957722">https://stackoverflow.com/a/48957722</a>

<li>Problem installing Node 10.19 ?</li>

<b>Solution:</b>

Install nvm
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```
then install the node 10.19

```
nvm install 10.19
```
after that use that version using -

```
nvm use 10.19
```

If you don't use this node version, then your <code>npm install</code> will be stucked.
<li>API error (404): network _test not found</li>

```
error: [Transaction]: Error: No valid responses from any peers. Errors:
    peer=peer0.org1.example.com:7051, status=500, message=error in simulation: failed to execute transaction 
aa705c10403cb65cecbd360c13337d03aac97a8f233a466975773586fe1086f6: could not launch chaincode basic_1.0:b359a077730d7
f44d6a437ad49d1da951f6a01c6d1eed4f85b8b1f5a08617fe7: error starting container: error starting container:
 API error (404): network _test not found
```
<b>Solution:</b>
Run the following command in the terminal
```
COMPOSE_PROJECT_NAME=docker
```
<hr>

## Team Members
<hr>
<table>
    <tr>
        <td align="center">
            <a href="https://www.linkedin.com/in/satyajit1910/">
                <img src="https://i.postimg.cc/pd2f31Pd/satya.jpg" width="120px;" alt=""/><p><b>Satyajit Ghosh </b></p><br />
                <!-- <sub><b>brookmg</b></sub> -->
            </a>
        </td>
        <td align="center">
            <a href="https://www.linkedin.com/in/mousumi-dutta-b4199a217/">
                <img src="https://media-exp1.licdn.com/dms/image/C4D03AQG7Vtmr-Q7DtQ/profile-displayphoto-shrink_800_800/0/1626774583190?e=1675296000&v=beta&t=61uwE7nT9M6U3FYL8g2v6q43Sffv3lI_8pIdNU0LHy0" width="120px;" alt=""/>
                <p><b>Mousumi Dutta</b></p><br />
            </a>
        </td>
</table>




<hr>
This documentation is written by <i>Satyajit Ghosh</i> (satyajit@satyajit.co.in & satyajit.ghosh@stu.adamasuniversity.ac.in)
<hr>

This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-nd/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
