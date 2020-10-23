/**
 * 所持金の初期値
 */
function getMoney() {
    return {
        "money": {
            10: 10,
            50: 10,
            100: 10,
            500: 10,
            1000: 10,
            5000: 10
        }
    };
}

/**
 * 釣銭の初期値
 */
function getVmSetting() {
    return {
        "change": {
            10: 10,
            50: 10,
            100: 10,
            500: 10,
            1000: 10,
            5000: 10
        }
    };
}

/**
 * 商品の初期値
 */
function getItemRows() {
    return [
        {
            "items": [
                {
                    "id": 101,
                    "name": "緑茶",
                    "volumeMl": 500,
                    "bottleType": "pet",
                    "isHot": false,
                    "price": 100,
                    "stock": 3
                },
                {
                    "id": 102,
                    "name": "緑茶",
                    "volumeMl": 350,
                    "bottleType": "pet",
                    "isHot": false,
                    "price": 70,
                    "stock": 3
                },
                {
                    "id": 103,
                    "name": "ウーロン茶",
                    "volumeMl": 500,
                    "bottleType": "pet",
                    "isHot": false,
                    "price": 100,
                    "stock": 3
                },
                {
                    "id": 104,
                    "name": "ほうじ茶",
                    "volumeMl": 500,
                    "bottleType": "pet",
                    "isHot": false,
                    "price": 100,
                    "stock": 3
                }
            ]
        },
        {
            "items": [
                {
                    "id": 201,
                    "name": "コーヒー",
                    "volumeMl": 200,
                    "bottleType": "can",
                    "isHot": false,
                    "price": 50,
                    "stock": 3
                },
                {
                    "id": 202,
                    "name": "ガラナ",
                    "volumeMl": 350,
                    "bottleType": "can",
                    "isHot": false,
                    "price": 60,
                    "stock": 3
                },
                {
                    "id": 203,
                    "name": "コーンスープ",
                    "volumeMl": 200,
                    "bottleType": "can",
                    "isHot": true,
                    "price": 80,
                    "stock": 3
                },
                {
                    "id": 204,
                    "name": "おしるこ",
                    "volumeMl": 200,
                    "bottleType": "pet",
                    "isHot": true,
                    "price": 80,
                    "stock": 3
                }
            ]
        }
    ];
}
