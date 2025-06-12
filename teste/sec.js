const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

// 🔐 Укажи свои данные
const apiId = 9704329;
const apiHash = "dc73fb86db4d2e1db3b4b23b29fed49d";
const phoneNumber = "+79658879405"; // Телефон, на который зарегистрирован Telegram

// Пустая сессия, мы ничего не сохраняем
const stringSession = new StringSession("");

(async () => {
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  console.log("⏳ Подключение к Telegram...");
  await client.connect();

  try {
    // Шаг 1. Отправка кода
    console.log("📨 Отправка кода на Telegram...");
    const result = await client.invoke(
      new Api.auth.SendCode({
        phoneNumber,
        apiId,
        apiHash,
        settings: new Api.CodeSettings({
          allowFlashcall: false,
          currentNumber: true,
          allowAppHash: true,
        }),
      })
    );

    // Шаг 2. Ввод кода
    const code = await input.text("🔐 Введите код из Telegram или SMS: ");

    // Шаг 3. Попытка входа
    const signInResult = await client.invoke(
      new Api.auth.SignIn({
        phoneNumber,
        phoneCode: code,
        phoneCodeHash: result.phoneCodeHash,
      })
    );

    if (signInResult instanceof Api.auth.AuthorizationSignUpRequired) {
      console.log("❌ Аккаунт не зарегистрирован.");
    } else {
      const me = await client.getMe();
      console.log(`✅ Успешный вход как: ${me.username || me.firstName}`);
    }

  } catch (err) {
    // Обработка двухфакторки
    if (err.errorMessage === "SESSION_PASSWORD_NEEDED") {
        console.log("🔐 Аккаунт защищён паролем. Введите его.");
        const pwd = await input.text("Пароль: ");
      
        const passwordInfo = await client.invoke(new Api.account.GetPassword());
            
            console.log(passwordInfo);
            console.log(pwd)
      
        await client.invoke(new Api.auth.CheckPassword({ password: pwd }));
      
        const me = await client.getMe();
        console.log(`✅ Вход с 2FA успешен как: ${me.username || me.firstName}`);
      } else if (err.errorMessage?.includes("FLOOD")) {
      console.log("⏳ Telegram требует подождать:", err.seconds, "секунд");
    } else {
      console.error("❌ Ошибка входа:", err);
    }
  } finally {
    await client.disconnect();
  }
})();
