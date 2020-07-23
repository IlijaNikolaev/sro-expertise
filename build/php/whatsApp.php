<?php
define('MAIL_TO',       'amocrm.sro@yandex.ru');
define('MAIL_REPLY_TO', 'amocrm.sro@yandex.ru');
define('SUBJECT',       'Форма WhatsApp');

$phone = array_key_exists('whatsapp__phone', $_POST) ? $_POST['whatsapp__phone'] : null;
$roistat = isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : null;	

$form = $_REQUEST;

$message = '';
foreach ($form as $name => $value) {
    switch ($name) {
        case 'whatsapp__phone':
            $message .= 'Number WhatsApp: '.$value . "\r\n";
            break;
    }
}


function AmoSend($phone, $email, $roistat) {
  
$roistatData = array(
    'roistat' => $roistat,
    'key'     => 'MTA2MjUzOjk5NDQ0OmQ4MmVmMWQwMzM2YjkyYmQ5ZWIwMGI5NDBhZjkwNWVi', // Ключ для интеграции с CRM, указывается в настройках интеграции с CRM.
    'title'   => 'Заявка с сайта dopusk-sro24.com', // Название сделки
    //'comment' => 'Заявка по ключу ' . $utm_term, // Комментарий к сделке
    'phone'   => $phone, // Номер телефона клиента
    'email'   => $email, // E-mail клиента
    'is_need_check_order_in_processing' => '1', // Включение проверки заявок на дубли
    'is_need_check_order_in_processing_append' => '1', // Если создана дублирующая заявка, в нее будет добавлен комментарий об этом
    'fields'  => array(
		'456860' => 'dopusk-sro24.com',
		'466018' => 'dopusk-sro24.com',
		'173540' => 'Заявка с формы на сайте',
    // Массив дополнительных полей. Если дополнительные поля не нужны, оставьте массив пустым.
    // Примеры дополнительных полей смотрите в таблице ниже.
     //"charset" => "Windows-1251",  Сервер преобразует значения полей из указанной кодировки в UTF-8.
    ),
);

file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?" . http_build_query($roistatData), false,
				stream_context_create(
					array('http'=>
						array(
							'timeout' => 1,
						)
					)
				)
			);
} 

if($message) {

    $to      = MAIL_TO;
    $subject = SUBJECT;
    $headers = array(
        'From'      => MAIL_FROM,
        'Reply-To'  => MAIL_REPLY_TO,
        'X-Mailer'  => 'PHP/' . phpversion()
    );
	
	AmoSend($phone, $email, $roistat);
    $isSuccess = mail($to, $subject, $message, $headers);

    if($isSuccess) {
        echo 'success';
    } else {
        echo 'error';
    }
} else {
    echo 'error';
}