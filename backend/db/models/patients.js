const { PatientModel } = require("../schemas/patients");

class PatientRepository {
    static async insertMany(patients) {
        await PatientModel.insertMany(patients);
    }

    static async deleteAll() {
        await PatientModel.deleteMany({});
    }
}

module.exports = { PatientRepository };