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
            const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
            const images = [];
            let img;
            const {id, title, link, date, slug, content} = ResData[0];
            while ((img = imgRex.exec(content.rendered))) {
                images.push({
                    url: img[1],
                    name: img[1].substring(img[1].lastIndexOf("/")+1,img[1].length)
                });
            }
            return {
                status,
                message,
                data: {
                    id,
                    title,
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

    async GetDataFromId (postId) {
        try{
            const url = this.url + this.api + "/posts/" + postId;
            const {status, statusText: message, data:ResData} = await this.axios.get(url);
            const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
            const images = [];
            let img;
            const {id, title, link, date, slug, content} = ResData;
            while ((img = imgRex.exec(content.rendered))) {
                images.push({
                    url: img[1],
                    name: img[1].substring(img[1].lastIndexOf("/")+1,img[1].length)
                });
            }
            return {
                status,
                message,
                data: {
                    id,
                    title,
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