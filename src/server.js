const fs = require('fs');
const WPJson = require("./libs/scraper/wp_json");
const Download = require("./libs/downloader");

const A = async () => {
    try {
        const test = new WPJson("https://manhwaindo.com/")
        const res = await test.GetJsonFromSlug("god-level-takeout-man-chapter-46-bahasa-indonesia");
        console.log(res)
        if (res.status === 200) {
            fs.access("./media/" + res.data.slug, async (error) => {
                if (error) {
                    fs.mkdirSync("./media/" + res.data.slug);
                }
                for (let i = 0; i < res.data.images.length; i++) {
                    await Download(res.data.images[i].url, "./media/" + res.data.slug + "/" + res.data.images[i].name)
                }
            })
        }
    }catch (e){
        console.log(e)
    }
}

A()