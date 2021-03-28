const WPJson = require("./libs/scraper/wp_json");
const Download = require("./libs/downloader")
const A = async () => {
    try {
        const test = new WPJson("https://manhwaindo.com/")
        const res = await test.GetDataFromId("50878")
        console.log(res)
        if (res.status === 200) {
            for (let i = 0; i < res.data.images.length; i++){
                await Download( res.data.images[i].url, "./media/"+res.data.images[i].name)
            }
        }
    }catch (e){
        console.log(e)
    }
}

A()