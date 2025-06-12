const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input');
const { Api } = require('telegram/tl'); // Добавляем

const apiId = 123456; // Ваш API ID из my.telegram.org
const apiHash = 'ваш_api_hash'; // Ваш API Hash из my.telegram.org

(async () => {
  console.log('Загрузка сессии...');
  
  // Вводим строку сессии (можно сохранить и использовать повторно)
  const sessionString = await input.text('Введите строку сессии (если нет - оставьте пустым): ');
  const session = new StringSession(sessionString || ''); // Создаем или загружаем сессию
  
  const client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
  });
  
  await client.start({
    phoneNumber: async () => await input.text('Введите номер телефона: '),
    password: async () => await input.text('Введите пароль (если есть): '),
    phoneCode: async () => await input.text('Введите код из SMS: '),
    onError: (err) => console.log(err),
  });
  
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
})();