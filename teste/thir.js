const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input');
const { Api } = require('telegram/tl'); // Добавляем

const apiId = 9704329; // Ваш API ID (из my.telegram.org)
const apiHash = "dc73fb86db4d2e1db3b4b23b29fed49d"; // Ваш API Hash
const phoneNumber = "+12098318519"; // Ваш API Hash из my.telegram.org

(async () => {
  console.log('Загрузка сессии...');
  
  // Вводим строку сессии (можно сохранить и использовать повторно)
  const sessionString = "1AQAOMTQ5LjE1NC4xNzUuNjABuxpd2+0rmk8Bm+tO+SF53HvFXpqcEE9mSf6gUGMf3nIpYShyESabtIcr2L1ygUs3TOdPPhrR957TDw9JcVG0xw6n7RK1/sSjxTes/7KkK30PjL/G7eJBsDq+9QFa3qqwmEJw2FBnk7rzUkkytcUPDuCRpH7gNRe7cyILCoZtMGivOu7G2WPDFFZNvRngcpW05P+MGmogk6Ef/azkRGOR3oDA8yGbE30Eh22DK20KLD"
  const session = new StringSession(sessionString || ''); // Создаем или загружаем сессию
  
  const client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
  });

  if(!client.session.save()) {
   return;
  }
  
  // await client.start({
  //   phoneNumber: async () => await input.text('Введите номер телефона: '),
  //   password: async () => await input.text('Введите пароль (если есть): '),
  //   phoneCode: async () => await input.text('Введите код из SMS: '),
  //   onError: (err) => console.log(err),
  // });
  
  // Сохраняем сессию для повторного использования
  console.log('Сессия:', client.session.save());
  
  // Получаем данные для приглашения
  const groupIdentifier = await input.text('Введите ID группы или @username: ');
  const userToInvite = await input.text('Введите @username пользователя для приглашения: ');
  
  try {
    console.log('Получаем информацию о группе...');
    const group = await client.getEntity(groupIdentifier);
    
    console.log('Получаем информацию о пользователе...');
    const user = await client.getEntity(userToInvite);
    
    console.log('Приглашаем пользователя...');
    await client.invoke(new Api.channels.JoinChannel({ channel: group }));
    if (group instanceof Api.Channel) {
      // Для каналов/супергрупп
      console.log('invite to channel');
      await client.invoke(new Api.channels.InviteToChannel({
        channel: group,
        users: [user]
      }));
    } else {
      // Для обычных групп
      console.log('add chat user');
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
})();