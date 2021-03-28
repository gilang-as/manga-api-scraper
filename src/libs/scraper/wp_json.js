module.exports = class WPJson {
    constructor(url) {
        this.url = url;
        this.api = "/wp-json/wp/v2";
        this.axios = require("axios");
    }

    async GetJsonFromSlug (postSlug) {
        try{
            const url = this.url + this.api + "/posts?slug=" + postSlug;
            const {status, statusText: message, data:ResData} = await this.axios.get(url);
            const imgRex = /<img.+?src=[\"'](.+?)[\"'].*?>/g;
            if(ResData.length === 0) {
                return {
                    status: 404,
                    message: "Not Found"
                }
            }
            const images = [];
            let img;
            const {id, title, link, date, slug, content} = ResData[0];
            let num = 0;
            while ((img = imgRex.exec(content.rendered))) {
                images.push({
                    url: img[1],
                    name: `${slug}-${num}`
                });
                num++;
            }
            return {
                status,
                message,
                data: {
                    id,
                    title:title.rendered,
                    date,
                    slug,
                    link,
                    images
                }
            };
        }catch (e) {
            console.log(e)
            return {
                status: e.response.status,
                message: e.response.statusText
            }
        }
    }

    async GetJsonFromId (postId) {
        try{
            const url = this.url + this.api + "/posts/" + postId;
            const {status, statusText: message, data:ResData} = await this.axios.get(url);
            const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
            const images = [];
            let img;
            const {id, title, link, date, slug, content} = ResData;
            let num = 0;
            while ((img = imgRex.exec(content.rendered))) {
                images.push({
                    url: img[1],
                    name: `${slug}-${num}`
                });
                num++;
            }
            return {
                status,
                message,
                data: {
                    id,
                    title:title.rendered,
                    date,
                    slug,
                    link,
                    images
                }
            };
        }catch (e) {
            return {
                status: e.response.status,
                message: e.response.statusText
            }
        }
    }
}