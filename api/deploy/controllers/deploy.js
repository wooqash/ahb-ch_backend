"use strict";

const axios = require("axios");

/**
 * A set of functions called "actions" for `deploy`
 */

module.exports = {
  async dispatch(ctx) {
    const accept =
      ctx.request.headers.accept || "application/vnd.github.v3+json";

    const reqUrl = ctx.request.url;
    const env = reqUrl.includes('env') ? reqUrl.substr(reqUrl.search('env') + 4).toLowerCase() : '';

    const url = env === 'prod'? `${process.env.GIT_DEPLOY_ACTION_URL}` : `${process.env.GIT_TEST_DEPLOY_ACTION_URL}` ;
    const data = { ref: "main" };
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.WEBHOOK_TOKEN}`,
        Accept: accept,
        "Content-Type": "text/plain",
      },
    };
    axios
      .post(url, data, config)
      .then((response) => {
        // Handle success.
        console.log("Webhook dispatched to the git repo");
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
      return 'Deploy dispatched';
  },
};
