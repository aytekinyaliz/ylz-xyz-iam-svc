const config = require('./src/config');

const serverInstance = require('./src/Server')(config);



serverInstance.init();

const runningServer = serverInstance.application.listen(config.port);

runningServer.on("listening", async () => {
  const ann = `|| App is running at port "${config.port}" in "${config.nodeEnv}" mode ||`;

  console.log(ann.replace(/[^]/g, "-"));
  console.log(ann);
  console.log(ann.replace(/[^]/g, "-"));
  console.log("Press CTRL-C to stop\n");
});

runningServer.on("error", err => {
  console.log(":::::: GOT ERROR IN STARTING SERVER ::::::");
  console.error(err);
});

runningServer.on("close", () => {
  console.log(`:::::: CLOSING SERVER RUNNING ON "${config.port}" IN "${config.nodeEnv}" MODE ::::::`);
});