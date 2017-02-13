angular.module("myApp")
	   .factory("getVal",function($http){
	   		return $http.get("./mock/livelist.json")
	   })