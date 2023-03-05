# simple nodejs file upload


## Startup

- npm install
- npm run start

## Usage

Just a post with content-type = multipart/form-data


curl sample

```
curl --location --request POST 'http://localhost:5000/upload' \
--form 'file=@"/path/to/file"' \
--form 'bearer_token="123456789"'
```

File will be uploaded to temp folder
