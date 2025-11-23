<?php
$titleX = "Друга сторінка";
$titleY = "Варіант №11";

$menu = [
        "index.php" => "Головна",
        "page2.php" => "Сторінка 2",
];

$texts = [
        "Цей текст зʼявився для прикладу і може бути використаний у тестовій сторінці.",
        "Абзаци допомагають перевіряти, як відображаються різні блоки на сайті.",
        "За потреби тут можна розмістити будь-який наповнювач для дизайну."
];

?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title><?php echo $titleX; ?> - <?php echo $titleY; ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="styles/index.css">
</head>
<body>
<script src="scripts/editable.js"></script>
<script src="scripts/variant.js"></script>

<div class="app-container">
    <div class="header">
        <h1><?php echo $titleX; ?></h1>
        <h2><?php echo $titleY; ?></h2>
    </div>
    <div class="main">
        <div class="content">
            <div class="body">
                <div class="left-content">
                    <?php echo $texts[0];?>
                    <h4>Динамічні об'єкти (AJAX оновлення):</h4>
                    <div id="variant-display" style="min-height: 100px; padding: 10px;">
                        Loading...
                    </div>
                </div>
                <div class="right-content">
                    <div class="content-header" data-key="right_header">
                        <?php echo $texts[1];?>
                    </div>
                    <div data-key="right_text">
                        <?php echo $texts[2];?>
                    </div>
                </div>
            </div>
        </div>
        <div class="sidebar">
            <ul>
                <?php foreach ($menu as $link => $label): ?>
                    <li><a href="<?php echo $link; ?>"><?php echo $label; ?></a></li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>
    <div class="footer">
        <h2>ІС-33 Ліповок Кирило</h2>
    </div>
</div>
</body>
</html>