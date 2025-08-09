import { setUserCookies } from '../storage.js';

export default async function setCookiesCommand(ctx) {
  const text = ctx.message?.text || '';
  const parts = text.trim().split(/\s+/);
  if (parts.length < 3) {
    return ctx.reply('❌ استخدم: /setcookies <ltoken_v2> <ltuid_v2>');
  }
  const [, ltoken, ltuid] = parts;
  try {
    setUserCookies(ctx.from.id, ltoken, ltuid);
    return ctx.reply('✅ تم حفظ الكوكيز في ملف JSON (خاص بحسابك).');
  } catch (err) {
    console.error(err);
    return ctx.reply('⚠️ فشل حفظ الكوكيز.');
  }
}
