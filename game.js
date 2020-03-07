window.onload=init;//запуск функции init при загрузке game.js

var map;
var ctxMap;

var pl;
var ctxPl;

var en;
var ctxEn;

var startBtn;
var stopBtn;
var upBtn;
var fireBtn;
var downBtn;

/*var drawBtn;
var clearBtn;*/

var gameWidth=800;
var gameHeight=500;

var background=new Image();
background.src="img/bg.png"

var tiles=new Image();
tiles.src="img/tiles.bmp"

var kotikEnemy=new Image();
kotikEnemy.src="img/kotik.gif"

var player; //создаем объект
var enemy;

var isPlaying; 

//Основной цикл находится в переменной:
var requestAnimFrame=window.requestAnimationFrame || // обновление страницы в разных браузерах, ||-присоединение ИЛИ
									window.webkitRequestAnimationFrame || // поддержка Safari
									window.mozRequestAnimationFrame || // поддержка Mozilla
									window.oRequestAnimationFrame || // поддержка Opera
									window.msRequestAnimationFrame; // поддержка IE

function init()
{
	map=document.getElementById("map");
	ctxMap=map.getContext("2d");

	pl=document.getElementById("player");
	ctxPl=map.getContext("2d");

	en=document.getElementById("enemy");
	ctxEn=map.getContext("2d");

	map.width=gameWidth;
	map.height=gameHeight;
	pl.width=gameWidth;
	pl.height=gameHeight;
	en.width=gameWidth;
	en.height=gameHeight;

	startBtn=document.getElementById("startBtn");
	stopBtn=document.getElementById("stopBtn");
	upBtn=document.getElementById("upBtn");
	fireBtn=document.getElementById("fireBtn");
	downBtn=document.getElementById("downBtn");

	startBtn.addEventListener("click", startLoop, false);//Запуск функции drawRect при событии click на кнопку Draw
	stopBtn.addEventListener("click", stopLoop, false);
	upBtn.addEventListener("click", stopLoop, false);
	fireBtn.addEventListener("click", stopLoop, false);
	downBtn.addEventListener("click", stopLoop, false);

	player=new Player();//Инициализируем объект
	enemy=new Enemy();
	
	drawBg();
	
}

function loop()
{
	if(isPlaying)
	{
		Draw();
		update();
		requestAnimFrame(loop);
	}
}

function Draw()
{
	player.draw();//вызывает метод draw у объекта player
	enemy.draw();//вызывает метод draw у объекта enemy
}

function update()
{
	console.log("loop"); //выводим на консоль слово loop. Просмотор кода элемента-Console
	player.update();
}

function startLoop()
{
	isPlaying=true;
	loop();
}

function stopLoop()
{
	isPlaying=false;
}
 
//Objects:
function Player() //обращение к прототипу Player
{
	this.srcX=0; //создаем новые переменные. this - используется для обращения к переменным объекта Player
	this.srcY=0; //эти переменные используются для задания координат объекта в файле
	this.drawX=5; //рисование объекта на сцене
	this.drawY=5; 
	this.width=74;
	this.height=79;

	this.speed=5; //скорость перемещения игрока
}

function Enemy()//Враг
{
	this.srcX=0; //создаем новые переменные. this - используется для обращения к переменным объекта Player
	this.srcY=0; //эти переменные используются для задания координат объекта в файле
	this.drawX=500; //рисование объекта на сцене
	this.drawY=50; 
	this.width=117;
	this.height=119;
	this.speed=8; //скорость перемещения 
}

Enemy.prototype.draw=function()
{
	ctxPl.drawImage(kotikEnemy, //отображение врага
	this.srcX, this.srcY, // - координаты изображения от левого верхнего угла
	this.width, this.height, //размер изображения, ширина, высота
	this.drawX, this.drawY, // координаты на плоскости,
	this.width, this.height); //размер на экране
}

Player.prototype.draw = function() //создаем новый метод draw в прототипе Player
{
	clearCtxPlayer()//стираем старое изображение при перемещении
	ctxPl.drawImage(tiles, //отображение игрока
	this.srcX, this.srcY, // - координаты изображения от левого верхнего угла
	this.width, this.height, //размер изображения, ширина, высота
	this.drawX, this.drawY, // координаты на плоскости,
	this.width, this.height); //размер на экране
}

Player.prototype.update = function() //создаем новый метод draw в прототипе Player
{
	this.drawY+=3;
}

function clearCtxPlayer()// удаляем грока после перемещения
{
	ctxPl.clearRect(0, 0, gameWidth, gameHeight);//удаляем прямоугольную область в координатах всего поля
	drawBg()
}

function drawBg() //вывод background
{
	ctxMap.drawImage(background, 0, 0, 800, 480, //0, 0, - координаты изображения от левого верхнего угла, ширина, высота
	0, 0, gameWidth, gameHeight);// координаты на плоскости, размер на экране
}

/*function drawRect()//Кнопка
{
	ctxMap.fillStyle="#3d3d3d";
	ctxMap.fillRect(10,10,100,100); //функция в которой указывается сначала координаты, потом ширина и высота прямоугольника
	startLoop();
}

function clearRect()//Кнопка очистить поверхность
{
	//ctxMap.clearRect(0, 0, 800, 500);
	stopLoop();
} */