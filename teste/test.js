const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // Для ввода кода из SMS

// Конфигурация (замените на свои данные!)
const apiId = 9704329; // Ваш API ID (из my.telegram.org)
const apiHash = "dc73fb86db4d2e1db3b4b23b29fed49d"; // Ваш API Hash
const phoneNumber = "+56959858621"; // Номер для проверки

const findNumber = "+79119767638"

// Сохраняем сессию, чтобы не вводить код повторно
const session = new StringSession(""); // Пустая строка = новая сессия

(async () => {
  console.log("Подключение к Telegram...");
  const client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
  });

  try {
    // Авторизация
    await client.start({
      phoneNumber: async () => phoneNumber,
      phoneCode: async () => await input.text("Код из SMS: "),
      password: async () => await input.text("Пароль 2FA (если есть): "),
      onError: (err) => console.error("Ошибка авторизации:", err),
    });

    console.log("✅ Успешный вход! Сессия:", client.session.save()); // Сохраните для повторного использования

    // Импорт контакта
    const result = await client.invoke(
      new Api.contacts.ImportContacts({
        contacts: [
          new Api.InputPhoneContact({
            clientId: 1,
            phone: findNumber,
            firstName: "Temp",
            lastName: "User",
          }),
        ],
      })
    );

    // Проверка результата
    if (result.users.length > 0) {
      const user = result.users[0];
      console.log(
        user.username 
          ? `Найден username: @${user.username}` 
          : "У пользователя нет username"
      );
    } else {
      console.log("❌ Пользователь не найден или скрыл номер");
    }
  } catch (err) {
    console.error("Ошибка:", err);
  } finally {
    await client.disconnect(); // Закрываем соединение
  }
})();