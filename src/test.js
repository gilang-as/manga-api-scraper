const fs = require('fs');
const WPJson = require("./libs/scraper/wp_json");
const Download = require("./libs/downloader");

const A = async () => {
    try {
        const test = new WPJson("https://manhwaindo.com/")
        const res = await test.GetJsonFromSlug("god-level-takeout-man-chapter-3-bahasa-indonesia");
        // console.log(JSON.stringify(res, null, 4))
        if (res.status === 200) {
            fs.access("./media/" + res.data.slug, async (error) => {
                if (error) {
                    fs.mkdirSync("./media/" + res.data.slug);
                }
                for (let i = 0; i < res.data.images.length; i++) {
                    try{
                        const imageUrl = i===1?res.data.images[i].url+1:res.data.images[i].url
                        await Download(imageUrl, "./media/" + res.data.slug, i);
                    }catch (e) {
                        console.log("Error Download Image : " + i)
                    }
                }
            })
        }
    }catch (e){
        console.log(e)
    }
}
 A()