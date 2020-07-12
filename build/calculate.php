<?php
$calculateForm = $_REQUEST;

$message = '';
foreach ($calculateForm as $name => $value) {
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
                $message .= 'Планируется ли участие в гос.закупках'. "\r\n";
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

if($message) {
    $to      = 'cro-expertiza@yandex.ru';
    $subject = 'Калькулятор';
    $headers = array(
        'From' => 'cro-expertiza@yandex.ru',
        'Reply-To' => 'cro-expertiza@yandex.ru',
        'X-Mailer' => 'PHP/' . phpversion()
    );

    mail($to, $subject, $message, $headers);
}
