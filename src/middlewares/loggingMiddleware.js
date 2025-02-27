const morgan = require("morgan");

const loggingmiddleware = morgan("combined");
module.exports = loggingmiddleware;