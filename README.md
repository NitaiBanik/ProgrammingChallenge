# ProgrammingChallenge
```Its a basic Node.js project that will generate alphabetical strings, real numbers, integers, and alphanumerics.```

### How to run the project:

**1.** Clone the repository from **GitHub**.

**2.** Browse to project root folder and run the command `npm init` in command terminal.

**3.** run command `node app.js`.

```Server is listening on port 6030``` message will be shown in terminal.

**4.** browse the url ```http://localhost:6030/ping``` from any browser.

**pong** will be shown in the browser.

### How to consume the project

1. `GET` request to url: http://localhost:6030/ping

    response: **Pong**

2. `GET` request to url: http://localhost:6030/generate

    response:
    
     ```json
     {
         "downloadUrl": "localhost:6030/files/objects.txt"
     }
     ```
3. `GET` request to url: http://localhost:6030/files/objects.txt

    Generated `objects.txt` file will be downloaded.

4. `GET` request to  url: http://localhost:6030/report

    response:
    
     ```json
     {
    "Alphabetical_Strings":60900,
    "Real_Numbers":50043,
    "Integers":49903,
    "Alphanumerics":39308
    }
    ```
    count will be different according to random generation.



