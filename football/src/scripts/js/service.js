angular.module("myApp")
	   .factory("getVal",function($http){
	   		return $http.get("./src/mock/livelist.json")
	   })