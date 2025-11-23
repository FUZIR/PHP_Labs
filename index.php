<?php
$titleX = "Головна сторінка";
$titleY = "Варіант №11";

$menu = [
        "index.php" => "Головна",
        "page2.php" => "Сторінка 2",
];

$texts = [
        "Це перший абзац довільного тексту, який виводиться зі змінної.",
        "Ще один приклад абзацу, щоб перевірити вирівнювання та вигляд.",
        "Тут можна написати будь-який текст — головне, що він береться з PHP."
];
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title><?php echo $titleX; ?> - <?php echo $titleY; ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles/index.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
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

                    <div id="variant-builder" style="background: #eef; padding: 10px; border-radius: 5px; margin: 10px 0;">
                        <h4>Створення об'єктів (Вар. 11)</h4>
                        <label>Кількість блоків:</label>
                        <input type="number" id="obj-count" min="1" max="10" value="2" style="width: 50px;">
                        <button id="btn-generate" class="btn btn-sm btn-primary">Створити поля</button>
                        <div id="inputs-container" style="margin-top: 10px;"></div>
                        <button id="btn-save-variant" class="btn btn-success" style="display: none; margin-top: 10px; width: 100%;">Зберегти на сервер</button>
                    </div>
                    <div id="carouselExampleSlidesOnly"
                         class="carousel slide"
                         data-bs-ride="carousel"
                         data-bs-interval="3000"
                         data-bs-wrap="true"
                         data-bs-pause="false">

                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="images/picture1.jpg"/>
                            </div>
                            <div class="carousel-item">
                                <img src="images/picture2.jpg"/>
                            </div>
                            <div class="carousel-item">
                                <img src="images/picture3.jpg"/>
                            </div>
                            <div class="carousel-item">
                                <img src="images/picture4.jpg"/>
                            </div>
                        </div>
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