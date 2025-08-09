import { getUserCookies } from '../storage.js';
import { HoyolabClient, Games } from 'node-hoyolab';

export default async function dailynoteCommand(ctx) {
  const cookies = getUserCookies(ctx.from.id);
  if (!cookies) return ctx.reply('❌ لم تقم بتسجيل كوكيزك. استخدم /setcookies أولاً.');

  const hoyo = new HoyolabClient({ cookie: cookies });
  try {
    const note = await hoyo.getDailyNote(Games.GENSHIN_IMPACT);
    if (!note) return ctx.reply('ℹ️ لا توجد بيانات Daily Note.');

    const msg = [];
    if (note.current_resin !== undefined) msg.push(`🔋 Resin: ${note.current_resin}/${note.max_resin || '??'}`);
    if (note.realm_currency !== undefined) msg.push(`🏰 Realm Currency: ${note.realm_currency}`);
    if (note.current_expedition && Array.isArray(note.current_expedition)) msg.push(`🚩 Expeditions: ${note.current_expedition.length}`);

    return ctx.reply(msg.join('\n') || 'ℹ️ لم أجد معلومات مفيدة في Daily Note.');
  } catch (err) {
    console.error('dailynote error:', err);
    return ctx.reply('⚠️ حدث خطأ عند جلب Daily Note. قد تكون كوكيزك منتهية الصلاحية.');
  }
}
