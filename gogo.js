const { Telegraf } = require('telegraf');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// توکن ربات تلگرام
const bot = new Telegraf('7000850548:AAHm8y3bG6LGm0l1agzXfhpyR4gDGceB5NI');

// دیکشنری ارزها
const currency_dict = {
    "BTCUSDT": ["بیت کوین", "btc"],
    "ETHUSDT": ["اتریوم", "eth"],
    "BNBUSDT": ["بایننس کوین", "bnb"],
    "XRPUSDT": ["ریپل", "xrp"],
    "LTCUSDT": ["لایت‌کوین", "ltc"],
    "DOGEUSDT": ["دوج‌کوین", "doge"],
    "ADAUSDT": ["کاردانو", "ada"],
    "SOLUSDT": ["سولانا", "sol"],
    "DOTUSDT": ["پولکادات", "dot"],
    "AVAXUSDT": ["آوکس", "avax"],
    "MATICUSDT": ["ماتیک", "matic"],
    "BCHUSDT": ["بیت‌کوین کش", "bch"],
    "TRXUSDT": ["ترون", "trx"],
    "VETUSDT": ["وچین", "vet"],
    "EOSUSDT": ["ایاس", "eos"],
    "SHIBUSDT": ["شیبا اینو", "shib"],
    "MANAUSDT": ["مانا", "mana"],
    "AAVEUSDT": ["آوه", "aave"],
    "ALGOUSDT": ["الگوراند", "algo"],
    "FTMUSDT": ["فانتوم", "ftm"],
    "XLMUSDT": ["استلار", "xlm"],
    "LINKUSDT": ["چین لینک", "link"],
    "ZRXUSDT": ["زیرو ایکس", "zrx"],
    "BALUSDT": ["بالانسر", "bal"],
    "KSMUSDT": ["کوساما", "ksm"],
    "LUNAUSDT": ["لونا", "luna"],
    "FTTUSDT": ["FTX Token", "ftt"],
    "GRTUSDT": ["گراف", "grt"],
    "CAKEUSDT": ["کیک", "cake"],
    "SANDUSDT": ["ساند", "sand"],
    "CTSIUSDT": ["چین سواپ", "ctsi"],
    "BNTUSDT": ["بنت", "bnt"],
    "NKNUSDT": ["ان کا ان", "nkn"],
    "ENJUSDT": ["انجامی", "enj"],
    "CHZUSDT": ["چلیز", "chz"],
    "QTUMUSDT": ["کوتوم", "qtum"],
    "STPTUSDT": ["استیپ اپ", "stpt"],
    "RENUSDT": ["رن", "ren"],
    "YFIUSDT": ["یی‌اف‌آی", "yfi"],
    "SUSHIUSDT": ["سوشی", "sushi"],
    "CRVUSDT": ["کرونوس", "crv"],
    "1INCHUSDT": ["اینچ 1", "1inch"],
    "FETUSDT": ["فچت", "fet"],
    "LENDUSDT": ["لند", "lend"],
    "STMXUSDT": ["استی‌ام‌ایکس", "stmx"],
    "TWTUSDT": ["توکن تراست ولت", "twt"],
    "NEARUSDT": ["نیر پروتکل", "near"],
    "XECUSDT": ["ایکس ای سی", "xec"],
    "ICPUSDT": ["آی‌سی‌پی", "icp"],
    "RUNEUSDT": ["رون", "rune"],
    "KNCUSDT": ["کای‌انسی", "knc"],
    "CROUSDT": ["کریپتو دات کام", "cro"],
    "FLOKIUSDT": ["فلوکی", "floki"],
    "MITHUSDT": ["میتا", "mith"],
    "TLMUSDT": ["تریلیوم", "tlm"],
    "CELOUSDT": ["سلو", "celo"],
    "STGUSDT": ["استارگرین", "stg"],
    "PAXGUSDT": ["پکس‌گلد", "paxg"],
    "HOTUSDT": ["هولو", "hot"],
    "CVCUSDT": ["سی‌وی‌سی", "cvc"],
    "MITHUSDT": ["میتا", "mith"],
    "STMXUSDT": ["استی‌ام‌ایکس", "stmx"],
    "LITUSDT": ["لایت‌ینگ", "lit"],
    "TWTUSDT": ["توکن تراست ولت", "twt"],
    "NEARUSDT": ["نیر پروتکل", "near"],
    "RAYUSDT": ["ری", "ray"],
    "ROSEUSDT": ["رز", "rose"],
    "BAKEUSDT": ["بیک", "bake"],
    "RUNEUSDT": ["رون", "rune"],
    "TITANUSDT": ["تایتان", "titan"],
    "RLCUSDT": ["رول", "rlc"],
    "OGNUSDT": ["اوجین", "ogn"],
    "WTCUSDT": ["وِرلد‌تریدینگ", "wtc"],
    "QKCUSDT": ["کوییک‌سی", "qkc"],
    "PYRUSDT": ["پایر", "pyr"],
    "HNTUSDT": ["هیو‌نت", "hnt"],
    "C98USDT": ["سی‌۹۸", "c98"],
    "ALPHAUSDT": ["آلفا", "alpha"],
    "TOMOUSDT": ["تومو", "tomo"],
    "WTCUSDT": ["ورلد‌تریدینگ", "wtc"],
    "FETUSDT": ["فچت", "fet"],
    "RAYUSDT": ["ری", "ray"],
    "ROSEUSDT": ["رز", "rose"],
    "BAKEUSDT": ["بیک", "bake"],
    "BNTUSDT": ["بنت", "bnt"],
    "OCEANUSDT": ["اوشن پروتکل", "ocean"],
    "INJUSDT": ["اینجکت", "inj"],
    "WOOUSDT": ["وو", "woo"],
    "IOTAUSDT": ["آی‌وتا", "iota"],
    "MASKUSDT": ["ماسک", "mask"],
    "LPTUSDT": ["لی‌پرفکت", "lpt"],
    "TRIBEUSDT": ["تریب", "tribe"],
    "CVCUSDT": ["سی‌وی‌سی", "cvc"],
    "FETUSDT": ["فچت", "fet"],
    "MANAUSDT": ["مانا", "mana"],
    "SKLUSDT": ["اس‌کی‌ال", "skl"],
    "LENDUSDT": ["لند", "lend"],
    "BANDUSDT": ["بند", "band"],
    "PEOPLEUSDT": ["پپل", "people"]
};

