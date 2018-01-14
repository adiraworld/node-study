exports.error = function error(err, req, res, next){
    console.log(err);
    res.send(500, 'Something broke. What did you do?');
}

exports.notFound = function notFound(req, res, next){
    var stack = new Error().stack
    console.log( stack )
    res.send(404, 'You seem lost. You must have taken a wrong turn back there.');
};

