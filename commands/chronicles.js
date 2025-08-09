import { getUserCookies } from '../storage.js';
import { HoyolabClient, Games } from 'node-hoyolab';

export default async function chroniclesCommand(ctx) {
  const cookies = getUserCookies(ctx.from.id);
  if (!cookies) return ctx.reply('❌ لم تقم بتسجيل كوكيزك. استخدم /setcookies أولاً.');

  const hoyo = new HoyolabClient({ cookie: cookies });
  try {
    const res = await hoyo.getBattleChronicles(Games.GENSHIN_IMPACT);
    if (!res || !res.list || res.list.length === 0) {
      return ctx.reply('ℹ️ لا توجد سجلات Battle Chronicles متاحة.');
    }

    const lines = res.list.slice(0, 8).map((c, i) => {
      const name = c.name || c.title || 'Unknown';
      const level = c.level || c.level_name || '';
      return `${i + 1}. ${name} ${level}`.trim();
    });

    return ctx.reply(`🎯 Battle Chronicles:\n${lines.join('\n')}`);
  } catch (err) {
    console.error('chronicles error:', err);
    return ctx.reply('⚠️ حدث خطأ عند جلب Battle Chronicles. قد تكون كوكيزك منتهية الصلاحية.');
  }
}
