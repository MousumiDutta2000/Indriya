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
            "age": "20",
            "bloodgroup": "Male",
            "docType": "patient",
            "firstName": "Rajib",
            "gender": "liver",
            "lastName": "Ghosh",
            "organRequired": "A",
            "phoneNumber": "12345"
        }
    },
    {
        "Key": "2",
        "Record": {
            "PID": "2",
            "address": "Kolkata",
            "age": "60",
            "bloodgroup": "Female",
            "docType": "patient",
            "firstName": "Rani",
            "gender": "heart",
            "lastName": "Pal",
            "organRequired": "B",
            "phoneNumber": "87393840"
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