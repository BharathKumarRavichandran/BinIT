const path = require('path');
const sequelize_fixtures = require('sequelize-fixtures');
const signale = require('signale');

// Importing models
const models = require('../models');

sequelize_fixtures.loadFiles(
    [
        path.resolve(__dirname,'center.fixture.json'),
        path.resolve(__dirname,'handler.fixture.json'),
        path.resolve(__dirname,'user.fixture.json'),
        path.resolve(__dirname,'bin.fixture.json'),
        path.resolve(__dirname,'log.fixture.json'),
        path.resolve(__dirname,'polybag.fixture.json'),
    ], models).then(function(){
        signale.success('Fixtures loaded!');
        process.exit(0);
});
