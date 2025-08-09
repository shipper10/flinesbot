import fs from 'fs';
import path from 'path';

const FILE = path.resolve('./users.json');

function atomicWrite(file, data) {
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, data, 'utf8');
  fs.renameSync(tmp, file);
}

export function loadUsers() {
  try {
    if (!fs.existsSync(FILE)) return {};
    const raw = fs.readFileSync(FILE, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (err) {
    console.error('Failed to read users.json:', err);
    return {};
  }
}

export function saveUsers(users) {
  try {
    atomicWrite(FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Failed to save users.json:', err);
  }
}

export function setUserCookies(userId, ltoken, ltuid) {
  const users = loadUsers();
  users[String(userId)] = { ltoken_v2: ltoken, ltuid_v2: ltuid };
  saveUsers(users);
}

export function getUserCookies(userId) {
  const users = loadUsers();
  return users[String(userId)] || null;
}

export function removeUserCookies(userId) {
  const users = loadUsers();
  if (users[String(userId)]) {
    delete users[String(userId)];
    saveUsers(users);
    return true;
  }
  return false;
}