// فرمان شروع ربات
bot.start((ctx) => {
  ctx.reply('سلام! لطفاً نماد ارز را وارد کنید (مثلاً BTC یا ETH).');
});

// دریافت پیغام از کاربر
bot.on('text', async (ctx) => {
  const user_input = ctx.message.text.trim().toLowerCase();

  // جستجو برای تطبیق نماد ارز
  let symbol = null;
  for (const [key, value] of Object.entries(currency_dict)) {
    if (user_input.includes(value[1].toLowerCase())) {
      symbol = key;
      break;
    }
  }

  if (!symbol) {
    return ctx.reply("نماد ارز وارد شده شناسایی نشد. لطفاً نام صحیح ارز را وارد کنید.");
  }

  try {
    // دریافت چارت ارز از سرور خارجی
    const chartUrl = `https://chart-ehsan.onrender.com/chart?symbol=${symbol}&timeframe=1h`;
    const chartResponse = await axios.get(chartUrl, { responseType: 'arraybuffer' });
    const chartPath = path.join(__dirname, `${symbol}.png`);
    fs.writeFileSync(chartPath, Buffer.from(chartResponse.data, 'binary'));

    // دریافت قیمت تتر از نوبیتکس
    
    // دریافت قیمت ارز مورد نظر از نوبیتکس
    const priceUrl = `https://api.nobitex.ir/v2/orderbook/${symbol.substring(0, 3)}-${symbol.substring(3)}`;
    const priceResponse = await axios.get(priceUrl);
    const priceInUSD = parseFloat(priceResponse.data.last_price);
    const priceInToman = priceInUSD * usdtPriceInToman;

    // بالاترین و پایین‌ترین قیمت 24 ساعته
    const highPrice = parseFloat(priceResponse.data.high24h);
    const lowPrice = parseFloat(priceResponse.data.low24h);

    // ارسال چارت و قیمت‌ها
    const caption = `
      💰 **قیمت ${currency_dict[symbol][0]}**
      ⏳ **تایم فریم**: ۱ ساعته
      💵 **قیمت لحظه‌ای**: ${priceInUSD.toFixed(2)} USD
      📈 **بالاترین قیمت ۲۴ ساعت اخیر**: ${highPrice.toFixed(2)} USD
      📉 **پایین‌ترین قیمت ۲۴ ساعت اخیر**: ${lowPrice.toFixed(2)} USD
      🔍 **حرکات اخیر این ارز در تایم فریم ۱ ساعته.**
    `;

    // ارسال تصویر و اطلاعات
    await ctx.replyWithPhoto({ source: chartPath }, { caption });
    fs.unlinkSync(chartPath); // حذف تصویر بعد از ارسال

  } catch (error) {
    console.error(error);
    ctx.reply('❌ خطا در دریافت اطلاعات، لطفاً دوباره امتحان کنید.');
  }
});

// شروع ربات
bot.launch();

console.log("ربات فعال شد...");
