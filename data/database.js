(function (database) {
    "use strick";

    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/employeePortal";
    var theDb = null;


    database.getDb = function (next) {
        if (!theDb) {
            //connect to the database
            mongodb.MongoClient.connect(mongoUrl, function (err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = {
                        db: db,
                        details: db.collection("details")
                    };
                    next(null, theDb);
                };

            });

        } else {
            next(null, theDb);
        }
    };


})(module.exports);