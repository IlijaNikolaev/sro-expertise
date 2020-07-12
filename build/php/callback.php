<?php
define('MAIL_TO',       'cro-expertiza@yandex.ru');
define('MAIL_FROM',     'cro-expertiza@yandex.ru');
define('MAIL_REPLY_TO', 'cro-expertiza@yandex.ru');
define('SUBJECT',       'Обратный звонок');

$calculateForm = $_REQUEST;

$message = '';
foreach ($calculateForm as $name => $value) {
    switch ($name) {
        case 'callback-name':
            $message .= 'Имя: '.$value . "\r\n";
            break;
        case 'callback-phone':
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
}
