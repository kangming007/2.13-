function config($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise("/guide")
		$stateProvider
				.state("index",{
					url:"/index",
					templateUrl:"./tpls/index.html",
					controller:"homeController"
				})
				.state("index.home",{
					url:"/home",
					templateUrl:"./tpls/home.html",
					controller:"homeController"
				})
				.state("index.search",{
					url:"/search",
					templateUrl:"./tpls/search.html",
					controller:"homeController"
				})
				.state("index.my",{
					url:"/my",
					templateUrl:"./tpls/my.html",
					controller:"homeController"
				})

				.state("guide",{
					url:"/guide",
					templateUrl:"./tpls/guide.html",
					controller:"guidController"
				})
}
angular.module("myApp")
	   .config(config)