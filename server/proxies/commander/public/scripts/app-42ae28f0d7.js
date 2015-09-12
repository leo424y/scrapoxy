/**
 * Application configuration
 */
!function(){"use strict";angular.module("myApp",["ngMessages","ui.router","restangular"])}(),function(){"use strict";function n(n){n.setBaseUrl("/api")}angular.module("myApp").config(n),n.$inject=["RestangularProvider"]}(),function(){"use strict";function n(n){n.otherwise(function(n){var t=n.get("$state");t.go("home.instances")})}angular.module("myApp").config(n),n.$inject=["$urlRouterProvider"]}(),function(){"use strict";function n(n,t,e){function a(){t.login(i.password).then(function(){n.go("home.instances")})["catch"](function(){e.error("Invalid password")})}var i=this;i.login=a,i.password=""}angular.module("myApp").controller("LoginController",n),n.$inject=["$state","LoginService","ToastService"]}(),function(){"use strict";function n(n){n.state("login",{url:"/login",data:{requireAuth:!1},templateUrl:"app/login/login.html",controller:"LoginController as vm"})}angular.module("myApp").config(n),n.$inject=["$stateProvider"]}(),function(){"use strict";function n(n){function t(t){return n(function(n,e){if(!t||t.length<=0)return e("Password is empty");var a=btoa(t);localStorage.setItem("token",a),n()})}function e(){try{return localStorage.getItem("token")}catch(n){return}}function a(){try{localStorage.removeItem("token")}catch(t){}finally{return n.resolve()}}var i={login:t,logout:a,getToken:e};return i}angular.module("myApp").factory("LoginService",n),n.$inject=["$q"]}(),function(){"use strict";function n(n,t,e,a,i,s,c,o){t.$on("$destroy",function(){c.stop(),a.stop(),s.stop(),e.stop()}),e.start(i.getToken()).then(function(){o.success("GUI is connected.")})["catch"](function(t){n.error(t),o.error("Cannot connect to daemon.<br/>Please reload GUI.")}),s.getScaling(),a.getAllInstances(),c.getStats()}angular.module("myApp").controller("HomeController",n),n.$inject=["$log","$scope","EventsService","InstancesCacheService","LoginService","ScalingCacheService","StatsCacheService","ToastService"]}(),function(){"use strict";function n(n){n.state("home",{"abstract":!0,url:"",data:{requireAuth:!0},templateUrl:"app/home/home.html",controller:"HomeController as vm"})}angular.module("myApp").config(n),n.$inject=["$stateProvider"]}(),function(){"use strict";function n(n,t){function e(e){return n(function(n,a){window.io||a(new Error("Cannot find socket.io"));try{i=io.connect("",{query:"token="+e,"force new connection":!0}),i.on("event",function(n){n=JSON.parse(n),t.$apply(function(){t.$emit(n.event,n.payload)})}),n()}catch(s){a(s)}})}function a(){i.disconnect()}var i,s={start:e,stop:a};return s}angular.module("myApp").factory("EventsService",n),n.$inject=["$q","$rootScope"]}(),function(){"use strict";function n(n,t,e,a){function i(){function i(n,t){var e=_.findIndex(o,{content:{name:t.name}});if(e>=0)"removed"===t.status?(o.splice(e,1),a.success("Instance "+t.name+" removed.")):o[e].content=t;else if("removed"!==t.status){var i={content:t};o.push(i),a.success("Instance "+t.name+" created.")}}return o?n.when(o):r?r:r=e.getAllInstances().then(function(n){return o=n.map(function(n){return{content:n}}),l=t.$on("status:updated",i),u=t.$on("alive:updated",i),o})}function s(){l&&(l(),l=void 0),u&&(u(),u=void 0),o=void 0,r=void 0}function c(n){return e.deleteInstance(n)}var o,r,l,u,d={stop:s,getAllInstances:i,deleteInstance:c};return d}angular.module("myApp").factory("InstancesCacheService",n),n.$inject=["$q","$rootScope","InstancesService","ToastService"]}(),function(){"use strict";function n(n){function t(){return a.getList()}function e(n){var t={name:n};return a.all("stop").post(t)}var a=n.all("instances"),i={getAllInstances:t,deleteInstance:e};return i}angular.module("myApp").factory("InstancesService",n),n.$inject=["Restangular"]}(),function(){"use strict";function n(n,t,e,a){function i(){function i(n,t){_.merge(o,t),a.success("Scaling updated.")}return o?n.when(o):r?r:r=e.getScaling().then(function(n){return o=n,l=t.$on("scaling:updated",i),o})}function s(){l&&(l(),l=void 0),o=void 0,r=void 0}function c(n){return e.updateScaling(n)}var o,r,l,u={stop:s,getScaling:i,updateScaling:c};return u}angular.module("myApp").factory("ScalingCacheService",n),n.$inject=["$q","$rootScope","ScalingService","ToastService"]}(),function(){"use strict";function n(n){function t(){return a.get().then(function(n){return n.plain()})}function e(n){return a.patch(n).then(function(t){return t?t.plain():n})}var a=n.one("scaling"),i={getScaling:t,updateScaling:e};return i}angular.module("myApp").factory("ScalingService",n),n.$inject=["Restangular"]}(),function(){"use strict";function n(n){function t(){c&&(c(),c=void 0),s=void 0}function e(t){function e(n,t){for(;s.length>=o;)s.shift();t.date=new Date,s.push(t),r.forEach(function(n){n(t)})}return s||(s=[],c=n.$on("stats",e)),t=Math.min(t,o),_.takeRight(s,t)}function a(n){r.push(n)}function i(n){var t=r.indexOf(n);t>=0&&r.splice(t,1)}var s,c,o=3600,r=[],l={stop:t,getStats:e,addListener:a,removeListener:i};return l}angular.module("myApp").factory("StatsCacheService",n),n.$inject=["$rootScope"]}(),function(){"use strict";function n(){function n(n){toastr.success(n)}function t(n){toastr.warning(n)}function e(n){toastr.error(n)}toastr.options={positionClass:"toast-bottom-right"};var a={success:n,warning:t,error:e};return a}angular.module("myApp").factory("ToastService",n)}(),function(){"use strict";function n(n){function t(n,t){function e(t){var e=n.get("LoginService"),a=e.getToken();return a&&(t.headers.Authorization=a),t}function a(e){if(401===e.status||403===e.status){var a=n.get("LoginService"),i=n.get("$state");a.logout()["finally"](function(){i.go("login")})}return t.reject(e)}var i={request:e,responseError:a};return i}n.interceptors.push(t),t.$inject=["$injector","$q"]}angular.module("myApp").config(n),n.$inject=["$httpProvider"]}(),function(){"use strict";function n(n,t,e){t.$on("$stateChangeStart",function(t,a){if("login"!==a.name){var i=a.data.requireAuth;if(i){var s=e.getToken();s||(t.preventDefault(),n.go("login"))}}})}angular.module("myApp").run(n),n.$inject=["$state","$rootScope","LoginService"]}(),function(){"use strict";function n(n,t,e){function a(){n.getAllInstances().then(function(n){s.instances=n}),t.getScaling().then(function(n){s.scaling=n})}function i(){s.scaling.min=Math.max(0,s.scaling.min||0),s.scaling.required=Math.max(0,s.scaling.required||0),s.scaling.max=Math.max(0,s.scaling.max||0),s.scaling.min>s.scaling.required&&(s.scaling.required=s.scaling.min),s.scaling.max<s.scaling.required&&(s.scaling.max=s.scaling.required),t.updateScaling(s.scaling)["catch"](function(n){e.error("Cannot update scaling: "+n)})}var s=this;s.instances=[],s.updateScaling=i,s.scaling={min:0,required:0,max:0},a()}angular.module("myApp").controller("InstancesController",n),n.$inject=["InstancesCacheService","ScalingCacheService","ToastService"]}(),function(){"use strict";function n(n){n.state("home.instances",{url:"/instances",templateUrl:"app/home/instances/instances.html",controller:"InstancesController as vm"})}angular.module("myApp").config(n),n.$inject=["$stateProvider"]}(),function(){"use strict";function n(){function n(n,t){function e(){t.logout().then(function(){n.go("login")})}var a=this;a.logout=e}var t={restrict:"E",scope:{},bindToController:{},controller:n,controllerAs:"vm",templateUrl:"app/home/navbar/navbar.html"};return n.$inject=["$state","LoginService"],t}angular.module("myApp").directive("navbar",n)}(),function(){"use strict";function n(n,t){function e(n){return c3.generate({bindto:n,data:{x:"x",columns:i([]),axes:{data2:"y2"}},axis:{x:{type:"timeseries",tick:{format:"%H:%M:%S"}},y:{label:{text:"Requests count",position:"outer-middle"}},y2:{show:!0,label:{text:"Requests delay (in seconds)",position:"outer-middle"}}},transition:{duration:0}})}function a(){s.load({columns:i(t.getStats(60))}),c.load({columns:i(t.getStats(3600))})}function i(n){var t=[["x"],["Requests count"],["Requests delay"]];return n.forEach(function(n){t[0].push(n.date),t[1].push(n.requests_finished),t[2].push(n.requests_time_average)}),t}var s=e("#chart60"),c=e("#chart3600");t.addListener(a),n.$on("$destroy",function(){t.removeListener(a)}),a()}angular.module("myApp").controller("StatsController",n),n.$inject=["$scope","StatsCacheService"]}(),function(){"use strict";function n(n){n.state("home.stats",{url:"/stats",templateUrl:"app/home/stats/stats.html",controller:"StatsController as vm"})}angular.module("myApp").config(n),n.$inject=["$stateProvider"]}(),function(){"use strict";function n(){function n(n,t){function e(){n.deleteInstance(a.container.content.name).then(function(){t.success("Remove "+a.container.content.name+" asked.")})["catch"](function(){t.error("Cannot ask to remove "+a.container.content.name)})}var a=this;a.kill=e}var t={restrict:"E",scope:{},bindToController:{container:"="},controller:n,controllerAs:"vm",templateUrl:"app/home/instances/instance/instance.html"};return n.$inject=["InstancesCacheService","ToastService"],t}angular.module("myApp").directive("instance",n)}(),function(){"use strict";function n(){function n(){}var t={restrict:"E",scope:{},bindToController:{alive:"@"},controller:n,controllerAs:"vm",templateUrl:"app/home/instances/instance/instance-alive/instance-alive.html"};return t}angular.module("myApp").directive("instanceAlive",n)}(),function(){"use strict";function n(){function n(){}var t={restrict:"E",scope:{},bindToController:{status:"@"},controller:n,controllerAs:"vm",templateUrl:"app/home/instances/instance/instance-status/instance-status.html"};return t}angular.module("myApp").directive("instanceStatus",n)}(),function(){"use strict";function n(){function n(){}var t={restrict:"E",scope:{},bindToController:{type:"@"},controller:n,controllerAs:"vm",templateUrl:"app/home/instances/instance/instance-type/instance-type.html"};return t}angular.module("myApp").directive("instanceType",n)}(),angular.module("myApp").run(["$templateCache",function(n){n.put("app/home/home.html",'<navbar></navbar><div ui-view=""></div>'),n.put("app/login/login.html",'<div class="login"><div class="container"><div class="row"><div class="col-md-6 col-md-offset-4"><div class="login-logo"><img src="assets/images/logo400.png"></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Please sign in</h3></div><div class="panel-body"><form name="myForm" role="form" no-validate="" ng-submit="vm.login()"><fieldset><div class="form-group" ng-class="{\'has-error\': myForm.password.$invalid && myForm.password.$dirty}"><input class="form-control" placeholder="Password" name="password" type="password" ng-model="vm.password" required=""> <span class="help-block" ng-messages="myForm.password.$error" ng-show="myForm.password.$invalid && myForm.password.$dirty"><span ng-message="required">Password is empty</span></span></div><input class="btn btn-lg btn-success btn-block" type="submit" value="Login" ng-disabled="myForm.$invalid"></fieldset></form></div></div></div></div></div></div>'),n.put("app/home/instances/instances.html",'<section class="instances"><div class="container-fluid"><div class="row"><div class="col-xs-12"><div class="panel panel-default"><div class="panel-heading"><div class="panel-title">Instances<form class="form-inline pull-right" name="scalingForm"><div class="form-group" ng-class="{\'has-error\': scalingForm.scalingMin.$invalid}"><label for="scalingMin">Min:</label> <input type="number" class="form-control" id="scalingMin" name="scalingMin" ng-model="vm.scaling.min" ng-model-options="{debounce: { \'default\': 500, \'blur\': 0 } }" ng-change="vm.updateScaling()" required=""></div><div class="form-group" ng-class="{\'has-error\': scalingForm.scalingRequired.$invalid}"><label for="scalingRequired">Required:</label> <input type="number" class="form-control" id="scalingRequired" name="scalingRequired" ng-model="vm.scaling.required" ng-model-options="{debounce: { \'default\': 500, \'blur\': 0 } }" ng-change="vm.updateScaling()" required=""></div><div class="form-group" ng-class="{\'has-error\': scalingForm.scalingMax.$invalid}"><label for="scalingMax">Max:</label> <input type="number" class="form-control" id="scalingMax" name="scalingMax" ng-model="vm.scaling.max" ng-model-options="{debounce: { \'default\': 500, \'blur\': 0 } }" ng-change="vm.updateScaling()" required=""></div></form></div></div><div class="panel-body"><div class="row"><div class="col-sm-2" ng-repeat="instance in vm.instances track by instance.content.name" ng-show="vm.instances.length > 0"><instance container="instance"></instance></div><div class="col-sm-12 list-empty" ng-show="vm.instances.length <= 0"><i class="icon icon-empty"></i> <span>No instance found</span></div></div></div></div></div></div></div></section>'),n.put("app/home/navbar/navbar.html",'<nav class="navbar navbar-default navbar-fixed-top"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button><div class="navbar-brand"><img src="assets/images/logo35h.png"></div></div><div class="navbar-collapse" ng-class="{collapse: navCollapsed}"><ul class="nav navbar-nav"><li ui-sref-active="active"><a ui-sref="home.instances">Instances</a></li><li ui-sref-active="active"><a ui-sref="home.stats">Stats</a></li></ul><ul class="nav navbar-nav navbar-right"><li><a ng-click="vm.logout()"><i class="icon icon-sign-out"></i> Logout</a></li></ul></div></div></nav>'),n.put("app/home/stats/stats.html",'<section class="stats"><div class="container-fluid"><div class="row"><div class="col-xs-12"><div class="panel panel-default"><div class="panel-heading"><div class="panel-title">Requests (for 1 minute)</div></div><div class="panel-body"><div id="chart60"></div></div></div></div><div class="col-xs-12"><div class="panel panel-default"><div class="panel-heading"><div class="panel-title">Requests (for 1 hour)</div></div><div class="panel-body"><div id="chart3600"></div></div></div></div></div></div></section>'),n.put("app/home/instances/instance/instance.html",'<div class="instance"><div class="instance-info"><div class="instance-name" ng-bind="vm.container.content.name"></div><div class="instance-icons"><instance-type type="{{vm.container.content.type}}"></instance-type><instance-status status="{{vm.container.content.status}}"></instance-status><instance-alive alive="{{vm.container.content.alive}}"></instance-alive></div></div><div class="instance-button" ng-click="vm.kill()"><i class="icon icon-stopped"></i></div></div>'),n.put("app/home/instances/instance/instance-alive/instance-alive.html",'<div class="instance-alive"><span ng-switch="vm.alive"><span ng-switch-when="true"><i class="icon icon-alive" title="Alive"></i></span> <span ng-switch-when="false"><i class="icon icon-dead" title="Dead"></i></span> <span ng-switch-default=""><i class="icon icon-unknown" title="Unknown"></i></span></span></div>'),n.put("app/home/instances/instance/instance-status/instance-status.html",'<div class="instance-status"><span ng-switch="vm.status"><span ng-switch-when="started"><i class="icon icon-started" title="Started"></i></span> <span ng-switch-when="stopped"><i class="icon icon-stopped" title="Stopped"></i></span> <span ng-switch-when="starting"><i class="icon icon-starting" title="Starting"></i></span> <span ng-switch-when="stopping"><i class="icon icon-stopping" title="Stopping"></i></span> <span ng-switch-default=""><i class="icon icon-unknown" title="Unknown"></i></span></span></div>'),n.put("app/home/instances/instance/instance-type/instance-type.html",'<div class="instance-type"><span ng-switch="vm.type"><span ng-switch-when="awsec2"><i class="icon icon-aws-ec2" title="AWS EC2"></i></span> <span ng-switch-default=""><i class="icon icon-unknown" title="Unknown"></i></span></span></div>')}]);