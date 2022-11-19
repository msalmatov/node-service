# Test node service

## Setup

- Clone the repo;
- Adjust your settings:
  - `config/config.json` for production; 
  - `config/development.json` for development.
- Change directory to repo root, then install dependencies by running `npm i`;
- To start app:
  - `npm run dev` for development;
  - `npm run build && npm start` for prod.


## Endpoints

id - email or phone number

password - Must have at least one upper case letter, one lower case letter, one number and one special character 

### Signup new user

Sample request:

```shell
curl -L -X POST 'localhost:4000/signup' \
-H 'Content-Type: application/json' \
--data-raw '{
    "id": "user@gmail.com",
    "password": "Mypass2_"
}'
```

Sample response on success:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJhbm90aGVydXNlcjIiLCJpYXQiOjE2Njg4NDAxMjcsImV4cCI6MTY2ODg0MDcyN30.X93dRl8xvfmX0k_xRDcbuJNGPlT0m_VYKQvN3gTMr1w",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJhbm90aGVydXNlcjIiLCJpYXQiOjE2Njg4NDAxMjcsImV4cCI6MTY2OTcwNDEyN30.27I6ei0U7cNuEVIdyOkHYHcafWmSFWwZNRmD0H7vJeI"
}
```

### Sign-in

Sample request:

```shell
curl -L -X POST 'localhost:4000/signin' \
-H 'Content-Type: application/json' \
--data-raw '{
    "id": "user@gmail.com",
    "password": "Mypass2_"
}'
```

Sample response on success:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODg0MDQyNiwiZXhwIjoxNjY4ODQxMDI2fQ.CFN16gn08MYmJwg1euVKU5f3UyIiC6Zg3UNxmfoiMNM",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODg0MDQyNiwiZXhwIjoxNjY5NzA0NDI2fQ.5ILdDej2-sf8O9XJFtdrtXHIs4Pqcu_P8uo9_tjc824"
}
```

### Refresh token

Sample request:

```shell
curl -L -X POST 'localhost:4000/signin/new_token' \
-H 'Content-Type: application/json' \
--data-raw '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODgzMjE1NSwiZXhwIjoxNjY5Njk2MTU1fQ._RfBj2G-dY-yqyn1W2CgyUL3rL61IwllFV_kaDfvM30"
}'
```

Sample response on success:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODgzMjIxNiwiZXhwIjoxNjY4ODMyODE2fQ.MJHXC6hg4f8ZKSG5to7DHrPQRWfHcCYZlNOzJcVJKXo",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODgzMjE1NSwiZXhwIjoxNjY5Njk2MTU1fQ._RfBj2G-dY-yqyn1W2CgyUL3rL61IwllFV_kaDfvM30"
}
```

### Logout

Sample request:

```shell
curl -L -X GET 'localhost:4000/logout' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODc2ODAzNywiZXhwIjoxNjY4NzY4NjM3fQ.7a_rCHiV7v5imUfSSPvOGPu4RFWEcTKuHrxan-xpZBA'
```

Sample response on success:

```
OK
```

### User info

Sample request:

```shell
curl -L -X GET 'localhost:4000/info' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODgzMjE1NSwiZXhwIjoxNjY4ODMyNzU1fQ.saEtcL8BC6A4BWkLzxfnzOhcX9n7erXRfEPtUjiS3uY'
```

Sample response on success:

```json
{
    "id": "user@gmail.com"
}
```

### File upload

Form data input name must match `fileUpload`.

Sample request:

```shell
curl -L -X POST 'localhost:4000/file/upload' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODgzMjIxNiwiZXhwIjoxNjY4ODMyODE2fQ.MJHXC6hg4f8ZKSG5to7DHrPQRWfHcCYZlNOzJcVJKXo' \
-F 'fileUpload=@"/some-path/some-file.pdf"'
```

Sample response on success:

```
OK
```

### File list

Sample request:

```shell
curl -L -X GET 'localhost:4000/file/list?list_size=2&page=2' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODgzMjIxNiwiZXhwIjoxNjY4ODMyODE2fQ.MJHXC6hg4f8ZKSG5to7DHrPQRWfHcCYZlNOzJcVJKXo'
```

Sample response on success:

```json
[
    {
        "id": 7,
        "user_id": 3,
        "name": "UFD_Recover_Tool",
        "extension": "rar",
        "mime": "application/vnd.rar",
        "size": 146775,
        "date_upload": "2022-11-18T15:46:01.000Z",
        "createdAt": "2022-11-18T15:46:01.000Z",
        "updatedAt": "2022-11-18T15:46:01.000Z"
    },
    {
        "id": 8,
        "user_id": 3,
        "name": "test",
        "extension": "",
        "mime": "application/octet-stream",
        "size": 21181,
        "date_upload": "2022-11-18T15:47:16.000Z",
        "createdAt": "2022-11-18T15:47:16.000Z",
        "updatedAt": "2022-11-18T15:47:16.000Z"
    }
]
```

### File info

Sample request:

```shell
curl -L -X GET 'localhost:4000/file/10' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODgzMjIxNiwiZXhwIjoxNjY4ODMyODE2fQ.MJHXC6hg4f8ZKSG5to7DHrPQRWfHcCYZlNOzJcVJKXo'
```

Sample response on success:

```json
{
    "id": 10,
    "user_id": 3,
    "name": "Masaru-Father-Version",
    "extension": "pdf",
    "mime": "application/pdf",
    "size": 1856941,
    "date_upload": "2022-11-19T04:30:44.000Z",
    "createdAt": "2022-11-19T04:30:44.000Z",
    "updatedAt": "2022-11-19T04:30:44.000Z"
}
```

### File download

Sample request:

```shell
curl -L -X GET 'localhost:4000/file/download/4' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODgzMjIxNiwiZXhwIjoxNjY4ODMyODE2fQ.MJHXC6hg4f8ZKSG5to7DHrPQRWfHcCYZlNOzJcVJKXo'
```

Sample response on success:

```
File content will be returned
```

### File update

Form data input name must match `fileUpload`.

Sample request:

```shell
curl -L -X PUT 'localhost:4000/file/update/4' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODgzMjIxNiwiZXhwIjoxNjY4ODMyODE2fQ.MJHXC6hg4f8ZKSG5to7DHrPQRWfHcCYZlNOzJcVJKXo' \
-F 'fileUpload=@"/some-path/some-file.pdf"'
```

Sample response on success:

```
OK
```

### File delete

Sample request:

```shell
curl -L -X DELETE 'localhost:4000/file/delete/9' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbm90aGVydXNlciIsImlhdCI6MTY2ODgzMjIxNiwiZXhwIjoxNjY4ODMyODE2fQ.MJHXC6hg4f8ZKSG5to7DHrPQRWfHcCYZlNOzJcVJKXo'
```

Sample response on success:

```
OK
```
