const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(

    {

        serverUrl: "https://sonarqube.swiveltech.lk/",

        options: {

            "sonar.sources": ".",

            "sonar.inclusions": "src/**", // Entry point of your code

            'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',

        },

    },

    () => {}

);