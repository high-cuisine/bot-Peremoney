import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/core/redis/redis.service';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { Api } from 'telegram/tl';

 
@Injectable()
export class UserBotsService {

    constructor(
        private readonly redisService: RedisService,
    ) {
        this.apiId = 9704329;
        this.apiHash = "dc73fb86db4d2e1db3b4b23b29fed49d";
    }

    private readonly apiId: number;
    private readonly apiHash: string;

    async login(phoneNumber:string, password:string, phoneCode:string, apiId:number, apiHash:string) {
        const stringSession = new StringSession('');
        const client = new TelegramClient(stringSession, apiId, apiHash, {
            connectionRetries: 1,
        });
        const sessionString = "1AgAOMTQ5LjE1NC4xNjcuNTABuwibbclWw/Ci9r6YDlNThvtQTntE0eIcxGzRh8WU7mCyH86cvrZ+DUx0BIX3YduhHsEHZa+ku/+AllJeAd7+mhJMpiDayCCnvf7KU+VzDL5LqnjrfpSrbaHMSUU4UuOFrsOpUDgQJPb0iG90gn1jmohmXIxpFmVhgCFhsweGkzNS9uDdUb2J4eXPxItbACpYaGLEMe0tABc8hPxMxqZSDWKYTRhixxNjc7p2sQqzILJejxxLjrQSXBKD4vlJAosV9+63CaeahWcUsc7LiK8R5oa/73Gl3+9A09RlHXo4rIyaW3PSjRpU0XnqJl+D+WM4+q5I6miq9jj/AU+roWh7zso=";

        await this.redisService.set(`userbot_session:${phoneNumber}`, sessionString);

        return;
        try {
            await client.connect();
            await client.start({
                phoneNumber: async () => phoneNumber,
                phoneCode: async () => phoneCode,
                password: async () => password,
                onError: (err: any) => {
                    console.error('Login error:', err);
                    if (err.message.includes('FLOOD')) {
                        const seconds = err.seconds || 0;
                        const minutes = Math.ceil(seconds / 60);
                        console.log(`Flood wait: ${minutes} minutes`);
                    }
                },
            });

            await this.redisService.del(`code_sent:${phoneNumber}`);
            const sessionString = stringSession.save();
            await this.redisService.set(`userbot_session:${phoneNumber}`, sessionString);
            
            return sessionString;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        } finally {
            await client.disconnect();
        }
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

    async signIn(phoneNumber: string, code: string, apiId: number, apiHash: string) {
        
        // Get the stored session string and phoneCodeHash
        const sessionString = await this.redisService.get(`userbot_session:${phoneNumber}`);
        const phoneCodeHash = await this.redisService.get(`phone_code_hash:${phoneNumber}`);
        
        if (!sessionString || !phoneCodeHash) {
            throw new Error('No session or phone code hash found for this phone number');
        }

        const stringSession = new StringSession(sessionString);
        const client = new TelegramClient(stringSession, apiId, apiHash, {
            connectionRetries: 5,
        });

        try {
            await client.connect();
            const result = await client.invoke(new Api.auth.SignIn({
                phoneNumber,
                phoneCode: code,
                phoneCodeHash,
            }));

            // Update the session string in Redis
            await this.redisService.set(`userbot_session:${phoneNumber}`, stringSession.save());
            
            console.log('Signed in successfully:', result);
            return result;
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
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
            const sessionString = await this.redisService.srandmember("telegram:userbots");
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
                const user = await client.getEntity(username);
                await client.sendMessage(user, { message });
            }
        }
        catch(error) {
            console.error("Error in createMailing:", error);
        }
        finally {
            if (client) {
                await client.disconnect();
            }
        }
    }

}




        // const sessionString = "1AgAOMTQ5LjE1NC4xNjcuNTABuwibbclWw/Ci9r6YDlNThvtQTntE0eIcxGzRh8WU7mCyH86cvrZ+DUx0BIX3YduhHsEHZa+ku/+AllJeAd7+mhJMpiDayCCnvf7KU+VzDL5LqnjrfpSrbaHMSUU4UuOFrsOpUDgQJPb0iG90gn1jmohmXIxpFmVhgCFhsweGkzNS9uDdUb2J4eXPxItbACpYaGLEMe0tABc8hPxMxqZSDWKYTRhixxNjc7p2sQqzILJejxxLjrQSXBKD4vlJAosV9+63CaeahWcUsc7LiK8R5oa/73Gl3+9A09RlHXo4rIyaW3PSjRpU0XnqJl+D+WM4+q5I6miq9jj/AU+roWh7zso=";

        // const redisKey = "telegram:userbots";
        // console.log("Saving session to Redis with key:", redisKey);
        // await this.redisService.sadd(redisKey, sessionString);