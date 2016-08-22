var app = angular.module('survey', ['firebase','ui.router','ngSanitize']);

app.config(['$stateProvider', '$urlRouterProvider', Config]);

function Config($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: "templates/home.html",
			controller: "HomeCtrl"
		})
		.state('voting', {
			url: '/survey/:surveyid',
			templateUrl: "templates/survey.html",
			controller: "SurveyCtrl"
		})
		.state('results', {
			url: '/survey/:surveyid/results',
			templateUrl: "templates/results.html",
			controller: "ResultsCtrl"
		})
	;
	
	$urlRouterProvider.otherwise("/");
}

app.controller('AppCtrl', ['$scope', AppCtrl]);

function AppCtrl($scope){
	$scope.appTitle = "Lemans Corporation Exercise";
}

app.controller('HomeCtrl', ['$scope', '$state', 'Survey', HomeCtrl]);

function HomeCtrl($scope, $state, Survey) {

}

app.controller('SurveyCtrl', ['$location','$scope', '$state', '$stateParams', 'Survey', SurveyCtrl]);

function SurveyCtrl($location, $scope, $state, $stateParams, Survey){
	// insert correct Survey from above
	$scope.Survey = Survey.get($stateParams.surveyid);
	
	$scope.myVote = {};
	
	// Submit the vote
	$scope.Vote = function(){
		var answer = $scope.myVote.answer;
		if (answer.value) {
			answer.value++;
		} else {
			answer.value = 1;
		}
		// send the results to the correct surveyid 
		$scope.Survey.$save().then(function(ref){
			var SurveyId = ref.key();
			$state.go('results', {"surveyid": SurveyId});
		});
	};
}

app.controller('ResultsCtrl', ['$location', '$scope', '$stateParams', 'Survey', ResultsCtrl]);

function ResultsCtrl($location, $scope, $stateParams, Survey){
	// get the Survey from above surveyid to review results
	$scope.Survey = Survey.get($stateParams.surveyid);
    
    // calc results
	function calcVotes(){
		$scope.totalVotes = 0;
		angular.forEach($scope.Survey.Answers, function(data){
			$scope.totalVotes += data.value || 0;
		});
	}
	
	
	// Updates values and number of votes
	function updateResults(){
		if (results.update) {
			angular.forEach(results.segments, function(segment, i){
				results.segments[i].value = $scope.Survey.Answers[i].value || 0;
			});
			// update
			results.update();
		}
		calcVotes();
	}

	// update results
	$scope.Survey.$watch(function(){
		updateResults();
	});
	
}

app.service('Survey', ['$firebaseArray', '$firebaseObject', Survey]);

function Survey($firebaseArray, $firebaseObject){
	var ref = new Firebase('https://lemans.firebaseio.com/');
	var Surveys = $firebaseArray(ref);
	
	return {
		"Surveys": Surveys,
		"create": function(SurveyData) {
			return this.Surveys.$add(SurveyData);
		},
		"get": function(SurveyId) {
			return $firebaseObject(ref.child(SurveyId));
		}
	}
}