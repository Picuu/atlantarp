const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const joinsLogsChannelModel = require("../../models/joinsLogs.js");
const ticketsLogsChannelModel = require("../../models/ticketsLogs.js");
const bansLogsChannelModel = require("../../models/bansLogs.js");
const whitelistModel = require("../../models/whitelistLogs.js");
const welcomesModel = require("../../models/welcomes.js");
const whitelistApprovedModel = require("../../models/whitelistApproved.js");
const checkSuggestionsChModel = require("../../models/checkSuggestionsCh.js");
const publicSuggestionsChModel = require("../../models/publicSuggestionsCh.js");

module.exports = {
    name: "set_logs",
    data: new SlashCommandBuilder()
        .setName("set_logs")
        .setDescription("Establece el canal actual para una función determinada (logs, bienvenidas...).")
        // .addStringOption(option => option.setName("type").setDescription("The type of logs you want to set.")
        //     .addChoice("Moderation logs", "mod-logs")
        //     .addChoice("Information", "info")
        //     .setRequired(true))
        .addStringOption(option => option.setName("log").setDescription("El log que quieras establecer en el canal.")
            .addChoice("Entradas y salidas", "joins-leaves")
            .addChoice("Tickets", "tickets")
            .addChoice("Kicks, Bans y Timeouts", "kicks-bans-timeouts")
            .addChoice("Whitelist", "whitelist")
            .addChoice("Bienvenidas", "welcomes")
            .addChoice("Aprovados de la Whitelist", "whitelist-approved")
            .addChoice("Revisión de sugerencias", "check-suggestions")
            .addChoice("Canal de sugerencias público", "public-suggestions")
            .setRequired(true)),

    async run(client, interaction, webhookClient) {

        try {
            
            // Roles: Soporte, Soporte+, Moderador, STAFF, Tecnico Discord, Gestion Staff, Co-Fundador, Fundador
            // const mods_rolesIds = ["934149605984174144", "934149605984174145", "934149605984174146", "934149605963210832", "934149605984174149", "934149606013567006", "934149606013567007", "934149606013567008"];
            // if (!mods_rolesIds.some(r => interaction.member.roles.cache.has(r))) return interaction.reply({ content: `No tienes el rango suficiente para hacer eso!`, ephemeral: true });
    
            // const type = interaction.options.getString("type")
    
            const logType = interaction.options.getString("log")
           
            switch (logType) {
                case "joins-leaves":
    
                    let joinsLogsChannelData = await joinsLogsChannelModel.findOne({ guildId: interaction.member.guild.id })
                    if (!joinsLogsChannelData) {
                        let newJoinsLogsChannelData = new joinsLogsChannelModel({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        })
                        await newJoinsLogsChannelData.save()
                    } else {
                        await joinsLogsChannelModel.findOneAndUpdate({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        })
                    }
            
                    interaction.reply({ content: "El canal se usará para registrar la **entrada y salida de usuarios** en el servidor.", ephemeral: true })
                    
                    break;
            
                case "tickets":
    
                    let ticketsLogsChannelData = await ticketsLogsChannelModel.findOne({ guildId: interaction.member.guild.id })
                    if (!ticketsLogsChannelData) {
                        let newTicketsLogsChannelData = new ticketsLogsChannelModel({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        })
                        await newTicketsLogsChannelData.save()
                    } else {
                        await ticketsLogsChannelModel.findOneAndUpdate({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        })
                    }
            
                    interaction.reply({ content: "El canal se usará para registrar los **tickets de ayuda**.", ephemeral: true })
    
                    break;
    
                case "kicks-bans-timeouts":
    
                    let bansLogsChannelData = await bansLogsChannelModel.findOne({ guildId: interaction.member.guild.id })
                    if (!bansLogsChannelData) {
                        let newBansLogsChannelData = new bansLogsChannelModel({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        })
                        await newBansLogsChannelData.save()
                    } else {
                        await bansLogsChannelModel.findOneAndUpdate({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        })
                    }
            
                    interaction.reply({ content: "El canal se usará para registar los **bans**, **kicks**, y **timeouts**.", ephemeral: true })
    
                    break;
    
                case "whitelist":
    
                    let whitelistData = await whitelistModel.findOne({ guildId: interaction.member.guild.id })
                    if (!whitelistData) {
                        let newWhitelistData = new whitelistModel({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        })
                        await newWhitelistData.save()
                    } else {
                        await whitelistModel.findOneAndUpdate({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        })
                    }
            
                    interaction.reply({ content: "El canal se usará para registar la aceptación/denegación de nuevos usuarios.", ephemeral: true })
    
                    break;
    
                case "welcomes":
    
                    let welcomesData = await welcomesModel.findOne({ guildId: interaction.member.guild.id })
                    if (!welcomesData) {
                        let newWelcomesData = new welcomesModel({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        })
                        await newWelcomesData.save()
                    } else {
                        await welcomesModel.findOneAndUpdate({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        })
                    }
            
                    interaction.reply({ content: "El canal se usará para dar la bienvenida a los nuevos usuarios.", ephemeral: true })
    
                    break;
    
                case "whitelist-approved":
    
                    let whitelistApprovedData = await whitelistApprovedModel.findOne({ guildId: interaction.member.guild.id });
                    if (!whitelistApprovedData) {
                        let newWhitelistApprovedData = new whitelistApprovedModel({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        });
                        await newWhitelistApprovedData.save();
                    } else {
                        await whitelistApprovedModel.findOneAndUpdate({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        });
                    }
            
                    interaction.reply({ content: "El canal se usará para anunciar los usuarios que han **aprobado la whitelist**.", ephemeral: true });
    
                    break;

                case "check-suggestions":

                    let checkSuggestionsChData = await checkSuggestionsChModel.findOne({ guildId: interaction.member.guild.id });
                    if (!checkSuggestionsChData) {
                        let newCheckSuggestionsChData = new checkSuggestionsChModel({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        });
                        await newCheckSuggestionsChData.save();
                    } else {
                        await checkSuggestionsChModel.findOneAndUpdate({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        });
                    }
            
                    interaction.reply({ content: "El canal se usará para enviar (a revisón) las nuevas **sugerencias** que hagan los usuarios.", ephemeral: true });
    
                    break;

                case "public-suggestions":

                    let publicSuggestionsChData = await publicSuggestionsChModel.findOne({ guildId: interaction.member.guild.id });
                    if (!publicSuggestionsChData) {
                        let newPublicSuggestionsChData = new publicSuggestionsChModel({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        });
                        await newPublicSuggestionsChData.save();
                    } else {
                        await publicSuggestionsChModel.findOneAndUpdate({
                            guildId: interaction.member.guild.id,
                            channelId: interaction.channel.id
                        });
                    }
            
                    interaction.reply({ content: "El canal se usará para enviar **sugerencias que hayan sido aceptadas**.", ephemeral: true });
    
                    break;
            }
            
        } catch (e) {
            const command = client.slashCommands.get(interaction.commandName);
            const errEmbed = new Discord.MessageEmbed()
                .setTitle("Nuevo ERROR encontrado!")
                .setDescription(`**Canal del error:** ${interaction.channel.name}\n**ID del canal:** ${interaction.channel.id}\n**Comando:** ${command.name}\n**Usuario:** ${interaction.member.user.tag}\n**ID del usuario:** ${interaction.member.id}\n\n**Error:**\n\`\`\`sh\n${e}\`\`\``)
                .setColor("RED")
    
            console.log(e);
            webhookClient.send({ embeds: [errEmbed] });
            interaction.reply({ content: "Ha ocurrido un error al ejecutar el comando. Los encargados han sido avisados, gracias por tu comprensión y disculpa las molestias!", ephemeral: true });
        }

    }
}