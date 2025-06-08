const { ServerConfig, Logger } = require('./config');
const express = require('express');
const apiRoutes = require('./routes');
const { where } = require('sequelize');

const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    Logger.info("Successfully stated the server", {})


    // const { City, Airport } = require('./models');

    // const benguluru = await City.findByPk(2);
    // console.log(benguluru)

    // const kempagowda = await benguluru.createAirport({ name: 'Kempagowda Airport', code: 'BLR' });
    // console.log(kempagowda);
    // // const hbliairport = await benguluru.getAirports();
    // // console.log(hbliairport)

    // await City.destroy({
    //     where: {
    //         id: 2
    //     }
    // })

});