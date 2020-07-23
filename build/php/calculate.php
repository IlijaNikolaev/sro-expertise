<?php

define('MAIL_TO',       'amocrm.sro@yandex.ru');
define('MAIL_REPLY_TO', 'amocrm.sro@yandex.ru');
define('SUBJECT',       'Опросник');

$nameclient = array_key_exists('calculate-name', $_POST) ? $_POST['calculate-name'] : null;
$phone = array_key_exists('calculate-phone', $_POST) ? $_POST['calculate-phone'] : null;
$email = array_key_exists('calculate-email', $_POST) ? $_POST['calculate-email'] : null;
$roistat = isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : null;	

$form = $_REQUEST;

$message = '';
foreach ($form as $name => $value) {
    switch ($name) {
        case 'calculate-name':
            $message .= 'Имя: '.$value . "\r\n";
            break;
        case 'calculate-phone':
            $message .= 'Телефон: '.$value . "\r\n";
            break;
        case 'calculate-email':
            $message .= 'Эл.почта: '.$value . "\r\n";
            break;
        case 'calculate-city':
            $message .= 'Город: '.$value . "\r\n";
            break;
        case 'public_procurement':
            if($value == 'yes') {
                $message .= 'Планируется участие в гос.закупках'. "\r\n";
            }
            break;
        case 'conditions':
            if($value == 'normal_conditions') {
                $message .= 'Особые условия: Обычные'. "\r\n";
            } elseif($value == 'danger_conditions') {
                $message .= 'Особые условия: Особоопасные'. "\r\n";
            } elseif($value == 'atomic_conditions') {
                $message .= 'Особые условия: Атомные'. "\r\n";
            }
            break;
        case 'sro_type':
            $message .= 'Тип СРО: ';
            foreach ($value as $type) {
                if($type == 'sro_builder') {
                    $message .= 'СРО строителей, ';
                }
                if($type == 'sro_planner') {
                    $message .= 'СРО проектировщиков, ';
                }
                if($type == 'sro_prospector') {
                    $message .= 'СРО изыскателей, ';
                }
            }
            $message .= "\r\n";
            break;
        case 'persons':
            $message .= 'Необходимо специалистов для нац.реестра: ' . $value . "\r\n";
            break;
        case 'sum':
            $message .= 'Сумма ген.подряда: ' . $value . "\r\n";
            break;
    }
}

function AmoSend($nameclient, $phone, $email, $roistat, $comment) {
  
$roistatData = array(
    'roistat' => $roistat,
    'key'     => 'MTA2MjUzOjk5NDQ0OmQ4MmVmMWQwMzM2YjkyYmQ5ZWIwMGI5NDBhZjkwNWVi', // Ключ для интеграции с CRM, указывается в настройках интеграции с CRM.
    'title'   => 'Заявка с сайта dopusk-sro24.com', // Название сделки
    'comment' => $comment, // Комментарий к сделке
    'name'    => $nameclient, // Имя клиента
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
	
	AmoSend($nameclient, $phone, $email, $roistat, $message);
    $isSuccess = mail($to, $subject, $message, $headers);

    if($isSuccess) {
        echo 'success';
    } else {
        echo 'error';
    }
} else {
    echo 'error';
}
