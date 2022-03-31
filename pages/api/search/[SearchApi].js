import got from "got";
import jsdom from "jsdom"
const { JSDOM } = jsdom;
const SearchApi = async (req, res) => {
    const query = req.query.name.replaceAll(" ", "%20");
    if (req.url === `/api/search/gogo?name=${query}`) {
        res.status(200).json(await searchAnimeGogo(req.query.name))
    }
    else if (req.url === `/api/search/animeLand?name=${query}`) {
        res.status(200).json(await searchAnimeLand(req.query.name))
    }
    else if (req.url === `/api/search/rush?name=${query}`) {
        res.status(200).json(await searchAnimeRush(req.query.name))
    }
}
const searchAnimeGogo = async (anime) => {
    const serachAnimeList = []
    try {
        const res = await got(`https://gogoanime.fi//search.html?keyword=${anime}`);
        const data = new JSDOM(res.body);
        data.window.document.querySelectorAll("img").forEach((val, index) => {
            if (index != 0 && index < 25) {
                serachAnimeList.push({ img: val.src })
            }
        })
        data.window.document.querySelectorAll(".name").forEach((val, index) => {
            if (index < 24) {
                serachAnimeList[index].name = val.textContent.trim();
            }
        })
        data.window.document.querySelectorAll(".released").forEach((val, index) => {
            if (index < 24) {
                serachAnimeList[index].date = val.textContent.trim();
            }
        })
        return serachAnimeList;
    } catch (error) {
        console.log(error)
    }
}
const searchAnimeLand = async (anime) => {
    let serachAnimeList = [];
    try {
        const res = await got(`https://www.animelandtv.me/?s=${anime}`);
        const data = new JSDOM(res.body);
        data.window.document.querySelectorAll("img").forEach((val, index) => {
            if (index > 0) {
                serachAnimeList.push({ img: "https://www.animelandtv.me/" + val.src })
            }
        })
        data.window.document.querySelectorAll(".title").forEach((val, index) => {
            serachAnimeList[index].name = val.textContent
        })
        serachAnimeList = serachAnimeList.slice(0, -3);
        return serachAnimeList;
    } catch (error) {
        console.log(error)
    }
}
const searchAnimeRush = async (anime) => {
    const serachAnimeList = []
    try {
        const res = await got(`https://www.animerush.tv/search.php?searchquery=${anime}`);
        const data = new JSDOM(res.body);
        data.window.document.querySelectorAll("object").forEach((val) => {
            serachAnimeList.push({ data: val.data })
        })
        data.window.document.querySelectorAll(".search-page_in_box_mid_link h3").forEach((val, index) => {
            serachAnimeList[index].name = val.textContent.trim();
        })
        return serachAnimeList
    } catch (error) {
        console.log(error)
    }
}
export default SearchApi