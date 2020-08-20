exports.getParams = function (model, params) {
    var query = {}
    Object.keys(model.schema.paths).forEach(key => {
        if (params[key]) {
            if (model.schema.paths[key].instance == 'Number') query[key] = parseInt(params[key])
            else
                query[key] = params[key]
        }
    });
    return query;
}