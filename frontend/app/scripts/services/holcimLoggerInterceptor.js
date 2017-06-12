/**
 * Created by udeshikaperera on 25/07/2015.
 */
(function(){
    angular.module('eventMangerApp').factory('holcimLoggerInterceptor',
    ['$q','$log','authToken', holcimLoggerInterceptor]);

    function holcimLoggerInterceptor($q, $log, authToken){
        return{
            request : requestInterceptor,
            responseError : responseErrorInterceptor
        };

        function requestInterceptor(config){
            $log.debug('HTTP '+ config.method + ' request - '+ config.url);
            var token = authToken.getToken();

            if(token)
                config.headers.Authorization = 'Bearer '+ token;

            return config;
        }

        function responseErrorInterceptor(response){
            $log.debug('HTTP '+ response.config.method + ' response error - '+ response.config.url);
            return $q.reject(response);
        }
    }
})();