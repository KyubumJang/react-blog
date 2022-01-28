// 이 파일에서만 no-glbal-assign ESLint 옵션 비활성화
// eslint-disable-next-line no-global-assign
require = require('esm')(module /*, options */);
module.exports = require('./main.js');
