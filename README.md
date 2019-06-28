# spell-checker
An API to communicate with several spell checker services


Integration with Vaani API (http://vaani.neechalkaran.com/)
```
curl --request POST \
  --url http://localhost:3000/api/spell-check/tamil \
  --data 'action=vaani&tamilwords=அவரிடமிருந்து|உற்சாகமாகப்|பதில்கள்|வருகின்றன|அரஙகேறி|முடிந்துள்ள|நிலையில்'
```
OR
```
fetch('http://localhost:3000/api/spell-check/tamil', {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: "action=vaani&tamilwords=%E0%AE%85%E0%AE%B5%E0%AE%B0%E0%AE%BF%E0%AE%9F%E0%AE%AE%E0%AE%BF%E0%AE%B0%E0%AF%81%E0%AE%A8%E0%AF%8D%E0%AE%A4%E0%AF%81%7C%E0%AE%89%E0%AE%B1%E0%AF%8D%E0%AE%9A%E0%AE%BE%E0%AE%95%E0%AE%AE%E0%AE%BE%E0%AE%95%E0%AE%AA%E0%AF%8D%7C%E0%AE%AA%E0%AE%A4%E0%AE%BF%E0%AE%B2%E0%AF%8D%E0%AE%95%E0%AE%B3%E0%AF%8D%7C%E0%AE%B5%E0%AE%B0%E0%AF%81%E0%AE%95%E0%AE%BF%E0%AE%A9%E0%AF%8D%E0%AE%B1%E0%AE%A9%7C%E0%AE%85%E0%AE%B0%E0%AE%99%E0%AE%95%E0%AF%87%E0%AE%B1%E0%AE%BF%7C%E0%AE%AE%E0%AF%81%E0%AE%9F%E0%AE%BF%E0%AE%A8%E0%AF%8D%E0%AE%A4%E0%AF%81%E0%AE%B3%E0%AF%8D%E0%AE%B3%7C%E0%AE%A8%E0%AE%BF%E0%AE%B2%E0%AF%88%E0%AE%AF%E0%AE%BF%E0%AE%B2%E0%AF%8D"
  }).then(function(response) {
    return response.json();
  })
  .then(function (data) {
    console.log("Response data ----> ",data);
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
```
The response will contain only words with spelling errors along with suggestions, in the following format:
```
[
    {
        "word": "அரஙகேறி",
        "suggestions": "அரங்கேறி"
    }
]
```
