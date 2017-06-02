(function (data) {
    "use strick";

    var seedData = require("./seedData");
    var database = require("./database");

    data.getDetailsCategories = function(next){
        next(null, seedData.initialDetails);
        
        database.getDb(function(err, db){
            if(err){
                next(err,null);
            }else{
                db.notes.find().toArray(function(err,db){
                    if(err){
                        next(err, null);
                    }else{
                        next(null, results);
                    }
                });
            }
            
        });
    };

    function seedDatabase(){
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to seed databse" + err);
            } else {
                // test to see if data exists

                db.details.count(function (err, count) {
                    if (err) {
                        console.log("Failed to seed databse" + err);
                    } else {
                        if (count == 0) {
                            console.log("Seeding the database...");
                            seedData.initialDetails.forEach(function (item) {
                                db.details.insert(item, function (err) {
                                    if (err) console.log("Failed to insert note into database");
                                });
                            });
                        } else {
                            console.log("Database already seeded");
                        }
                    }
                });

            }
        });
    };

    seedDatabase();
})(module.exports);