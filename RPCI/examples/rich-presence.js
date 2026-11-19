const { RichPresence } = require("discord.js-selfbot-v13");

const activity = new RichPresence(client)
  .setName("Game Kustom")
  .setDetails("Sedang mengerjakan proyek")
  .setState("Dalam pengembangan")
  .setApplicationId("123456789012345678") // Ganti dengan ID aplikasi yang sebenarnya
  .setAssetsLargeImage("https://example.com/gambar-besar.png") // Ganti dengan URL gambar HTTPS
  .setAssetsLargeText("Menu Utama")
  .setAssetsSmallImage("https://example.com/gambar-kecil.png") // Ganti dengan URL gambar HTTPS
  .setAssetsSmallText("Aktif")
  .setStartTimestamp(Date.now())
  .setButtons(
    { name: "Kunjungi Situs", url: "https://example.com" },
    { name: "GitHub", url: "https://github.com/defferrs/Discord-Rich-Presence-24-7-lowmem" }
  );

client.user.setPresence({
  activities: [activity.toJSON()],
  status: "online"
});
