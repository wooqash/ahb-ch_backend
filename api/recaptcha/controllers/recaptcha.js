"use strict";

const axios = require("axios");
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * A set of functions called "actions" for `recaptcha`
 */

module.exports = {
  async verify(ctx) {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${ctx.request.body.token}`;

    return axios
      .post(url)
      .then((response) => {
        // Handle success.
        return response.data;
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
        return error;
      });
  },
};
