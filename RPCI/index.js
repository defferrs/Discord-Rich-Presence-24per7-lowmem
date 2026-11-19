'use strict';

const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');

// Dependency runtime dibundel di vendor/node_modules agar hosting gratis tidak
// perlu menjalankan npm install setiap startup.
const bundledModules = path.resolve(__dirname, 'vendor', 'node_modules');
process.env.NODE_PATH = [bundledModules, process.env.NODE_PATH || ''].filter(Boolean).join(path.delimiter);
Module._initPaths();

const { Client, CustomStatus, RichPresence } = require('./vendor/discord.js-selfbot-v13');
const yaml = require('js-yaml');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });

const config = yaml.load(fs.readFileSync(path.resolve(process.env.CONFIG_FILE || './config.yml'), 'utf8')) || {};
function isHttpUrl(v) { try { const u = new URL(v); return u.protocol === 'http:' || u.protocol === 'https:'; } catch { return false; } }
function resolveImage(value) {
  if (!value || String(value).trim() === '' || value === 'null') return null;
  const raw = String(value).trim();
  if (isHttpUrl(raw)) return raw;
  return raw;
}

if (!config.application_id) throw new Error('application_id is required');
const client = new Client();
const customStatus = new CustomStatus(client,{state:config.custom_status || '🔥 Watching tutorials',emoji:config.custom_emoji?{name:config.custom_emoji}:undefined});
const rich = new RichPresence(client)
  .setApplicationId(config.application_id)
  .setType(config.type || 0)
  .setName(config.name || 'My Cool Presence')
  .setDetails(config.details || 'No details set')
  .setState(config.state || 'Available')
  .setAssetsLargeImage(resolveImage(config.largeImageKey))
  .setAssetsLargeText(config.largeImageText || '')
  .setAssetsSmallImage(resolveImage(config.smallImageKey))
  .setAssetsSmallText(config.smallImageText || '')
  .setURL(config.url || null)
  .setStartTimestamp(new Date());
if (Array.isArray(config.buttons)) rich.setButtons(config.buttons);
client.on('ready',()=>{console.log(`✅ ${client.user.username} is ready!`);try{client.user.setPresence({activities:[customStatus.toJSON(),rich.toJSON()],status:'online'});console.log('✅ Rich Presence is now active!');}catch(e){console.error(`❌ Failed to set presence: ${e?.stack||e}`);}});
client.on('error',e=>console.error(`⚠️ Discord client error: ${e?.message||e}`));
client.login(process.env.TOKEN).catch(()=>console.error('❌ Invalid or missing token. Check your .env file.'));
