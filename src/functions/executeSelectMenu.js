module.exports = async (client, interaction, webhookClient) => {

    // const commandName = interaction.message.interaction.commandName
    const selectMenuId = interaction.customId
    const selectMenu = client.selectMenus.get(selectMenuId)

    if (!selectMenu) return;

    try {
        await selectMenu.run(client, interaction, webhookClient)
    } catch (err) {
        console.error(err)
        return interaction.reply({ content: "Ha ocurrido un error al ejecutar el comando.", ephemeral: true })
    }

}