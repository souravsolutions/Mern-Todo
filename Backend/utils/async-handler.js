function asyncHandler (requestHandler) {
    return function (req, res, next) {
        Promise.resolve(requestHandler(req, res, next))
        .catch(function(error){
            next(error)
        })
    }
}

export default asyncHandler