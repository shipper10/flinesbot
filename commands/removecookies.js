import { removeUserCookies } from '../storage.js';

export default async function removeCookiesCommand(ctx) {
  const ok = removeUserCookies(ctx.from.id);
  if (ok) return ctx.reply('✅ تم حذف الكوكيز من التخزين.');
  return ctx.reply('⚠️ لم يتم العثور على كوكيز محفوظة لحسابك.');
}
