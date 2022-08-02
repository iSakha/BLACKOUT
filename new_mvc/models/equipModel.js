const dtb = require('../config/database');
const db = dtb.promise();
const utils = require('../utils/utils');

module.exports = class Equipment {

    constructor() {

        this.id = "001";
        this.name = "001";
        this.manufactor = "001";
        this.img = "001";
        this.category = {};
        this.category.idDep = "001";
        this.category.idCat = "001";
        this.deviceData = {};
        this.deviceData.weight = 18.1;
        this.deviceData.power = 800;
        this.deviceData.transportWeight = 6.66;
        this.deviceData.volume = 0.228;
        this.case = {};
        this.case.inCase = 4;
        this.case.length = 2.3;
        this.case.width = 3.2;
        this.case.height = 3.3;
        this.quantity = {};
        this.quantity.all = {};
        this.quantity.all.qty = 1;
        this.quantity.all.qtyWork = 1;
        this.quantity.all.qtyBroken = 1;
        this.quantity.all.qtyCondWork = 1;

    }

    static getDepartments() {
        try {
            return db.execute('SELECT * FROM `t_department`');
        } catch (error) {
            return error;
        }
    }

    static getCategories() {
        try {
            return db.execute('SELECT * FROM `t_category`');
        } catch (error) {
            return error;
        }
    }

    static getCategoriesByDep(idDep) {
        console.log("idDep:", idDep)
        try {
            return db.execute('SELECT * FROM `t_category` WHERE idDep=?', [idDep]);
        } catch (error) {
            return error;
        }
    }

    static getEquipmentByDep(idDep) {
        console.log("idDep:", idDep)
        try {
            return db.execute('SELECT * FROM `t_equip_name` WHERE idDep=?', [idDep]);
        } catch (error) {
            return error;
        }
    }

    static getEquipmentByDepCat(idDep, idCat) {
        console.log("idDep:", idDep);
        console.log("idCat:", idCat);
        try {
            return db.execute('SELECT * FROM `t_equip_name` WHERE idDep=? AND idCat=?', [idDep, idCat]);
        } catch (error) {
            return error;
        }
    }

    static getFixturesByDepCat(idDep, idCat) {
        console.log("idDep:", idDep);
        console.log("idCat:", idCat);
        let obj = {
            "models": [
                {
                    "id": "007",
                    "name": "Alpha Spot QWO 800",
                    "manufactor": "Clay Paky",
                    "img": "https://blackout.by/wp-content/uploads/2022/07/lightcat.png",
                    "category": {
                        "idDep": "001",
                        "idCat": "001"
                    },
                    "deviceData": {
                        "weight": 42,
                        "power": 43,
                        "transportWeight": "44.66",
                        "volume": "2.2"
                    },
                    "case": {
                        "inCase": 4,
                        "length": "2.3",
                        "width": "3.2",
                        "height": "3.3"
                    },
                    "quantity": {
                        "all": {
                            "qty": 21,
                            "qtyWork": 18,
                            "qtyBroken": 0,
                            "qtyCondWork": 3
                        },
                        "onWarehouse": [
                            {
                                "id": 2,
                                "name": "Минск",
                                "qty": 12,
                                "qtyWork": 11,
                                "qtyBroken": 0,
                                "qtyCondWork": 1
                            },
                            {
                                "id": 3,
                                "name": "Москва",
                                "qty": 1,
                                "qtyWork": 1,
                                "qtyBroken": 0,
                                "qtyCondWork": 0
                            },
                            {
                                "id": 4,
                                "name": "Казань",
                                "qty": 6,
                                "qtyWork": 6,
                                "qtyBroken": 0,
                                "qtyCondWork": 0
                            },
                            {
                                "id": 5,
                                "name": "Питер",
                                "qty": 0,
                                "qtyWork": 0,
                                "qtyBroken": 0,
                                "qtyCondWork": 0
                            }
                        ]
                    },   
                    "devices":[
                        {
                            "id": "001.001.005.0006",
                            "whCode": "1.cp_al_pr1500_006",
                            "sNumber": "S/N AZ007876",
                            "uidCloudio": "435008010CEE",
                            "model": {
                                "id": "0006",
                                "name": "Alpha Profile 1500",
                                "manufactor": "Clay Paky"
                            },
                            "category": {
                                "idDep": "001",
                                "idCat": "001",
                                "idModel": "005"
                            },
                            "warehouse": {
                                "id": 2,
                                "name": "Минск"
                            },
                            "workStatus": {
                                "id": 2,
                                "name": "Рабочий"
                            },
                            "whereStatus": {
                                "id": 2,
                                "name": "На складе"
                            }
                        },
                        {
                            "id": "001.001.005.0006",
                            "whCode": "1.cp_al_pr1500_006",
                            "sNumber": "S/N AZ007876",
                            "uidCloudio": "435008010CEE",
                            "model": {
                                "id": "0006",
                                "name": "Alpha Profile 1500",
                                "manufactor": "Clay Paky"
                            },
                            "category": {
                                "idDep": "001",
                                "idCat": "001",
                                "idModel": "005"
                            },
                            "warehouse": {
                                "id": 2,
                                "name": "Минск"
                            },
                            "workStatus": {
                                "id": 2,
                                "name": "Рабочий"
                            },
                            "whereStatus": {
                                "id": 2,
                                "name": "На складе"
                            }
                        }
                    ]
                }
            ]   
        }
        
        try {
            return obj;
            // return db.execute('SELECT * FROM `v_equipment` WHERE idDep=? AND idCat=?', [idDep, idCat]);
        } catch (error) {
            return error;
        }
    }

    static getFixturesByModelName(id) {

        id = id + ".____";
        console.log("id:", id);

        try {
            return db.execute('SELECT * FROM `v_equipment` WHERE idFixture LIKE ?', [id]);
        } catch (error) {
            return error;
        }
    }

    static getFixtureByDepCatName(idDep, idCat, idName) {
        console.log("idDep:", idDep);
        console.log("idCat:", idCat);
        console.log("idName:", idName);
        try {
            return db.execute('SELECT * FROM `t_equipment` WHERE idDep=? AND idCat=? AND idName=?', [idDep, idCat, idName]);
        } catch (error) {
            return error;
        }
    }

    static getQty() {
        try {
            return db.execute('SELECT * FROM `v_qty`');
        } catch (error) {
            return error;
        }
    }

    static getQtyById(id) {
        try {
            return db.execute('SELECT * FROM `v_qty` WHERE id=?', [id]);
        } catch (error) {
            return error;
        }
    }

    static writeToHistory(row) {
        try {
            console.log("writeToHistory");
            console.log("row:", row);
            return db.execute('INSERT INTO `t_repair_history` (idFixture, comments, idUser, unixTime) VALUES (?, ?, ?, ?)', row);
        } catch (error) {
            return error;
        }
    }

    static changeStatusById(idStatus, idFixture) {

        console.log("changeStatusById");
        console.log("idStatus:", idStatus);
        console.log("idFixture:", idFixture);

        try {
            return db.execute('UPDATE `t_equipment` SET `idFixtureState`=? WHERE `idFixture`=?', [idStatus, idFixture]);
        } catch (error) {
            return error;
        }
    }

    static getFixtureHistory() {
        try {
            return db.execute('SELECT * FROM `v_repair_history`');
        } catch (error) {
            return error;
        }
    }

    static getFixtureHistoryByID(id) {
        try {
            return db.execute('SELECT * FROM `v_repair_history` WHERE idFixture=? ', [id]);
        } catch (error) {
            return error;
        }
    }

    static fixturesMovement(idWarehouse, idFixture) {

        try {
            let updateQuery = utils.updateMultiple(idWarehouse, idFixture);
            return db.query(updateQuery);
        } catch (error) {
            return error;
        }
    }

    // Models transfer (two functions)
    // =============================================================
    static modelsMovement(idWhOut, idModel, modelQty) {

        const idModelArr = idModel.map(item => item + ".____");
        console.log("idModelArr:", idModelArr)

        try {

            let q = utils.modelsMovement(idWhOut, idModelArr, modelQty);
            return db.execute(q);
        } catch (error) {
            return error;
        }
    }

    static setNewWarehouse(idWhIn, idModels) {

        try {
            let updateQuery = utils.updateMultiple(idWhIn, idModels);
            return db.query(updateQuery);
        } catch (error) {
            return error;
        }
    }
    // =============================================================
    static getAllModels() {
        try {
            return db.execute('SELECT * FROM `v_equip_model`');
        } catch (error) {
            return error;
        }
    }

    static getOneModel(id) {
        try {
            const idDep = id.slice(0, 3);
            const idCat = id.slice(4, 7);
            id = id.slice(8, 11);

            return db.execute('SELECT * FROM `v_equip_model` WHERE `idDep`=? AND `idCat`=? AND `id`=?', [idDep, idCat, id]);

        } catch (error) {
            return error;
        }
    }
}