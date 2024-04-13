export async function loginApi(id, pw) {
  axios
    .post("/proxy/login", {
      id: id,
      password: pw,
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}
