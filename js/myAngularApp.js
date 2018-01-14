
var myApp = angular.module("angularApp", [])           //declaration du module


myApp.controller("myController", function ($scope, $http) {   // controller 

        //$scope.txtname = ""; 
        $scope.visible;
        $scope.txtname = "";
        
        // pour affichage process
        /*$scope.affichage = function () {
                $scope.visible = true;
                return visible;
        }*/
        $scope.items = [{
                id: 1,
                label: 'http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService',
        },
        {
                id: 2,
                label: 'https://geobretagne.fr/geoserver/ows',

        },
        {
                id: 3,
                label: 'http://zoo-project.org/zoo',

        }

        ];

        $scope.selected = null;
        $scope.select = null;
	$scope.pinchou = [];
	$scope.result = null;
	$scope.wps = null;
	$scope.processes = null;
        $scope.process = null;
	$scope.selectedprocess  = null;
	$scope.result2 = null;
	$scope.descriptionProcess = null;
	$scope.inputs = false;
	$scope.listProcess = [
 "Liste de process :" ,"org.n52.wps.extension.QuakemapAlgorithm; ",
      "org.n52.wps.server.algorithm.r.AnnotationValidation; "
];
	$scope.config = function() {
		$http.get($scope.selected.label+'?service=WPS&version=1.0.0&request=GetCapabilities').then(function(response){
         		console.log("===>CC", response);
			$scope.result = response.data;
			console.log("===>DATA ", response);
    		});
/*		.then(function (response) {
    		console.log(" => RES "+response);
  		
			var x2js = new X2JS();
      			var aftCnv = x2js.xml_str2json(response.data);
			console.log("===>DATA CONVERTED ", aftCnv);
		});

		//test xml to json
		//$http.get($scope.result,
            	//{
    			//transformResponse: function (cnv) {
      			var x2js = new X2JS();
      			var aftCnv = x2js.xml_str2json($scope.result);
			console.log("===>DATA CONVERTED ", aftCnv);
      			//return aftCnv;
    			//}
  		//})
    		//.success(function (response) {
    		//console.log(" => RES "+response);
  		//});
		*/

        
    	};
$scope.getData = function() {

      			var x2js = new X2JS();
      			var aftCnv = x2js.xml_str2json($scope.result);
			console.log("===>DATA CONVERTED ", aftCnv.Capabilities);
			$scope.processes = aftCnv.Capabilities.ProcessOfferings.Process;      			
  			$scope.wps = aftCnv.Capabilities;  
};

$scope.getDescriptionProcess = function(id) {
			console.log("===>DATA ");
			$http.get($scope.selected.label+'?service=WPS&version=1.0.0&request=DescribeProcess&Identifier='+id).then(function(response){
         			console.log("===>CC", response);
				$scope.result2 = response.data;
				console.log("===>DATA ", response.data);
    			});
    			
			
};
$scope.getData2 = function() {
			
      			var x2js = new X2JS();
      			var aftCnv = x2js.xml_str2json($scope.result2);
			console.log("===>DATA CONVERTED ", aftCnv );
			$scope.descriptionProcess  = aftCnv; 
			$scope.inputs = $scope.descriptionProcess.ProcessDescriptions.ProcessDescription.DataInputs.Input;
			$scope.inputs = angular.isArray;   			      			
  			//$scope.wps = aftCnv.Capabilities;  
};

});


