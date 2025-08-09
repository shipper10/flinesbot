import 'dotenv/config';
import { Telegraf } from 'telegraf';
import setCookiesCommand from './commands/setcookies.js';
import removeCookiesCommand from './commands/removecookies.js';
import chroniclesCommand from './commands/chronicles.js';
import dailynoteCommand from './commands/dailynote.js';
import { getUserCookies } from './storage.js';

const bot = new Telegraf(process.env.TG_TOKEN);

bot.start((ctx) => {
  ctx.reply('مرحباً! استخدم /help لرؤية الأوامر المتاحة.');
});

bot.command('help', (ctx) => {
  const msg = `الأوامر المتاحة:\n` +
    `/setcookies <ltoken_v2> <ltuid_v2> - حفظ كوكيز حسابك\n` +
    `/removecookies - حذف الكوكيز المحفوظة\n` +
    `/chronicles - جلب Battle Chronicles\n` +
    `/dailynote - جلب Daily Note\n` +
    `/me - عرض حالة تسجيل الكوكيز لديك\n`;
  ctx.reply(msg);
});

bot.command('setcookies', setCookiesCommand);
bot.command('removecookies', removeCookiesCommand);
bot.command('chronicles', chroniclesCommand);
bot.command('dailynote', dailynoteCommand);

bot.command('me', (ctx) => {
  const cookies = getUserCookies(ctx.from.id);
  if (!cookies) return ctx.reply('❌ لم تُسجل الكوكيز بعد.');
  return ctx.reply(`✅ لديك كوكيز محفوظة (ltuid_v2: ${cookies.ltuid_v2}).`);
});

const port = process.env.PORT || 3000;
bot.launch().then(() => console.log('Bot launched on port', port));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
