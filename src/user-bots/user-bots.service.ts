import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/core/redis/redis.service';
import { client, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { Api } from 'telegram/tl';
import { PrismaService } from '../core/prisma/Prisma.service';
import { UserBots } from '@prisma/client';

 
@Injectable()
export class UserBotsService {

    constructor(
        private readonly redisService: RedisService,
        private readonly prisma: PrismaService,
    ) {
        this.apiId = 9704329;
        this.apiHash = "dc73fb86db4d2e1db3b4b23b29fed49d";
    }

    private readonly apiId: number;
    private readonly apiHash: string;

    async login() {
        
        const userbot = await this.prisma.userBots.findMany();

        const randomUserbot = userbot[Math.floor(Math.random() * userbot.length)];

        return randomUserbot.session;
     
    }

    async getUserBotWorking() {
        const userbots = await this.prisma.userBots.findMany();
        
        for (const userbot of userbots) {
            const client = new TelegramClient(
                new StringSession(userbot.session),
                this.apiId,
                this.apiHash,
                {
                    connectionRetries: 2,
                    useWSS: true,
                    autoReconnect: true
                }
            );

            try {
                await client.connect();
                
                // Проверяем работоспособность бота
                const me = await client.getMe();
                if (me) {
                    await client.disconnect();
                    return userbot;
                }
            } catch (error) {
                console.error(`Userbot ${userbot.username} is not working:`, error);
            } finally {
                try {
                    await client.disconnect();
                } catch (e) {
                    console.error('Error disconnecting client:', e);
                }
            }
        }

        return null; // Если ни один бот не работает
    }

    async sendCode(phoneNumber: string, apiId: number, apiHash: string) {
        // Create a new string session
        const stringSession = new StringSession('');
        
        const client = new TelegramClient(stringSession, apiId, apiHash, {
            connectionRetries: 1,
        });

        try {
            await client.connect();
            const result = await client.invoke(new Api.auth.SendCode({
                phoneNumber,
                apiId,
                apiHash,
                settings: new Api.CodeSettings({
                    allowFlashcall: true,
                    currentNumber: true,
                    allowAppHash: true,
                }),
            }));

            if (!(result instanceof Api.auth.SentCode)) {
                throw new Error('Unexpected response type from SendCode');
            }
            
            console.log('Code sent successfully:', result);
            return result;
        } catch (error) {
            console.error('Error sending code:', error);
        } finally {
            await client.disconnect();
        }
    }


    async checkValidSession(phoneNumber: string) {
        const sessionString = await this.redisService.get(`userbot_session:${phoneNumber}`);
        if (!sessionString) {
            return false;
        }
        return true;
    }

    async getRandomSession(phoneNumber: string) {
        const sessionString = await this.redisService.get(`userbot_session:`);
        if (!sessionString) {
            return null;
        }
        return sessionString;
    }

    async setSession(sessionString: string) {
        await this.redisService.sadd("telegram:userbots", sessionString);
    }

    async sendMessagesUsers() {

    }

    async getUsersInfoByPhones(phones: string[]) {
        const usersInfo = [];
        let client: TelegramClient | null = null;

        try {
            let sessionString = await this.redisService.srandmember("telegram:userbots");
    
            if (!sessionString) {
                sessionString = await this.login();
                if (!sessionString) {
                    console.log("Нет доступных аккаунтов");
                    return null;
                }
            }

            const stringSession = new StringSession(sessionString);
            client = new TelegramClient(stringSession, this.apiId, this.apiHash, {
                connectionRetries: 2,
            });

            await client.connect();
            console.log("Connected to Telegram");

            for (const findNumber of phones) {
                try {
                    const result = await client.invoke(
                        new Api.contacts.ImportContacts({
                            contacts: [
                                new Api.InputPhoneContact({
                                    clientId: 1 as any,
                                    phone: findNumber,
                                    firstName: "Temp",
                                    lastName: "User",
                                }),
                            ],
                        })
                    );

                    if (result.users.length > 0) {
                        const user = result.users[0] as any;
                        usersInfo.push({
                            phone: findNumber,
                            username: user.username,
                            id: user.id.value.toString()
                        });
                    } else {
                        usersInfo.push({
                            phone: findNumber,
                            username: null,
                            id: null
                        });
                    }
                } catch (error) {
                    console.error(`Error processing phone number ${findNumber}:`, error);
                    usersInfo.push({
                        phone: findNumber,
                        username: null,
                        id: null,
                        error: error.message
                    });
                }
            }
        } catch (error) {
            console.error("Error in getUsersInfoByPhones:", error);
            throw error;
        } finally {
            if (client) {
                await client.disconnect();
                console.log("Disconnected from Telegram");
            }
        }

        return usersInfo;
    }

    async sendMessage(usernames:string[], message:string) {
        let client: TelegramClient | null = null;

        try {
            const sessionString = await this.redisService.srandmember("telegram:userbots");
            if (!sessionString) {
                console.log("No session found in Redis");
                return null;
            }

            const stringSession = new StringSession(sessionString);
            client = new TelegramClient(stringSession, this.apiId, this.apiHash, {
                connectionRetries: 2,
            });

            await client.connect();
            for(const username of usernames) {
                try {
                    const user = await client.invoke(new Api.users.GetUsers({ id: [username] }));
                    if (user && user.length > 0) {
                        await client.sendMessage(user[0], { message });
                    }
                } catch (error) {
                    console.error(`Error sending message to ${username}:`, error);
                }
            }
        }
        catch(error) {
            console.error("Error in sendMessage:", error);
        }
        finally {
           
        }
    }

    async inviteGroup(usernames: string[], groupName: any) {
        let client: TelegramClient | null = null;
    
        try {
            
            const sessionString = await this.login();
            console.log(sessionString);
            if (!sessionString) {
                console.log("Сессии не найдены в Redis");
                return null;
            }
    
            const stringSession = new StringSession(sessionString);
            client = new TelegramClient(stringSession, this.apiId, this.apiHash, {
                connectionRetries: 2,
            });
    
            await client.connect();

            const groupIdentifier = groupName;
            const group = await client.getEntity(groupIdentifier);
            await client.invoke(new Api.channels.JoinChannel({ channel: group }));
            
            for (const username of usernames) {
                await this.inviteLead(username, groupName, client);
            }
        } catch (error) {
            console.error("Ошибка в inviteGroup:", error);
        } finally {
            if (client) {
                await client.disconnect();
            }
        }
    }

    async inviteGroupV2(usernames: string[], groupName: any) {
        const userbots = (await this.prisma.userBots.findMany()).sort((a, b) => Math.random() - 0.5);
        let userbot = userbots[0];
        let currentUserbot = 0;

        let client = await this.loginUserBot(userbot);

        let group = await client.getEntity(groupName);
        await client.invoke(new Api.channels.JoinChannel({ channel: group }));
        let isSwitchbot = false;

        console.log('start');

        for(let i = 0; i < usernames.length; i++) {

            try {
                console.log(usernames[i]);
                if(userbots.length <= currentUserbot) return;

                if((i % 10 === 0 && i !== 0) || isSwitchbot) {

                    userbot = userbots[++currentUserbot];

                    this.logoutUserBot(client);

                    client = await this.loginUserBot(userbot);
                    isSwitchbot = false;

                    group = await client.getEntity(groupName);
                    await client.invoke(new Api.channels.JoinChannel({ channel: group }));
                }
                console.log('приглашаем пользователя', usernames[i]);
                await this.inviteLeadInGroup(usernames[i], group, client);
                console.log('успешно');
                await new Promise(resolve => setTimeout(resolve, 1000 * 120))
            }
            catch(e) {
                console.warn(e);
                if(e.errorMessage === 'PEER_FLOOD' && usernames.length >= currentUserbot) {
                    isSwitchbot = true;
                    i--;
                    continue;
                }
            }
            
        }

        await this.logoutUserBot(client);
    }

    async loginUserBot(userbot:UserBots) {
        const client = new TelegramClient(new StringSession(userbot.session), this.apiId, this.apiHash, {
            connectionRetries: 2,
        });

        await client.connect();

        return client;
    }

    async logoutUserBot(client:any) {
        await client.disconnect();
    }

    async inviteLeadInGroup(username:string, group:any, client:any) {
        try {
            const user = await client.getEntity(username);
        
            console.log('Приглашаем пользователя...');
            if (group instanceof Api.Channel) {
            await client.invoke(new Api.channels.InviteToChannel({
                channel: group,
                users: [user]
            }));
            } else {
            await client.invoke(new Api.messages.AddChatUser({
                chatId: group.id,
                userId: user,
                fwdLimit: 100
            }));
            }
            console.log(`Пользователь @${username} успешно приглашен в ${group.title || 'группу'}`);
        }
        catch(e) {
            throw e;
        }
    }

    async inviteLead(username: string, groupName: string, client:any) {

        if(username === 'high_cuisine') {
            return;
        }
        
        const groupIdentifier = groupName;
        const userToInvite = '@' + username;

        console.log(groupIdentifier, userToInvite);

        try {
            console.log('Получаем информацию о группе...');
            const group = await client.getEntity(groupIdentifier);
            
            console.log('Получаем информацию о пользователе...');
            const user = await client.getEntity(userToInvite);

            console.log(group, user);
            
            console.log('Приглашаем пользователя...');
            if (group instanceof Api.Channel) {
              // Для каналов/супергрупп
              await client.invoke(new Api.channels.InviteToChannel({
                channel: group,
                users: [user]
              }));
            } else {
              // Для обычных групп
              await client.invoke(new Api.messages.AddChatUser({
                chatId: group.id,
                userId: user,
                fwdLimit: 100
              }));
            }
            
            console.log(`Пользователь @${userToInvite} успешно приглашен в ${group.title || groupIdentifier}`);
          } catch (error) {
            console.error('Ошибка при приглашении:', error);
          } finally {
            await client.disconnect();
          }
    }


    async createMailing(usernames: string[], message: string) {
        let usedSessions = new Set<string>();
        const remainingUsers = new Set(usernames);
        const attempts = new Map<string, number>();
    
        while (remainingUsers.size > 0) {
            let sessionString = await this.redisService.srandmember("telegram:userbots");
    
            // Если нет новых сессий — пробуем логин вручную
            if (!sessionString || usedSessions.has(sessionString)) {
                sessionString = await this.login();
                if (!sessionString) {
                    console.log("Нет доступных аккаунтов");
                    break;
                }
            }
    
            usedSessions.add(sessionString);
            const stringSession = new StringSession(sessionString);
            const client = new TelegramClient(stringSession, this.apiId, this.apiHash, {
                connectionRetries: 2,
                useWSS: true,
                autoReconnect: true
            });
    
            try {
                await client.connect();
                // Отключаем получение обновлений
                await client.invoke(new Api.updates.GetState());
                await client.invoke(new Api.updates.GetDifference({
                    pts: 0,
                    date: 0,
                    qts: 0
                }));
    
                for (const username of [...remainingUsers]) {
                    let attempt = attempts.get(username) ?? 0;
    
                    if (attempt >= 3) {
                        remainingUsers.delete(username);
                        continue;
                    }
    
                    try {
                        const user = await client.getEntity(username);
                        await client.sendMessage(user, { message });
    
                        console.log(`✅ Успешно отправлено ${username}`);
                        remainingUsers.delete(username); // убираем из списка
                    } catch (err) {
                        attempts.set(username, attempt + 1);
                        console.warn(`⚠️ Ошибка при отправке ${username}, попытка ${attempt + 1}`);
                    }
                }
    
            } catch (error) {
                console.error("❌ Ошибка при работе с аккаунтом:", error);
            } finally {
                await client.disconnect();
            }
        }
    
        console.log("📨 Рассылка завершена");
    }
    

}




        // const sessionString = "1AgAOMTQ5LjE1NC4xNjcuNTABuwibbclWw/Ci9r6YDlNThvtQTntE0eIcxGzRh8WU7mCyH86cvrZ+DUx0BIX3YduhHsEHZa+ku/+AllJeAd7+mhJMpiDayCCnvf7KU+VzDL5LqnjrfpSrbaHMSUU4UuOFrsOpUDgQJPb0iG90gn1jmohmXIxpFmVhgCFhsweGkzNS9uDdUb2J4eXPxItbACpYaGLEMe0tABc8hPxMxqZSDWKYTRhixxNjc7p2sQqzILJejxxLjrQSXBKD4vlJAosV9+63CaeahWcUsc7LiK8R5oa/73Gl3+9A09RlHXo4rIyaW3PSjRpU0XnqJl+D+WM4+q5I6miq9jj/AU+roWh7zso=";

        // const redisKey = "telegram:userbots";
        // console.log("Saving session to Redis with key:", redisKey);
        // await this.redisService.sadd(redisKey, sessionString);