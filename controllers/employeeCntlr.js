(function (employeeCntlr) {
    var data = require("../data");

    employeeCntlr.init = function (app) {
        app.get("/", function (req, res) {

            data.getDetailsCategories(function (err, results) {
                res.render("index", { title: "Express + Vash", error: err, categories: results });
            })

        });

        app.post("/newCategory", function (req, res) {
            var categoryName = req.body
        });
    };

    app.employeeCntlr();

})(module.exports);