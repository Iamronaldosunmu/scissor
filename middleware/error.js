export default function error(err, req, res, next) {
  //respond with a 500 server error
  console.log(err);

  res.status(500).send("Something when wrong on the Server");
}
