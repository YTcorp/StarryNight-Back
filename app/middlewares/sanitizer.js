const sanitizer = require('sanitizer');

exports.sanitizeBody = (req, _, next) => {
    if (Object.keys(req.body).length !== 0) {
        Object.keys(req.body).forEach((prop) => {
            if (typeof req.body[prop] === 'string') {
                req.body[prop] = sanitizer.escape(req.body[prop]);
            }
        });
    }
    next();
};
