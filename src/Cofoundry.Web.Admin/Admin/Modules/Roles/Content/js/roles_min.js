/*! UberCMS 2017-06-30 */
angular.module("cms.roles",["ngRoute","cms.shared"]).constant("_",window._).constant("roles.modulePath","/Admin/Modules/Roles/Js/"),angular.module("cms.roles").config(["$routeProvider","shared.routingUtilities","roles.modulePath",function(a,b,c){b.registerCrudRoutes(a,c,"Role")}]),angular.module("cms.roles").factory("roles.permissionService",["$http","shared.serviceBase",function(a,b){var c={},d=b+"permissions";return c.getAll=function(b){return a.get(d)},c}]),angular.module("cms.roles").factory("roles.roleService",["$http","_","shared.serviceBase",function(a,b,c){function d(a){return g+"/"+a}var e={},f="COF",g=c+"roles";return e.getAll=function(c){return c=b.defaults(c,{userAreaCode:f}),a.get(g,{params:c})},e.getById=function(b){return a.get(d(b))},e.add=function(b){return a.post(g,b)},e.update=function(b){return a.patch(d(b.roleId),b)},e.remove=function(b){return a["delete"](d(b))},e}]),angular.module("cms.roles").factory("roles.userAreaService",["$http","_","shared.serviceBase",function(a,b,c){var d={};return d.getAll=function(){return a.get(c+"user-areas")},d}]),angular.module("cms.shared").directive("cmsFormFieldPermissionsCollection",["_","shared.LoadState","roles.modulePath","roles.permissionService",function(a,b,c,d){function e(c,e,g,h){function i(b,c){var d=b.target;a.each(c.permissions,function(a){a.selected=!!d.checked,j(a,c,!0)}),k()}function j(b,c,d){b.permissionType.code===f&&(c.isReadPermitted=b.selected,b.selected||a.each(c.permissions,function(a){a.selected=!1})),d||k()}function k(){var b=[];a.each(o.permissions,function(a){var c;a.selected&&(c={permissionCode:a.permissionType.code},a.entityDefinition&&(c.entityDefinitionCode=a.entityDefinition.entityDefinitionCode),b.push(c))}),o.model=b}function l(){if(o.permissionGroups&&o.permissionGroups.length){var b=!(!o.model||!o.model.length);a.each(o.permissionGroups,function(c){a.each(c.permissions,function(d){d.selected=b&&!!a.find(o.model,function(a){return d.uniqueId===m(a.permissionCode,a.entityDefinitionCode)}),j(d,c,!0)})})}}function m(a,b){var c="permission"+a;return b&&(c+=b),c}function n(){function b(b){b&&(o.permissions=b,o.permissionGroups=a.chain(o.permissions).groupBy(function(a){return a.entityDefinition?a.entityDefinition.name:"Misc"}).map(function(a,b){var d=c(a);return{title:b,isReadPermitted:!d||d.selected,permissions:e(a)}}).sortBy("title").value(),l()),o.permissionsLoadState.off()}function c(b){var c=a.find(b,function(a){return a.permissionType.code===f});return c}function e(b){return a.sortBy(b,function(a){var b=a.permissionType;switch(a.uniqueId=m(a.permissionType.code,a.entityDefinition?a.entityDefinition.entityDefinitionCode:""),b.code){case"COMRED":return a.isRead=!0,"AAAA1";case"COMMOD":return"AAAA2";case"COMCRT":return"AAAA3";case"COMUPD":return"AAAA4";case"COMDEL":return"AAAA5";default:return b.name}return a.permissionType.code})}return d.getAll().then(b)}var o=c,p=h[0];c.$watch("model",function(a,b){l()}),n(),o.formScope=p.getFormScope(),o.permissionsLoadState=new b(!0),o.toggleGroup=i,o.permissionChanged=j}var f="COMRED";return{restrict:"E",scope:{model:"=cmsModel",globalLoadState:"=cmsGlobalLoadState"},templateUrl:c+"UIComponents/FormFieldPermissionsCollection.html",require:["^^cmsForm"],link:e}}]),angular.module("cms.roles").controller("AddRoleController",["$location","shared.LoadState","roles.permissionService","roles.roleService","roles.userAreaService",function(a,b,c,d,e){function f(){l.globalLoadState=new b,l.formLoadState=new b(!0),j(),k(),l.editMode=!1,l.save=g,l.cancel=h}function g(){l.globalLoadState.on(),d.add(l.command).then(i)["finally"](l.globalLoadState.off)}function h(){i()}function i(){a.path("/")}function j(){function a(a){l.userAreas=a,1==a.length&&(l.command.userAreaCode=a[0].userAreaCode),l.formLoadState.off()}e.getAll().then(a)}function k(){l.command={permissions:[]}}var l=this;f()}]),angular.module("cms.roles").controller("RoleDetailsController",["$routeParams","$location","$q","shared.LoadState","shared.modalDialogService","roles.roleService","roles.permissionService","roles.modulePath",function(a,b,c,d,e,f,g,h){function i(){t.edit=j,t.save=k,t.cancel=l,t.deleteRole=m,t.editMode=!1,t.globalLoadState=new d,t.saveLoadState=new d,t.formLoadState=new d(!0),o().then(s.bind(null,t.formLoadState))}function j(){t.editMode=!0,t.mainForm.formStatus.clear()}function k(){r(t.saveLoadState),f.update(t.command).then(n.bind(null,"Changes were saved successfully"))["finally"](s.bind(null,t.saveLoadState))}function l(){t.editMode=!1,t.command=p(t.role),t.mainForm.formStatus.clear()}function m(){function a(){return r(),f.remove(t.role.roleId).then(q)["catch"](s)}var b={title:"Delete Role",message:"Are you sure you want to delete this role?",okButtonTitle:"Yes, delete it",onOk:a};e.confirm(b)}function n(a){return o().then(t.mainForm.formStatus.success.bind(null,a))}function o(){function b(a){t.role=a,t.command=p(a),t.editMode=!1,console.log(a)}var c=a.id;return f.getById(c).then(b)}function p(a){var b=_.pick(a,"roleId","title");return b.permissions=_.map(a.permissions,function(a){var b={permissionCode:a.permissionType.code};return a.entityDefinition&&(b.entityDefinitionCode=a.entityDefinition.entityDefinitionCode),b}),b}function q(){b.path("")}function r(a){t.globalLoadState.on(),a&&_.isFunction(a.on)&&a.on()}function s(a){t.globalLoadState.off(),a&&_.isFunction(a.off)&&a.off()}var t=this;i()}]),angular.module("cms.roles").controller("RoleListController",["_","shared.LoadState","shared.SearchQuery","shared.urlLibrary","roles.roleService",function(a,b,c,d,e){function f(){j.urlLibrary=d,j.gridLoadState=new b,j.query=new c({onChanged:h}),j.filter=j.query.getFilters(),j.toggleFilter=g,g(!1),i()}function g(b){j.isFilterVisible=a.isUndefined(b)?!j.isFilterVisible:b}function h(){g(!1),i()}function i(){return j.gridLoadState.on(),e.getAll(j.query.getParameters()).then(function(a){j.result=a,j.gridLoadState.off()})}var j=this;f()}]);