# Indriya API Endpoints
<b>GET</b>: It returns 200 (OK) on success & 404 (NOT FOUND) on failure


<b>POST</b>: It returns 201 (Created) on success & 400 (Bad Request) on failure

# Endpoints

<hr>
GET
<hr>
<code>/allpatient</code>
<hr>
It is used to fetch details of all the registered patients.

### Sample Output

```
[
    {
        "Key": "1",
        "Record": {
            "PID": "1",
            "address": "Kolkata",
            "age": "75",
            "bloodgroup": "A",
            "docType": "patient",
            "firstName": "Raja",
            "gender": "Male",
            "lastName": "Ghosh",
            "organRequired": "heart",
            "phoneNumber": "23415234"
        }
    },
    {
        "Key": "2",
        "Record": {
            "PID": "2",
            "address": "Burdwan",
            "age": "60",
            "bloodgroup": "B",
            "docType": "patient",
            "firstName": "Rani",
            "gender": "Female",
            "lastName": "Das",
            "organRequired": "liver",
            "phoneNumber": "23523523"
        }
    }
]
```
<hr>
POST
<hr>
<code>/createpatient</code>
<hr>
It is used to create a patient

### Sample Input

x-www-form-urlencoded key

<ul>
<li>PID  </li>
<li>firstName  </li>
<li>lastName  </li>
<li>age  </li>
<li>phoneNumber </li>
<li>address </li>
<li>bloodgroup</li>
<li>gender</li>
<li>organRequired</li>
</ul>

<hr>
GET
<hr>
<code>/findmatch</code>
<hr>
It is used to find matches . Output format is same as <code>/allpatient</code> in case of multiple matches are found.

### Sample Input

<ul>
<li>bloodgroup</li>
<li>gender</li>
<li>organRequired</li>
</ul>

### Sample Output

```
[
    {
        "Key": "1",
        "Record": {
            "PID": "1",
            "address": "Kolkata",
            "age": "75",
            "bloodgroup": "A",
            "docType": "patient",
            "firstName": "Raja",
            "gender": "Male",
            "lastName": "Ghosh",
            "organRequired": "heart",
            "phoneNumber": "23415234"
        }
    }
]
```