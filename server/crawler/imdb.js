import cheerio from 'cheerio';
import rp from 'request-promise';
import R from 'ramda';
import fs from 'fs';

// 开启代理
// import Agent from 'socks5-http-client/lib/Agent';

export const getIMDBCharacters = async() => {
    const options = {
        url: 'http://www.imdb.com/title/tt0944947/fullcredits?ref_=tt_cl_sm',
        // agentClass: Agent,
        // agentOptions: {
        //     socksHost: 'localhost',
        //     socksPort: 1800
        // }
        transform: body => cheerio.load(body)
    }
    const $ = await rp(options)
    let photos = [];
    $('table.cast_list tr.odd, tr.even').each(function () {
        const nmidDom = $(this).find('td.itemprop a')
        const nmId = nmidDom.attr('href')

        const characterDom = $(this).find('td.character a').first()
        const name = characterDom.text()

        // const chId = characterDom.attr('href');
        const playedByDom = $(this).find('td.itemprop span.itemprop')
        const playedBy = playedByDom.text()
        photos.push({nmId, name, playedBy})
    })
    console.log('共拿到' + photos.length + '条数据')
    const fn = R.compose(R.map(photo => {
        const reg1 = /\/name\/(.*?)\/\?ref/
        const reg2 = /\/characters\/(.*?)\/\?ref/
        const match1 = photo
            .nmId
            .match(reg1)
        // const match2 = photo
        //     .chId
        //     .match(reg2)
        photo.nmId = match1[1]
        // photo.chId = match2[1]
        return photo
    }), R.filter(photo => photo.playedBy && photo.name && photo.nmId),)
    photos = fn(photos)
    fs.writeFileSync('./imdb.json', JSON.stringify(photos, null, 2), 'utf8')
    console.log('清洗后,剩余' + photos.length + '条数据')
}
getIMDBCharacters();