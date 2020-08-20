const errorHandler = (err, req, res, next) => {
    console.log(err);
    next();
};

const unknownEndpoint = (req, res) => {
    return res.status(404).send({error: 'unknown end point'});
};

module.exports = {
    errorHandler, 
    unknownEndpoint
};