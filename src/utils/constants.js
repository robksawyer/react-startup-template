/**
 * Constants that are reused throughout the app.
 */

const isProduction = process.env.NODE_ENV || 'local';
const supportEmail = process.env.SUPPORT_EMAIL;

export {
  isProduction,
  supportEmail,
};
