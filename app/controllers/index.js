const homeController = {
    home(_, res) {
        res.status(200).json({
            version: '1.0',
            message: 'Bienvenue sur tato-api',
        });
    },
};

module.exports = {
    homeController,
};
