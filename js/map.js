const data = "https://js.dump.academy/kekstagram/data";
const dataPost = "https://js.dump.academy/kekstagram";
let onload = fetch(data);
let response = await fetch(dataPost);
if (response.ok) {
  let json = await response.json();
} else {
  alert("Статус Ошибки: " + response.status);
}
