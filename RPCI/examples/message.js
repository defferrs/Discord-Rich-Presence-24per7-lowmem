client.on("messageCreate", (message) => {
  if (message.author.id !== client.user.id) return; // Abaikan pesan pengguna lain
  console.log(`[${message.guild?.name}] ${message.channel.name}: ${message.content}`);
});
