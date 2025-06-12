async function sendMassSMS(phones, message, options = {}) {
    const config = {
      login: 'Snick-2001@yandex.ru',    // Замените на ваш логин
      psw: 'Snick-2001',  // Замените на пароль или API-ключ
      sender: 'TEST',        // Или ваше зарегистрированное имя отправителя
      charset: 'utf-8',
      fmt: 3,                // JSON формат ответа
    };
  
    // Формируем URL с параметрами
    const baseParams = {
      login: config.login,
      psw: config.psw,
      mes: encodeURIComponent(message),
      phones: phones.join(','),
      sender: config.sender,
      charset: config.charset,
      fmt: config.fmt,
      ...options
    };
  
    // Преобразуем параметры в строку URL
    const queryString = Object.entries(baseParams)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
  
    try {
      const url = `https://smsc.ru/sys/send.php?${queryString}`;
      console.log('Request URL:', url); // Для отладки
  
      const response = await fetch(url, {
        method: 'GET',  // SMSC.RU принимает GET для простых запросов
        headers: {
          'Accept': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Ошибка при отправке SMS:', error);
      throw error;
    }
  }
  
  // Пример использования
  (async () => {
    const phones = ['+79658879405']; // Тестовый номер
    const message = 'Тестовое сообщение';
  
    try {
      const result = await sendMassSMS(phones, message, {
        cost: 1 // Проверить стоимость без отправки
      });
      console.log('Результат:', result);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  })();