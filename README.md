# Indriya

### Install all the requirements :
1. Node v10.19.0
2. NPM v10.19.0
3. Docker version 20.10.12, build 20.10.12-0ubuntu2~20.04.1
4. Git 2.25.1
5. cURL 7.68.0

( https://hyperledger-fabric.readthedocs.io/ml/latest/prereqs.html )

<hr>


### Clone this repository
```
git clone git@github.com:MousumiDutta2000/Indriya.git
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

To start the server use 
```
node invoke.js
```
## Important Points

To clear the network use -
```
sudo ./network.down
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

<hr>
This documentation is written by <i>Satyajit Ghosh</i> (satyajit.ghosh@stu.adamasuniversity.ac.in)
<hr>
