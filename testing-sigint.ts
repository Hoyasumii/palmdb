process.on("SIGINT", async () => {
  console.log("HEHE");
  process.exit();
});

setInterval(() => {}, 1000);
