client.user.setPresence({
  status: "dnd", // online, idle, dnd, invisible
});

client.user.setActivity("sedang membuat kode", {
  type: "PLAYING", // Bisa juga STREAMING, LISTENING, WATCHING, COMPETING
});

client.user.setActivity("komunitas", {
  type: "WATCHING",
});

client.user.setActivity("musik lofi", {
  type: "LISTENING",
});

client.user.setActivity("Siaran Langsung", {
  type: "STREAMING",
  url: "https://twitch.tv/some_channel", // Harus berupa URL streaming yang valid
});
