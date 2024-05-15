const { PatientModel } = require("../schemas/patients");

class PatientRepository {
    static async insertMany(patients) {
        await PatientModel.insertMany(patients);
    }
}

module.exports = { PatientRepository };