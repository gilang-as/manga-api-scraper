const WPJson = require("../libs/scraper/wp_json");

module.exports.GetPost = async (req, res) => {
    try {
        if ((req.query.slug != null && req.query.slug !== "") || (req.query.id != null && req.query.id !== "")){
            const test = new WPJson("https://manhwaindo.com/")

            console.log(req.query)
            const response = req.query.slug!=null&&req.query.slug!==""?await test.GetJsonFromSlug(req.query.slug):await test.GetJsonFromId(req.query.id);
            if (response.status === 200){
                res.status(200).send({
                    message: "Success Get Data",
                    data: response.data
                });
                return;
            }
            res.status(404).send({
                message: "Not Found"
            });
            return;
        }
        res.status(404).send({
            message: "Not Found"
        });
        return;
    }catch (e) {
        res.status(500).send({
            message: "Error"
        });
    }
}