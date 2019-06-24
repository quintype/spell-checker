# spell-checker
An API to communicate with several spell checker services


Integration with Vaani API (http://vaani.neechalkaran.com/)
```
curl --request POST \
  --url http://localhost:3000/api/tamil/spell-check \
  --data 'action=vaani&tamilwords=அவரிடமிருந்து|உற்சாகமாகப்|பதில்கள்|வருகின்றன|அரஙகேறி|முடிந்துள்ள|நிலையில்'
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
