<?php
define('MAIL_TO',       'cro-expertiza@yandex.ru');
define('MAIL_FROM',     'cro-expertiza@yandex.ru');
define('MAIL_REPLY_TO', 'cro-expertiza@yandex.ru');
define('SUBJECT',       'Идентификации и аутентификаия');

$form = $_REQUEST;

$message = '';
foreach ($form as $name => $value) {
    switch ($name) {
        case 'name':
            $message .= 'Название организации: '.$value . "\r\n";
            break;
        case 'inn':
            $message .= 'ИНН: '.$value . "\r\n";
            break;
        case 'fio':
            $message .= 'ФИО: '.$value . "\r\n";
            break;
        case 'phone':
            $message .= 'Телефон: '.$value . "\r\n";
            break;
    }
}

if($message) {

    $to      = MAIL_TO;
    $subject = SUBJECT;
    $headers = array(
        'From'      => MAIL_FROM,
        'Reply-To'  => MAIL_REPLY_TO,
        'X-Mailer'  => 'PHP/' . phpversion()
    );

    $isSuccess = mail($to, $subject, $message, $headers);

    if($isSuccess) {
        echo 'success';
    } else {
        echo 'error';
    }
} else {
    echo 'error';
}
