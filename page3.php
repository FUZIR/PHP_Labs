<?php
$titleX = "Третя сторінка";
$titleY = "Варіант №11";

$menu = [
        "index.php" => "Головна",
        "page2.php" => "Сторінка 2",
        "page3.php" => "Сторінка 3",
        "page4.php" => "Сторінка 4",
        "page5.php" => "Сторінка 5"
];

$texts = [
        "Ще один набір текстів, який підходить для перевірки шаблонів у PHP.",
        "Використання таких абзаців дозволяє швидко заповнювати сайт контентом.",
        "Це допомагає протестувати відступи, шрифти та кольорову схему."
];
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title><?php echo $titleX; ?> - <?php echo $titleY; ?></title>
    <link rel="stylesheet" href="styles/index.css">
</head>
<body>
<script src="scripts/editable.js"></script>
<div class="container">
    <div class="header" style="height: auto; max-height: 25%; overflow: auto; word-wrap: break-word">
        <h1><?php echo $titleX; ?></h1>
        <h2><?php echo $titleY; ?></h2>
    </div>
    <div class="main">
        <div class="content">
            <div class="body">
                <div class="left-content">
                    <?php echo $texts[0];?>
                    <div style="width: 100%; display: flex; justify-content: center">
                        <img src="images/picture3.jpg" style="max-width: 30vw; max-height: 50vh"/>
                    </div>
                </div>
                <div class="right-content">
                    <div class="content-header" data-key="right_header" style="height: auto; max-height: 20%; overflow: auto; word-wrap: break-word">
                        <?php echo $texts[1];?>
                    </div>
                    <div data-key="right_text" style="height: auto; max-height: 80%; overflow: auto; word-wrap: break-word">
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