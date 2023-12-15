const form = document.getElementById('form');
const apikey = document.getElementById('api-key');
const composition = document.getElementById('composition');
const submit = document.getElementById('submit');
const result = document.getElementById('result');
function req() {
console.log(apikey.value);
console.log(`Provide suggestions for improving the following English composition. The sentences do not need to be complicated or the wording is difficult, but the meaning should be smooth, the grammar correct, and the meaning of the text should be the same as the original text. First only provide the parts that can be improved, and then rewrite the article. In addition, provide the improvement part and propose as many improvement options as possible. The following is composition that requires suggestions:\n ${composition.value}`);
const key=apikey.value;
fetch('https://api.openai.com/v1/chat/completions',{
  method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${key}`
},
body: JSON.stringify({
  "model": "gpt-3.5-turbo",
  "messages": [{
      "role": "system",
      "content": "You are ChatGPT, a helpful assistant."
  }, {
      "role": "user",
      "content": `Provide suggestions for improving the following English composition. The sentences do not need to be complicated or the wording is difficult, but the meaning should be smooth, the grammar correct, and the meaning of the text should be the same as the original text. First only provide the parts that can be improved, and then rewrite the article. In addition, provide the improvement part and propose as many improvement options as possible. The following is composition that requires suggestions:\n${composition.value}`
  }]
})
}).then(response => {
  if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}).then(data => {
  console.log(data.choices[0].message.content);
  result.textContent=data.choices[0].message.content;
}).catch(error => {
  console.error('Error:', error);
});
}
form.addEventListener('submit', () => {
  req();
});