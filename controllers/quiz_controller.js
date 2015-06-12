var models=require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(function(quiz) {
		if (quiz) {
			req.quiz = quiz;
			next();
		} else { next(new Error('No existe quizId = ' + quisId));}                
	}).catch(function(error) {next(error);})
};

exports.index = function(req,res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index', {quizes: quizes});
	}).catch(function(error) {next(error);})
};
//Búsqueda, search
exports.busquedas = function(req, res){
	var busc = '%'+req.query.busqueda.replace(/ /g, '%')+'%';
	models.Quiz.findAll({where:["pregunta like ?", busc]}).then(function(quizes) {
		res.render('busquedas/busquedas', {quizes: quizes, fallo: req.query.busqueda});
		}).catch(function(error) { next(error);});
};

exports.show = function(req, res){
		res.render('quizes/show', {quiz: req.quiz});
};

//GET /quizes/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado='Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

exports.new = function(req, res){
	var quiz=models.Quiz.build(
		{pregunta: 'Pregunta', respuesta: 'Respuesta'}
		);
	res.render('quizes/new', {quiz: quiz});
};

exports.create = function(req, res){
	var quiz=models.Quiz.build(req.body.quiz);
	quiz.save({fields: ['pregunta', 'respuesta']}).then(function(){
		res.redirect('/quizes');
	})
};

exports.author = function(req, res){
	res.render('author/author', {autor: 'Diego González Álvarez'});
};
