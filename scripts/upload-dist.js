import fs from 'fs';
import path from 'path';

async function upload() {
  const url = "https://srv1492-files.hstgr.io/rest/5668c57d61562eb8/api/tus/public_html";
  const authKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJsb2NhbGUiOiJlbl9VUyIsInZpZXdNb2RlIjoibGlzdCIsInNpbmdsZUNsaWNrIjpmYWxzZSwicmVkaXJlY3RBZnRlckNvcHlNb3ZlIjpmYWxzZSwicGVybSI6eyJhZG1pbiI6ZmFsc2UsImV4ZWN1dGUiOmZhbHNlLCJjcmVhdGUiOnRydWUsInJlbmFtZSI6dHJ1ZSwibW9kaWZ5Ijp0cnVlLCJkZWxldGUiOnRydWUsInNoYXJlIjpmYWxzZSwiZG93bmxvYWQiOnRydWV9LCJjb21tYW5kcyI6W10sImxvY2tQYXNzd29yZCI6dHJ1ZSwiaGlkZURvdGZpbGVzIjpmYWxzZSwiZGF0ZUZvcm1hdCI6ZmFsc2UsInVzZXJuYW1lIjoidTY2NTY5MDc5NyIsImFjZUVkaXRvclRoZW1lIjoiIn0sImlzcyI6IkZpbGUgQnJvd3NlciIsImV4cCI6MTc5MDEyMTMzNSwiaWF0IjoxNzkwMDk5NzM1fQ.pG9huQ149yYHR0bI3eD1i-2HXFEfuGa3NCb6GqASrVc";
  const restAuthKey = "255e56cf0ddf719f09165fa280d0fa0d5e39adb871619d832c2183d0c3f1db5f-5668c57d61562eb8";
  const fileName = "dist_deploy_latest.zip";
  const filePath = path.resolve(fileName);
  const stats = fs.statSync(filePath);
  const size = stats.size;

  console.log(`Starting TUS upload for ${fileName} (${size} bytes)...`);

  const postRes = await fetch(`${url}/${fileName}?override=true`, {
    method: 'POST',
    headers: {
      'X-Auth': authKey,
      'X-Auth-Rest': restAuthKey,
      'Tus-Resumable': '1.0.0',
      'Upload-Length': String(size),
      'Upload-Offset': '0',
    },
  });

  console.log('POST status:', postRes.status);
  if (postRes.status !== 201 && postRes.status !== 200) {
    const txt = await postRes.text();
    console.error('POST error:', txt);
    return;
  }

  const fileData = fs.readFileSync(filePath);
  const patchRes = await fetch(`${url}/${fileName}?override=true`, {
    method: 'PATCH',
    headers: {
      'X-Auth': authKey,
      'X-Auth-Rest': restAuthKey,
      'Tus-Resumable': '1.0.0',
      'Content-Type': 'application/offset+octet-stream',
      'Upload-Offset': '0',
    },
    body: fileData,
  });

  console.log('PATCH status:', patchRes.status);
  if (patchRes.status === 204 || patchRes.status === 200) {
    console.log('SUCCESS! File uploaded to Hostinger.');
  } else {
    console.error('PATCH failed:', await patchRes.text());
  }
}

upload();
