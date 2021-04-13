module.exports = ({ env }) => ({
  host: env('HOST'),
  port: env.int('PORT'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', `${process.env.ADMIN_JWT_SECRET}`),
    },
  },
  webhooks: {
    defaultHeaders: {
      Authorization: `Bearer ${process.env.WEBHOOK_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  },
});
