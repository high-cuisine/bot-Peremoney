const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // Для ввода кода из SMS

// Конфигурация (замените на свои данные!)
const apiId = 9704329; // Ваш API ID (из my.telegram.org)
const apiHash = "dc73fb86db4d2e1db3b4b23b29fed49d"; // Ваш API Hash
const phoneNumber = "+12098318519"; // Номер для проверки

const findNumber = "+79119767638"
//tutututu
// Сохраняем сессию, чтобы не вводить код повторно
const session = new StringSession(""); // Пустая строка = новая сессия
//1BQANOTEuMTA4LjU2LjExMgG7ci69qeEAg3RdADAWEDxSc1mYHaLo0ur4PdBG6Z7mz5Z19O0O3AFOSWlGytqtGYwENpJd5WZg7fkM61+SQ7an5cV6npIELi+BCSrQbe1i1Y/adlvinG0uCt3z6qxGEjOglMaYkMexl+AquwdoyaD6ni/efHRX8s36sYdRI2yBvPry9T9R3MZxdJ6/9sZYEbyhqeC9OxOsABry0CzzTBC+7GTsAk184gPUJ/W6tffLi2OHrgZP5DSfMfuB+1x1O2b5VDazMTwG1S/khIWlRITduC82qeKUFu/aDS0X7Qc03xdAkyQz4msJLtLgJ+suKwCOJHqOlEmoskkmdd1HsR2A/w==
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
    console.log(result.users);
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